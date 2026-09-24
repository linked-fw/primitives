import './theme.css';
import './types.js';
import './ontologies/primitives.register.js';

//SHAPES FIRST
// import './shapes/YourShape.js';

//THEN COMPONENTS
import './components/Badge.js';
import './components/Button.js';
import './components/Input.js';
import './components/Tabs.js';
import './components/Switch.js';
import './components/Checkbox.js';
import './components/RadioGroup.js';
import './components/Avatar.js';
import './components/Label.js';
import './components/Separator.js';
import './components/Select.js';
import './components/Collapsible.js';
import './components/Textarea.js';
import './components/Accordion.js';
import './components/HoverCard.js';
import './components/AlertDialog.js';
import './components/Typography.js';
import './components/Text.js';
import './components/Heading.js';
import './components/AspectRatio.js';
import './components/Dialog.js';
import './components/ScrollArea.js';
import './components/Popover.js';
import './components/Tooltip.js';
import './components/Toggle.js';
import './components/ToggleGroup.js';
import './components/Slider.js';
import './components/Toast.js';
import './components/Toaster.js';
import './components/Progress.js';
import './components/NavigationMenu.js';
import './components/Menubar.js';
import './components/MultiSelect.js';
import './components/Spinner.js';
import './components/ConfirmDialog.js';
import './components/SkeletonLoader.js';
import './components/ImageThumb.js';
import './components/TruncatedText.js';
import './components/Breadcrumb.js';
import './components/Drawer.js';
import './components/IconButton.js';
import './components/DropdownMenu.js';
import './components/ContextMenu.js';
import './components/Form.js';
import './components/Toolbar.js';
import './components/VisuallyHidden.js';

import './hooks/use-toast.js';

// The motion presets. Reachable from the entry point so tsc emits them: this package's
// tsconfig compiles what `index.ts` reaches, not the whole src tree.
export * from './motion.js';
