import * as React from 'react';

import style from './Toolbar.module.css';
import { cl } from '@_linked/react/utils/ClassNames';

import * as ToolbarPrimitive from '@radix-ui/react-toolbar';

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

const Root = extend(ToolbarPrimitive.Root, style.Root);
const Button = extend(ToolbarPrimitive.Button, style.Button);
const Link = extend(ToolbarPrimitive.Link, style.Link);
const ToggleGroup = extend(ToolbarPrimitive.ToggleGroup, style.ToggleGroup);
const ToggleItem = extend(ToolbarPrimitive.ToggleItem, style.ToggleItem);
const Separator = extend(ToolbarPrimitive.Separator, style.Separator);

export const Toolbar = {
  Root,
  Button,
  Link,
  ToggleGroup,
  ToggleItem,
  Separator,
};

export { Root, Button, Link, ToggleGroup, ToggleItem, Separator };
