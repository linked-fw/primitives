import * as React from 'react';

import style from './Button.module.css';
import { cl } from '@_linked/react/utils/ClassNames';
import { Slot } from '@radix-ui/react-slot';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: 'solid' | 'outline' | 'ghost' | 'link';
  /**
   * Which colour family the button speaks in. `danger` is the destructive one — a
   * statement about consequence, and a Button prop rather than a class a caller adds,
   * because the colour classes here are compound (`.Root.primary.solid`) and a bare
   * class handed in through `className` loses the cascade to them every time.
   */
  color?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  size?: 'small' | 'medium' | 'large' | 'default';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'solid',
      color = 'primary',
      size = 'default',
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    const isDisabled = props.disabled;

    return (
      <Comp
        className={cl(
          style.Root,
          style[variant],
          style[color],
          style[size],
          isDisabled && style.disabled,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
