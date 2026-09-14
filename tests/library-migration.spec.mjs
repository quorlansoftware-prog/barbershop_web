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
