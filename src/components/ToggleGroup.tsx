import * as React from 'react';

import style from './ToggleGroup.module.css';
import { cl } from '@_linked/react/utils/ClassNames';

import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';

const Root = React.forwardRef<
  React.ComponentRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cl(style.Root, className)}
    {...props}
  >
    {children}
  </ToggleGroupPrimitive.Root>
));

const Item = React.forwardRef<
  React.ComponentRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>
>(({ className, children, ...props }, ref) => {
  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cl(style.Item, className)}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});

Item.displayName = ToggleGroupPrimitive.Item.displayName;

export const ToggleGroup = {
  Root,
  Item,
};

export { Root, Item };
