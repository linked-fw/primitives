# `@_linked/primitives`

A UI component library: a headless behaviour source, a CSS module, and nothing else.

## What belongs here

Every component in this package is three things and no more:

1. **A headless behaviour source** — [Radix UI](https://www.radix-ui.com) for most of them,
   [cmdk](https://cmdk.paco.me) for `Command`, `MultiSelect`, and `Combobox`,
   [input-otp](https://github.com/guilhermerodz/input-otp) for `InputOTP`,
   [vaul](https://vaul.emilkowal.ski)
   for `Drawer`, or hand-written where none of those has an answer (`Input`, `Textarea`,
   `Heading`, `Text`, `Spinner`, `RelativeTime`).
2. **A CSS module** that reads design tokens from
   [`@_linked/css`](https://www.npmjs.com/package/@_linked/css) and defines no colours,
   spacing or radii of its own.
3. **No knowledge of data, of shapes, or of any particular application.**

That third point is the one that decides whether something belongs here. Three questions,
and a component only qualifies if the answer to all three is no:

- Does it read or write data?
- Does it know what a SHACL shape is?
- Does it know the vocabulary of one specific product — statuses, verification levels,
  domain-specific badge variants?

A component that needs any of those belongs a layer up. Something that renders *any* shape
belongs in the shape-driven layer; something that renders *one product's* concepts belongs
in that product.

## Where it sits

| Layer | Package | Knows about |
|---|---|---|
| Design tokens | `@_linked/css` | nothing — CSS custom properties only |
| **Headless components** | **`@_linked/primitives`** | **the DOM and the tokens** |
| Data binding | `@_linked/react` | shapes and queries; ships no components |
| Shape-driven UI | `@_linked/ui` | how to render an arbitrary shape |
| Product surfaces | the application | its own domain vocabulary |

The layering is what keeps the same component from being written three times. When a
component has no stated home, it gets copied — and then the copies drift.

## Theming

Components never hard-code a value. Each reads a component-scoped variable that falls back
to a semantic token:

```css
.Root {
  background: var(--dialog-content-bg, var(--modal-bg));
}
```

So a component renders sensibly with only `@_linked/css` imported, an application re-skins
it by setting the semantic token, and a single instance can be overridden by setting the
component-scoped one. See [`@_linked/css`'s styling guide](../css/docs/styling-and-themes.md)
for the token vocabulary and the required import order.

## Authoring

See `docs/component-authoring-guide.md` in the workspace root for slot naming, the
token-fallback pattern, and the semantic mapping table.
