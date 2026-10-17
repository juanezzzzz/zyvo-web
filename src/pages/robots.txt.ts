import type { APIRoute } from 'astro';
import { site } from '../data/site';

// Permite indexar todo y le dice a los buscadores dónde está el mapa del sitio (en el dominio oficial)
export const GET: APIRoute = () =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${site.domain}/sitemap-index.xml\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
