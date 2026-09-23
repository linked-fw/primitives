---
'@_linked/primitives': patch
---

Compiles under React 19.

React 19 removed `React.ElementRef`. Thirty components used it to type their
forwarded ref, so **this package has not compiled since the React 19 upgrade**
— and because its `lib/` was left behind at the last successful build, that was
invisible until a consumer failed to resolve an asset the stale build never
emitted:

```
Could not resolve "./Tooltip.module.css"
  from "packages/primitives/lib/esm/components/Tooltip.js"
```

`React.ComponentRef` is the same type under its current name.
