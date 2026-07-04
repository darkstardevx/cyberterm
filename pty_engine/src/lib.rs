use std::sync::Arc;
use std::thread;
use alacritty_terminal::term::{Term, Config as TermConfig};
use alacritty_terminal::event::EventListener;
use rustix_openpty::openpty;
use polling::{Event, Poller};
use parking_lot::Mutex;

// 1. Module Declarations and Imports
pub mod clipboard; 
use clipboard::ClipboardManager;

// Dummy event structural listener required by the Alacritty core API
struct AppEventProxy;
impl EventListener for AppEventProxy {
    fn send_event(&self, _event: alacritty_terminal::event::Event) {}
}

// 2. Single Unified Structural Definition
pub struct TerminalEngine {
    // Thread-safe reference container allowing simultaneous UI reads and engine mutations
    pub term: Arc<Mutex<Term<AppEventProxy>>>,
    pub pty_tx: std::fs::File,
    pub clipboard: ClipboardManager, // Cleanly integrated here
}

// 3. Single Unified Implementation Block
impl TerminalEngine {
    pub fn new(columns: usize, lines: usize) -> Self {
        // 1. Allocate a local system pseudo-terminal pair (Master / Slave)
        let pty_fork = openpty(None, None).expect("Failed to allocate system PTY");
        
        // 2. Initialize the underlying Alacritty state machine representation
        let size = alacritty_terminal::term::SizeInfo::new(
            columns as f32 * 10.0, lines as f32 * 20.0, // Calculated pixel boundaries
            10.0, 20.0,                                 // Fixed text cell scaling definitions
            0.0, 0.0,                                   // Layout padding values
        );
        
        let term = Term::new(TermConfig::default(), &size, AppEventProxy);
        let term_arc = Arc::new(Mutex::new(term));
        
        // Convert safe native descriptors into file interfaces
        let pty_master_rx = unsafe { std::fs::File::from(pty_fork.master) };
        let pty_master_tx = unsafe { std::fs::File::from(pty_fork.master.try_clone().unwrap()) };

        // 3. Spawn a target shell execution wrapper (e.g., /bin/bash) 
        // In a complete build, fork the slave descriptor into the target child process execution loop here.

        // 4. Spin up the processing background engine thread
        let term_clone = Arc::clone(&term_arc);
        thread::spawn(move || {
            let mut parser = vte::ansi::Processor::new();
            let poller = Poller::new().unwrap();
            unsafe { poller.add(&pty_master_rx, Event::readable(0)).unwrap(); }
            
            let mut buffer = [0u8; 4096];
            let mut events = Vec::new();

            loop {
                events.clear();
                poller.wait(&mut events, None).unwrap();

                use std::io::Read;
                // Read chunks from the active stream
                if let Ok(count) = (&pty_master_rx).read(&mut buffer) {
                    if count == 0 { break; } // Handle active stream closure cleanups
                    
                    // Safely isolate lock scopes to optimize processing velocity
                    let mut term_lock = term_clone.lock();
                    for byte in &buffer[..count] {
                        // Forward the output sequence into the parsing layer 
                        parser.advance(&mut *term_lock, *byte);
                    }
                }
            }
        });

        // 5. Build and return the struct with all fields initialized exactly once
        Self { 
            term: term_arc, 
            pty_tx: pty_master_tx,
            clipboard: ClipboardManager::new(), 
        }
    }

    // Call this helper function when your UI Thread registers a Ctrl+Shift+C / Copy Action
    pub fn copy_selection(&mut self, raw_selected_text: &str) {
        self.clipboard.copy_clean_string(raw_selected_text);
    }
}
