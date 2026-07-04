// Cyberterm - Fully customizable terminal written in rust.
// The ultimate, scriptable, vintage-meets-modern terminal engine.

mod cli;
mod config;
mod tabs;
mod theme;
mod ui;

use alacritty_terminal::grid::Dimensions;
use alacritty_terminal::Term;
use std::path::PathBuf;
use std::sync::Arc;
use theme::ThemeRegistry;
use winit::application::ApplicationHandler;
use winit::event::{ElementState, WindowEvent};
use winit::event_loop::{ActiveEventLoop, ControlFlow, EventLoop};
use winit::window::{Window, WindowId};

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

struct RenderContext {
    window: Arc<Window>,
    surface: wgpu::Surface<'static>,
    device: wgpu::Device,
    queue: wgpu::Queue,
    config: wgpu::SurfaceConfiguration,
}

struct CybertermApp {
    render_state: Option<RenderContext>,
    engine: alacritty_terminal::Term<alacritty_terminal::event::VoidListener>,
    theme_menu: ThemeMenuState,
    layout_renderer: MyRenderer,
    dev_options: DevOptions,
    themes_directory: PathBuf,
    _tab_manager: tabs::TabContainer,
}

impl ApplicationHandler for CybertermApp {
    fn resumed(&mut self, event_loop: &ActiveEventLoop) {
        if self.render_state.is_none() {
            let window_attributes = Window::default_attributes()
                .with_title("Cyberterm")
                .with_inner_size(winit::dpi::LogicalSize::new(800.0, 600.0));

            let window = match event_loop.create_window(window_attributes) {
                Ok(w) => Arc::new(w),
                Err(e) => {
                    eprintln!("CRITICAL: Failed to create window: {}", e);
                    return;
                }
            };

            let size = window.inner_size();
            let instance = wgpu::Instance::default();
            let surface = instance.create_surface(window.clone()).unwrap();

            let adapter = futures::executor::block_on(instance.request_adapter(
                &wgpu::RequestAdapterOptions {
                    power_preference: wgpu::PowerPreference::HighPerformance,
                    compatible_surface: Some(&surface),
                    force_fallback_adapter: false,
                },
            ))
            .unwrap();

            let (device, queue) = futures::executor::block_on(adapter.request_device(
                &wgpu::DeviceDescriptor {
                    label: Some("Cyberterm GPU Device"),
                    required_features: wgpu::Features::empty(),
                    required_limits: wgpu::Limits::default(),
                    memory_hints: wgpu::MemoryHints::Performance,
                },
                None,
            ))
            .unwrap();

            let surface_caps = surface.get_capabilities(&adapter);
            let surface_format = surface_caps
                .formats
                .iter()
                .copied()
                .find(|f| f.is_srgb())
                .unwrap_or(surface_caps.formats[0]);

            let config = wgpu::SurfaceConfiguration {
                usage: wgpu::TextureUsages::RENDER_ATTACHMENT,
                format: surface_format,
                width: size.width.max(1),
                height: size.height.max(1),
                present_mode: wgpu::PresentMode::Fifo,
                alpha_mode: surface_caps.alpha_modes[0],
                view_formats: vec![],
                desired_maximum_frame_latency: 2,
            };

            surface.configure(&device, &config);

            self.render_state = Some(RenderContext {
                window,
                surface,
                device,
                queue,
                config,
            });
            println!("wgpu background hardware initialized successfully!");
        }
    }

