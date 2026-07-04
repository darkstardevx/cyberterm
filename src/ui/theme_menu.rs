// src/ui/theme_menu.rs
use crate::theme::ThemeRegistry;

/// Renders the complete standalone terminal-native theme configuration HUD
pub fn draw(registry: &ThemeRegistry, is_creating: bool, input_buffer: &str) {
    // Clear viewport and home the cursor position
    print!("\x1B[H\x1B[2J"); 
    
    println!("┌──────────────────────────────────────────────────────────────────────────────┐");
    println!("│ 🌐 CYBERTERM THEME CONTROL MATRIX v0.55                                     │");
    println!("├──────────────────────────────────────────────┬───────────────────────────────┤");

    // Guard against empty directory scans to prevent array indexing panics
    let active_theme = if !registry.themes.is_empty() {
        Some(&registry.themes[registry.selected_index])
    } else {
        None
    };

    let max_rows = 14;

    for i in 0..max_rows {
        // --- Left Sidebar: Theme List Matrix ---
        let mut left_col = "                                       ".to_string();
        
        if i < registry.themes.len() {
            let theme_item = &registry.themes[i];
            if i == registry.selected_index {
                // To keep the box border straight, format the string length FIRST, 
                // and then wrap the final text block in neon cyan ANSI variables.
                let padded_text = format!(" > {:<35}", theme_item.name);
                left_col = format!("\x1B[96m{}\x1B[0m", padded_text);
            } else {
                left_col = format!("   {:<35}", theme_item.name);
            }
        } else if i == registry.themes.len() && !is_creating {
            left_col = " [N] Create New Theme...               ".to_string();
        } else if is_creating && i == registry.themes.len() {
            // Apply high-voltage yellow color bytes outside the structural spacing loop
            let padded_input = format!(" Enter Name: {:<23}", input_buffer);
            left_col = format!("\x1B[93m{}\x1B[0m", padded_input);
        }

        // --- Right Pane: Live Contrast / Aesthetic Preview ---
        let right_col = match i {
            0  => "  LIVE PALETTE SYSTEM CHECK    ".to_string(),
            1  => "  ─────────────────────────    ".to_string(),
            3  => "  Normal: \x1B[30m█\x1B[31m█\x1B[32m█\x1B[33m█\x1B[34m█\x1B[35m█\x1B[36m█\x1B[37m█\x1B[0m      ".to_string(),
            4  => "  Bright: \x1B[90m█\x1B[91m█\x1B[92m█\x1B[93m█\x1B[94m█\x1B[95m█\x1B[96m█\x1B[97m█\x1B[0m      ".to_string(),
            6  => "  Active Color Tokens:         ".to_string(),
            7  => {
                if let Some(theme) = active_theme {
                    format!("  Base BG:  \x1B[38;2;{};{};{}m██████\x1B[0m (#{:06X})", 
                            (theme.colors[0] >> 16) & 0xFF, (theme.colors[0] >> 8) & 0xFF, theme.colors[0] & 0xFF, theme.colors[0])
                } else {
                    "  Base BG:  -- No Asset Data --".to_string()
                }
            }
            8  => {
                if let Some(theme) = active_theme {
                    format!("  Accent 1: \x1B[38;2;{};{};{}m██████\x1B[0m (#{:06X})", 
                            (theme.colors[1] >> 16) & 0xFF, (theme.colors[1] >> 8) & 0xFF, theme.colors[1] & 0xFF, theme.colors[1])
                } else {
                    "  Accent 1: -- No Asset Data --".to_string()
                }
            }
            9  => {
                if let Some(theme) = active_theme {
                    format!("  Accent 2: \x1B[38;2;{};{};{}m██████\x1B[0m (#{:06X})", 
                            (theme.colors[4] >> 16) & 0xFF, (theme.colors[4] >> 8) & 0xFF, theme.colors[4] & 0xFF, theme.colors[4])
                } else {
                    "  Accent 2: -- No Asset Data --".to_string()
                }
            }
            _  => "                               ".to_string(),
        };

        // Notice we changed "│{} │ {}│" to "│ {} │ {} │" to compensate for length calculation updates
        println!("│ {} │ {} │", left_col, right_col);
    }

    println!("├──────────────────────────────────────────────┴───────────────────────────────┤");
    println!("│ [▲/▼] Navigate  │ [Enter] Apply Profile  │ [N] New Theme  │ [Esc/Q] Exit UI │");
    println!("└──────────────────────────────────────────────────────────────────────────────┘");
}
