// Cyberterm - Fully customizable terminal written in rust.
// The ultimate, scriptable, vintage-meets-modern terminal engine.

mod cli;
mod config;
mod tabs;
mod theme;
mod ui;

use alacritty_terminal::grid::Dimensions;
use alacritty_terminal::Term;
use theme::ThemeRegistry;
use winit::event::{ElementState, Event, WindowEvent};
use winit::event_loop::EventLoop;
use winit::window::WindowBuilder; // Pulled back in for winit 0.29

pub struct DevOptions {
    pub show_render_damage: bool,
}

pub struct MyRenderer;
impl MyRenderer {
    pub fn draw_colored_rect(&mut self, _x: f32, _y: f32, _w: f32, _h: f32, _color: [f32; 4]) {}
}

pub struct ThemeMenuState {
    pub is_open: bool,
    pub is_creating_mode: bool,
    pub theme_name_input: String,
    pub registry: ThemeRegistry,
}

// Simple structural container matching Alacritty's Dimensions trait for grid configuration
struct TermSize {
    cols: alacritty_terminal::index::Column,
    rows: alacritty_terminal::index::Line,
}

impl alacritty_terminal::grid::Dimensions for TermSize {
    fn total_lines(&self) -> usize {
        self.rows.0 as usize
    }
    fn screen_lines(&self) -> usize {
        self.rows.0 as usize
    }
    fn columns(&self) -> usize {
        self.cols.0
    }
}

