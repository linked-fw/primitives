---
summary: >
  `AlertDialog` takes the framework's modal layer (`--layer-modal`); `Dialog` and `Drawer` still
  read the host's `--z-modal`, which `@_linked/css` does not define. A host without it gets no
  layer for them. Move both to `--layer-modal` in a coordinated change.
packages: [primitives]
---

# 001 — One modal layer token

`AlertDialog` had no `z-index`, so its portal painted below any positioned element of the page
with one (a sticky tab bar). It now uses `--layer-modal` (`@_linked/css` defaults it to 50; a host
maps it onto its own scale).

`Dialog.module.css` and `Drawer.module.css` use `var(--z-modal)`. `@_linked/css` does not define
it, so in a host that does not either, those `z-index` values are invalid and the dialogs paint as
`AlertDialog` did. Switching them to `--layer-modal` changes the value for hosts that define
`--z-modal` but do not map `--layer-modal`, so it needs a minor with a note.

Open question: switch them outright, or read `var(--z-modal, var(--layer-modal))` so a host's
`--z-modal` still wins?
