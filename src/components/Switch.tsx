import * as React from 'react';

import style from './Switch.module.css';
import { cl } from '@_linked/react/utils/ClassNames';
import * as SwitchPrimitives from '@radix-ui/react-switch';

const Switch = React.forwardRef<
  React.ComponentRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cl(style.Root, className)}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb className={cl(style.Thumb)} />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
