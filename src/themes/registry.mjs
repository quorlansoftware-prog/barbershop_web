const themes = {
  bourbon: {
    id: 'bourbon',
    preset: 'bourbon-editorial',
    sector: 'barbershop',
    stylesheet: 'design-library/presets/bourbon-editorial/theme.css',
    fonts: ['Bebas Neue', 'DM Sans'],
    assets: ['assets/hero_bourbon.jpg', 'assets/experience_bourbon.jpg', 'assets/detail_bourbon.jpg'],
  },
  pure: {
    id: 'pure',
    preset: 'pure-beauty',
    sector: 'beauty-salon',
    stylesheet: 'design-library/presets/pure-beauty/theme.css',
    fonts: ['Cormorant Garamond', 'DM Sans'],
    assets: ['assets/hero_pure.jpg', 'assets/experience_pure.jpg', 'assets/detail_pure.jpg'],
  },
  forma: {
    id: 'forma',
    preset: 'forma-pilates',
    sector: 'pilates-studio',
    stylesheet: 'design-library/presets/forma-pilates/theme.css',
    fonts: ['Space Grotesk', 'DM Sans'],
    assets: ['assets/hero_forma.jpg', 'assets/experience_forma.jpg', 'assets/detail_forma.jpg'],
  },
};

export const themeRegistry = Object.freeze(themes);

export function getThemePreset(themeId) {
  return themeRegistry[themeId] ?? themeRegistry.bourbon;
}

export function getThemeClass(themeId) {
  return getThemePreset(themeId).id;
}