fn main() {
    // 1. Initialize configuration tree directories on local filesystem
    let config_root = match config::initialize_cyberterm_directories() {
        Ok(path) => path,
        Err(e) => {
            eprintln!("CRITICAL: Failed to initialize configuration tree: {}", e);
            std::process::exit(1);
        }
    };

    // 2. Load the existing configuration file state or spin up defaults
    let current_config = match config::load_config(&config_root) {
        Ok(cfg) => cfg,
        Err(_) => {
            println!("⚙️  No existing configuration file found. Deploying fresh defaults.");
            crate::config::CyberConfig::default()
        }
    };

    // =========================================================================
    // STEP A: INTERCEPT CLI COMMANDS BEFORE THE GPU GRAPHICS WINDOW LOOPS UP
    // =========================================================================
    let raw_args: Vec<String> = std::env::args().collect();

    if let cli::CliAction::ExitCleanly =
        cli::handle_arguments(raw_args, &config_root, current_config)
    {
        std::process::exit(0);
    }
    // =========================================================================

    let themes_directory = config_root.join("themes");
    let theme_registry = ThemeRegistry::load_from_dir(&themes_directory);

    // 2. Initialize terminal engine dimensions (80 columns, 24 rows)
    let size = TermSize {
        cols: alacritty_terminal::index::Column(80),
        rows: alacritty_terminal::index::Line(24),
    };

    let event_proxy = alacritty_terminal::event::VoidListener;
    let mut engine = alacritty_terminal::Term::new(
        alacritty_terminal::term::Config::default(),
        &size,
        event_proxy,
    );

    let dev_options = DevOptions {
        show_render_damage: true,
    };
    let mut layout_renderer = MyRenderer;

    // =========================================================================
    // STEP B: INITIALIZE TAB MANAGER VARIABLE CONTEXT
    // =========================================================================
    let _tab_manager = tabs::TabContainer::new();
    // =========================================================================

    let mut theme_menu = ThemeMenuState {
        is_open: false,
        is_creating_mode: false,
        theme_name_input: String::new(),
        registry: theme_registry,
    };

    // 3. Fire up Winit window event pipeline
    let event_loop = EventLoop::new().unwrap();

    // Valid window initialization structure for winit 0.29.x
    let _window = WindowBuilder::new()
        .with_title("Cyberterm")
        .with_inner_size(winit::dpi::LogicalSize::new(800.0, 600.0))
        .build(&event_loop)
        .unwrap();

    let _ = event_loop.run(move |event, elwt| {
        match event {
            Event::WindowEvent {
                event: window_event,
                ..
            } => {
                match window_event {
                    WindowEvent::RedrawRequested => {
                        if theme_menu.is_open {
                            ui::theme_menu::draw(
                                &theme_menu.registry,
                                theme_menu.is_creating_mode,
                                &theme_menu.theme_name_input,
                            );
                        }
                        render_frame(&engine, &dev_options, &mut layout_renderer);
                    }

                    WindowEvent::KeyboardInput {
                        event: key_event, ..
                    } => {
                        if key_event.state == ElementState::Pressed {
                            // =========================================================================
                            // STEP C: TAB & SHORTCUT MANIFEST PROCESSING PLACEHOLDER
                            // =========================================================================
                            match key_event.logical_key {
                                winit::keyboard::Key::Named(winit::keyboard::NamedKey::Tab) => {
                                    // If modifiers match: tab_manager.cycle_next();
                                }
                                _ => {}
                            }
                            // =========================================================================

                            if theme_menu.is_open {
                                if theme_menu.is_creating_mode {
                                    // ---- Input Handling: Creation Mode ----
                                    match key_event.logical_key {
                                        winit::keyboard::Key::Named(
                                            winit::keyboard::NamedKey::Enter,
                                        ) => {
                                            if !theme_menu.theme_name_input.trim().is_empty() {
                                                if let Ok(new_file) =
                                                    ThemeRegistry::create_new_theme_template(
                                                        &themes_directory,
                                                        &theme_menu.theme_name_input,
                                                    )
                                                {
                                                    let editor = std::env::var("EDITOR")
                                                        .unwrap_or_else(|_| "nano".to_string());
                                                    std::process::Command::new(editor)
                                                        .arg(new_file)
                                                        .status()
                                                        .unwrap();

                                                    theme_menu.registry =
                                                        ThemeRegistry::load_from_dir(
                                                            &themes_directory,
                                                        );
                                                }
                                            }
                                            theme_menu.theme_name_input.clear();
                                            theme_menu.is_creating_mode = false;
                                        }
                                        winit::keyboard::Key::Named(
                                            winit::keyboard::NamedKey::Escape,
                                        ) => {
                                            theme_menu.is_creating_mode = false;
                                            theme_menu.theme_name_input.clear();
                                        }
                                        winit::keyboard::Key::Named(
                                            winit::keyboard::NamedKey::Backspace,
                                        ) => {
                                            theme_menu.theme_name_input.pop();
                                        }
                                        winit::keyboard::Key::Character(ref c) => {
                                            if theme_menu.theme_name_input.len() < 20 {
                                                theme_menu.theme_name_input.push_str(c);
                                            }
                                        }
                                        _ => {}
                                    }
                                } else {
                                    // ---- Input Handling: TUI Navigation Sidebar Mode ----
                                    match key_event.logical_key {
                                        winit::keyboard::Key::Named(
                                            winit::keyboard::NamedKey::ArrowDown,
                                        ) => {
                                            if !theme_menu.registry.themes.is_empty() {
                                                theme_menu.registry.selected_index =
                                                    (theme_menu.registry.selected_index + 1)
                                                        % theme_menu.registry.themes.len();

                                                let active_colors = theme_menu.registry.themes
                                                    [theme_menu.registry.selected_index]
                                                    .colors;
                                                apply_live_theme_preview(
                                                    &mut engine,
                                                    &active_colors,
                                                );
                                            }
                                        }
                                        winit::keyboard::Key::Named(
                                            winit::keyboard::NamedKey::ArrowUp,
                                        ) => {
                                            if !theme_menu.registry.themes.is_empty() {
                                                if theme_menu.registry.selected_index == 0 {
                                                    theme_menu.registry.selected_index =
                                                        theme_menu.registry.themes.len() - 1;
                                                } else {
                                                    theme_menu.registry.selected_index -= 1;
                                                }

                                                let active_colors = theme_menu.registry.themes
                                                    [theme_menu.registry.selected_index]
                                                    .colors;
                                                apply_live_theme_preview(
                                                    &mut engine,
                                                    &active_colors,
                                                );
                                            }
                                        }
                                        winit::keyboard::Key::Named(
                                            winit::keyboard::NamedKey::Enter,
                                        ) => {
                                            theme_menu.is_open = false;
                                        }
                                        winit::keyboard::Key::Named(
                                            winit::keyboard::NamedKey::Escape,
                                        ) => {
                                            theme_menu.is_open = false;
                                        }
                                        winit::keyboard::Key::Character(ref c)
                                            if c == "n" || c == "N" =>
                                        {
                                            theme_menu.is_creating_mode = true;
                                        }
                                        _ => {}
                                    }
                                }
                            }
                        }
                    }
                    WindowEvent::CloseRequested => elwt.exit(),
                    _ => {}
                }
            }
            _ => {}
        }
    });
}

pub fn apply_live_theme_preview<T: alacritty_terminal::event::EventListener>(
    _term: &mut alacritty_terminal::Term<T>,
    _hex_colors: &[u32; 16],
) {
}

fn render_frame<T: alacritty_terminal::event::EventListener>(
    engine: &Term<T>,
    dev_options: &DevOptions,
    layout_renderer: &mut MyRenderer,
) {
    let font_height = 16.0;
    let window_width = 800.0;

    let content = engine.renderable_content();
    for cell in content.display_iter {
        let _character = cell.cell.c;
        let _column = cell.point.column;
        let _row = cell.point.line;
        let _foreground = cell.cell.fg;
        let _background = cell.cell.bg;
    }

    if dev_options.show_render_damage {
        let num_lines = engine.grid().screen_lines();

        for row in 0..num_lines {
            let line_idx = alacritty_terminal::index::Line(row as i32);
            if engine.grid()[line_idx].is_clear() {
                let row_y_pos = row as f32 * font_height;
                layout_renderer.draw_colored_rect(
                    0.0,
                    row_y_pos,
                    window_width,
                    font_height,
                    [1.0, 0.0, 0.0, 0.2],
                );
            }
        }
    }
}
