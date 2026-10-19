---
'@_linked/primitives': patch
---

The toast store and the Combobox and MultiSelect contexts are kept on `globalThis` through core's `sharedState`, so `toast()` from one copy of the package reaches a `<Toaster/>` rendered by another. Requires `@_linked/core` 2.36.0 or later.
