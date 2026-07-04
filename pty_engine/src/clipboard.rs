use std::collections::HashMap;
use arboard::Clipboard;

pub struct ClipboardManager {
    ctx: Clipboard,
    // Maps a raw terminal character to its preferred clean clipboard string
    codepoint_map: HashMap<char, String>,
}

impl ClipboardManager {
    pub fn new() -> Self {
        let mut map = HashMap::new();
        // Mimic Ghostty's clean translation presets
        map.insert('─', "-".to_string());
        map.insert('│', "|".to_string());
        map.insert('┌', "+".to_string());
        map.insert('┐', "+".to_string());
        
        Self {
            ctx: Clipboard::new().unwrap(),
            codepoint_map: map,
        }
    }

    pub fn copy_clean_string(&mut self, terminal_selection: &str) {
        let mut processed_output = String::with_capacity(terminal_selection.len());
        
        for c in terminal_selection.chars() {
            if let Some(replacement) = self.codepoint_map.get(&c) {
                processed_output.push_str(replacement);
            } else {
                processed_output.push(c);
            }
        }
        
        // Push the sanitized result straight to the OS clipboard
        let _ = self.ctx.set_text(processed_output);
    }
}