    fn window_event(
        &mut self,
        event_loop: &ActiveEventLoop,
        _window_id: WindowId,
        event: WindowEvent,
    ) {
        let render_ctx = match &mut self.render_state {
            Some(ctx) => ctx,
            None => return,
        };

        match event {
            WindowEvent::CloseRequested => {
                println!("Exiting app smoothly.");
                event_loop.exit();
            }

            WindowEvent::Resized(new_size) => {
                if new_size.width > 0 && new_size.height > 0 {
                    render_ctx.config.width = new_size.width;
                    render_ctx.config.height = new_size.height;
                    render_ctx
                        .surface
                        .configure(&render_ctx.device, &render_ctx.config);
                    render_ctx.window.request_redraw();
                }
            }

            WindowEvent::RedrawRequested => {
                let frame = match render_ctx.surface.get_current_texture() {
                    Ok(texture) => texture,
                    Err(wgpu::SurfaceError::Timeout) => return,
                    Err(wgpu::SurfaceError::Outdated) => {
                        render_ctx
                            .surface
                            .configure(&render_ctx.device, &render_ctx.config);
                        return;
                    }
                    Err(e) => {
                        eprintln!("Pipeline Draw Warning: {:?}", e);
                        return;
                    }
                };

                let view = frame
                    .texture
                    .create_view(&wgpu::TextureViewDescriptor::default());
                let mut encoder =
                    render_ctx
                        .device
                        .create_command_encoder(&wgpu::CommandEncoderDescriptor {
                            label: Some("Primary Frame Encoder"),
                        });

                {
                    let _render_pass = encoder.begin_render_pass(&wgpu::RenderPassDescriptor {
                        label: Some("Clear Screen Pass"),
                        color_attachments: &[Some(wgpu::RenderPassColorAttachment {
                            view: &view,
                            resolve_target: None,
                            ops: wgpu::Operations {
                                load: wgpu::LoadOp::Clear(wgpu::Color {
                                    r: 0.05,
                                    g: 0.05,
                                    b: 0.07,
                                    a: 1.0,
                                }),
                                store: wgpu::StoreOp::Store,
                            },
                        })],
                        depth_stencil_attachment: None,
                        timestamp_writes: None,
                        occlusion_query_set: None,
                    });
                }

                render_ctx.queue.submit(std::iter::once(encoder.finish()));
                frame.present();

                if self.theme_menu.is_open {
                    ui::theme_menu::draw(
                        &self.theme_menu.registry,
                        self.theme_menu.is_creating_mode,
                        &self.theme_menu.theme_name_input,
                    );
                }

                render_frame(&self.engine, &self.dev_options, &mut self.layout_renderer);
            }

            WindowEvent::KeyboardInput {
                event: key_event, ..
            } => {
                if key_event.state == ElementState::Pressed {
                    match key_event.logical_key {
                        winit::keyboard::Key::Named(winit::keyboard::NamedKey::Tab) => {}
                        _ => {}
                    }

                    if self.theme_menu.is_open {
                        if self.theme_menu.is_creating_mode {
                            match key_event.logical_key {
                                winit::keyboard::Key::Named(winit::keyboard::NamedKey::Enter) => {
                                    if !self.theme_menu.theme_name_input.trim().is_empty() {
                                        if let Ok(new_file) =
                                            ThemeRegistry::create_new_theme_template(
                                                &self.themes_directory,
                                                &self.theme_menu.theme_name_input,
                                            )
                                        {
                                            let editor = std::env::var("EDITOR")
                                                .unwrap_or_else(|_| "nano".to_string());
                                            std::process::Command::new(editor)
                                                .arg(new_file)
                                                .status()
                                                .unwrap();

                                            self.theme_menu.registry = ThemeRegistry::load_from_dir(
                                                &self.themes_directory,
                                            );
                                        }
                                    }
                                    self.theme_menu.theme_name_input.clear();
                                    self.theme_menu.is_creating_mode = false;
                                }
                                winit::keyboard::Key::Named(winit::keyboard::NamedKey::Escape) => {
                                    self.theme_menu.is_creating_mode = false;
                                    self.theme_menu.theme_name_input.clear();
                                }
                                winit::keyboard::Key::Named(
                                    winit::keyboard::NamedKey::Backspace,
                                ) => {
                                    self.theme_menu.theme_name_input.pop();
                                }
                                winit::keyboard::Key::Character(ref c) => {
                                    if self.theme_menu.theme_name_input.len() < 20 {
                                        self.theme_menu.theme_name_input.push_str(c);
                                    }
                                }
                                _ => {}
                            }
                        } else {
                            match key_event.logical_key {
                                winit::keyboard::Key::Named(
                                    winit::keyboard::NamedKey::ArrowDown,
                                ) => {
                                    if !self.theme_menu.registry.themes.is_empty() {
                                        self.theme_menu.registry.selected_index =
                                            (self.theme_menu.registry.selected_index + 1)
                                                % self.theme_menu.registry.themes.len();

                                        let active_colors = &self.theme_menu.registry.themes
                                            [self.theme_menu.registry.selected_index]
                                            .colors;
                                        apply_live_theme_preview(&mut self.engine, active_colors);
                                    }
                                }
                                winit::keyboard::Key::Named(winit::keyboard::NamedKey::ArrowUp) => {
                                    if !self.theme_menu.registry.themes.is_empty() {
                                        if self.theme_menu.registry.selected_index == 0 {
                                            self.theme_menu.registry.selected_index =
                                                self.theme_menu.registry.themes.len() - 1;
                                        } else {
                                            self.theme_menu.registry.selected_index -= 1;
                                        }
                                        let active_colors = &self.theme_menu.registry.themes
                                            [self.theme_menu.registry.selected_index]
                                            .colors;
                                        apply_live_theme_preview(&mut self.engine, active_colors);
                                    }
                                }
                                _ => {}
                            }
                        }
                    }
                }
            }
            _ => {}
        }
    }
}

// These unique stubs match your exact types and are defined only once
fn render_frame(
    _engine: &Term<alacritty_terminal::event::VoidListener>,
    _opts: &DevOptions,
    _renderer: &mut MyRenderer,
) {
}
fn apply_live_theme_preview(
    _engine: &mut Term<alacritty_terminal::event::VoidListener>,
    _colors: &[u32; 16],
) {
}

fn main() {
    let event_loop = EventLoop::new().unwrap();
    event_loop.set_control_flow(ControlFlow::Poll);

    // 1. Initialize configuration folder tree and build template themes if missing
    let themes_dir = match config::initialize_cyberterm_directories() {
        Ok(base_path) => base_path.join("themes"),
        Err(e) => {
            eprintln!(
                "Initialization Warning: Could not verify data paths ({})",
                e
            );
            PathBuf::from("themes")
        }
    };

    let config_root = themes_dir.parent().unwrap_or(&themes_dir);

    // 2. Load user configurations from disk first, falling back gracefully to defaults
    let cyber_config =
        config::load_config(config_root).unwrap_or_else(|_| config::CyberConfig::default());

    // 3. Gather environment arguments and pass them cleanly into your CLI handler
    let sys_args: Vec<String> = std::env::args().collect();
    let _cli_args = cli::handle_arguments(sys_args, config_root, cyber_config);

    // 4. Instantiate terminal environment with verified dependencies
    let size = TermSize {
        cols: alacritty_terminal::index::Column(80),
        rows: alacritty_terminal::index::Line(24),
    };
    let engine = Term::new(
        Default::default(),
        &size,
        alacritty_terminal::event::VoidListener,
    );

    let mut app = CybertermApp {
        render_state: None,
        engine,
        theme_menu: ThemeMenuState {
            is_open: false,
            is_creating_mode: false,
            theme_name_input: String::new(),
            registry: ThemeRegistry::load_from_dir(&themes_dir),
        },
        layout_renderer: MyRenderer,
        dev_options: DevOptions {
            show_render_damage: false,
        },
        themes_directory: themes_dir,
        _tab_manager: tabs::TabContainer::new(),
    };

    let _ = event_loop.run_app(&mut app);
}
