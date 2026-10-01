// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Cambia esto por tu dominio final para que el SEO y Open Graph usen URLs absolutas
  site: 'https://zyvosolutions.com',
  build: { inlineStylesheets: 'auto' },
  vite: { plugins: [tailwindcss()] },
});
