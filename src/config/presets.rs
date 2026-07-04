// src/config/presets.rs
use serde::{Serialize, Deserialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct CyberTheme {
    pub name: String,
    pub author: String,
    pub category: String, // "neon", "black_metal", "thrash_metal", "iterm2"
    
    // An array of 16 hex color strings (color0 to color15)
    pub colors: Vec<String>,
    
    // Explicit primary aesthetic options
    pub background: String,
    pub foreground: String,
    pub cursor: String,
}
