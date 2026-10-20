import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

/**
 * Salida estática. Para SSR más adelante (v2): instalar un adapter
 * (`@astrojs/vercel` o `@astrojs/node`), cambiar `output` a `server`
 * y dejar `export const prerender = true` en las páginas que sigan siendo estáticas.
 * Las rutas nuevas bajo demanda usan `export const prerender = false`.
 */
export default defineConfig({
  site: 'https://sororite.cl',
  output: 'static',
  trailingSlash: 'never',
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
  integrations: [
    react(),
    sitemap({
      filter: (page) =>
        !page.includes('/cursos/ejemplo-') &&
        !page.endsWith('/politica-de-privacidad') &&
        !page.endsWith('/terminos'),
    }),
  ],
});
