// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // En GitHub Actions estos valores llegan del workflow (dominio y subcarpeta de GitHub Pages).
  // En local: dominio de producción y raíz. Con dominio propio en Pages, BASE_PATH queda vacío.
  site: process.env.SITE_URL || 'https://zyvosolutions.com',
  base: process.env.BASE_PATH || '/',

  build: { inlineStylesheets: 'auto' },
  vite: { plugins: [tailwindcss()] },
  // Todas las páginas reales terminan en '/'; evita una entrada duplicada del inicio con subcarpeta
  integrations: [react(), sitemap({ filter: (page) => page.endsWith('/') })],
});