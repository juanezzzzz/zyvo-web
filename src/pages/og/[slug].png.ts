// Imágenes para compartir el link (1200x630): /og/inicio.png y una por proyecto.
// Se generan al compilar con Satori (layout a SVG) y sharp (SVG a PNG).
import type { APIRoute, GetStaticPaths } from 'astro';
import { readFile } from 'node:fs/promises';
import satori from 'satori';
import sharp from 'sharp';
import { getProjects } from '../../lib/get-projects';
import { accents } from '../../lib/projects';
import { site } from '../../data/site';

type Card = { title: string; kicker: string; accent: string; badge?: string };

export const getStaticPaths = (async () => {
  const projects = await getProjects();
  return [
    { params: { slug: 'inicio' }, props: { title: 'Construimos el software que tu empresa necesita.', kicker: 'Software a la medida en Yopal, Casanare', accent: '#2456E8' } },
    ...projects.map((p) => ({
      params: { slug: p.slug },
      props: { title: p.name, kicker: p.kind, accent: accents[p.accent], badge: p.highlight },
    })),
  ];
}) satisfies GetStaticPaths;

const font = (w: number) => readFile(new URL(`../../../node_modules/@fontsource/archivo/files/archivo-latin-${w}-normal.woff`, import.meta.url));

// Isotipo Zyvo como imagen (Satori dibuja mejor los SVG complejos como <img>)
const iso = (band: string) =>
  'data:image/svg+xml;base64,' +
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs><clipPath id="c"><polygon points="100,4 183,52 183,148 100,196 17,148 17,52"/></clipPath></defs><path fill="#F5F4EF" stroke="#F5F4EF" stroke-width="8" stroke-linejoin="round" d="M22.06 88V55L100 10L177.94 55V88L100 46ZM177.94 112V145L100 190L22.06 145V112L100 154Z"/><path clip-path="url(#c)" fill="${band}" d="M10 102L64 79C80 72 88 93 100 100C112 93 125 76 149.4 69.6L190 52V106L136.1 122C120 128 112 107 100 100C88 107 75 124 50.6 130.4L10 147Z"/></svg>`,
  ).toString('base64');

const band = (accent: string) =>
  'data:image/svg+xml;base64,' +
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630"><path d="M820 70 980 162v184L820 438 660 346V162Z" fill="none" stroke="#C9CED6" stroke-opacity=".25" stroke-width="3"/><path d="M-20 560H560L640 514H860L1000 433H1220" fill="none" stroke="${accent}" stroke-width="34" stroke-linejoin="round"/><path d="M-20 596H580L660 550H880L1020 469H1220" fill="none" stroke="${accent}" stroke-opacity=".3" stroke-width="6"/></svg>`,
  ).toString('base64');

const h = (type: string, style: Record<string, unknown>, children?: unknown, extra: Record<string, unknown> = {}) => ({ type, props: { style, children, ...extra } });

export const GET: APIRoute = async ({ props }) => {
  const { title, kicker, accent, badge } = props as Card;
  const tree = h('div', { width: 1200, height: 630, display: 'flex', flexDirection: 'column', background: '#090C11', padding: '64px 72px', fontFamily: 'Archivo', color: '#F5F4EF', position: 'relative' }, [
    h('img', { position: 'absolute', left: 0, top: 0, width: 1200, height: 630 }, undefined, { src: band(accent), width: 1200, height: 630 }),
    h('div', { display: 'flex', alignItems: 'center', gap: 16 }, [
      h('img', { width: 56, height: 56 }, undefined, { src: iso('#4766F5'), width: 56, height: 56 }),
      h('div', { display: 'flex', flexDirection: 'column', lineHeight: 1 }, [
        h('span', { fontSize: 28, fontWeight: 800, letterSpacing: 2 }, 'ZYVO'),
        h('span', { fontSize: 11, fontWeight: 500, letterSpacing: 6, opacity: 0.75, marginTop: 4 }, 'SOLUTIONS'),
      ]),
    ]),
    h('div', { display: 'flex', flexDirection: 'column', marginTop: 70, maxWidth: 900 }, [
      h('span', { fontSize: 28, fontWeight: 500, color: '#A3AAB7' }, kicker),
      h('span', { fontSize: title.length > 30 ? 66 : 92, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2, marginTop: 18 }, title),
    ]),
    ...(badge
      ? [h('div', { display: 'flex', position: 'absolute', right: 72, top: 64, background: '#2BD67B', color: '#090C11', fontSize: 22, fontWeight: 800, padding: '10px 18px', borderRadius: 8 }, badge)]
      : []),
    h('span', { position: 'absolute', right: 72, bottom: 40, fontSize: 22, fontWeight: 500, color: '#F5F4EF' }, new URL(import.meta.env.SITE).host),
  ]);

  const svg = await satori(tree as never, {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Archivo', data: await font(500), weight: 500, style: 'normal' },
      { name: 'Archivo', data: await font(800), weight: 800, style: 'normal' },
    ],
  });
  const png = await sharp(Buffer.from(svg)).png({ palette: true, quality: 90, compressionLevel: 9, effort: 10 }).toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
