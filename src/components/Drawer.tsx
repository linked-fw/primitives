/**
 * copy from https://ui.shadcn.com/docs/components/drawer
 */

import * as React from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';
import style from './Drawer.module.css';
import { cl } from '@_linked/react/utils/ClassNames';

const Root = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
);
Root.displayName = 'Root';

const Trigger: React.ForwardRefExoticComponent<
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Trigger> &
    React.RefAttributes<React.ComponentRef<typeof DrawerPrimitive.Trigger>>
> = DrawerPrimitive.Trigger;

const Portal = DrawerPrimitive.Portal;

const Close: React.ForwardRefExoticComponent<
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Close> &
    React.RefAttributes<React.ComponentRef<typeof DrawerPrimitive.Close>>
> = DrawerPrimitive.Close;

const Overlay: React.ForwardRefExoticComponent<
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay> &
    React.RefAttributes<React.ComponentRef<typeof DrawerPrimitive.Overlay>>
> = React.forwardRef<
  React.ComponentRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cl(style.Overlay, className)}
    {...props}
  />
));
Overlay.displayName = DrawerPrimitive.Overlay.displayName;

interface ContentProps
  extends React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> {
  // TODO: later will move to Root
  hideHandle?: boolean;
}
const Content = React.forwardRef<
  React.ComponentRef<typeof DrawerPrimitive.Content>,
  ContentProps
>(({ className, hideHandle, children, ...props }, ref) => (
  <Portal>
    <Overlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cl(style.Content, className)}
      {...props}
    >
      {!hideHandle && <div className={style.Handle} />}
      {children}
    </DrawerPrimitive.Content>
  </Portal>
));
Content.displayName = 'Content';

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

const Title: React.ForwardRefExoticComponent<
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title> &
    React.RefAttributes<React.ComponentRef<typeof DrawerPrimitive.Title>>
> = React.forwardRef<
  React.ComponentRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cl(style.Title, className)}
    {...props}
  />
));
Title.displayName = DrawerPrimitive.Title.displayName;

const Description: React.ForwardRefExoticComponent<
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description> &
    React.RefAttributes<React.ComponentRef<typeof DrawerPrimitive.Description>>
> = React.forwardRef<
  React.ComponentRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cl(style.Description, className)}
    {...props}
  />
));
Description.displayName = DrawerPrimitive.Description.displayName;

export const Drawer: {
  Root: typeof Root;
  Portal: typeof Portal;
  Overlay: typeof Overlay;
  Trigger: typeof Trigger;
  Close: typeof Close;
  Content: typeof Content;
  Header: typeof Header;
  Footer: typeof Footer;
  Title: typeof Title;
  Description: typeof Description;
} = {
  Root,
  Portal,
  Overlay,
  Trigger,
  Close,
  Content,
  Header,
  Footer,
  Title,
  Description,
};

export {
  Root,
  Portal,
  Overlay,
  Trigger,
  Close,
  Content,
  Header,
  Footer,
  Title,
  Description,
};
