// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Cambia esto por tu dominio final para que el SEO y Open Graph usen URLs absolutas
  site: 'https://zyvosolutions.com',

  build: { inlineStylesheets: 'auto' },
  vite: { plugins: [tailwindcss()] },
  integrations: [react(), sitemap()],
});