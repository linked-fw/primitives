import * as React from 'react';

import style from './ScrollArea.module.css';
import { cl } from '@_linked/react/utils/ClassNames';

import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

const Scrollbar = React.forwardRef<
  React.ComponentRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = 'vertical', ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cl(style.Scrollbar, className)}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className={style.Thumb} />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
Scrollbar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

const Root = React.forwardRef<
  React.ComponentRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cl(style.Root, className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className={style.Viewport}>
      {children}
    </ScrollAreaPrimitive.Viewport>
    <Scrollbar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
));
Root.displayName = ScrollAreaPrimitive.Root.displayName;

export const ScrollArea = {
  Root,
  Scrollbar,
};

export { Root, Scrollbar };
