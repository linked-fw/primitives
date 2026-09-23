import * as React from 'react';
import style from './Command.module.css';
import { type DialogProps } from '@radix-ui/react-dialog';
import { Command as CommandPrimitive } from 'cmdk';
import { cl } from '@_linked/react/utils/ClassNames';

import { Root as DialogRoot, Content as DialogContent } from './Dialog.js';

const Root = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cl(style.Root, className)}
    {...props}
  />
));
Root.displayName = CommandPrimitive.displayName;

interface CommandDialogProps extends DialogProps {}

const Dialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <DialogRoot {...props}>
      <DialogContent className={style.dialogContent}>
        <Root className={style.DialogCommand}>{children}</Root>
      </DialogContent>
    </DialogRoot>
  );
};

Dialog.displayName = CommandPrimitive.Dialog.displayName;

const Input = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className={style.InputContainer} cmdk-input-wrapper="">
    <svg
      className={style.Icon}
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      ></path>
    </svg>
    <CommandPrimitive.Input
      ref={ref}
      className={cl(style.Input, className)}
      {...props}
    />
  </div>
));

Input.displayName = CommandPrimitive.Input.displayName;

const List = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cl(style.list, className)}
    {...props}
  />
));

List.displayName = CommandPrimitive.List.displayName;

const Empty = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty ref={ref} className={style.Empty} {...props} />
));

Empty.displayName = CommandPrimitive.Empty.displayName;

const Group = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cl(style.Group, className)}
    {...props}
  />
));

Group.displayName = CommandPrimitive.Group.displayName;

const Separator = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cl(style.separator, className)}
    {...props}
  />
));
Separator.displayName = CommandPrimitive.Separator.displayName;

const Item = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cl(style.Item, className)}
    {...props}
  />
));

Item.displayName = CommandPrimitive.Item.displayName;

const Shortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return <span className={cl(style.shortcut, className)} {...props} />;
};
Shortcut.displayName = 'CommandShortcut';

// <Command.Root>
export const Command = {
  Root,
  Dialog,
  Input,
  List,
  Empty,
  Group,
  Item,
  Shortcut,
  Separator,
};

// <Root></Root>
export { Root, Dialog, Input, List, Empty, Group, Item, Shortcut, Separator };
