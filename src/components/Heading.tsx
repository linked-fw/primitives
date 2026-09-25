import * as React from 'react';

import style from './Heading.module.css';
import { cl } from '@_linked/react/utils/ClassNames';
import type { HeadingAsElement } from './elements.js';

interface HeadingProps extends React.HtmlHTMLAttributes<HTMLElement> {
  /**
   * The tag to render. `h1`–`h6` pick up that level's heading tokens from the
   * tag itself; any other container renders with no heading typography unless
   * you also pass {@link HeadingProps.level}.
   */
  as: HeadingAsElement;
  /**
   * Visual heading level, independent of the tag. Use it when the heading is
   * visual rather than semantic — a stat card's big number is a `p`, not an
   * `h2`. Omitted, nothing is added: `as="h3"` styles as an h3 and `as="p"`
   * stays unstyled, exactly as before.
   */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
}
const Heading = ({
  as: Component,
  level,
  className,
  children,
  ...props
}: HeadingProps) => {
  const combinedClassName = cl(
    style.Root,
    level ? style[`level${level}`] : undefined,
    className
  );

  return (
    <Component className={combinedClassName} {...props}>
      {children}
    </Component>
  );
};

export { Heading };
export type { HeadingProps };
