import * as React from 'react';

import style from './Toggle.module.css';
import { cl } from '@_linked/react/utils/ClassNames';

import * as TogglePrimitive from '@radix-ui/react-toggle';

const Root = React.forwardRef<
  React.ComponentRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>
>(({ className, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cl(style.Root, className)}
    {...props}
  />
));
Root.displayName = TogglePrimitive.Root.displayName;

export const Toggle = {
  Root,
};

export { Root };
