import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { test } from 'node:test';

const root = new URL('../', import.meta.url);

test('the site consumes the published shared package and SiteRenderer', async () => {
  const pkg = JSON.parse(await readFile(new URL('package.json', root), 'utf8'));
  assert.match(pkg.dependencies['@quorlansoftware/astro-web-components'], /^git\+https:\/\/github\.com\/quorlansoftware-prog\/astro-web-components\.git#main$/);
  const page = await readFile(new URL('src/pages/bourbon/index.astro', root), 'utf8');
  assert.match(page, /astro-web-components\/SiteRenderer\.astro/);
  assert.match(page, /site\.json/);
});

test('local section components and fixed theme composition have been removed', async () => {
  await assert.rejects(access(new URL('src/components/BarbershopPage.astro', root)));
  await assert.rejects(access(new URL('src/data/themes.ts', root)));
});

test('the consumer owns component styling and reveal animations', async () => {
  const layout = await readFile(new URL('src/layouts/Layout.astro', root), 'utf8');
  const styles = await readFile(new URL('src/styles/components.css', root), 'utf8');
  assert.doesNotMatch(layout, /astro-web-components\/styles\/example\.css/);
  assert.match(layout, /styles\/components\.css/);
  assert.match(layout, /\[data-awc-reveal\]/);
  assert.match(styles, /font-family:\s*'Cinzel'/);
  assert.match(styles, /\.awc-header\[data-awc-scrolled\]/);
  assert.match(styles, /\.awc-hero\s*\{[^}]*text-align:\s*left/s);
  assert.match(styles, /awc-language-switcher/);
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
