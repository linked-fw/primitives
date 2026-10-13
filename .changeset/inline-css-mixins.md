---
'@_linked/primitives': patch
---

Focus rings and disabled styles work again. The components' CSS used `@define-mixin` / `@mixin` (postcss-mixins), which no consumer's pipeline expands, so the browser dropped those lines: no `:focus-visible` ring and no disabled opacity or cursor on Button, IconButton, Input, Textarea, Select, Checkbox, Switch, Tabs, Dialog and the other controls. The declarations are now plain CSS, and `components/helpers/mixins.css` is gone.
