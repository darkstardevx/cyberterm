// src/clipboard.rs
//
// Moved from the now-deleted pty_engine crate -- this logic was already
// real and correct, it just lived in a crate that was never wired into
// the build (empty Cargo.toml, never referenced as a dependency).

use arboard::Clipboard;
use std::collections::HashMap;

pub struct ClipboardManager {
    ctx: Clipboard,
    // Maps a raw terminal character to its preferred clean clipboard string
    codepoint_map: HashMap<char, String>,
}

impl ClipboardManager {
    /// `None` when no clipboard backend is available (e.g. a display
    /// session without clipboard support) -- callers should treat that as
    /// "clipboard operations are silently unavailable," not a fatal error,
    /// since a terminal is otherwise fully usable without one.
    pub fn try_new() -> Option<Self> {
        let mut map = HashMap::new();
        // Mimic Ghostty's clean translation presets
        map.insert('─', "-".to_string());
        map.insert('│', "|".to_string());
        map.insert('┌', "+".to_string());
        map.insert('┐', "+".to_string());

        Some(Self {
            ctx: Clipboard::new().ok()?,
            codepoint_map: map,
        })
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
