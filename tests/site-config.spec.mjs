import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';

const root = new URL('../', import.meta.url);
const site = JSON.parse(await readFile(new URL('src/content/site.json', root), 'utf8'));

test('the barbershop site is composed from one versioned JSON config', () => {
  assert.equal(site.schemaVersion, 1);
  assert.equal(site.defaultLocale, 'es');
  assert.deepEqual(site.locales.map((locale) => locale.code), ['es', 'en']);
  assert.deepEqual(site.pages.map((page) => page.id), ['bourbon', 'neon', 'minimal']);
  for (const page of site.pages) {
    assert.ok(page.header && page.sections.length && page.footer && page.dialogs?.length);
    assert.ok(page.metadata.translations.en.title);
    assert.ok(page.sections.every((block) => block.translations?.en));
  }
});

test('Spanish pages preserve their paths and English pages are generated under en', async () => {
  const pages = await Promise.all([
    'src/pages/bourbon/index.astro', 'src/pages/neon/index.astro', 'src/pages/minimal/index.astro',
    'src/pages/en/bourbon/index.astro', 'src/pages/en/neon/index.astro', 'src/pages/en/minimal/index.astro',
  ].map((path) => readFile(new URL(path, root), 'utf8')));
  assert.ok(pages.every((page) => page.includes('SiteRenderer')));
  assert.ok(pages.slice(3).every((page) => page.includes('locale="en"')));
});

test('the catalog card content is read from the shared config', async () => {
  const index = await readFile(new URL('src/pages/index.astro', root), 'utf8');
  assert.match(index, /siteConfig\.site\.catalog/);
  assert.doesNotMatch(index, /Bourbon &amp; Blade/);
});
