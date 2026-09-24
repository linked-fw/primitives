import * as React from 'react';

import style from './Dialog.module.css';
import { cl } from '@_linked/react/utils/ClassNames';

import * as DialogPrimitive from '@radix-ui/react-dialog';

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

const Root = DialogPrimitive.Root;
const Trigger = DialogPrimitive.Trigger;
const Portal = DialogPrimitive.Portal;
const Overlay = extend(DialogPrimitive.Overlay, style.Overlay);
const Close = extend(DialogPrimitive.Close, style.Close);
const Title = extend(DialogPrimitive.Title, style.Title);
const Description = extend(DialogPrimitive.Description, style.Description);

interface ContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  hideCloseIcon?: boolean;
}

const Content = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  ContentProps
>(({ className, children, hideCloseIcon, ...props }, ref) => (
  <Portal>
    <Overlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cl(style.Content, className)}
      {...props}
    >
      {children}
      {!hideCloseIcon && (
        <Close className={style.Close}>
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </Close>
      )}
    </DialogPrimitive.Content>
  </Portal>
));
Content.displayName = DialogPrimitive.Content.displayName;

const Header = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cl(style.Header, className)} {...props} />
);
Header.displayName = 'DialogHeader';

const Footer = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cl(style.Footer, className)} {...props} />
);
Footer.displayName = 'DialogFooter';

export const Dialog = {
  Root,
  Trigger,
  Content,
  Overlay,
  Title,
  Description,
  Header,
  Footer,
  Close,
};

export {
  Root,
  Trigger,
  Content,
  Overlay,
  Title,
  Description,
  Header,
  Footer,
  Close,
};
