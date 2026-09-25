import * as React from 'react';

import style from './Typography.module.css';
import { cl } from '@_linked/react/utils/ClassNames';
import type { TextElement } from './elements.js';

interface TypographyProps extends React.HtmlHTMLAttributes<HTMLElement> {
  /**
   * The tag to render. Spread straight into JSX and styled tag-agnostically, so
   * every element in {@link TextElement} renders correctly — see `elements.ts`
   * for why this is a curated list and not every intrinsic element.
   */
  as?: TextElement;
  size?: 'small' | 'medium' | 'large' | 'default';
  children: React.ReactNode;
}
const Typography = ({
  as: Component = 'p',
  size = 'default',
  className,
  children,
  ...props
}: TypographyProps) => {
  const combinedClassName = cl(style.Root, style[size], className);

  return (
    <Component className={combinedClassName} {...props}>
      {children}
    </Component>
  );
};

export { Typography };
