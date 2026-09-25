/**
 * Element unions for the `as` prop of the typographic primitives.
 *
 * These components spread `as` straight into JSX, so at runtime *any* intrinsic
 * tag works. The types used to name a handful of tags each, which made ordinary
 * usage (`as="strong"`, `as="code"`, `as="small"`) a type error for behaviour
 * that has always worked.
 *
 * We deliberately do NOT use `keyof React.JSX.IntrinsicElements`:
 *
 *  - these components take required `children`, and React throws at runtime for
 *    a void element with children (`<input>`, `<img>`, `<br>`, `<hr>`…), so the
 *    full key set would type-check code that crashes;
 *  - their props are `React.HtmlHTMLAttributes<HTMLElement>`, which cannot carry
 *    element-specific attributes (`href`, `type`, `value`), so interactive and
 *    form tags would be offered without the attributes that make them useful;
 *  - `svg`/`math` and the SVG child tags take a different attribute namespace
 *    entirely.
 *
 * What is left — every HTML element that holds phrasing or flow content and is
 * styled purely by the component's own class — is exactly the set below. It is
 * wide enough that drift is unlikely, and honest about what the component can
 * actually render.
 */

/** Inline (phrasing) elements: text-level semantics. */
export type PhrasingElement =
  | 'span'
  | 'label'
  | 'strong'
  | 'em'
  | 'b'
  | 'i'
  | 'u'
  | 's'
  | 'small'
  | 'mark'
  | 'code'
  | 'kbd'
  | 'samp'
  | 'var'
  | 'sub'
  | 'sup'
  | 'abbr'
  | 'cite'
  | 'dfn'
  | 'q'
  | 'time'
  | 'data'
  | 'del'
  | 'ins'
  | 'bdi'
  | 'bdo'
  | 'output'
  | 'ruby'
  | 'rt'
  | 'rp';

/** Block-level containers that hold text. */
export type TextBlockElement =
  | 'p'
  | 'div'
  | 'pre'
  | 'blockquote'
  | 'address'
  | 'figcaption'
  | 'caption'
  | 'legend'
  | 'summary'
  | 'li'
  | 'dt'
  | 'dd'
  | 'td'
  | 'th';

/** The six HTML heading levels. */
export type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

/**
 * Anything `Typography` / `Text` can render: inline text, a text block, or a
 * heading tag (a caption-styled heading is a normal thing to want).
 */
export type TextElement = PhrasingElement | TextBlockElement | HeadingElement;

/**
 * Anything `Heading` can render. A heading is often visual rather than
 * semantic — a stat card's big number is a `p`, not an `h2` — so the non-heading
 * containers are allowed too. See `Heading`'s `level` prop for the styling that
 * goes with them.
 */
export type HeadingAsElement = HeadingElement | TextBlockElement | PhrasingElement;
