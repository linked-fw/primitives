import * as React from 'react';

import style from './Tooltip.module.css';
import { cl } from '@_linked/react/utils/ClassNames';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';

function extend<C extends React.FunctionComponent<any>>(
  Component: C,
  baseClassName: string
) {
  let extended = React.forwardRef<
    React.ComponentRef<C>,
    React.ComponentPropsWithoutRef<C>
  >(({ className, ...props }, ref) =>
    React.createElement(Component, {
      ref,
      className: cl(baseClassName, className),
      ...props,
    })
  );
  extended.displayName = Component.displayName;
  return extended;
}

const Provider = TooltipPrimitive.Provider;
const Root = TooltipPrimitive.Root;
const Trigger = TooltipPrimitive.Trigger;
const Arrow = extend(TooltipPrimitive.Arrow, style.Arrow);

const Content = React.forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cl(style.Content, className)}
    {...props}
  />
));
Content.displayName = TooltipPrimitive.Content.displayName;

export const Tooltip = {
  Root,
  Provider,
  Trigger,
  Arrow,
  Content,
};

export { Root, Provider, Trigger, Arrow, Content };
