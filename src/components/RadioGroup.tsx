import * as React from 'react';

import style from './RadioGroup.module.css';
import { cl } from '@_linked/react/utils/ClassNames';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

const Root = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cl(style.Root, className)}
      {...props}
      ref={ref}
    />
  );
});
Root.displayName = RadioGroupPrimitive.Root.displayName;

const Item = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cl(style.Item, className)}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className={style.Indicator} />
    </RadioGroupPrimitive.Item>
  );
});
Item.displayName = RadioGroupPrimitive.Item.displayName;

export const RadioGroup = {
  Root,
  Item,
};

export { Root, Item };
