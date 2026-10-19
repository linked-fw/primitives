---
date: 2026-10-19
summary: >
  Backlog 001 done: the toast store (listeners, memory state, removal timers, id counter) and the
  Combobox and MultiSelect contexts live on `globalThis` through core's `sharedState`, so
  `toast()` from one copy of the package reaches a `<Toaster/>` from another. Needs
  `@_linked/core` 2.36.0 or later.
---

# 001 — Toast store across copies

Replaces backlog 001. The convention it follows:
[shared state and error brands](https://github.com/linked-fw/cli/blob/main/docs/architecture/shared-state-and-error-brands.md)
(cli report 020).

## Why

A module can be evaluated twice in one runtime: under `linked start` once by Vite's SSR runner
and once by Node, or in a browser when two bundles each carry a copy. `use-toast.tsx` kept its
store in module scope, so each copy had its own `listeners` and `memoryState`: `toast()` from one
copy dispatched to an empty listener list while the `<Toaster/>` rendered by the other copy never
heard of it. No error, the toast just did not show.

## What changed

| File | Change |
|---|---|
| `src/hooks/use-toast.tsx` | `count`, `listeners`, `memoryState` and `toastTimeouts` moved into one container, `sharedState('@_linked/primitives', 'toast', …)`. All reads and writes go through `store.<field>`. |
| `src/components/Combobox.tsx` | `ComboboxContext` created inside `sharedState('@_linked/primitives', 'Combobox.contexts', …)`. |
| `src/components/MultiSelect.tsx` | `MultiSelectContext` created inside `sharedState('@_linked/primitives', 'MultiSelect.contexts', …)`. |
| `package.json` / lockfile | `@_linked/core` `^2.27.0` → `^2.36.0` (locks 2.36.1), the first release with `sharedState`. |
| `test/shared-state.test.mjs` | New: imports the built `lib/esm/hooks/use-toast.js` twice (plain and `?copy`). |
| `.changeset/shared-toast-store.md` | Patch. |

The public API is unchanged: `toast`, `useToast` and `reducer` keep their signatures.

### Global keys

| Key | Holds |
|---|---|
| `Symbol.for('@_linked/primitives:toast')` | `{count, listeners, memoryState, toastTimeouts}` |
| `Symbol.for('@_linked/primitives:Combobox.contexts')` | `{ComboboxContext}` |
| `Symbol.for('@_linked/primitives:MultiSelect.contexts')` | `{MultiSelectContext}` |

## Decisions

- **The id counter is shared too.** With one shared toast list, two per-copy counters would both
  hand out `"1"`, and `UPDATE_TOAST` / `DISMISS_TOAST` would hit the other copy's toast.
- **The removal timers are shared.** `addToRemoveQueue` skips an id that already has a timer; with
  per-copy maps, dismissing from both copies would schedule two removals.
- **The container is created empty and filled field by field** (`ensureFields`). The convention
  says a container may outlive a version: a newer copy that finds a container an older copy made
  fills missing fields instead of assuming the layout. Fields are mutated on the container, never
  copied into module-level locals, so every copy sees reassignments of `memoryState` and `count`.
- **The two contexts are shared as well.** The backlog called them low risk (they break only when
  a `Root` and its parts come from different copies) and said to share them when the toast store
  moved. The change is one line each and has no cost, so it is done here. This holds while both
  copies share one React, which the CLI dedupes.
- **Each copy keeps its own `reducer` and `dispatch`.** Only state moves; the functions are pure
  over the shared container, so which copy runs them does not matter.

## Tests

`npm test` (node's test runner over `test/*.test.mjs`): 16 pass, 0 fail. New in
`test/shared-state.test.mjs`:

- the plain and `?copy` imports are distinct module instances (different `toast` functions);
- a listener in the shared store (what `useToast()` registers in its effect) receives a toast
  pushed through copy A, a component using copy B's `useToast` server-renders that toast, and a
  dismiss through copy A reaches the listener;
- ids from the two copies differ;
- `Combobox.tsx` and `MultiSelect.tsx` create their context only inside a `sharedState`
  initialiser (a source check: the built components import `.module.css`, which plain Node cannot
  load).

Against the previous source the new file fails 4 of 5 (the first, "distinct instances", passes,
as it should).

## Limitations

- The context check is on the source, not a runtime render across two copies, because the
  component modules import CSS modules.
- A copy older than this release still keeps its own module-level store; it shares nothing until
  every copy in the runtime is on this version or later.
