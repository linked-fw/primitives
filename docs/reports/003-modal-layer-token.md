---
date: 2026-11-15
summary: >
  `Dialog` and `Drawer` move from the host's `--z-modal` to the framework's `--layer-modal`, as
  `AlertDialog` already did: one modal layer token for every modal primitive. Minor.
packages: [primitives]
---

# 003 — One modal layer token

## PR

### Summary

`Dialog` and `Drawer` read `var(--layer-modal)` instead of `var(--z-modal)`. `@_linked/css`
defaults `--layer-modal` to 50 and never defined `--z-modal`, so in a host without it their
`z-index` was invalid and they painted below any positioned element with a `z-index` (the defect
`AlertDialog` had before it took `--layer-modal`).

### Changes

- `src/components/Dialog.module.css`: overlay `var(--layer-modal)`, content
  `calc(var(--layer-modal) + 1)`.
- `src/components/Drawer.module.css`: overlay and content `var(--layer-modal)`.
- Changeset `dialog-drawer-modal-layer.md` (minor): a host that defined `--z-modal` and not
  `--layer-modal` maps it, `--layer-modal: var(--z-modal);`.
- Backlog 001 (this item) removed.

### Verification

- `npx linked build` → `✔ Build successful`.
- `grep -rn "z-modal" src` → no output.

### Deviations

None.

### Follow-ups

None.

## Details

The backlog's open question (switch outright, or read `var(--z-modal, var(--layer-modal))` so a
host's `--z-modal` still wins) was decided for the outright switch: one explicit token, no
fallback chain. A host keeps its own value by mapping `--layer-modal` onto its scale, as it
already must for `AlertDialog`. `Toast`, `Popover`, `Select` and `Combobox` keep their own tokens
(`--toast-z-index`, `--layer-popover`).
