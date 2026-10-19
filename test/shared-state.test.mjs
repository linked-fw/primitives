import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test, { after } from 'node:test';
import * as React from 'react';
import { renderToString } from 'react-dom/server';

/**
 * A module can be evaluated twice in one runtime (Vite's SSR runner and Node under
 * `linked start`, or two browser bundles). The `?copy` query makes Node evaluate the built
 * file a second time, which is exactly that: two module instances, one `globalThis`.
 */
const toastUrl = new URL('../lib/esm/hooks/use-toast.js', import.meta.url);
const copyA = await import(toastUrl.href);
const copyB = await import(`${toastUrl.href}?copy`);
const storeKey = Symbol.for('@_linked/primitives:toast');

// A dismissed toast is removed by a long timer; clear them so the process can exit.
after(() => {
  for (const timeout of globalThis[storeKey].toastTimeouts.values()) clearTimeout(timeout);
});

test('the two imports are separate module instances', () => {
  assert.notEqual(copyA.toast, copyB.toast);
  assert.notEqual(copyA.useToast, copyB.useToast);
});

test("a toast pushed through one copy reaches the other copy's subscribers", () => {
  const seen = [];
  // What copy B's useToast() registers in its effect.
  globalThis[storeKey].listeners.push((state) => seen.push(state));

  const { id, dismiss } = copyA.toast({ title: 'Saved from copy A' });

  assert.equal(seen.length, 1);
  assert.equal(seen[0].toasts[0].id, id);
  assert.equal(seen[0].toasts[0].title, 'Saved from copy A');

  // copy B's useToast starts from the same memory state.
  const Probe = () => {
    const { toasts } = copyB.useToast();
    return React.createElement('p', null, toasts.map((t) => t.title).join(','));
  };
  assert.match(renderToString(React.createElement(Probe)), /Saved from copy A/);

  dismiss();
  assert.equal(seen.at(-1).toasts[0].open, false);
  globalThis[storeKey].listeners.length = 0;
});

test('ids from the two copies do not collide', () => {
  const a = copyA.toast({ title: 'a' });
  const b = copyB.toast({ title: 'b' });
  assert.notEqual(a.id, b.id);
  a.dismiss();
  b.dismiss();
});

test('the compound-component contexts are kept in shared state', () => {
  for (const file of ['Combobox', 'MultiSelect']) {
    const source = readFileSync(new URL(`../src/components/${file}.tsx`, import.meta.url), 'utf8');
    assert.match(source, new RegExp(`sharedState\\([^)]*'@_linked/primitives',\\s*'${file}\\.contexts'`));
    // The only createContext call is the one inside the sharedState initialiser.
    assert.equal(source.match(/createContext</g)?.length, 1, `${file}: one createContext`);
    assert.match(source, /=>\s*\(\{\s*\w+Context: (React\.)?createContext</);
  }
});
