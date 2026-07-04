// src/tabs.rs
#![allow(dead_code)]

pub struct TerminalTab {
    pub id: u32,
    pub label: String,
    // Unique ID bound to a dedicated background PTY master process thread
    pub pty_session_id: usize,
}

pub struct TabContainer {
    pub tabs: Vec<TerminalTab>,
    pub active_tab_index: usize,
    next_tab_id: u32,
    next_pty_id: usize, // <-- Added separate counter to decouple from array sizes
}

impl TabContainer {
    pub fn new() -> Self {
        Self {
            tabs: vec![TerminalTab {
                id: 0,
                label: "Shell Primary".to_string(),
                pty_session_id: 0,
            }],
            active_tab_index: 0,
            next_tab_id: 1,
            next_pty_id: 1,
        }
    }

    pub fn spawn_named_tab(&mut self, chosen_name: String) {
        let label = if chosen_name.trim().is_empty() {
            format!("Tab [{}]", self.next_tab_id)
        } else {
            chosen_name
        };

        let new_tab = TerminalTab {
            id: self.next_tab_id,
            label,
            pty_session_id: self.next_pty_id, // <-- Safeguarded against vector sizing shifts
        };

        self.tabs.push(new_tab);
        self.active_tab_index = self.tabs.len() - 1;
        self.next_tab_id += 1;
        self.next_pty_id += 1;
    }

    pub fn close_current_tab(&mut self) {
        if self.tabs.len() <= 1 {
            return; // Maintain primary fallback execution ring channel
        }

        self.tabs.remove(self.active_tab_index);

        // Ensure index bounds are safe after shortening the vector
        if self.active_tab_index >= self.tabs.len() {
            self.active_tab_index = self.tabs.len() - 1;
        }
    }

    pub fn cycle_next(&mut self) {
        if !self.tabs.is_empty() {
            self.active_tab_index = (self.active_tab_index + 1) % self.tabs.len();
        }
    }
}
