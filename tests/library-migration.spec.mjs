import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { test } from 'node:test';

const root = new URL('../', import.meta.url);
const names = ['Header', 'Hero', 'Services', 'About', 'Gallery', 'Testimonials', 'Contact', 'Footer', 'BookingModal'];

test('the site consumes the shared package', async () => {
  const pkg = JSON.parse(await readFile(new URL('package.json', root), 'utf8'));
  assert.match(pkg.dependencies['@quorlansoftware/astro-web-components'], /^file:/);
  const page = await readFile(new URL('src/components/BarbershopPage.astro', root), 'utf8');
  for (const name of names) assert.match(page, new RegExp(`astro-web-components/${name}\\.astro`));
});

test('local section components have been removed', async () => {
  for (const name of names) {
    await assert.rejects(access(new URL(`src/components/${name}.astro`, root)));
  }
});

test('the consumer owns component styling and reveal animations', async () => {
  const layout = await readFile(new URL('src/layouts/Layout.astro', root), 'utf8');
  const styles = await readFile(new URL('src/styles/components.css', root), 'utf8');
  assert.doesNotMatch(layout, /astro-web-components\/styles\/example\.css/);
  assert.match(layout, /styles\/components\.css/);
  assert.match(layout, /\[data-awc-reveal\]/);
  assert.match(styles, /font-family:\s*'Cinzel'/);
  assert.match(styles, /\.awc-header\[data-awc-scrolled\]/);
  assert.match(styles, /\[data-awc-reveal="up"\]/);
  assert.match(styles, /\.awc-hero\s*\{[^}]*text-align:\s*left/s);
  const page = await readFile(new URL('src/components/BarbershopPage.astro', root), 'utf8');
  assert.match(page, /slot="title"/);
  assert.match(page, /fa-scissors/);
});

test('the consumer styles the booking dialog and active navigation state', async () => {
  const styles = await readFile(new URL('src/styles/components.css', root), 'utf8');
  assert.match(styles, /\.awc-header__link\[data-awc-active\]/);
  assert.doesNotMatch(styles, /\.awc-header__link:first-child/);
  assert.match(styles, /\.awc-booking\[open\]/);
  assert.match(styles, /\.awc-booking\s*\{[^}]*margin:\s*auto/s);
  assert.match(styles, /\.awc-booking__header/);
  assert.match(styles, /\.awc-booking__fields/);
});
