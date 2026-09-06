// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Dominio propio en la raiz (ver CLAUDE.md). Tiene que coincidir con public/CNAME, con el dominio
  // declarado en Pages y con LLOC.url de src/site/config.ts.
  site: 'https://franciscajulianquerol.es',
  base: '/',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'ca'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({ i18n: { defaultLocale: 'es', locales: { es: 'es-ES', ca: 'ca-ES' } } }),
  ],
  // Las fuentes se descargan en el build y se sirven desde el propio sitio: ninguna peticion a
  // terceros al visitarlo. EB Garamond es la de masosdemorella y lesmeuescoses.
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'EB Garamond',
      cssVariable: '--fuente-titulos',
      weights: [400, 500, 600],
      styles: ['normal', 'italic'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['Georgia', 'Times New Roman', 'serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Source Sans 3',
      cssVariable: '--fuente-texto',
      weights: [400, 600],
      styles: ['normal', 'italic'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['system-ui', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
    },
  ],
  image: {
    responsiveStyles: true,
    layout: 'constrained',
    breakpoints: [480, 900, 1400],
  },
});
