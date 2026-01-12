---
title: 'Reverse Engineering the Windows Desktop Compositor'
date: '2026-01-12'
---

wip
<br /><br />

```rs
pub fn load_symbol_address(&mut self, image: &Path, symbol: &str) -> io::Result<usize> {
    let image_base = self.get_image_base(image)?;

    let mut info = SYMBOL_INFOW::default();
    info.SizeOfStruct = std::mem::size_of::<SYMBOL_INFOW>() as u32;
    info.MaxNameLen = 0;

    let symbol_wide = unsafe { U16CString::from_str_unchecked(symbol) };
    unsafe {
        SymFromNameW(
            self.process,
            PCWSTR::from_raw(symbol_wide.as_ptr()),
            &mut info,
        )
    }?;

    Ok((info.Address - image_base) as usize)
}
```
