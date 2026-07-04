// src/config/default.rs
use std::collections::HashMap;
use serde::{Serialize, Deserialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct CyberConfig {
    // Structural multi-tier routing tokens for the new themes engine
    pub theme_category: String,   // e.g., "sub-cyber"
    pub theme_folder: String,     // e.g., "Cyberdeck"
    pub theme_variant: String,    // e.g., "Cyberdeck_GlitchCore"
    
    pub opacity: f32,
    pub wallpaper: Option<String>,
    pub font_profile: String,
    pub keybindings: String,
    pub vim_mode_enabled: bool,
    pub syntax_highlighting: bool,
    pub syntax_extensions: Vec<String>,
    pub macros: HashMap<String, String>,
}

impl Default for CyberConfig {
    fn default() -> Self {
        let mut default_macros = HashMap::new();
        default_macros.insert("Ctrl+F1".to_string(), "cargo run\n".to_string());

        Self {
            // Point the fresh terminal boot to your core sub-cyber theme variant out-of-the-box
            theme_category: "sub-cyber".to_string(),
            theme_folder: "Cyberdeck".to_string(),
            theme_variant: "Cyberdeck_GlitchCore".to_string(),
            
            opacity: 0.90,
            wallpaper: None,
            font_profile: "JetBrainsMono-Regular.ttf".to_string(),
            keybindings: "default".to_string(),
            vim_mode_enabled: false,
            syntax_highlighting: true,
            syntax_extensions: vec!["rs".to_string(), "toml".to_string(), "lua".to_string()],
            macros: default_macros,
        }
    }
}
