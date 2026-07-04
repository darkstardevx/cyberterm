# Theme Matrix Queries
cyberterm +list-themes --dark
cyberterm +set-theme --neon-glitch

# Keyboard & Key-binding Configuration Modifiers
cyberterm +list-termkeys --development

# Transparency & Alpha Compositor Settings
cyberterm +set-opacity --custom=0.85

# Master Environment Config Injectors
cyberterm +set-config --default
cyberterm +set-config --development
cyberterm +set-config --custom-file=/home/user/.config/cyberterm/dev_workspace.toml

# Asset Viewport Anchors
cyberterm +set-wal --/home/user/pictures/cyberpunk_grid.png

# Create a fresh custom theme file template and open it immediately
cyberterm +edit-theme --create-theme laser_grid

# Open an existing theme file directly in your system's default editor ($EDITOR)
cyberterm +edit-theme --view-theme cyberpunk-neon-dark

# Add support for styling new file formats on the fly
cyberterm +edit-syntax --add lua

# List all current automated key injection sequences
cyberterm +macro

# Bind a shortcut to quickly clear your screen or execute specific workflows
cyberterm +macro --key=Ctrl+F2 --sequence="clear && cargo test\n"

# Add subtle horizontal CRT ray scanlines to your renderer
cyberterm +fx --scanlines 0.4

# Apply classic, spherical screen curvature to give your terminal an authentic retro look
cyberterm +fx --curvature 0.18

# Force a monochromatic theme color tint across the terminal (e.g., classic Amber)
cyberterm +fx --tint FF9900

# Snapshot the current terminal history buffer out to a persistent file archive
cyberterm +blackbox --save debug_build_fail

# Export your recorded session data directly into raw JSON objects for scripting
cyberterm +blackbox --export json

# Dump the trailing lines of your session output straight to your current console view
cyberterm +blackbox --export tail

# 1. Spawn and jump straight into editing a new high-voltage variant
cyberterm +edit-theme --create-theme sub-cyber Cyberdeck Cyberdeck_GlitchCore

# 2. Review or tweak an existing music profile variant
cyberterm +edit-theme --view-theme music ThrashMetal RustInPeace_Overdrive

# 3. Permanently scrub an unwanted file from the tree structure
cyberterm +edit-theme --remove-theme sub-cyber Synthwave Synthwave_NeonNights_Old

