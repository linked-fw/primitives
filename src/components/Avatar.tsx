import * as React from 'react';

import style from './Avatar.module.css';
import { cl } from '@_linked/react/utils/ClassNames';

import * as AvatarPrimitive from '@radix-ui/react-avatar';

// TODO: setup size props
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

const Root = extend(AvatarPrimitive.Root, style.Root);
const Image = extend(AvatarPrimitive.Image, style.Image);
const Fallback = extend(AvatarPrimitive.Fallback, style.Fallback);

export const Avatar = {
  Root,
  Image,
  Fallback,
};

export { Root, Image, Fallback };
