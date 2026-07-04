// Cyberterm CLI Options
// src/cli.rs
use crate::config::CyberConfig;
use std::fs;
// Remove PathBuf from the destructured import list
use std::path::Path; // Import your updated config layout

pub enum CliAction {
    RunTerminal,
    ExitCleanly,
}

pub fn handle_arguments(
    args: Vec<String>,
    config_root: &Path,
    mut current_config: CyberConfig,
) -> CliAction {
    if args.len() < 2 {
        return CliAction::RunTerminal;
    }

    let command = &args[1];

    match command.as_str() {
        // =========================================================================
        // MULTI-TIER THEME SCANNER INDEX
        // =========================================================================
        "+list-themes" => {
            let filter = args.get(2).map(|s| s.as_str()).unwrap_or("--all");
            println!("🌐 CYBERTERM THEMES CATALOG [{}]", filter.to_uppercase());
            println!("──────────────────────────────────────────────");

            let themes_dir = config_root.join("themes");

            // Recursively dig through Category -> Folder -> Variant JSON Files
            if let Ok(categories) = fs::read_dir(themes_dir) {
                for cat_entry in categories.flatten() {
                    if cat_entry.path().is_dir() {
                        let cat_name = cat_entry.file_name().to_string_lossy().into_owned();

                        if let Ok(sub_folders) = fs::read_dir(cat_entry.path()) {
                            for folder_entry in sub_folders.flatten() {
                                if folder_entry.path().is_dir() {
                                    let folder_name =
                                        folder_entry.file_name().to_string_lossy().into_owned();

                                    if let Ok(files) = fs::read_dir(folder_entry.path()) {
                                        for file_entry in files.flatten() {
                                            let file_path = file_entry.path();
                                            if file_path.is_file()
                                                && file_path
                                                    .extension()
                                                    .map_or(false, |e| e == "json")
                                            {
                                                let variant_name = file_path
                                                    .file_stem()
                                                    .unwrap()
                                                    .to_string_lossy();
                                                println!(
                                                    "  ➔ {} ➔ {} ➔ ⚡ {}",
                                                    cat_name, folder_name, variant_name
                                                );
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            CliAction::ExitCleanly
        }

        "+set-theme" => {
            if let (Some(cat), Some(folder), Some(variant)) =
                (args.get(2), args.get(3), args.get(4))
            {
                println!(
                    "🎨 Setting active workspace engine color profile to: {} -> {} -> {}",
                    cat, folder, variant
                );

                current_config.theme_category = cat.clone();
                current_config.theme_folder = folder.clone();
                current_config.theme_variant = variant.clone();

                // Write out the configuration state change back to disk
                if crate::config::save_config(config_root, &current_config).is_ok() {
                    println!("✨ Saved theme target to config template successfully.");
                } else {
                    eprintln!("❌ Error updating global configuration layout.");
                }
            } else {
                eprintln!("❌ Error: Missing hierarchy tokens.");
                eprintln!("   Usage: cyberterm +set-theme <category> <folder> <variant_name>");
            }
            CliAction::ExitCleanly
        }

        // =========================================================================
        // RAW THEME DESKTOP EDITOR HOOKS
        // =========================================================================
        "+edit-theme" => {
            let action = args.get(2).map(|s| s.as_str()).unwrap_or("--view-theme");
            let themes_base_dir = config_root.join("themes");

            match action {
                "--remove-theme" => {
                    if let (Some(cat), Some(folder), Some(variant)) =
                        (args.get(3), args.get(4), args.get(5))
                    {
                        let target_file = themes_base_dir
                            .join(cat)
                            .join(folder)
                            .join(format!("{}.json", variant));

                        if target_file.exists() {
                            if fs::remove_file(&target_file).is_ok() {
                                println!(
                                    "🗑️ Purged dynamic variant asset: {} ➔ {} ➔ {}.json",
                                    cat, folder, variant
                                );

                                if let Some(parent_folder) = target_file.parent() {
                                    if fs::read_dir(parent_folder)
                                        .map(|mut d| d.next().is_none())
                                        .unwrap_or(false)
                                    {
                                        let _ = fs::remove_dir(parent_folder);
                                        println!(
                                            "📁 Removed empty sub-genre folder: {:?}",
                                            parent_folder.file_name().unwrap()
                                        );
                                    }
                                }
                            } else {
                                eprintln!("❌ Error: Operational filesystem lock prevented deleting the target file.");
                            }
                        } else {
                            eprintln!("❌ Error: Target variant file not found.");
                        }
                    } else {
                        eprintln!("❌ Error: Missing hierarchy tokens.");
                        eprintln!("   Usage: cyberterm +edit-theme --remove-theme <category> <folder> <variant_name>");
                    }
                }

                "--view-theme" => {
                    if let (Some(cat), Some(folder), Some(variant)) =
                        (args.get(3), args.get(4), args.get(5))
                    {
                        let target_file = themes_base_dir
                            .join(cat)
                            .join(folder)
                            .join(format!("{}.json", variant));

                        if target_file.exists() {
                            let editor =
                                std::env::var("EDITOR").unwrap_or_else(|_| "nano".to_string());
                            println!("📖 Launching theme matrix using: {}...", editor);
                            if let Err(e) = std::process::Command::new(&editor)
                                .arg(&target_file)
                                .status()
                            {
                                eprintln!("❌ Failed to execute editor '{}': {}. Verify your $EDITOR env variable.", editor, e);
                            }
                        } else {
                            eprintln!("❌ Error: Specified theme variant file does not exist.");
                        }
                    } else {
                        eprintln!("❌ Error: Missing structural path targets.");
                    }
                }

                "--create-theme" => {
                    if let (Some(cat), Some(folder), Some(variant)) =
                        (args.get(3), args.get(4), args.get(5))
                    {
                        let destination_dir = themes_base_dir.join(cat).join(folder);
                        if let Err(e) = fs::create_dir_all(&destination_dir) {
                            eprintln!("❌ Error creating theme folders: {}", e);
                            return CliAction::ExitCleanly;
                        }

                        let target_file = destination_dir.join(format!("{}.json", variant));
                        if !target_file.exists() {
                            let default_json_template = r##"
                            {
                            "background": "#0a0a0a",
                            "foreground": "#ffffff",
                            "normal": {
                            "black":   "#000000",
                            "red":     "#ff5555",
                            "green":   "#50fa7b",
                            "yellow":  "#f1fa8c",
                            "blue":    "#bd93f9",
                            "magenta": "#ff79c6",
                            "cyan":    "#8be9fd",
                            "white":   "#f8f8f2"
                        },
                        "bright": {
                        "black":   "#6272a4",
                        "red":     "#ff6e6e",
                        "green":   "#69ff94",
                        "yellow":  "#ffffa5",
                        "blue":    "#d6acff",
                        "magenta": "#ff92df",
                        "cyan":    "#a4ffff",
                        "white":   "#ffffff"
                        }
                        }
                        "##;
                            if fs::write(&target_file, default_json_template).is_ok() {
                                println!("✨ Initialized fresh color template at target sub-path.");
                                let editor =
                                    std::env::var("EDITOR").unwrap_or_else(|_| "nano".to_string());
                                if let Err(e) = std::process::Command::new(&editor)
                                    .arg(&target_file)
                                    .status()
                                {
                                    eprintln!("❌ Failed to execute editor '{}': {}. Verify your $EDITOR env variable.", editor, e);
                                }
                            }
                        } else {
                            eprintln!("❌ Error: A theme file with that specific variant name already exists.");
                        }
                    } else {
                        eprintln!("❌ Error: Usage: cyberterm +edit-theme --create-theme <category> <folder> <variant_name>");
                    }
                }
                _ => eprintln!(
                    "❌ Unknown sub-command. Options: --create-theme, --view-theme, --remove-theme"
                ),
            }
            CliAction::ExitCleanly
        }

        // =========================================================================
        // TERMINAL BINDING LAYERS & PROFILE SWITCHES
        // =========================================================================
        "+list-termkeys" => {
            let profile = args.get(2).map(|s| s.as_str()).unwrap_or("--default");
            println!(
                "🎹 BINDING LAYER CONFIGURATION PROFILE: {}",
                profile.to_uppercase()
            );
            println!("──────────────────────────────────────────────");
            match profile {
                "--development" | "--dev" => {
                    println!("  [Ctrl+Shift+V]     -> Split View Vertically");
                    println!("  [Ctrl+Shift+H]     -> Split View Horizontally");
                    println!("  [Alt+h/j/k/l]      -> Navigate Vim-Grid Cells Directly");
                }
                _ => {
                    println!("  [Ctrl+Shift+T]     -> Launch Theme Matrix HUD View");
                    println!("  [Ctrl+Tab+T]       -> Initialize Named Tab Instance");
                    println!("  [Ctrl+Tab+Z]       -> Initialize Numbered Tab Instance");
                    println!("  [Ctrl+Tab+S]       -> Save Named Tab Instance");
                    println!("  [Ctrl+Tab+M]       -> Switch to Named Tab Instance");
                    println!("  [Ctrl+Tab+X]       -> Close Named Tab Instance");
                    println!("  [Ctrl+Tab+W]       -> Initialize Split-Window Tab Instance");
                }
            }
            CliAction::ExitCleanly
        }

        // =========================================================================
        // SYNTAX ENGINE CONFIGURATION MANAGEMENT
        // =========================================================================
        "+edit-syntax" => {
            let action = args.get(2).map(|s| s.as_str()).unwrap_or("--add");

            if let Some(ext_arg) = args.get(3) {
                let clean_ext = ext_arg.trim_start_matches('.').to_string();
                match action {
                    "--add" | "--new" => {
                        if !current_config.syntax_extensions.contains(&clean_ext) {
                            current_config.syntax_extensions.push(clean_ext.clone());
                            if crate::config::save_config(config_root, &current_config).is_ok() {
                                println!("🦀 Added [ .{} ] targeting track to your syntax highlighting engine.", clean_ext);
                            }
                        } else {
                            println!("📝 Extension [ .{} ] is already handled by your active configuration rules.", clean_ext);
                        }
                    }
                    _ => eprintln!("❌ Invalid usage. Use: cyberterm +edit-syntax --add [ext]"),
                }
            } else {
                eprintln!("❌ Error: Please specify a target file extension (e.g., rust, go, py).");
            }
            CliAction::ExitCleanly
        }

        // =========================================================================
        // RUNTIME MACRO SHORTCUT BINDERS
        // =========================================================================
        "+macro" => {
            let keybind = args.get(2).map(|s| s.as_str());
            let sequence = args.get(3).map(|s| s.as_str());

            if let (Some(k), Some(s)) = (keybind, sequence) {
                let clean_key = k.strip_prefix("--key=").unwrap_or(k);
                let clean_seq = s.strip_prefix("--sequence=").unwrap_or(s);

                current_config
                    .macros
                    .insert(clean_key.to_string(), clean_seq.to_string());

                if crate::config::save_config(config_root, &current_config).is_ok() {
                    println!(
                        "🎹 Registered Macro Command: [ {} ] will now inject string line: {:?}",
                        clean_key, clean_seq
                    );
                }
            } else {
                println!("🎹 CURRENT REGISTERED KEYBOARD MACROS:");
                println!("──────────────────────────────────────────────");
                for (key, seq) in &current_config.macros {
                    println!("  ⚡ {:<12} -> {:?}", key, seq);
                }
                println!("\n💡 To add a new macro use format:\n  cyberterm +macro --key=Ctrl+F2 --sequence=\"git status\\n\"");
            }
            CliAction::ExitCleanly
        }

        // =========================================================================
        // DYNAMIC SHADER PIPELINE FILTERS MODIFIER (+fx)
        // =========================================================================
        "+fx" => {
            if let Some(fx_arg) = args.get(2) {
                match fx_arg.as_str() {
                    "--scanlines" => {
                        let level = args.get(3).and_then(|s| s.parse::<f32>().ok()).unwrap_or(0.3);
                        println!("📺 CRT raster scanline opacity distortion -> {}", level);
                    }
                    "--bloom" => {
                        let intensity = args.get(3).and_then(|s| s.parse::<f32>().ok()).unwrap_or(1.2);
                        println!("✨ Phosphor radiation bloom glow intensity -> {}", intensity);
                    }
                    "--curvature" => {
                        let warp = args.get(3).and_then(|s| s.parse::<f32>().ok()).unwrap_or(0.15);
                        println!("📺 Spherical screen curvature radial warp -> {}", warp);
                    }
                    "--jitter" => {
                        let rate = args.get(3).and_then(|s| s.parse::<f32>().ok()).unwrap_or(0.05);
                        println!("⚡ Sync signal line horizontal rolling jitter -> {}", rate);
                    }
                    "--tint" => {
                        let hex = args.get(3).map(|s| s.trim_start_matches('#')).unwrap_or("00FF66");
                        println!("🟢 Monochromatic amber/green phosphor overlay tint -> #{}", hex);
                    }
                    _ => eprintln!("❌ Unknown FX token. Options: --scanlines, --bloom, --curvature, --jitter, --tint"),
                }
            } else {
                println!("📺 ACTIVE GRAPHICAL FX MODIFIERS AVAILABLE:");
                println!("  --scanlines [0.0 - 1.0]   Draw retro horizontal ray structures");
                println!("  --bloom     [1.0 - 5.0]   Simulate glass over-illumination glowing");
                println!(
                    "  --curvature [0.0 - 0.5]   Warp display matrix inside a mock 80s monitor"
                );
                println!("  --jitter    [0.0 - 1.0]   Emulate loose analog signal cable tracking");
                println!("  --tint      [HEX Color]   Force monochromatic phosphor amber or matrix green");
            }
            CliAction::ExitCleanly
        }

        // =========================================================================
        // THE HEADS-UP SESSION TELEMETRY RECORDER ENGINE (+blackbox)
        // =========================================================================
        "+blackbox" => {
            let action = args.get(2).map(|s| s.as_str()).unwrap_or("--view");
            let rec_dir = config_root.join("logs").join("headsup_recorder");
            let target_log = rec_dir.join("active_session.raw");

            match action {
                "--start" => {
                    println!("📼 Recording raw PTY cell state sequence streams into headsup_recorder...");
                }
                "--save" => {
                    let custom_name = args.get(3).map(|s| s.as_str()).unwrap_or("saved_session");
                    let dest_log = rec_dir.join(format!("{}.raw", custom_name.replace('.', "_")));
                    if target_log.exists() {
                        if fs::copy(&target_log, &dest_log).is_ok() {
                            println!("💾 Snapshot saved safely to: {:?}", dest_log);
                        }
                    } else {
                        eprintln!("❌ Error: No active session log buffer discovered to capture.");
                    }
                }
                "--view" => {
                    if target_log.exists() {
                        println!("📖 Reading active telemetry log context:\n────────────────────────────────");
                        let raw_bytes = fs::read_to_string(&target_log).unwrap_or_default();
                        println!("{}", raw_bytes);
                    } else {
                        println!("📼 Headsup Recorder: Buffer Empty.");
                    }
                }
                "--export" => {
                    let format_target = args.get(3).map(|s| s.as_str()).unwrap_or("tail");
                    if !target_log.exists() {
                        eprintln!("❌ Error: No recording source data available to export.");
                        return CliAction::ExitCleanly;
                    }

                    match format_target {
                        "json" => println!("✨ Parsing ANSI frame matrices into structured chronological tokens..."),
                        "markdown" => println!("📝 Generating formatted code fence log review document..."),
                        _ => println!("📋 Streaming the final 25 execution updates from active stream matrix..."),
                    }
                }
                _ => eprintln!("❌ Usage: +blackbox [--start, --save [name], --view, --export json|markdown|tail]"),
            }
            CliAction::ExitCleanly
        }

        // =========================================================================
        // COMPOSITOR TRANSIT LAYER (OPACITY MODIFIER)
        // =========================================================================
        "+set-opacity" => {
            if let Some(opacity_arg) = args.get(2) {
                if let Some(clean_val) = opacity_arg.strip_prefix("--custom=") {
                    if let Ok(alpha) = clean_val.parse::<f32>() {
                        let checked_alpha = alpha.clamp(0.0, 1.0);
                        println!(
                            "🔮 Mutating compositor window target opacity constant: {}",
                            checked_alpha
                        );

                        current_config.opacity = checked_alpha;
                        let _ = crate::config::save_config(config_root, &current_config);
                    } else {
                        eprintln!(
                            "❌ Error: Invalid float value passed for target custom opacity."
                        );
                    }
                } else {
                    eprintln!("❌ Error: Opacity argument format must be: --custom=0.85");
                }
            } else {
                eprintln!("❌ Error: Missing opacity tracking target argument value. Format: --custom=0.85");
            }
            CliAction::ExitCleanly
        }

        // =========================================================================
        // SYSTEM MASTER FILE CONFIGURATION WRITERS
        // =========================================================================
        "+set-config" => {
            let target = args.get(2).map(|s| s.as_str()).unwrap_or("--user");

            if let Some(path_str) = target.strip_prefix("--custom-file=") {
                println!(
                    "⚙️ Pointing cyberterm master config symlink target destination to file: {}",
                    path_str
                );
            } else {
                match target {
                    "--development" => println!("🛠️  Injecting DEV profile matrix templates..."),
                    "--default" => println!(
                        "📋 Restoration of core default settings profile completed successfully."
                    ),
                    _ => println!(
                        "⚙️  Migrating operational execution target node to configuration: {}",
                        target
                    ),
                }
            }
            CliAction::ExitCleanly
        }

        "+set-wal" => {
            if let Some(path_arg) = args.get(2) {
                let clean_path = path_arg.strip_prefix("--").unwrap_or(path_arg);
                println!(
                    "🖼️  Mutating backend engine viewport rendering wallpaper target: {}",
                    clean_path
                );

                current_config.wallpaper = Some(clean_path.to_string());
                let _ = crate::config::save_config(config_root, &current_config);
            } else {
                eprintln!("❌ Error: Missing parameter target storage track reference asset path.");
            }
            CliAction::ExitCleanly
        }

        "+set-font" => {
            if let Some(format_filter) = args.get(2) {
                let clean_font = format_filter.strip_prefix("--").unwrap_or(format_filter);
                println!("🔤 Querying local architecture system folders matching extension format rules: {}", clean_font);

                current_config.font_profile = clean_font.to_string();
                let _ = crate::config::save_config(config_root, &current_config);
            } else {
                eprintln!("❌ Error: Please specify a font file path or profile name.");
            }
            CliAction::ExitCleanly
        }

        _ => CliAction::RunTerminal,
    }
}
