import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';

const root = new URL('../', import.meta.url);
const site = JSON.parse(await readFile(new URL('src/content/site.json', root), 'utf8'));

test('the portfolio is composed from one versioned JSON config', () => {
  assert.equal(site.schemaVersion, 1);
  assert.equal(site.defaultLocale, 'es');
  assert.deepEqual(site.locales.map((locale) => locale.code), ['es', 'en']);
  assert.deepEqual(site.pages.map((page) => page.id), ['bourbon', 'minimal', 'forma', 'miga']);
  assert.equal(site.site.designLibrary, 'design-library/');
  assert.deepEqual(site.site.catalog.cards.map((card) => card.pageId), ['bourbon', 'minimal', 'forma', 'miga']);
  assert.equal(site.site.catalog.cards.find((card) => card.pageId === 'miga').featured, true);
  for (const page of site.pages) {
    assert.ok(page.header && page.sections.length && page.footer);
    assert.ok(page.metadata.translations.en.title);
    assert.ok(page.sections.every((block) => block.translations?.en));
  }
});

test('Spanish pages preserve their paths and English pages are generated under en', async () => {
  const pages = await Promise.all([
    'src/pages/bourbon/index.astro', 'src/pages/neon/index.astro', 'src/pages/minimal/index.astro',
    'src/pages/forma/index.astro', 'src/pages/miga/index.astro', 'src/pages/en/bourbon/index.astro', 'src/pages/en/neon/index.astro', 'src/pages/en/minimal/index.astro', 'src/pages/en/forma/index.astro', 'src/pages/en/miga/index.astro',
  ].map((path) => readFile(new URL(path, root), 'utf8')));
  assert.ok(pages.filter((page) => page.includes('SiteRenderer')).length >= 6);
  assert.match(pages[1], /Astro.redirect\('\/portfolio\/'\)/);
  assert.match(pages[6], /Astro.redirect\('\/portfolio\/en\/'\)/);
  assert.ok(pages.at(-1).includes('pageId="miga"'));
});

test('MIGA keeps its editorial menu, gallery and translations in the shared config', () => {
  const miga = site.pages.find((page) => page.id === 'miga');
  assert.equal(miga.path, 'miga/');
  assert.equal(miga.theme, 'miga');
  assert.equal(miga.dialogs?.length ?? 0, 0);
  const menu = miga.sections.find((block) => block.id === 'menu');
  const gallery = miga.sections.find((block) => block.id === 'universe');
  assert.equal(menu.props.layout, 'horizontal');
  assert.equal(menu.props.motion, 'scroll');
  assert.equal(menu.props.images.length, 8);
  assert.equal(gallery.props.layout, 'editorial');
  assert.equal(gallery.props.lightbox, true);
  assert.equal(gallery.props.images.length, 14);
  assert.ok(menu.props.images.every((image) => image.price));
  assert.ok(miga.sections.every((block) => block.translations?.en));
});

test('the catalog card content is read from the shared config', async () => {
  const index = await readFile(new URL('src/pages/index.astro', root), 'utf8');
  assert.match(index, /siteConfig\.site\.catalog/);
  assert.doesNotMatch(index, /Bourbon &amp; Blade/);
});
