// src/renderer.rs
//
// Real GPU text rendering for the terminal grid, via glyphon (cosmic-text +
// etagere + a wgpu render pipeline) for glyphs, plus a small hand-rolled
// solid-quad wgpu pipeline for cell backgrounds -- glyphon only rasterizes
// glyphs, it doesn't fill cell backgrounds, and per-cell background color is
// part of "real ANSI color support" (a highlighted `ls --color` entry, a
// selection, etc. all rely on it).
//
// This module knows nothing about alacritty_terminal -- it consumes a plain
// `RenderCell` grid, so it stays testable/reusable independent of the
// terminal engine's own types.

use glyphon::{
    Attrs, Buffer, Cache, Color as GlyphonColor, Family, FontSystem, Metrics, Resolution, Shaping,
    SwashCache, TextArea, TextAtlas, TextBounds, TextRenderer, Viewport,
};
use wgpu::util::DeviceExt;

/// The output surface + clear color for one `TermRenderer::render` call,
/// grouped so the render function doesn't take a pile of loose parameters.
pub struct FrameTarget<'a> {
    pub view: &'a wgpu::TextureView,
    pub width_px: u32,
    pub height_px: u32,
    pub clear_color: wgpu::Color,
    /// Alpha to write for cell background quads (window opacity, 0-1).
    /// Text glyphs are always drawn fully opaque -- only backgrounds fade,
    /// matching how Ghostty/Kitty/Alacritty do window transparency.
    pub background_alpha: f32,
    /// True when the surface's chosen `CompositeAlphaMode` is
    /// `PreMultiplied`, in which case RGB must be pre-multiplied by alpha
    /// before writing -- `PostMultiplied`/`Opaque` expect straight alpha.
    pub premultiply: bool,
}

#[derive(Clone, Copy, Debug)]
pub struct RenderCell {
    pub ch: char,
    pub fg: [u8; 3],
    pub bg: [u8; 3],
}

impl Default for RenderCell {
    fn default() -> Self {
        Self {
            ch: ' ',
            fg: [0xff, 0xff, 0xff],
            bg: [0, 0, 0],
        }
    }
}

const QUAD_SHADER: &str = r#"
struct Uniforms {
    screen_size: vec2<f32>,
    _pad: vec2<f32>,
};
@group(0) @binding(0) var<uniform> u: Uniforms;

struct InstanceInput {
    @location(0) rect: vec4<f32>,
    @location(1) color: vec4<f32>,
};

struct VertexOutput {
    @builtin(position) clip_position: vec4<f32>,
    @location(0) color: vec4<f32>,
};

@vertex
fn vs_main(@builtin(vertex_index) vertex_index: u32, instance: InstanceInput) -> VertexOutput {
    var corners = array<vec2<f32>, 6>(
        vec2<f32>(0.0, 0.0), vec2<f32>(1.0, 0.0), vec2<f32>(0.0, 1.0),
        vec2<f32>(1.0, 0.0), vec2<f32>(1.0, 1.0), vec2<f32>(0.0, 1.0),
    );
    let corner = corners[vertex_index];
    let px = instance.rect.x + corner.x * instance.rect.z;
    let py = instance.rect.y + corner.y * instance.rect.w;
    let ndc_x = (px / u.screen_size.x) * 2.0 - 1.0;
    let ndc_y = 1.0 - (py / u.screen_size.y) * 2.0;

    var out: VertexOutput;
    out.clip_position = vec4<f32>(ndc_x, ndc_y, 0.0, 1.0);
    out.color = instance.color;
    return out;
}

@fragment
fn fs_main(in: VertexOutput) -> @location(0) vec4<f32> {
    return in.color;
}
"#;

pub struct TermRenderer {
    font_system: FontSystem,
    swash_cache: SwashCache,
    _cache: Cache,
    viewport: Viewport,
    atlas: TextAtlas,
    text_renderer: TextRenderer,
    text_buffer: Buffer,

    cell_width: f32,
    cell_height: f32,

    quad_pipeline: wgpu::RenderPipeline,
    quad_bind_group_layout: wgpu::BindGroupLayout,
    quad_uniform_buffer: wgpu::Buffer,
    quad_bind_group: wgpu::BindGroup,
}

