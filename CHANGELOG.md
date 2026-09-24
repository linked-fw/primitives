# @\_linked/primitives

## 1.2.3

### Patch Changes

- [#28](https://github.com/linked-fw/primitives/pull/28) [`23878a3`](https://github.com/linked-fw/primitives/commit/23878a34f6b8c5a720f280f0a2658f785babc0f1) Thanks [@flyon](https://github.com/flyon)! - Compiles under React 19.

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

## 1.2.2

### Patch Changes

- [#26](https://github.com/linked-fw/primitives/pull/26) [`4ab0199`](https://github.com/linked-fw/primitives/commit/4ab0199d86d5281cee207d021e53fdd46f5d5a05) Thanks [@flyon](https://github.com/flyon)! - Compile the whole `src` folder, and let a bare import resolve under Node10.

  The build only emitted what an entry transitively reached, so any module
  nothing imported was never built — and never type-checked, so it rotted
  quietly. `include` now covers `src/**/*` with tests excluded explicitly.

  `typesVersions` maps every specifier through `lib/esm/*`, so a `types` value
  that already carried that prefix had it applied twice and no consumer on
  classic Node10 resolution could `import` the package by its bare name.

## 1.2.1

### Patch Changes

- [#24](https://github.com/linked-fw/primitives/pull/24) [`781aebc`](https://github.com/linked-fw/primitives/commit/781aebcdd83d3222acf9a00e54175687bb91b848) Thanks [@flyon](https://github.com/flyon)! - Declare npm as the package manager for this repo, convert the build scripts off `yarn`, and mark `package-lock.json` as a generated file.

## 1.2.0

### Minor Changes

- [#15](https://github.com/linked-cm/primitives/pull/15) [`cf860da`](https://github.com/linked-cm/primitives/commit/cf860da7a9df9462e7939fe1fcd430ab582152c0) Thanks [@flyon](https://github.com/flyon)! - Absorb four components that had been living inside an application, and replace the
  hand-rolled confirm dialog with a composition over `AlertDialog`.

  **`Spinner` is superseded.** The version here was twelve lines with one prop. The replacement
  adds size variants, `prefers-reduced-motion` support, a configurable `aria-label`, and draws
  the ring as an inner element so a flex parent cannot distort it into an ellipse. Three
  differences worth knowing, none of which affects a caller that renders `<Spinner />`:

  - `active={false}` now renders **nothing** rather than an element with `aria-busy="false"`.
    A spinner in a scroll sentinel must not reserve space when idle, and `active` had no visual
    effect before — `.active` was never defined in the CSS. (It also emitted a class literally
    named `false`.)
  - The ring is an inner `<span>`, so the border is no longer on the container. Consumer CSS
    targeting the container's `border` needs updating; size still comes from the container.
  - `--spinner-border-width` defaults to 2px rather than 4px, and the animation to 0.7s rather
    than 1s. Every `--spinner-*` variable still works, so a consumer that themed it keeps its
    theme.

  **`ConfirmDialog` is new, and is a composition over the Radix `AlertDialog` already here.** It
  replaces a hand-rolled `createPortal` implementation that had no focus trap, no escape
  handling, no `aria-modal` and no focus restoration — the worst possible component to get
  wrong, since its only job is guarding a destructive action. `tone="danger"` reads the
  `--intent-danger-*` family rather than taking a class name, which is what the previous version
  did by exporting its own CSS-module object.

  **`SkeletonLoader`** and **`ImageThumb`** are new; neither had an equivalent here.

  **`motion`** (new export) carries the animation presets — variants, transitions, and
  `useReducedMotion`. Typed against `framer-motion` but importing nothing from it at runtime:
  every export is a plain object, so `framer-motion` is an **optional** peer and a consumer that
  does not animate never installs it.

  The colours these bring are all expressed as `--<component>-*` variables falling back to
  semantic tokens, per the library contract; none defines a raw colour.

## 1.1.1

### Patch Changes

- [#13](https://github.com/linked-cm/primitives/pull/13) [`d23b948`](https://github.com/linked-cm/primitives/commit/d23b948f28a2f552e9b40230cc8cec3b48336f6a) Thanks [@flyon](https://github.com/flyon)! - Add a README stating what this library is, and what belongs in it.

  The invariant was already held by every component in the package but written down nowhere:
  a headless behaviour source, a CSS module reading `@_linked/css` tokens, and no knowledge of
  data, shapes, or any particular application. The package description said only "a UI library
  based on Radix UI", which undersells it and is not quite true — `Command` and `MultiSelect`
  are cmdk, `Drawer` is vaul, and seven components are hand-written.

  Stating it matters because the question this package keeps getting asked is "does X belong
  here?", and without an answer components get copied instead of shared. The README gives the
  three-question test and shows where the neighbouring layers sit.

## 1.1.0

### Minor Changes

- [#11](https://github.com/linked-cm/primitives/pull/11) [`85deea9`](https://github.com/linked-cm/primitives/commit/85deea9406d9a5c655427d9302e015c334799691) Thanks [@flyon](https://github.com/flyon)! - Add the `Badge` primitive — badge, tag, chip and pill in one component, with the
  variant and size vocabulary the rest of the library uses.

  Also forwards `aria-label` and `aria-disabled` to the single thumb in `Slider`, so a
  one-thumb slider is announced correctly by screen readers.

## 1.0.9

### Patch Changes

- [#9](https://github.com/linked-cm/primitives/pull/9) [`780eaee`](https://github.com/linked-cm/primitives/commit/780eaee5a4bf1c17f21f3840996ad6cbc0caa63b) Thanks [@carlenmy](https://github.com/carlenmy)! - Allow labelled ToggleGroup items to expand to their content while preserving the existing square minimum for icon-only items. Add `--togglegroup-item-padding-x` so consumers can tune inline padding without overriding primitive geometry.

## 1.0.7

### Patch Changes

- [#5](https://github.com/linked-cm/primitives/pull/5) [`985931d`](https://github.com/linked-cm/primitives/commit/985931d7a7e09e34a945dd9ac25d844981fca469) Thanks [@flyon](https://github.com/flyon)! - loadData: ESM-only JSON import — drop the dead CJS branch, add the `{ with: { type: 'json' } }` import attribute.

## 1.0.6

### Patch Changes

- [#2](https://github.com/linked-cm/primitives/pull/2) [`9c7d9e3`](https://github.com/linked-cm/primitives/commit/9c7d9e3d9336808d171590b17d9e0f4614c6301e) Thanks [@flyon](https://github.com/flyon)! - Switch to explicit per-step build pipeline so silent build failures no longer ship empty tarballs. The previous `yarn linked build` wrapper was failing silently in CI and dropping all compiled `.js` files from the published tarball.

## 1.0.5

### Patch Changes

- [`479b093`](https://github.com/linked-cm/primitives/commit/479b093a35399f2d8628b7d1bd5e38b1e2e006d6) - Initial release under the new publishing setup.
