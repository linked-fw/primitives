import assert from 'node:assert/strict';
import test from 'node:test';
import * as React from 'react';
import { renderToString } from 'react-dom/server';

const { relativeTime, exactTime } = await import(
  new URL('../lib/esm/utils/relativeTime.js', import.meta.url)
);
const { RelativeTime } = await import(
  new URL('../lib/esm/components/RelativeTime.js', import.meta.url)
);

const now = Date.parse('2026-10-25T12:00:00Z');
const ago = (ms) => new Date(now - ms).toISOString();

test('relativeTime picks the largest unit that fits', () => {
  assert.equal(relativeTime(ago(0), now, 'en'), 'now');
  assert.equal(relativeTime(ago(5_000), now, 'en'), '5 seconds ago');
  assert.equal(relativeTime(ago(18 * 60_000), now, 'en'), '18 minutes ago');
  assert.equal(relativeTime(ago(3 * 3_600_000), now, 'en'), '3 hours ago');
  assert.equal(relativeTime(ago(86_400_000), now, 'en'), 'yesterday');
  assert.equal(relativeTime(ago(2 * 604_800_000), now, 'en'), '2 weeks ago');
  assert.equal(relativeTime(ago(3 * 31_557_600_000), now, 'en'), '3 years ago');
});

test('relativeTime formats the future and accepts a Date', () => {
  assert.equal(relativeTime(new Date(now + 2 * 86_400_000), now, 'en'), 'in 2 days');
});

test('relativeTime follows the locale', () => {
  assert.equal(relativeTime(ago(18 * 60_000), now, 'nl'), '18 minuten geleden');
});

test('an invalid date returns the input string, or empty for a Date', () => {
  assert.equal(relativeTime('not a date', now), 'not a date');
  assert.equal(relativeTime(new Date('nope'), now), '');
  assert.equal(exactTime('not a date'), 'not a date');
  assert.equal(exactTime(new Date('nope')), '');
});

test('exactTime is the locale date and time', () => {
  const date = new Date(now);
  assert.equal(exactTime(date, 'en'), date.toLocaleString('en'));
  assert.equal(exactTime(date.toISOString(), 'en'), date.toLocaleString('en'));
});

test('RelativeTime renders a <time> with the ISO date and the exact time as title', () => {
  const date = new Date(Date.now() - 3 * 86_400_000);
  const html = renderToString(
    React.createElement(RelativeTime, { date: date.toISOString(), locale: 'en', className: 'stamp' })
  );
  assert.match(html, /^<time /);
  assert.match(html, new RegExp(`dateTime="${date.toISOString()}"`));
  assert.ok(html.includes(`title="${exactTime(date, 'en')}"`), html);
  assert.match(html, /class="stamp"/);
  assert.match(html, />3 days ago<\/time>$/);
});

test('RelativeTime renders an unparseable string as text without dateTime', () => {
  const html = renderToString(React.createElement(RelativeTime, { date: 'unknown' }));
  assert.equal(html, '<time>unknown</time>');
});
