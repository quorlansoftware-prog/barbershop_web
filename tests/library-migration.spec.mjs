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
  assert.match(layout, /class="no-js"/);
  assert.match(layout, /key !== 'Escape'/);
  assert.match(layout, /getThemePreset/);
  assert.match(styles, /--font-heading/);
  assert.doesNotMatch(styles, /Cinzel|Plus Jakarta Sans/);
  assert.match(styles, /html\.js \[data-awc-reveal\]/);
  assert.match(styles, /prefers-reduced-motion/);
  assert.match(styles, /\.theme-forma/);
  assert.match(styles, /\.theme-pure/);
  assert.match(styles, /\.awc-header\[data-awc-scrolled\]/);
  assert.match(styles, /\.awc-hero\s*\{[^}]*text-align:\s*left/s);
  assert.match(styles, /awc-language-switcher/);
});

test('the design library stores portable presets and Nano Banana prompts', async () => {
  const files = await Promise.all([
    'design-library/README.md',
    'design-library/references.md',
    'design-library/presets/bourbon-editorial/manifest.json',
    'design-library/presets/pure-beauty/manifest.json',
    'design-library/presets/forma-pilates/manifest.json',
    'design-library/presets/forma-pilates/prompts.md',
  ].map((path) => readFile(new URL(path, root), 'utf8')));
  assert.ok(files[0].includes('Fuente de verdad'));
  assert.ok(files[1].includes('YOYOYO'));
  assert.ok(files[2].includes('bourbon-editorial'));
  assert.ok(files[3].includes('pure-beauty'));
  assert.ok(files[4].includes('forma-pilates'));
  assert.ok(files[5].includes('Genera primero'));
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

test('demo forms have an inert action and never point to a network endpoint', async () => {
  const config = JSON.parse(await readFile(new URL('src/content/site.json', root), 'utf8'));
  for (const page of config.pages) {
    assert.equal(page.sections.find((block) => block.type === 'Contact').props.action, 'javascript:void(0)');
    assert.equal(page.dialogs.find((block) => block.type === 'BookingModal').props.action, 'javascript:void(0)');
  }
});
