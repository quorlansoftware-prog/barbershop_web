# Quarlon Design Library

Fuente de verdad para estilos de demos y futuros temas reutilizables. Cada preset tiene tokens, estilos, manifest, prompts de Nano Banana y carpetas separadas para originales, optimizados y capturas.

## Flujo

1. Genera `originals/hero.png`, `experience.png` y `detail.png` en Nano Banana.
2. Revisa el encuadre y copia las versiones optimizadas a `public/assets/` con los nombres del manifest.
3. Mantén el prompt usado junto a la imagen y actualiza `manifest.json`.
4. El consumidor Astro importa los estilos del preset; la librería `astro-web-components` mantiene solo la estructura awc-*.

Cada preset incluye capturas `screenshots/desktop.png` y `screenshots/mobile.png` tomadas de la demo compilada. Al sustituir las imágenes de respaldo, vuelve a generar esas dos capturas y las miniaturas `public/assets/catalog_*.png`.

Los nueve originales actuales de `originals/` proceden de las imágenes generadas por el equipo en Nano Banana. Los respaldos anteriores se conservan en `archive/2026-09-14-originals/`; las copias públicas se optimizan desde los originales centrales.
