import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import style from './Combobox.module.css';
import { cl } from '@_linked/react/utils/ClassNames';
import { sharedState } from '@_linked/core/utils/sharedState';
import {
  Root as CommandRoot,
  Input as CommandInput,
  List as CommandList,
  Empty as CommandEmpty,
  Item as CommandItem,
} from './Command.js';

/**
 * Searchable single-select. Same parts as the shadcn combobox
 * (input, popup, empty, list, item), built from the Popover and Command
 * primitives this package already has.
 * https://ui.shadcn.com/docs/components/radix/combobox
 */
interface ComboboxContextValue {
  value?: string;
  displayValue?: string;
  onValueChange?: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

// Shared across copies of this module, so a Root and its parts from different copies still meet.
const { ComboboxContext } = sharedState('@_linked/primitives', 'Combobox.contexts', () => ({
  ComboboxContext: React.createContext<ComboboxContextValue | null>(null),
}));

function useCombobox() {
  const context = React.useContext(ComboboxContext);
  if (!context) {
    throw new Error('Combobox parts must be used inside Combobox.Root');
  }
  return context;
}

interface RootProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Text shown on the closed trigger. Item values are ids, so the label is separate. */
  displayValue?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
  className?: string;
}

const Root = ({
  value,
  defaultValue = '',
  onValueChange,
  displayValue,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  children,
  className,
}: RootProps) => {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const selected = value !== undefined ? value : uncontrolledValue;
  const open = openProp !== undefined ? openProp : uncontrolledOpen;

  const setOpen = (next: boolean) => {
    onOpenChange?.(next);
    if (openProp === undefined) setUncontrolledOpen(next);
  };

  const setValue = (next: string) => {
    onValueChange?.(next);
    if (value === undefined) setUncontrolledValue(next);
  };

  return (
    <ComboboxContext.Provider
      value={{
        value: selected,
        displayValue,
        onValueChange: setValue,
        open,
        setOpen,
      }}
    >
      <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
        <div className={cl(style.Root, className)}>{children}</div>
      </PopoverPrimitive.Root>
    </ComboboxContext.Provider>
  );
};

interface TriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  placeholder?: string;
}

const Trigger = React.forwardRef<HTMLButtonElement, TriggerProps>(
  ({ className, placeholder, children, ...props }, ref) => {
    const { open, displayValue } = useCombobox();
    const label = children ?? displayValue;

    return (
      <PopoverPrimitive.Trigger asChild>
        <button
          ref={ref}
          type="button"
          role="combobox"
          aria-expanded={open}
          className={cl(style.Trigger, !label && style.placeholder, className)}
          {...props}
        >
          <span className={style.Value}>{label || placeholder}</span>
          <svg
            className={style.Icon}
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </PopoverPrimitive.Trigger>
    );
  }
);
Trigger.displayName = 'ComboboxTrigger';

const Content = React.forwardRef<
  React.ComponentRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'start', sideOffset = 4, children, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cl(style.Content, className)}
      {...props}
    >
      {/* One Command root keeps the search input, list, and items in the same cmdk tree. */}
      <CommandRoot className={style.Command}>{children}</CommandRoot>
    </PopoverPrimitive.Content>
  </PopoverPrimitive.Portal>
));
Content.displayName = 'ComboboxContent';

const Input = CommandInput;
const List = CommandList;
const Empty = CommandEmpty;

const Item = React.forwardRef<
  React.ComponentRef<typeof CommandItem>,
  React.ComponentPropsWithoutRef<typeof CommandItem> & { value: string }
>(({ className, value: itemValue, onSelect, ...props }, ref) => {
  const { value, onValueChange, setOpen } = useCombobox();

  return (
    <CommandItem
      ref={ref}
      {...props}
      value={itemValue}
      data-checked={value === itemValue ? '' : undefined}
      className={cl(style.Item, className)}
      onSelect={() => {
        // cmdk lowercases the value it passes into this callback. Use the
        // original prop so an id is returned unchanged.
        onValueChange?.(itemValue);
        onSelect?.(itemValue);
        setOpen(false);
      }}
    />
  );
});
Item.displayName = 'ComboboxItem';

export const Combobox = {
  Root,
  Trigger,
  Content,
  Input,
  List,
  Empty,
  Item,
};

export { Root, Trigger, Content, Input, List, Empty, Item };
