---
'@_linked/primitives': minor
---

`ConfirmDialog`'s `tone="danger"` was visually inert; `Button` now has a `danger` colour

`tone="danger"` applied a `.danger` class of ConfirmDialog's own stylesheet to the confirm
button. That class has specificity 0-1-0, while `Button` colours itself with compound
selectors — `.Root.primary.solid`, 0-3-0 — so the override never won. Measured computed
`background-color` on the danger button was `rgb(37, 99, 235)` (`--button-primary-bg`),
identical to a default confirm button. Every destructive confirmation therefore rendered in
the primary colour: the class was on the element, and the colour was not.

Colour is a `Button` prop, so that is now how tone travels: `Button`'s `color` union gains
`'danger'` with rules for all four variants, reading `--button-danger-*` and falling back to
the `--intent-danger-*` family, and `ConfirmDialog` passes `color="danger"` instead of a
class. Computed `background-color` is now `rgb(239, 68, 68)` (`--intent-danger-icon`), with
`--intent-danger-text` on hover.

`color="danger"` is new public API on `Button`. The `--confirm-dialog-danger-bg`,
`--confirm-dialog-danger-bg-hover`, `--confirm-dialog-danger-border` and
`--confirm-dialog-danger-text` custom properties are gone — they were read only by the rule
that never applied, so nothing that worked has been removed. Re-skin the destructive button
through `--button-danger-bg` / `--button-danger-bg-hover` / `--button-danger-border` /
`--button-danger-color`, or through `--intent-danger-*` to move every danger affordance at
once.
