# @\_linked/primitives

## 1.8.2

### Patch Changes

- [#80](https://github.com/linked-fw/primitives/pull/80) [`5377e30`](https://github.com/linked-fw/primitives/commit/5377e30634e7a1e77b52014b525950f5f322a0a8) Thanks [@flyon](https://github.com/flyon)! - Focus rings and disabled styles work again. The components' CSS used `@define-mixin` / `@mixin` (postcss-mixins), which no consumer's pipeline expands, so the browser dropped those lines: no `:focus-visible` ring and no disabled opacity or cursor on Button, IconButton, Input, Textarea, Select, Checkbox, Switch, Tabs, Dialog and the other controls. The declarations are now plain CSS, and `components/helpers/mixins.css` is gone.

## 1.8.1

### Patch Changes

- [#78](https://github.com/linked-fw/primitives/pull/78) [`8f13b75`](https://github.com/linked-fw/primitives/commit/8f13b75cad664ebce4d248c49ea63c26b0a664c3) Thanks [@flyon](https://github.com/flyon)! - `Form` and its parts (`Root`, `Field`, `Label`, `Control`, `Message`, `ValidityState`, `Submit`) now have explicit types. The emitted declarations name `typeof FormPrimitive.X` from `@radix-ui/react-form` rather than inferred types inside its nested dependencies. Before this, building the package inside an app whose install could not hoist react-form's exact radix dependencies failed with TS2742. The public types are unchanged.

## 1.8.0

### Minor Changes

- [#74](https://github.com/linked-fw/primitives/pull/74) [`fc3c43a`](https://github.com/linked-fw/primitives/commit/fc3c43a0f8b7f5dcd2a9c1a067973c915719701b) Thanks [@flyon](https://github.com/flyon)! - Depend on `@_linked/react@^2.0.0` (was `^1.6.0`) and `@_linked/core@^2.27.0` (was `^2.22.8`, raised to the core peer range `@_linked/react` 2 requires).
  
  An app on `@_linked/react` 2 no longer installs a second copy of `@_linked/react` 1 through this package. The only thing used from it is `cl` from `@_linked/react/utils/ClassNames`, which 2.0 did not change.
  
  Minor rather than major: `@_linked/react` is a regular dependency here, not a peer, so no consumer has to change anything to install this release; and a major would force every package that depends on `@_linked/primitives@^1` to change its range just to pick it up.

## 1.7.2

### Patch Changes

- [#72](https://github.com/linked-fw/primitives/pull/72) [`c82c202`](https://github.com/linked-fw/primitives/commit/c82c2023a5a0047c50d7696aa0b1649ec8d6344c) Thanks [@flyon](https://github.com/flyon)! - Build with `linked build`, the standard build for linked packages. The published `lib/` holds the same files as before; the `rimraf` and `copyfiles` dev dependencies are gone. `@types/node`, which the compiler config already relies on, is now declared as a dev dependency instead of arriving transitively.

## 1.7.1

### Patch Changes

- [#70](https://github.com/linked-fw/primitives/pull/70) [`8706d95`](https://github.com/linked-fw/primitives/commit/8706d95089cecc6611eb47ebd13ad5dab3bc15e6) Thanks [@flyon](https://github.com/flyon)! - Publish only the files consumers need; the tarball no longer includes `.changeset/`, `.gitattributes`, `.github/`, `renovate.json`, `test/` or tsconfig files.

## 1.7.0

### Minor Changes

- [#68](https://github.com/linked-fw/primitives/pull/68) [`917ac17`](https://github.com/linked-fw/primitives/commit/917ac175c6496fd34212b279c7477ec283930144) Thanks [@abdipramana](https://github.com/abdipramana)! - Add `Combobox`, a searchable single-select built from Popover and Command. `Select` remains the list that does not filter.
  
  Item values are ids. Pass the visible label separately as `displayValue` on the root and as `keywords` on the item, or the closed trigger and the search will not match the name.
  
  ```tsx
  import { Combobox } from '@_linked/primitives/components/Combobox';
  
  <Combobox.Root
    value={selectedId}
    displayValue={selectedLabel}
    onValueChange={setSelectedId}
  >
    <Combobox.Trigger placeholder="Select an action" />
    <Combobox.Content>
      <Combobox.Input placeholder="Search" />
      <Combobox.List>
        <Combobox.Empty>No matches</Combobox.Empty>
        <Combobox.Item value={action.id} keywords={[action.name]}>
          {action.name}
        </Combobox.Item>
      </Combobox.List>
    </Combobox.Content>
  </Combobox.Root>
  ```
  
  `onValueChange` receives the `value` prop of the chosen item, not a lowercased search string.

- [#68](https://github.com/linked-fw/primitives/pull/68) [`917ac17`](https://github.com/linked-fw/primitives/commit/917ac175c6496fd34212b279c7477ec283930144) Thanks [@abdipramana](https://github.com/abdipramana)! - Add `InputOTP` for a fixed-length one-time code. It does not know which product or channel the code belongs to.
  
  ```tsx
  import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
    REGEXP_ONLY_DIGITS,
  } from '@_linked/primitives/components/InputOTP';
  
  <InputOTP
    maxLength={6}
    pattern={REGEXP_ONLY_DIGITS}
    value={code}
    onChange={setCode}
    onComplete={submitCode}
    invalid={hasError}
  >
    <InputOTPGroup>
      <InputOTPSlot index={0} />
      <InputOTPSlot index={1} />
      <InputOTPSlot index={2} />
      <InputOTPSlot index={3} />
      <InputOTPSlot index={4} />
      <InputOTPSlot index={5} />
    </InputOTPGroup>
  </InputOTP>
  ```
  
  `invalid` marks the whole code without choosing an error message. `REGEXP_ONLY_DIGITS` is re-exported from `input-otp` for callers that want digits only.

## 1.6.0

### Minor Changes

- [#63](https://github.com/linked-fw/primitives/pull/63) [`a65b682`](https://github.com/linked-fw/primitives/commit/a65b68209ba4e1c73a86a50afe6d7f57b1dedce1) Thanks [@flyon](https://github.com/flyon)! - The primitives ontology moves from `http://lincd.org/ont/radix/` to `https://linked.cm/ont/primitives/`, the first-party scheme every public package uses (`https://linked.cm/ont/{publicSlug}/`). `radix` was a leftover of the package's old name; the ontology and its prefix are now `primitives`, matching the package (and its data file, which already said `primitives`).
  
  No data migration is needed: the ontology defines no terms, so nothing was ever stored under it. The grouping export is now `primitives`; `radix` stays as a deprecated alias. The prefix registered with `Prefix` is now `primitives` instead of `radix`.

## 1.5.4

### Patch Changes

- [#61](https://github.com/linked-fw/primitives/pull/61) [`1a631d5`](https://github.com/linked-fw/primitives/commit/1a631d5fe1c3de83fac65b00e3c050ca97ff4a0b) Thanks [@flyon](https://github.com/flyon)! - Declare `react` and `react-dom` as peer dependencies (`^18.2.0 || ^19.0.0`). The components
  import both but never said so, so a consumer's React was found by hoisting alone. The package
  is now built and type-checked against React 19 and `@types/react` 19, and requires
  `@_linked/react` ^1.6.0, the first line whose peer range admits React 19.

## 1.5.3

### Patch Changes

- [#58](https://github.com/linked-fw/primitives/pull/58) [`bf44441`](https://github.com/linked-fw/primitives/commit/bf4444127a20089afe41d8a7637ec27989e75ee3) Thanks [@flyon](https://github.com/flyon)! - The package is now ESM-only, like the rest of the Linked packages. The `require` condition pointed at a `lib/cjs` build that could not load — from the published tarball, `require('@_linked/primitives')` already failed — so it is removed together with the CJS build, and `"type": "module"` is set. `import` is unchanged.

## 1.5.2

### Patch Changes

- [#53](https://github.com/linked-fw/primitives/pull/53) [`35855e7`](https://github.com/linked-fw/primitives/commit/35855e7ce38e8647e9b10065e8db54f4a920a7e5) Thanks [@flyon](https://github.com/flyon)! - Depend on `vaul` ^1.1.2 instead of ^0.9.2. vaul 0.9.x declares a React peer range of `^16.8 || ^17.0 || ^18.0`, so in a React 19 app npm could not hoist it and nested a private copy under this package. vaul 1.1.2 includes React 19 in its peer range. The `Drawer` component needs no changes: every part it wraps (`Root`, `Trigger`, `Portal`, `Close`, `Overlay`, `Content`, `Title`, `Description`) keeps the same API, and it type-checks against 1.1.2.

## 1.5.1

### Patch Changes

- [#50](https://github.com/linked-fw/primitives/pull/50) [`0b057e3`](https://github.com/linked-fw/primitives/commit/0b057e331f68d25858104ff52993e8130e89a1be) Thanks [@flyon](https://github.com/flyon)! - Sourcemaps now embed their TypeScript source, so consumers no longer see 'points to missing source files' warnings.

## 1.5.0

### Minor Changes

- [#41](https://github.com/linked-fw/primitives/pull/41) [`cb999cc`](https://github.com/linked-fw/primitives/commit/cb999cc24a80dc95773458075a38fdf0d07ddd8b) Thanks [@flyon](https://github.com/flyon)! - Require `@_linked/core@^2.22.8` (was `^2.0.1`), and pin it in the lockfile.

  The declared range was wide enough that the resolved core depended on whatever the
  consumer — or this repo's own CI, via `package-lock.json` — happened to install. Core
  decides how a shape's IRI is minted, so a stale core made this package emit legacy
  `data.lincd.org` IRIs instead of the arch-02 `linked.cm` scheme. Which IRIs a published
  package produces should not be a function of the installer's dependency tree.

  Minor rather than patch: this raises the minimum core a consumer must resolve, so it
  changes what gets installed rather than only what this package does internally.

## 1.4.0

### Minor Changes

- [#39](https://github.com/linked-fw/primitives/pull/39) [`8130aa3`](https://github.com/linked-fw/primitives/commit/8130aa3f02682f1ced21d8767a6049d53a2744a6) Thanks [@flyon](https://github.com/flyon)! - `ConfirmDialog`'s `tone="danger"` was visually inert; `Button` now has a `danger` colour

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

## 1.3.2

### Patch Changes

- [#37](https://github.com/linked-fw/primitives/pull/37) [`d7803e0`](https://github.com/linked-fw/primitives/commit/d7803e09f303015f6ba4f14ef3d610e7cda0c289) Thanks [@flyon](https://github.com/flyon)! - Give this package its own linked identity

  `src/package.ts` re-exported core's decorators verbatim and declared
  `packageName` as a bare literal that nothing was bound to, so everything
  declared here registered under `@_linked/core`: the `radix` ontology landed in
  core's entry in the package tree, and the next `@linkedShape` added here would
  silently have been given a `.../shape/core/...` IRI. `Server.call` routes on
  the package name a shape carries, so one naming the wrong package is simply
  unreachable.

  **No shape IRI changes**, because no shape is decorated here today — that is
  why this is a patch and not a minor. The only visible change is where the
  `radix` ontology is registered in the package tree.

  Same defect and same fix as linked-fw/owl#26, where shapes did exist and the
  IRIs did change.

## 1.3.1

### Patch Changes

- [#34](https://github.com/linked-fw/primitives/pull/34) [`6514c31`](https://github.com/linked-fw/primitives/commit/6514c31aef96a8b4d087e1edf48aa86abe693b87) Thanks [@flyon](https://github.com/flyon)! - Add a root `types` field so a bare import gets types under node10 resolution.

  There was no `types`/`typings` field at all, so a `moduleResolution: node10` consumer doing
  `import … from '@_linked/primitives'` got `TS2307` — `exports` is ignored under node10. The value
  `index.d.ts` is redirected by the existing `typesVersions` to `lib/esm/index.d.ts`, matching the
  sibling packages.

## 1.3.0

### Minor Changes

- [#32](https://github.com/linked-fw/primitives/pull/32) [`ec82d1a`](https://github.com/linked-fw/primitives/commit/ec82d1abf39af62f8954f0cc4057dcd4ec7cabff) Thanks [@flyon](https://github.com/flyon)! - Widen the `as` and `color` prop unions so they describe what the components
  actually render.

  `Typography`, `Text` and `Heading` spread `as` straight into JSX, so every
  intrinsic tag has always worked at runtime, but the types named four or six
  tags each — `as="strong"`, `as="code"`, `as="small"` were type errors for
  behaviour that works. They now take a shared, curated element union
  (`TextElement` / `HeadingAsElement`, exported from `components/elements.js`)
  covering phrasing and text-block elements. Void, interactive and SVG tags are
  deliberately excluded: these components require `children` and type their props
  as `HtmlHTMLAttributes<HTMLElement>`, so those tags could not be rendered
  correctly anyway.

  `Heading` gains an optional `level` prop. Its stylesheet keys off the tag
  (`h1.Root`), so `<Heading as="p">` renders with no heading typography; `level`
  applies a level's tokens to any tag. Omitting it changes nothing.

  `Badge` gains `accent` and `secondary` colours, each with a real rule in
  `Badge.module.css`, and the union is now the exported `BadgeColor` type.

## 1.2.4

### Patch Changes

- [#30](https://github.com/linked-fw/primitives/pull/30) [`05edb14`](https://github.com/linked-fw/primitives/commit/05edb14ea7b7816883cd573751d0ba5398ab19c6) Thanks [@flyon](https://github.com/flyon)! - The ontology no longer registers by importing itself.

  It carried `import * as _this from './<prefix>.js'` and passed that namespace to
  `linkedOntology()`. Under `tsc` the self-reference survives; under a bundler it does
  not — Rollup treats it as a circular import and elides it, so the binding is
  `undefined` and a consuming app dies at boot with `_this is not defined`.

  Registration now lives in a `<prefix>.register.ts` sibling, imported from the package
  entry. Nothing changes for consumers: importing this package still registers the
  ontology.

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
