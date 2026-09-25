---
'@_linked/primitives': minor
---

Widen the `as` and `color` prop unions so they describe what the components
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
