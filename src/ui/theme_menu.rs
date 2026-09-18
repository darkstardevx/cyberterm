// src/ui/theme_menu.rs
use crate::theme::ThemeRegistry;

/// One colored run of text within a menu line.
pub struct Span {
    pub text: String,
    pub color: [u8; 3],
}

impl Span {
    fn new(text: impl Into<String>, color: [u8; 3]) -> Self {
        Self {
            text: text.into(),
            color,
        }
    }
}

const TEXT: [u8; 3] = [0xc0, 0xc8, 0xd8];
const DIM: [u8; 3] = [0x60, 0x68, 0x78];
const ACCENT: [u8; 3] = [0x30, 0xf0, 0xf0];
const INPUT: [u8; 3] = [0xf0, 0xd0, 0x30];

fn hex_to_rgb(color: u32) -> [u8; 3] {
    [
        ((color >> 16) & 0xFF) as u8,
        ((color >> 8) & 0xFF) as u8,
        (color & 0xFF) as u8,
    ]
}

/// Builds the theme picker HUD as plain structured lines (span lists), each
/// with its own color -- rendered by `renderer::TermRenderer` as a GPU text
/// overlay instead of the old direct-to-stdout `println!` calls, which were
/// invisible in a GUI app with no attached visible stdout terminal.
pub fn build_lines(
    registry: &ThemeRegistry,
    is_creating: bool,
    input_buffer: &str,
) -> Vec<Vec<Span>> {
    let mut lines = Vec::new();

    lines.push(vec![Span::new("CYBERTERM THEME CONTROL MATRIX", ACCENT)]);
    lines.push(vec![Span::new("", TEXT)]);

    let active_theme = if !registry.themes.is_empty() {
        Some(&registry.themes[registry.selected_index])
    } else {
        None
    };

    for i in 0..registry.themes.len() {
        let theme_item = &registry.themes[i];
        if i == registry.selected_index {
            lines.push(vec![Span::new(format!("> {}", theme_item.name), ACCENT)]);
        } else {
            lines.push(vec![Span::new(format!("  {}", theme_item.name), TEXT)]);
        }
    }

    if is_creating {
        lines.push(vec![
            Span::new("Enter Name: ", TEXT),
            Span::new(input_buffer.to_string(), INPUT),
        ]);
    } else {
        lines.push(vec![Span::new("[N] Create New Theme...", DIM)]);
    }

    lines.push(vec![Span::new("", TEXT)]);
    lines.push(vec![Span::new("Live Palette Preview", DIM)]);

    if let Some(theme) = active_theme {
        let mut normal_row = vec![Span::new("Normal: ", TEXT)];
        for &c in &theme.colors[0..8] {
            normal_row.push(Span::new("\u{2588}", hex_to_rgb(c)));
        }
        lines.push(normal_row);

        let mut bright_row = vec![Span::new("Bright: ", TEXT)];
        for &c in &theme.colors[8..16] {
            bright_row.push(Span::new("\u{2588}", hex_to_rgb(c)));
        }
        lines.push(bright_row);
    } else {
        lines.push(vec![Span::new("-- No theme data --", DIM)]);
    }

    lines.push(vec![Span::new("", TEXT)]);
    lines.push(vec![Span::new(
        "[UP/DOWN] Navigate   [Enter] Apply   [N] New   [Esc] Close",
        DIM,
    )]);

    lines
}
