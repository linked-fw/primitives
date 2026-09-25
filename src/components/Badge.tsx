import * as React from 'react';

import style from './Badge.module.css';
import { cl } from '@_linked/react/utils/ClassNames';
import { Slot } from '@radix-ui/react-slot';

/**
 * Badge — a small status/metadata label (badge, tag, chip, pill).
 *
 * One primitive, many looks: every axis is an independent prop so surfaces can
 * swap variation without new components —
 *
 *   variant  solid | soft | outline | ghost      fill strength
 *   color    neutral | primary | accent | secondary |
 *            success | warning | danger | info
 *   size     small | medium | large
 *   shape    pill | rounded
 *   dot      leading status dot in the badge color
 *   asChild  render as the child element (a link, a button) via Radix Slot,
 *            so an interactive badge keeps real semantics and focus behavior
 *
 * Theming follows the library contract: the component consumes `--badge-*`
 * variables with working fallbacks, so it renders sensibly out of the box and
 * apps re-skin it from their theme without touching the component.
 */
/**
 * Every colour here has a `--_badge-color` rule in Badge.module.css — the union
 * and the stylesheet are one list, so a colour can never type-check its way to
 * an unstyled badge.
 */
export type BadgeColor =
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  asChild?: boolean;
  variant?: 'solid' | 'soft' | 'outline' | 'ghost';
  color?: BadgeColor;
  size?: 'small' | 'medium' | 'large';
  shape?: 'pill' | 'rounded';
  /** Leading status dot in the badge color. */
  dot?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant = 'soft',
      color = 'neutral',
      size = 'medium',
      shape = 'pill',
      dot = false,
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'span';

    return (
      <Comp
        className={cl(
          style.Root,
          style[variant],
          style[color],
          style[size],
          style[shape],
          className
        )}
        ref={ref}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            {dot && <span className={style.dot} aria-hidden />}
            {children}
          </>
        )}
      </Comp>
    );
  }
);
Badge.displayName = 'Badge';

export { Badge };
