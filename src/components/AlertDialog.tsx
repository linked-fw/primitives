import * as React from 'react';

import style from './AlertDialog.module.css';
import { cl } from '@_linked/react/utils/ClassNames';

import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

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

const Root = AlertDialogPrimitive.Root;

const Trigger = AlertDialogPrimitive.Trigger;

const Portal = AlertDialogPrimitive.Portal;

const Overlay = extend(AlertDialogPrimitive.Overlay, style.Overlay);
const Title = extend(AlertDialogPrimitive.Title, style.Title);
const Description = extend(AlertDialogPrimitive.Description, style.Description);
const Action = extend(AlertDialogPrimitive.Action, '');
const Cancel = extend(AlertDialogPrimitive.Action, '');

const Content = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <Portal>
    <Overlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cl(style.Content, className)}
      {...props}
    />
  </Portal>
));
Content.displayName = AlertDialogPrimitive.Content.displayName;

const Header = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cl(style.Header, className)} {...props} />
);
Header.displayName = 'Header';

const Footer = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cl(style.Footer, className)} {...props} />
);
Footer.displayName = 'Footer';

export const AlertDialog = {
  Root,
  Trigger,
  Overlay,
  Content,
  Header,
  Footer,
  Title,
  Description,
  Action,
  Cancel,
};

export {
  Root,
  Trigger,
  Overlay,
  Content,
  Header,
  Footer,
  Title,
  Description,
  Action,
  Cancel,
};
