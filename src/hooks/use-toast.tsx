// Inspired by react-hot-toast library
// https://ui.shadcn.com/docs/components/toast
import * as React from 'react';
import { sharedState } from '@_linked/core/utils/sharedState';

import type { ToastActionElement, ToastProps } from '../components/Toast.js';

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

const actionTypes = {
  ADD_TOAST: 'ADD_TOAST',
  UPDATE_TOAST: 'UPDATE_TOAST',
  DISMISS_TOAST: 'DISMISS_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
} as const;

function genId() {
  store.count = (store.count + 1) % Number.MAX_SAFE_INTEGER;
  return store.count.toString();
}

type ActionType = typeof actionTypes;

type Action =
  | {
      type: ActionType['ADD_TOAST'];
      toast: ToasterToast;
    }
  | {
      type: ActionType['UPDATE_TOAST'];
      toast: Partial<ToasterToast>;
    }
  | {
      type: ActionType['DISMISS_TOAST'];
      toastId?: ToasterToast['id'];
    }
  | {
      type: ActionType['REMOVE_TOAST'];
      toastId?: ToasterToast['id'];
    };

interface State {
  toasts: ToasterToast[];
}

interface ToastStore {
  /** The last toast id handed out; shared so ids from two copies never collide. */
  count: number;
  listeners: Array<(state: State) => void>;
  memoryState: State;
  toastTimeouts: Map<string, ReturnType<typeof setTimeout>>;
}

/**
 * The toast store lives on `globalThis` (core's `sharedState`), not in module scope, so
 * `toast()` from one copy of this module reaches a `<Toaster/>` rendered by another — e.g.
 * Vite's SSR runner and Node under `linked start`, or two browser bundles. A container made
 * by an older copy may lack a field; `ensureFields` fills it rather than assuming the layout.
 */
const store = ensureFields(
  sharedState<Partial<ToastStore>>('@_linked/primitives', 'toast', () => ({})),
);

function ensureFields(s: Partial<ToastStore>): ToastStore {
  s.count ??= 0;
  s.listeners ??= [];
  s.memoryState ??= { toasts: [] };
  s.toastTimeouts ??= new Map();
  return s as ToastStore;
}

const addToRemoveQueue = (toastId: string) => {
  if (store.toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    store.toastTimeouts.delete(toastId);
    dispatch({
      type: 'REMOVE_TOAST',
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY);

  store.toastTimeouts.set(toastId, timeout);
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case 'UPDATE_TOAST':
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case 'DISMISS_TOAST': {
      const { toastId } = action;

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      };
    }
    case 'REMOVE_TOAST':
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
};

function dispatch(action: Action) {
  store.memoryState = reducer(store.memoryState, action);
  store.listeners.forEach((listener) => {
    listener(store.memoryState);
  });
}

type Toast = Omit<ToasterToast, 'id'>;

function toast({ ...props }: Toast) {
  const id = genId();

  const update = (props: ToasterToast) =>
    dispatch({
      type: 'UPDATE_TOAST',
      toast: { ...props, id },
    });
  const dismiss = () => dispatch({ type: 'DISMISS_TOAST', toastId: id });

  dispatch({
    type: 'ADD_TOAST',
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });

  return {
    id: id,
    dismiss,
    update,
  };
}

function useToast() {
  const [state, setState] = React.useState<State>(store.memoryState);

  React.useEffect(() => {
    store.listeners.push(setState);
    return () => {
      const index = store.listeners.indexOf(setState);
      if (index > -1) {
        store.listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: 'DISMISS_TOAST', toastId }),
  };
}

export { useToast, toast };