impl TermRenderer {
    pub fn new(device: &wgpu::Device, queue: &wgpu::Queue, format: wgpu::TextureFormat) -> Self {
        let mut font_system = load_minimal_font_system();

        let swash_cache = SwashCache::new();
        let cache = Cache::new(device);
        let viewport = Viewport::new(device, &cache);
        let mut atlas = TextAtlas::new(device, queue, &cache, format);
        let text_renderer =
            TextRenderer::new(&mut atlas, device, wgpu::MultisampleState::default(), None);

        // Matches the user's own Ghostty config (`font-size = 9`).
        let font_size = 9.0;
        let line_height = font_size * 1.25;
        let metrics = Metrics::new(font_size, line_height);
        let text_buffer = Buffer::new(&mut font_system, metrics);

        let (cell_width, cell_height) = measure_monospace_cell(&mut font_system, metrics);

        // --- Solid-quad pipeline for cell backgrounds ---
        let shader = device.create_shader_module(wgpu::ShaderModuleDescriptor {
            label: Some("cyberterm cell background shader"),
            source: wgpu::ShaderSource::Wgsl(QUAD_SHADER.into()),
        });

        let quad_bind_group_layout =
            device.create_bind_group_layout(&wgpu::BindGroupLayoutDescriptor {
                label: Some("cyberterm cell bg bind group layout"),
                entries: &[wgpu::BindGroupLayoutEntry {
                    binding: 0,
                    visibility: wgpu::ShaderStages::VERTEX,
                    ty: wgpu::BindingType::Buffer {
                        ty: wgpu::BufferBindingType::Uniform,
                        has_dynamic_offset: false,
                        min_binding_size: None,
                    },
                    count: None,
                }],
            });

        let quad_uniform_buffer = device.create_buffer(&wgpu::BufferDescriptor {
            label: Some("cyberterm cell bg uniforms"),
            size: 16,
            usage: wgpu::BufferUsages::UNIFORM | wgpu::BufferUsages::COPY_DST,
            mapped_at_creation: false,
        });

        let quad_bind_group = device.create_bind_group(&wgpu::BindGroupDescriptor {
            label: Some("cyberterm cell bg bind group"),
            layout: &quad_bind_group_layout,
            entries: &[wgpu::BindGroupEntry {
                binding: 0,
                resource: quad_uniform_buffer.as_entire_binding(),
            }],
        });

        let quad_pipeline_layout = device.create_pipeline_layout(&wgpu::PipelineLayoutDescriptor {
            label: Some("cyberterm cell bg pipeline layout"),
            bind_group_layouts: &[&quad_bind_group_layout],
            push_constant_ranges: &[],
        });

        let quad_pipeline = device.create_render_pipeline(&wgpu::RenderPipelineDescriptor {
            label: Some("cyberterm cell bg pipeline"),
            layout: Some(&quad_pipeline_layout),
            vertex: wgpu::VertexState {
                module: &shader,
                entry_point: Some("vs_main"),
                compilation_options: Default::default(),
                buffers: &[wgpu::VertexBufferLayout {
                    array_stride: 32,
                    step_mode: wgpu::VertexStepMode::Instance,
                    attributes: &[
                        wgpu::VertexAttribute {
                            format: wgpu::VertexFormat::Float32x4,
                            offset: 0,
                            shader_location: 0,
                        },
                        wgpu::VertexAttribute {
                            format: wgpu::VertexFormat::Float32x4,
                            offset: 16,
                            shader_location: 1,
                        },
                    ],
                }],
            },
            fragment: Some(wgpu::FragmentState {
                module: &shader,
                entry_point: Some("fs_main"),
                compilation_options: Default::default(),
                targets: &[Some(wgpu::ColorTargetState {
                    format,
                    blend: Some(wgpu::BlendState::ALPHA_BLENDING),
                    write_mask: wgpu::ColorWrites::ALL,
                })],
            }),
            primitive: wgpu::PrimitiveState::default(),
            depth_stencil: None,
            multisample: wgpu::MultisampleState::default(),
            multiview: None,
            cache: None,
        });

        Self {
            font_system,
            swash_cache,
            _cache: cache,
            viewport,
            atlas,
            text_renderer,
            text_buffer,
            cell_width,
            cell_height,
            quad_pipeline,
            quad_bind_group_layout,
            quad_uniform_buffer,
            quad_bind_group,
        }
    }

    pub fn cell_size(&self) -> (f32, f32) {
        (self.cell_width, self.cell_height)
    }

    /// How many full columns/rows of cells fit in a surface of this pixel size.
    pub fn grid_size(&self, width_px: u32, height_px: u32) -> (usize, usize) {
        let cols = (width_px as f32 / self.cell_width).floor().max(1.0) as usize;
        let rows = (height_px as f32 / self.cell_height).floor().max(1.0) as usize;
        (cols, rows)
    }

