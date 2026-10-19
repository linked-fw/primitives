---
summary: >
  The toast store in `use-toast.tsx` (listeners, memory state, timeouts, id counter) is module-level,
  so `toast()` from one copy of the package never reaches a `<Toaster/>` from another. Move it to
  core's `sharedState`. Two compound-component contexts are low risk.
packages: [primitives]
---

# 001 — Toast store across copies

A module can be evaluated twice in one runtime (Vite's SSR runner and Node under `linked start`, or two browser bundles). The convention ([shared state and error brands](https://github.com/linked-fw/cli/blob/main/docs/architecture/shared-state-and-error-brands.md)) keeps caller-set module state on `globalThis` with `sharedState(pkg, name, init)` from `@_linked/core` 2.36.0, React contexts in that shared state, and brands error classes with `brandLinkedError` so consumers match them with `isLinkedError`. Each fix needs a test that loads a second copy of the module (`jest.isolateModulesAsync`, or a `?copy` query on the built file) and shows the state is shared.

Found by the survey for linked-fw/cli backlog 017. Paths under `src/hooks/use-toast.tsx`.

## Must be shared

`:128` `listeners`, `:130` `memoryState`, `:55` `toastTimeouts`, and `:24` `count` with them (ids
would collide across copies once the state is shared). `toast()` from one copy is invisible to
`<Toaster/>` from the other.

## Contexts (low risk)

`src/components/Combobox.tsx:27` `ComboboxContext`, `src/components/MultiSelect.tsx:33`
`MultiSelectContext`: internal compound-component contexts. They break only if a root and its
children come from different copies; share them when the toast store moves.
