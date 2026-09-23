import * as React from 'react';

import style from './NavigationMenu.module.css';
import { cl } from '@_linked/react/utils/ClassNames';

import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';

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

const List = extend(NavigationMenuPrimitive.List, style.List);
const Link = extend(NavigationMenuPrimitive.Link, style.Link);
const Item = NavigationMenuPrimitive.Item;

// TODO: custom icon?
const Trigger = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cl(style.Trigger, className)}
    {...props}
  >
    {children}{' '}
    <svg
      className={style.CaretDown}
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      ></path>
    </svg>
  </NavigationMenuPrimitive.Trigger>
));
Trigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const Content = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cl(style.Content, className)}
    {...props}
  />
));
Content.displayName = NavigationMenuPrimitive.Content.displayName;

const Viewport = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cl(style.ViewportPosition)}>
    <NavigationMenuPrimitive.Viewport
      className={cl(style.Viewport, className)}
      ref={ref}
      {...props}
    />
  </div>
));
Viewport.displayName = NavigationMenuPrimitive.Viewport.displayName;

const Indicator = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cl(style.Indicator, className)}
    {...props}
  >
    <div className={style.Arrow} />
  </NavigationMenuPrimitive.Indicator>
));
Indicator.displayName = NavigationMenuPrimitive.Indicator.displayName;

const Root = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cl(style.Root, className)}
    {...props}
  >
    {children}
    <Viewport />
  </NavigationMenuPrimitive.Root>
));
Root.displayName = NavigationMenuPrimitive.Root.displayName;

export const NavigationMenu = {
  Root,
  Trigger,
  Content,
  List,
  Item,
  Link,
  Indicator,
  Viewport,
};

export { Root, Trigger, Content, List, Item, Link, Indicator, Viewport };
