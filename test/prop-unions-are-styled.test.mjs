import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = (name) =>
  readFileSync(new URL(`../src/components/${name}`, import.meta.url), 'utf8');

/**
 * A widened union is only an improvement if every value it now admits is
 * actually styled — a `color` the stylesheet has never heard of is a worse
 * outcome than the type error it replaced. These tests keep the unions and the
 * stylesheets in step.
 */

test('every BadgeColor has a --_badge-color rule', () => {
  const source = read('Badge.tsx');
  const stylesheet = read('Badge.module.css');

  const union = source.match(/export type BadgeColor =([^;]+);/);
  assert.ok(union, 'BadgeColor union not found in Badge.tsx');

  const colors = [...union[1].matchAll(/'([a-z-]+)'/g)].map((m) => m[1]);
  assert.ok(colors.length >= 6, `expected the full colour set, got ${colors}`);

  for (const color of colors) {
    assert.match(
      stylesheet,
      new RegExp(`\\.${color}\\s*\\{[^}]*--_badge-color:`),
      `Badge color "${color}" is in the type union but has no rule in Badge.module.css`
    );
  }
});

test('every Heading level has a .Root.levelN rule, and h1-h6 stay tag-styled', () => {
  const source = read('Heading.tsx');
  const stylesheet = read('Heading.module.css');

  const levels = source.match(/level\?:([^;]+);/);
  assert.ok(levels, 'level prop not found in Heading.tsx');

  for (const level of [...levels[1].matchAll(/\d/g)].map((m) => m[0])) {
    assert.match(
      stylesheet,
      new RegExp(`\\.Root\\.level${level}\\s*[,{]`),
      `Heading level ${level} is accepted but has no .Root.level${level} rule`
    );
    assert.match(
      stylesheet,
      new RegExp(`h${level}\\.Root\\s*[,{]`),
      `<h${level}> no longer picks up its heading tokens from the tag alone`
    );
  }
});
