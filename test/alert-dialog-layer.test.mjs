import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const stylesheet = readFileSync(
  new URL('../src/components/AlertDialog.module.css', import.meta.url),
  'utf8'
);

/** The declarations of one rule, e.g. `.Overlay`. */
const rule = (selector) => {
  const match = stylesheet.match(new RegExp(`\\${selector}\\s*\\{([^}]*)\\}`));
  assert.ok(match, `${selector} is defined`);
  return match[1];
};

test('the alert dialog paints on the modal layer, above sticky bars of the page', () => {
  assert.match(rule('.Overlay'), /z-index:\s*var\(--layer-modal\)/);
  assert.match(rule('.Content'), /z-index:\s*calc\(var\(--layer-modal\)\s*\+\s*1\)/);
});
