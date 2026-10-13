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

// Annotated so the emitted declarations name `typeof FormPrimitive.X` instead of the inferred
// types, which point into @radix-ui/react-form's own nested copies of its radix dependencies
// whenever an app's install cannot hoist them (TS2742).
type Extended<C extends React.FunctionComponent<any>> =
  React.ForwardRefExoticComponent<
    React.PropsWithoutRef<React.ComponentPropsWithoutRef<C>> &
      React.RefAttributes<React.ComponentRef<C>>
  >;

const Root: Extended<typeof FormPrimitive.Root> = extend(
  FormPrimitive.Root,
  style.Root
);
const Field: Extended<typeof FormPrimitive.Field> = extend(
  FormPrimitive.Field,
  style.Field
);
const Label: Extended<typeof FormPrimitive.Label> = extend(
  FormPrimitive.Label,
  style.Label
);
const Control: Extended<typeof FormPrimitive.Control> = extend(
  FormPrimitive.Control,
  style.Control
);
const Message: Extended<typeof FormPrimitive.Message> = extend(
  FormPrimitive.Message,
  style.Message
);
const ValidityState: Extended<typeof FormPrimitive.ValidityState> = extend(
  FormPrimitive.ValidityState,
  style.ValidityState
);
const Submit: Extended<typeof FormPrimitive.Submit> = extend(
  FormPrimitive.Submit,
  style.Submit
);

export const Form: {
  Root: typeof Root;
  Field: typeof Field;
  Label: typeof Label;
  Control: typeof Control;
  Message: typeof Message;
  ValidityState: typeof ValidityState;
  Submit: typeof Submit;
} = {
  Root,
  Field,
  Label,
  Control,
  Message,
  ValidityState,
  Submit,
};

export { Root, Field, Label, Control, Message, ValidityState, Submit };
