import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const dir = fileURLToPath(new URL('../src/components/', import.meta.url));
const read = (name) => readFileSync(dir + name, 'utf8');

/**
 * Button colours itself with COMPOUND selectors — `.Root.primary.solid`, specificity
 * 0-3-0. A sibling component that recolours a Button by handing it a bare class of its
 * own module (0-1-0) therefore loses the cascade silently: the class is on the element,
 * the DOM looks right, and the colour is Button's. That is exactly how `ConfirmDialog`'s
 * `tone="danger"` came to be visually inert while looking correct in every review.
 *
 * These are STYLESHEET tests. They read the CSS as text and compare selector
 * specificity; they do not render anything, so they prove that no competing
 * lower-specificity declaration exists — NOT that the button comes out red. The rendered
 * colour was measured in a browser (computed `background-color`) when this was fixed;
 * this package has no DOM test runner to keep doing that.
 */

/** Class selectors only, which is all a CSS module needs. Returns [a, b, c]. */
const specificity = (selector) => [
  (selector.match(/#[\w-]+/g) ?? []).length,
  (selector.match(/\.[\w-]+/g) ?? []).length +
    (selector.match(/\[[^\]]+\]/g) ?? []).length +
    (selector.match(/:(?!:)(?!hover|focus|active|disabled|not)[\w-]+/g) ?? [])
      .length,
  0,
];

const compare = (x, y) =>
  x[0] - y[0] || x[1] - y[1] || x[2] - y[2];

/**
 * Strip comments and statement at-rules, then walk `{}` keeping a stack of `&`-expanded
 * selectors. Each entry is one rule with the declarations written directly in it.
 */
function rules(css) {
  const source = css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/@(?:import|charset|mixin)[^;{]*;/g, '');
  const out = [];
  const stack = [];
  let buffer = '';
  for (const ch of source) {
    if (ch === '{') {
      const parents = stack.length ? stack[stack.length - 1].selectors : [''];
      const selectors = buffer
        .trim()
        .split(',')
        .map((s) => s.trim())
        .flatMap((sel) =>
          parents.map((parent) =>
            sel.includes('&')
              ? sel.replace(/&/g, parent)
              : parent
                ? `${parent} ${sel}`
                : sel
          )
        );
      const rule = { selectors, declarations: '' };
      out.push(rule);
      stack.push(rule);
      buffer = '';
    } else if (ch === '}') {
      stack.pop();
      buffer = '';
    } else {
      buffer += ch;
      // A `;` at this depth closes a declaration of the innermost open rule.
      if (ch === ';') {
        if (stack.length) stack[stack.length - 1].declarations += buffer;
        buffer = '';
      }
    }
  }
  return out;
}

/** Highest specificity at which `prop` is set anywhere in this stylesheet. */
function maxSpecificityFor(css, prop) {
  let best = null;
  for (const rule of rules(css)) {
    if (!new RegExp(`(^|;)\\s*${prop}\\s*:`).test(rule.declarations)) continue;
    for (const selector of rule.selectors) {
      const s = specificity(selector);
      if (!best || compare(s, best.specificity) > 0)
        best = { specificity: s, selector: selector.trim() };
    }
  }
  return best;
}

test('every Button color in the union is actually styled', () => {
  const source = read('Button.tsx');
  const stylesheet = read('Button.module.css');

  const union = source.match(/color\?:([^;]+);/);
  assert.ok(union, 'color prop not found in Button.tsx');

  const colors = [...union[1].matchAll(/'([a-z-]+)'/g)].map((m) => m[1]);
  assert.ok(colors.includes('danger'), `expected a danger colour, got ${colors}`);

  for (const color of colors) {
    assert.match(
      stylesheet,
      new RegExp(`&\\.${color}\\s*\\{`),
      `Button color "${color}" is accepted by the type but has no rules in Button.module.css`
    );
  }
});

test('ConfirmDialog expresses tone through Button, not through a class of its own', () => {
  const source = read('ConfirmDialog.tsx');

  assert.match(
    source,
    /color=\{tone === 'danger' \? 'danger' : 'primary'\}/,
    'ConfirmDialog no longer passes tone to Button as a colour prop'
  );
  assert.doesNotMatch(
    source,
    /className=\{cl\(tone === 'danger'/,
    'ConfirmDialog is back to overriding Button with a bare class, which loses the cascade'
  );
  assert.equal(
    maxSpecificityFor(read('ConfirmDialog.module.css'), 'background'),
    null,
    'ConfirmDialog.module.css sets a background again — it cannot outrank Button from here'
  );
});

/**
 * MultiSelect is a KNOWN, MEASURED instance of the same trap, left as-is deliberately:
 * its `.Root .button` (0-2-0) sets `background-color` on a `<Button>` whose
 * `.Root.primary.solid` (0-3-0) sets `background`, so `--multiselect-selected-bg` is
 * inert and the chip renders in `--button-primary-bg`. Fixing it is a separate design
 * decision (the chip also nests a `<button>` inside a `<button>`), so it is recorded
 * here rather than silently swept into the ConfirmDialog fix.
 */
const KNOWN_INERT = new Set(['MultiSelect.tsx']);

test('no component recolours a Button with a class that cannot outrank it', () => {
  const buttonBackground = maxSpecificityFor(read('Button.module.css'), 'background');
  assert.ok(buttonBackground, 'Button.module.css no longer sets a background');

  const offenders = [];
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.tsx'))) {
    if (file === 'Button.tsx') continue;
    const source = read(file);
    const stylesheet = (() => {
      try {
        return read(file.replace(/\.tsx$/, '.module.css'));
      } catch {
        return null;
      }
    })();
    if (!stylesheet) continue;

    for (const call of source.match(/<Button[\s\S]{0,400}?>/g) ?? []) {
      for (const [, cls] of call.matchAll(/style\.([A-Za-z][\w]*)/g)) {
        for (const prop of ['background', 'background-color', 'border-color']) {
          const own = maxSpecificityFor(stylesheet, prop);
          if (!own) continue;
          if (!own.selector.includes(`.${cls}`)) continue;
          if (compare(own.specificity, buttonBackground.specificity) < 0)
            offenders.push(
              `${file}: "${own.selector}" (${own.specificity.join('-')}) sets ${prop} on a ` +
                `<Button> whose "${buttonBackground.selector}" ` +
                `(${buttonBackground.specificity.join('-')}) wins — pass a Button prop instead`
            );
        }
      }
    }
  }

  const unexpected = offenders.filter(
    (o) => !KNOWN_INERT.has(o.slice(0, o.indexOf(':')))
  );
  assert.deepEqual(unexpected, [], unexpected.join('\n'));
});
