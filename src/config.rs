// src/config.rs
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::fs;
use std::path::{Path, PathBuf};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct CyberConfig {
    pub theme: String,

    pub opacity: f32,
    pub wallpaper: Option<String>,
    pub font_profile: String,
    pub keybindings: String,
    pub vim_mode_enabled: bool,
    pub syntax_highlighting: bool,

    // --- Extensible Engine Track Layout Fields ---
    pub syntax_extensions: Vec<String>,
    pub macros: HashMap<String, String>,
}

impl Default for CyberConfig {
    fn default() -> Self {
        let mut default_macros = HashMap::new();
        default_macros.insert("Ctrl+F1".to_string(), "cargo run\n".to_string());

        Self {
            theme: "synthwave_84".to_string(),
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

pub fn load_config(config_root: &Path) -> Result<CyberConfig, Box<dyn std::error::Error>> {
    // Must match `save_config`'s filename below -- these disagreed
    // ("config.toml" here vs "cyber_config.toml" there) since day one,
    // silently discarding every setting any `+set-*` CLI command or the
    // in-app theme menu ever saved, since `load_config` always found
    // nothing and fell through to `CyberConfig::default()`.
    let config_path = config_root.join("cyber_config.toml");

    if !config_path.exists() {
        return Ok(CyberConfig::default());
    }

    let content = fs::read_to_string(config_path)?;
    let config: CyberConfig = toml::from_str(&content)?;
    Ok(config)
}

/// Serializes and writes the current config layout state back to disk
pub fn save_config(config_root: &Path, config: &CyberConfig) -> Result<(), std::io::Error> {
    let config_file = config_root.join("cyber_config.toml");
    let serialized = toml::to_string_pretty(config).map_err(std::io::Error::other)?;
    fs::write(config_file, serialized)?;
    Ok(())
}

pub fn initialize_cyberterm_directories() -> Result<PathBuf, std::io::Error> {
    let home = std::env::var("HOME").unwrap_or_else(|_| ".".to_string());
    let config_dir = PathBuf::from(home).join(".config").join("cyberterm");
    let themes_dir = config_dir.join("themes");
    let recorder_dir = config_dir.join("logs").join("headsup_recorder");

    fs::create_dir_all(&themes_dir)?;
    fs::create_dir_all(&recorder_dir)?;

    let config_file = config_dir.join("cyber_config.toml");
    if !config_file.exists() {
        let default_cfg = CyberConfig::default();
        let _ = save_config(&config_dir, &default_cfg);
    }

    initialize_builtin_themes(&themes_dir)?;
    Ok(config_dir)
}

fn initialize_builtin_themes(themes_dir: &std::path::Path) -> Result<(), std::io::Error> {
    let themes = get_cyber_theme_payloads();
    for (filename, content) in themes {
        // Real Kitty theme file extension -- these are genuine Kitty-conf-syntax
        // files, so anything pulled straight from kovidgoyal/kitty-themes drops
        // in next to these with zero conversion.
        let theme_path = themes_dir.join(format!("{}.conf", filename));
        if !theme_path.exists() {
            fs::write(theme_path, content.trim_start())?;
        }
    }
    Ok(())
}

/// Real Kitty terminal theme syntax: flat, space-separated `key value` lines,
/// `#`-prefixed comments, no `=`. Verified directly against
/// kovidgoyal/kitty-themes (e.g. Dracula.conf) before converting these.
fn get_cyber_theme_payloads() -> Vec<(&'static str, &'static str)> {
    vec![
        (
            "dracula_cyber",
            r#"
# Dracula (Cyberpunk Remix) - Deep violet background, amplified pinks/purples
background #1e1f29
foreground #f8f8f2
cursor #f8f8f2

color0 #1e1f29
color1 #ff5555
color2 #50fa7b
color3 #f1fa8c
color4 #bd93f9
color5 #ff79c6
color6 #8be9fd
color7 #f8f8f2
color8 #6272a4
color9 #ff6e6e
color10 #69ff94
color11 #ffffa5
color12 #d6acff
color13 #ff92df
color14 #a4ffff
color15 #ffffff
"#,
        ),
        (
            "synthwave_84",
            r#"
# Synthwave '84 - The definitive Outrun aesthetic (Deep purple & pure laser grids)
background #261a30
foreground #b3b1b6
cursor #b3b1b6

color0 #261a30
color1 #fe4450
color2 #72f1b8
color3 #fede5d
color4 #03edf6
color5 #f92aad
color6 #03edf6
color7 #b3b1b6
color8 #493b61
color9 #ff6b77
color10 #96f5cd
color11 #ffe484
color12 #5ef2f8
color13 #fb5cb8
color14 #5ef2f8
color15 #ffffff
"#,
        ),
        (
            "cyberpunk_2077",
            r#"
# Cyberpunk 2077 - Radioactive yellow highlights mixed with toxic cyan
background #000000
foreground #bcbcbc
cursor #bcbcbc

color0 #000000
color1 #ff0055
color2 #00ffaa
color3 #f3e600
color4 #00bfff
color5 #de00fe
color6 #00ffff
color7 #bcbcbc
color8 #222222
color9 #ff3377
color10 #33ffbb
color11 #ffff55
color12 #33ccff
color13 #e533ff
color14 #55ffff
color15 #ffffff
"#,
        ),
        (
            "nord_neon",
            r#"
# Nord Neon - Standard arctic cold shattered by electric auroras
background #1a1e24
foreground #e5e9f0
cursor #e5e9f0

color0 #1a1e24
color1 #bf616a
color2 #a3be8c
color3 #ebcb8b
color4 #81a1c1
color5 #b48ead
color6 #88c0d0
color7 #e5e9f0
color8 #4c566a
color9 #ff4a5a
color10 #50fa7b
color11 #f1fa8c
color12 #00bfff
color13 #ff79c6
color14 #00ffff
color15 #ffffff
"#,
        ),
        (
            "gruvbox_cyber",
            r#"
# Gruvbox Cyber - Hardened high-contrast industrial pitch-black and chemical orange
background #111111
foreground #ebdbb2
cursor #ebdbb2

color0 #111111
color1 #fb4934
color2 #b8bb26
color3 #fabd2f
color4 #83a598
color5 #d3869b
color6 #8ec07c
color7 #ebdbb2
color8 #665c54
color9 #ff3333
color10 #00ffaa
color11 #fe4450
color12 #03edf6
color13 #f92aad
color14 #5ef2f8
color15 #ffffff
"#,
        ),
        (
            "darcula_glow",
            r#"
# Darcula Glow - IDE classic backend dialed up into a bright wireframe grid
background #1c1c1c
foreground #a9b7c6
cursor #a9b7c6

color0 #1c1c1c
color1 #ff4d4d
color2 #a5e177
color3 #ffcc00
color4 #9876aa
color5 #cc7832
color6 #299999
color7 #a9b7c6
color8 #606060
color9 #ff6b68
color10 #bdfa8c
color11 #e0db42
color12 #b38fcc
color13 #e08846
color14 #3fb3b3
color15 #ffffff
"#,
        ),
        (
            "monokai_overdrive",
            r#"
# Monokai Overdrive - Liquid chemical dyes on absolute pitch-black
background #0a0a0a
foreground #f8f8f2
cursor #f8f8f2

color0 #0a0a0a
color1 #f92672
color2 #a6e22e
color3 #f4bf75
color4 #66d9ef
color5 #ae81ff
color6 #a1efe4
color7 #f8f8f2
color8 #49483e
color9 #ff0055
color10 #00ff00
color11 #ffea00
color12 #00bfff
color13 #de00fe
color14 #00ffff
color15 #ffffff
"#,
        ),
        (
            "toxic_waste",
            r#"
# Toxic Waste - Acid green dominant terminal with hazardous warning signs
background #0d0f0d
foreground #d0ffd0
cursor #d0ffd0

color0 #0d0f0d
color1 #ff2a2a
color2 #39ff14
color3 #ffff00
color4 #00e5ff
color5 #bd00ff
color6 #00ffaa
color7 #d0ffd0
color8 #253025
color9 #ff5555
color10 #69ff94
color11 #ffffa5
color12 #a4ffff
color13 #ff92df
color14 #a4ffff
color15 #ffffff
"#,
        ),
        (
            "tokyo_grid",
            r#"
# Tokyo Grid - Deep midnight-blue backplane illuminated by neon shinjuku signs
background #16161e
foreground #a9b1d6
cursor #a9b1d6

color0 #16161e
color1 #f7768e
color2 #9ece6a
color3 #e0af68
color4 #7aa2f7
color5 #bb9af7
color6 #7dcfff
color7 #a9b1d6
color8 #414868
color9 #ff4499
color10 #00ffaa
color11 #ffcc00
color12 #03edf6
color13 #f92aad
color14 #00ffff
color15 #ffffff
"#,
        ),
        (
            "vaporwave_85",
            r#"
# Vaporwave '85 - Soft pastel pink and cyan amplified into striking neon gradients
background #180a2b
foreground #e2dbec
cursor #e2dbec

color0 #180a2b
color1 #ff71ce
color2 #01cdfe
color3 #05ffa1
color4 #b967ff
color5 #fffb96
color6 #01cdfe
color7 #e2dbec
color8 #3d1e6d
color9 #ff9de2
color10 #5ef2f8
color11 #9effd7
color12 #d6acff
color13 #ffffcc
color14 #5ef2f8
color15 #ffffff
"#,
        ),
        (
            "solarized_glitch",
            r#"
# Solarized Glitch - Classic solarized structure but fried with toxic high-voltage contrast
background #002b36
foreground #eee8d5
cursor #eee8d5

color0 #002b36
color1 #dc322f
color2 #859900
color3 #b58900
color4 #268bd2
color5 #d33682
color6 #2aa198
color7 #eee8d5
color8 #073642
color9 #ff4444
color10 #00ff00
color11 #f3e600
color12 #00bfff
color13 #ff0055
color14 #00ffff
color15 #ffffff
"#,
        ),
        (
            "oblivion_core",
            r#"
# Oblivion Core - Dark stealth matte black base accented solely by hot magmas
background #050505
foreground #e0e0e0
cursor #e0e0e0

color0 #050505
color1 #ff3700
color2 #ff8800
color3 #ffd000
color4 #990000
color5 #ff0055
color6 #ffaa00
color7 #e0e0e0
color8 #221111
color9 #ff5533
color10 #ffa044
color11 #ffe066
color12 #cc0000
color13 #ff3377
color14 #ffbb33
color15 #ffffff
"#,
        ),
    ]
}
