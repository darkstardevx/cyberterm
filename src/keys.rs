// src/keys.rs
//
// Pure logical-key -> PTY byte sequence encoder. No I/O, no state -- this is
// the exact kind of logic the cyberterm plan called out as unit-testable
// headlessly (a real window/keyboard-focus environment isn't available in
// every sandbox, but this pure mapping is).
//
// Escape sequences below are the standard xterm/VT100 ones every real
// terminal emulator (and every full-screen program that reads them, like
// vim/htop) expects.

use winit::keyboard::{Key, ModifiersState, NamedKey};

pub fn encode_key(key: &Key, mods: ModifiersState) -> Option<Vec<u8>> {
    match key {
        Key::Named(named) => encode_named(*named, mods),
        Key::Character(c) => encode_character(c, mods),
        _ => None,
    }
}

fn encode_named(named: NamedKey, mods: ModifiersState) -> Option<Vec<u8>> {
    let bytes: &[u8] = match named {
        NamedKey::Enter => b"\r",
        NamedKey::Backspace => b"\x7f",
        NamedKey::Tab => b"\t",
        NamedKey::Escape => b"\x1b",
        NamedKey::ArrowUp => b"\x1b[A",
        NamedKey::ArrowDown => b"\x1b[B",
        NamedKey::ArrowRight => b"\x1b[C",
        NamedKey::ArrowLeft => b"\x1b[D",
        NamedKey::Home => b"\x1b[H",
        NamedKey::End => b"\x1b[F",
        NamedKey::PageUp => b"\x1b[5~",
        NamedKey::PageDown => b"\x1b[6~",
        NamedKey::Insert => b"\x1b[2~",
        NamedKey::Delete => b"\x1b[3~",
        NamedKey::F1 => b"\x1bOP",
        NamedKey::F2 => b"\x1bOQ",
        NamedKey::F3 => b"\x1bOR",
        NamedKey::F4 => b"\x1bOS",
        NamedKey::F5 => b"\x1b[15~",
        NamedKey::F6 => b"\x1b[17~",
        NamedKey::F7 => b"\x1b[18~",
        NamedKey::F8 => b"\x1b[19~",
        NamedKey::F9 => b"\x1b[20~",
        NamedKey::F10 => b"\x1b[21~",
        NamedKey::F11 => b"\x1b[23~",
        NamedKey::F12 => b"\x1b[24~",
        NamedKey::Space => {
            // Ctrl+Space sends NUL, same as every other terminal.
            if mods.control_key() {
                b"\x00"
            } else {
                b" "
            }
        }
        _ => return None,
    };
    Some(bytes.to_vec())
}

fn encode_character(c: &str, mods: ModifiersState) -> Option<Vec<u8>> {
    if mods.control_key() {
        // Ctrl+<letter> -> the letter's position in the alphabet (1-26),
        // the real control-code mapping every terminal uses (Ctrl+C = 0x03,
        // Ctrl+D = 0x04, etc.)
        let ch = c.chars().next()?;
        if ch.is_ascii_alphabetic() {
            let upper = ch.to_ascii_uppercase() as u8;
            return Some(vec![upper - b'A' + 1]);
        }
    }

    if mods.alt_key() {
        // Alt+<key> -> ESC-prefixed, the standard "meta" encoding.
        let mut out = vec![0x1b];
        out.extend_from_slice(c.as_bytes());
        return Some(out);
    }

    Some(c.as_bytes().to_vec())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn plain_character_passes_through_as_utf8() {
        let key = Key::Character("a".into());
        assert_eq!(
            encode_key(&key, ModifiersState::empty()),
            Some(b"a".to_vec())
        );

        let key = Key::Character("é".into());
        assert_eq!(
            encode_key(&key, ModifiersState::empty()),
            Some("é".as_bytes().to_vec())
        );
    }

    #[test]
    fn ctrl_letter_produces_control_code() {
        let key = Key::Character("c".into());
        assert_eq!(encode_key(&key, ModifiersState::CONTROL), Some(vec![0x03]));

        let key = Key::Character("d".into());
        assert_eq!(encode_key(&key, ModifiersState::CONTROL), Some(vec![0x04]));
    }

    #[test]
    fn alt_key_gets_escape_prefix() {
        let key = Key::Character("f".into());
        assert_eq!(
            encode_key(&key, ModifiersState::ALT),
            Some(vec![0x1b, b'f'])
        );
    }

    #[test]
    fn named_keys_map_to_real_vt_sequences() {
        assert_eq!(
            encode_key(&Key::Named(NamedKey::Enter), ModifiersState::empty()),
            Some(b"\r".to_vec())
        );
        assert_eq!(
            encode_key(&Key::Named(NamedKey::ArrowUp), ModifiersState::empty()),
            Some(b"\x1b[A".to_vec())
        );
        assert_eq!(
            encode_key(&Key::Named(NamedKey::Backspace), ModifiersState::empty()),
            Some(b"\x7f".to_vec())
        );
        assert_eq!(
            encode_key(&Key::Named(NamedKey::Delete), ModifiersState::empty()),
            Some(b"\x1b[3~".to_vec())
        );
    }

    #[test]
    fn ctrl_space_sends_nul() {
        assert_eq!(
            encode_key(&Key::Named(NamedKey::Space), ModifiersState::CONTROL),
            Some(vec![0x00])
        );
    }

    #[test]
    fn unmapped_named_key_returns_none() {
        assert_eq!(
            encode_key(&Key::Named(NamedKey::CapsLock), ModifiersState::empty()),
            None
        );
    }
}
