import * as React from 'react';

import style from './Progress.module.css';
import { cl } from '@_linked/react/utils/ClassNames';

import * as ProgressPrimitive from '@radix-ui/react-progress';

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

const Indicator = extend(ProgressPrimitive.Indicator, style.Indicator);

const Root = React.forwardRef<
  React.ComponentRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cl(style.Root, className)}
    {...props}
  >
    <Indicator
      className={style.Indicator}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Root.displayName = ProgressPrimitive.Root.displayName;

export const Progress = {
  Root,
  Indicator,
};

export { Root, Indicator };
