# Theme registry

`registry.mjs` is the local bridge between a page's `theme` id and its portable preset. It keeps the consumer responsible for loading CSS and assets while giving future library work a stable manifest shape.

Use `getThemePreset(id)` when a route or build tool needs the preset metadata. Unknown ids fall back to Bourbon so a malformed page never renders without a visual baseline.
