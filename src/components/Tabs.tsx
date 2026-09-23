import * as React from 'react';

import style from './Tabs.module.css';
import { cl } from '@_linked/react/utils/ClassNames';
import * as TabsPrimitive from '@radix-ui/react-tabs';

// const Root = TabsPrimitive.Root;
function extend<C extends React.FunctionComponent<any>>(
  Component: C,
  baseClassName
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
const Root = extend(TabsPrimitive.Root, style.Root);
const List = extend(TabsPrimitive.List, style.List);
const Trigger = extend(TabsPrimitive.Trigger, style.Trigger);
const Content = extend(TabsPrimitive.Content, style.Content);

export const Tabs = {
  Root,
  List,
  Trigger,
  Content,
};
export { Root, List, Trigger, Content };
