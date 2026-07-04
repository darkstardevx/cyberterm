// src/theme.rs
use std::fs;
use std::path::{Path, PathBuf};
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Theme {
    pub name: String,
    pub author: String,
    pub category: String,
    pub background: String,
    pub foreground: String,
    pub cursor: String,
    
    // Alacritty needs u32 internally, but we pull them as Hex strings from JSON
    #[serde(skip)] 
    pub colors: [u32; 16],
    
    // Temporary binding array for Serde during initial parsing
    #[serde(rename = "colors")]
    pub raw_colors: Vec<String>,
}

pub struct ThemeRegistry {
    pub themes: Vec<Theme>,
    pub selected_index: usize,
}

impl ThemeRegistry {
    /// Recursively scans through themes/ category and variant subdirectories,
    /// parsing every dynamic JSON theme variant into the unified theme listing array.
    pub fn load_from_dir<P: AsRef<Path>>(base_dir: P) -> Self {
        let mut themes = Vec::new();
        
        // Use a recursive closure or manual deep iteration loop to exhaust the new tree layout
        if let Ok(categories) = fs::read_dir(base_dir) {
            for cat_entry in categories.flatten() {
                if cat_entry.path().is_dir() {
                    if let Ok(sub_folders) = fs::read_dir(cat_entry.path()) {
                        for folder_entry in sub_folders.flatten() {
                            if folder_entry.path().is_dir() {
                                if let Ok(files) = fs::read_dir(folder_entry.path()) {
                                    for file_entry in files.flatten() {
                                        let file_path = file_entry.path();
                                        if file_path.is_file() && file_path.extension().map_or(false, |e| e == "json") {
                                            if let Ok(theme) = Self::parse_json_theme(&file_path) {
                                                themes.push(theme);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        ThemeRegistry {
            themes,
            selected_index: 0,
        }
    }

    /// Internal asset parser mapping hex strings safely over into u32 bits
    fn parse_json_theme(path: &Path) -> Result<Theme, Box<dyn std::error::Error>> {
        let raw_json = fs::read_to_string(path)?;
        let mut theme: Theme = serde_json::from_str(&raw_json)?;
        
        // Map Hex text array directly onto the internal 16-element u32 buffer array
        let mut color_buffer = [0u32; 16];
        for (i, hex_str) in theme.raw_colors.iter().enumerate().take(16) {
            let clean_hex = hex_str.trim_start_matches('#');
            if let Ok(val) = u32::from_str_radix(clean_hex, 16) {
                color_buffer[i] = val;
            }
        }
        theme.colors = color_buffer;
        Ok(theme)
    }

    /// Creates a fresh, custom cyberpunk-ready theme JSON file inside its explicit folder path.
    pub fn create_new_theme_template<P: AsRef<Path>>(dir_path: P, raw_name: &str) -> Result<PathBuf, std::io::Error> {
        let target_dir = dir_path.as_ref();
        
        // <-- Added: Explicitly provision directory trees safely before saving files to disk
        fs::create_dir_all(target_dir)?;

        // Clean up name string to create a safe file slug (e.g., "Neon Nights" -> "NeonNights")
        let file_slug = raw_name
            .chars()
            .filter(|c| c.is_alphanumeric() || *c == '_')
            .collect::<String>();

        if file_slug.is_empty() {
            return Err(std::io::Error::new(std::io::ErrorKind::InvalidInput, "Invalid theme name"));
        }

        let theme_path = target_dir.join(format!("{}.json", file_slug));
        
        // Structural JSON layout mapping to match our dynamic loaders
        let template_content = format!(
            "{{\n\
            \x20\x20\"name\": \"{}\",\n\
            \x20\x20\"author\": \"Brett\",\n\
            \x20\x20\"category\": \"sub-cyber\",\n\
            \x20\x20\"background\": \"#0a0a0f\",\n\
            \x20\x20\"foreground\": \"#bcbcbc\",\n\
            \x20\x20\"cursor\": \"#00ffaa\",\n\
            \x20\x20\"colors\": [\n\
            \x20\x20\x20\x20\"#0a0a0f\", \"#ff0055\", \"#00ffaa\", \"#f3e600\",\n\
            \x20\x20\x20\x20\"#00bfff\", \"#de00fe\", \"#00ffff\", \"#bcbcbc\",\n\
            \x20\x20\x20\x20\"#222233\", \"#ff3377\", \"#33ffbb\", \"#ffff55\",\n\
            \x20\x20\x20\x20\"#33ccff\", \"#e533ff\", \"#55ffff\", \"#ffffff\"\n\
            \x20\x20]\n\
            }}",
            raw_name
        );

        fs::write(&theme_path, template_content)?;
        Ok(theme_path)
    }
}