    /// Renders one full grid of cells (background quads, then glyph text) into
    /// the given view, using the given command encoder. Call inside an active
    /// frame, before `queue.submit`/`present`.
    pub fn render(
        &mut self,
        device: &wgpu::Device,
        queue: &wgpu::Queue,
        encoder: &mut wgpu::CommandEncoder,
        target: FrameTarget<'_>,
        rows: &[Vec<RenderCell>],
    ) {
        let FrameTarget {
            view,
            width_px,
            height_px,
            clear_color,
            background_alpha,
            premultiply,
        } = target;

        queue.write_buffer(
            &self.quad_uniform_buffer,
            0,
            &pack_f32s(&[width_px as f32, height_px as f32, 0.0, 0.0]),
        );

        // --- Background quads: one instance per contiguous same-color run ---
        let mut quad_data: Vec<u8> = Vec::new();
        let mut quad_count = 0u32;
        for (row_idx, row) in rows.iter().enumerate() {
            let y = row_idx as f32 * self.cell_height;
            let mut col = 0usize;
            while col < row.len() {
                let color = row[col].bg;
                let start = col;
                while col < row.len() && row[col].bg == color {
                    col += 1;
                }
                let x = start as f32 * self.cell_width;
                let w = (col - start) as f32 * self.cell_width;
                quad_data.extend_from_slice(&pack_f32s(&[x, y, w, self.cell_height]));

                let mul = if premultiply { background_alpha } else { 1.0 };
                quad_data.extend_from_slice(&pack_f32s(&[
                    color[0] as f32 / 255.0 * mul,
                    color[1] as f32 / 255.0 * mul,
                    color[2] as f32 / 255.0 * mul,
                    background_alpha,
                ]));
                quad_count += 1;
            }
        }

        let quad_buffer = (!quad_data.is_empty()).then(|| {
            device.create_buffer_init(&wgpu::util::BufferInitDescriptor {
                label: Some("cyberterm cell bg instances"),
                contents: &quad_data,
                usage: wgpu::BufferUsages::VERTEX,
            })
        });

        // --- Text: one rich-text span run per contiguous same-fg-color range ---
        let mut spans: Vec<(String, [u8; 3])> = Vec::new();
        for row in rows {
            let mut col = 0usize;
            while col < row.len() {
                let color = row[col].fg;
                let mut text = String::new();
                while col < row.len() && row[col].fg == color {
                    text.push(row[col].ch);
                    col += 1;
                }
                spans.push((text, color));
            }
            spans.push(("\n".to_string(), [0, 0, 0]));
        }

        let attrs_spans: Vec<(&str, Attrs)> = spans
            .iter()
            .map(|(text, color)| {
                let attrs = Attrs::new()
                    .family(Family::Monospace)
                    .color(GlyphonColor::rgb(color[0], color[1], color[2]));
                (text.as_str(), attrs)
            })
            .collect();

        self.text_buffer.set_size(
            &mut self.font_system,
            Some(width_px as f32),
            Some(height_px as f32),
        );
        self.text_buffer.set_rich_text(
            &mut self.font_system,
            attrs_spans,
            Attrs::new().family(Family::Monospace),
            Shaping::Advanced,
        );
        self.text_buffer
            .shape_until_scroll(&mut self.font_system, false);

        self.viewport.update(
            queue,
            Resolution {
                width: width_px,
                height: height_px,
            },
        );

        self.text_renderer
            .prepare(
                device,
                queue,
                &mut self.font_system,
                &mut self.atlas,
                &self.viewport,
                [TextArea {
                    buffer: &self.text_buffer,
                    left: 0.0,
                    top: 0.0,
                    scale: 1.0,
                    bounds: TextBounds {
                        left: 0,
                        top: 0,
                        right: width_px as i32,
                        bottom: height_px as i32,
                    },
                    default_color: GlyphonColor::rgb(255, 255, 255),
                    custom_glyphs: &[],
                }],
                &mut self.swash_cache,
            )
            .unwrap();

        {
            let mut pass = encoder.begin_render_pass(&wgpu::RenderPassDescriptor {
                label: Some("cyberterm frame pass"),
                color_attachments: &[Some(wgpu::RenderPassColorAttachment {
                    view,
                    resolve_target: None,
                    ops: wgpu::Operations {
                        load: wgpu::LoadOp::Clear(clear_color),
                        store: wgpu::StoreOp::Store,
                    },
                })],
                depth_stencil_attachment: None,
                timestamp_writes: None,
                occlusion_query_set: None,
            });

            if let Some(buf) = &quad_buffer {
                pass.set_pipeline(&self.quad_pipeline);
                pass.set_bind_group(0, &self.quad_bind_group, &[]);
                pass.set_vertex_buffer(0, buf.slice(..));
                pass.draw(0..6, 0..quad_count);
            }

            self.text_renderer
                .render(&self.atlas, &self.viewport, &mut pass)
                .unwrap();
        }

        self.atlas.trim();
        let _ = &self.quad_bind_group_layout; // kept alive alongside the pipeline it describes
    }
}

