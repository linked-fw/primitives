---
"@_linked/primitives": patch
---

`AlertDialog` (and so `ConfirmDialog`) takes the modal layer (`--layer-modal`). It had no `z-index`, so its portal painted below any positioned element with one, such as a sticky tab bar, which covered part of the dialog.
