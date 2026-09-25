---
'@_linked/primitives': patch
---

Add a root `types` field so a bare import gets types under node10 resolution.

There was no `types`/`typings` field at all, so a `moduleResolution: node10` consumer doing
`import … from '@_linked/primitives'` got `TS2307` — `exports` is ignored under node10. The value
`index.d.ts` is redirected by the existing `typesVersions` to `lib/esm/index.d.ts`, matching the
sibling packages.
