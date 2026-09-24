import * as React from 'react';

import style from './Form.module.css';
import { cl } from '@_linked/react/utils/ClassNames';

import * as FormPrimitive from '@radix-ui/react-form';

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

const Root = extend(FormPrimitive.Root, style.Root);
const Field = extend(FormPrimitive.Field, style.Field);
const Label = extend(FormPrimitive.Label, style.Label);
const Control = extend(FormPrimitive.Control, style.Control);
const Message = extend(FormPrimitive.Message, style.Message);
const ValidityState = extend(FormPrimitive.ValidityState, style.ValidityState);
const Submit = extend(FormPrimitive.Submit, style.Submit);

export const Form = {
  Root,
  Field,
  Label,
  Control,
  Message,
  ValidityState,
  Submit,
};

export { Root, Field, Label, Control, Message, ValidityState, Submit };