/// Builds a `FontSystem` around a *minimal* font database (just the one
/// monospace font this terminal actually renders with) instead of
/// `FontSystem::new()`'s default full system font scan.
///
/// `FontSystem::new()` parses metadata for every installed font file to
/// support fallback -- cosmic-text's own docs note this "can take up to a
/// second" on a release build. On a box with an unusually large font corpus
/// (~10,000 files between `/usr/share/fonts` and `~/.fonts` here), that
/// scan alone took several seconds, the dominant cost of a startup delay
/// easily mistaken for a hang. A single `fc-match` call resolves the actual
/// font file via fontconfig's own cache (~150ms flat, independent of how
/// many fonts are installed) instead.
fn load_minimal_font_system() -> FontSystem {
    // The Nerd Font variant, not plain "JetBrains Mono" -- shell prompts
    // (starship, etc.) commonly use Nerd Font private-use-area glyphs for
    // OS/git/language icons. Loading only the plain font renders those as
    // empty tofu boxes even though everything else (directory, branch name,
    // real text) is correctly styled -- it looks like the prompt is broken
    // when it's actually just missing icon glyphs.
    const FONT_FAMILY: &str = "JetBrainsMono Nerd Font";
    // A per-font Nerd Font patch can still be missing icons a given prompt
    // config uses (patch sets vary by version/glyph set). "Symbols Nerd
    // Font Mono" is the dedicated icon-only glyph superset the Nerd Fonts
    // project ships specifically as a fallback source for exactly this --
    // it's what kitty itself references (/usr/lib/kitty/fonts/) for the
    // same reason. Loading it as a second font lets cosmic-text's
    // `Shaping::Advanced` fallback (see `shape.rs`'s `FontFallbackIter`)
    // pick up any icon glyph the primary font's patch doesn't have.
    const SYMBOLS_FALLBACK_FAMILY: &str = "Symbols Nerd Font Mono";
    // Real color emoji (git_status icons like untracked/stashed/deleted in
    // this user's starship config use actual emoji codepoints, not Nerd
    // Font glyphs) -- glyphon 0.8 has a dedicated color glyph atlas
    // (`text_atlas.rs`'s `ContentType::Color`) specifically for this, and
    // swash rasterizes Noto Color Emoji's bitmap glyphs correctly (verified
    // directly: a real RGBA image comes back, not a failure).
    const EMOJI_FALLBACK_FAMILY: &str = "Noto Color Emoji";

    let mut db = glyphon::fontdb::Database::new();
    db.set_monospace_family(FONT_FAMILY);

    for family in [FONT_FAMILY, SYMBOLS_FALLBACK_FAMILY, EMOJI_FALLBACK_FAMILY] {
        if let Some(path) = resolve_font_path(family) {
            let _ = db.load_font_file(&path);
        }
    }

    if db.faces().next().is_none() {
        // `fc-match` missing or found nothing usable -- fall back to the
        // full, slower system scan rather than rendering with zero fonts.
        return FontSystem::new();
    }

    FontSystem::new_with_locale_and_db("en-US".to_string(), db)
}

/// Resolves a font family name to its actual file path via `fc-match`
/// (fontconfig's own CLI, present on virtually every Linux desktop),
/// without touching cosmic-text/fontdb's own full-corpus scan.
fn resolve_font_path(family: &str) -> Option<std::path::PathBuf> {
    let output = std::process::Command::new("fc-match")
        .args(["-f", "%{file}", family])
        .output()
        .ok()?;
    if !output.status.success() {
        return None;
    }
    let path = String::from_utf8(output.stdout).ok()?;
    let path = path.trim();
    (!path.is_empty()).then(|| std::path::PathBuf::from(path))
}

/// Shapes a single "M" glyph in the given metrics/monospace family to read
/// its real advance width off the font, instead of guessing an aspect-ratio
/// constant -- this is what makes column alignment correct for whatever
/// monospace font is actually installed (JetBrains Mono here).
fn measure_monospace_cell(font_system: &mut FontSystem, metrics: Metrics) -> (f32, f32) {
    let mut probe = Buffer::new(font_system, metrics);
    probe.set_size(font_system, Some(1000.0), Some(1000.0));
    probe.set_text(
        font_system,
        "M",
        Attrs::new().family(Family::Monospace),
        Shaping::Advanced,
    );
    probe.shape_until_scroll(font_system, false);

    let width = probe
        .layout_runs()
        .next()
        .and_then(|run| run.glyphs.first())
        .map(|glyph| glyph.w)
        .unwrap_or(metrics.font_size * 0.6);

    (width, metrics.line_height)
}

/// Packs an f32 slice into little-endian bytes for a GPU buffer write,
/// without pulling in `bytemuck` as a dependency for a handful of floats.
fn pack_f32s(values: &[f32]) -> Vec<u8> {
    values.iter().flat_map(|v| v.to_le_bytes()).collect()
}
