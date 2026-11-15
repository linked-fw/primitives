---
"@_linked/primitives": minor
---

`Dialog` and `Drawer` take the modal layer (`--layer-modal`), as `AlertDialog` does. They read `--z-modal`, which `@_linked/css` does not define, so in a host without it their `z-index` was invalid and they painted below any positioned element with one. A host that defined `--z-modal` and not `--layer-modal` maps it: `--layer-modal: var(--z-modal);`.
