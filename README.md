# Zyvo Solutions · Sitio web

Sitio de presentación de Zyvo Solutions (Control Z Team): servicios, proyectos, proceso, equipo y contacto.

**Stack:** [Astro 5](https://astro.build) + [Tailwind CSS 4](https://tailwindcss.com), con islas de [React 19](https://react.dev) solo donde hay interacción.

| Librería | Para qué |
|---|---|
| `motion` | Transiciones del selector de proyectos y del formulario |
| `gsap` + ScrollTrigger | Entrada del hero y la banda del proceso que se dibuja con el scroll |
| `lenis` | Scroll suave (se desactiva con "reducir movimiento") |
| `react-hook-form` + `zod` | Validación del formulario de contacto |
| `lucide-react` / `@lucide/astro` | Iconos |
| `@astrojs/sitemap` | `sitemap-index.xml` para SEO |
| `astro:assets` | Imágenes optimizadas a WebP en varios tamaños |
| `satori` + `sharp` | Imágenes para compartir el link (Open Graph), generadas al compilar |

Fuentes Archivo (con eje de ancho) y JetBrains Mono servidas localmente con Fontsource.

## Empezar

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera /dist
npm run preview  # sirve /dist localmente
```

Requiere Node 18.20+ (recomendado Node 20 o 22).

## Qué editar

| Quiero cambiar… | Archivo |
|---|---|
| Correo, WhatsApp, redes, textos generales | `src/data/site.ts` |
| Servicios, proceso, tecnologías, públicos y preguntas frecuentes | `src/data/site.ts` |
| Video de contenido (resina) | `src/components/Content.astro` + `public/videos/` |
| Proyectos y sus páginas de caso | `src/content/proyectos/*.md` |
| Colores y fuentes de marca | `src/styles/global.css` (bloque `@theme`) |
| Dominio para SEO | Lo pone el workflow de Pages; en local, `astro.config.mjs` → `site` |

### Agregar un proyecto

Cada proyecto es un archivo Markdown en `src/content/proyectos/`. El nombre del archivo es su URL: `agroia.md` → `/proyectos/agroia/`.

1. Copia uno de los `.md` existentes y cambia el nombre del archivo.
2. Edita los datos de arriba (entre `---`): nombre, tipo, resumen, viñetas, tecnologías, `accent` (color: `azul`, `senal`, `alerta` o `luz`) y `order` (posición en la lista).
3. Escribe el caso debajo en Markdown: `## El reto`, `## Lo que construimos`, `## Cómo lo hicimos`.
4. (Opcional) Pon una captura en `public/projects/mi-proyecto.webp` y escribe `image: /projects/mi-proyecto.webp`. Sin imagen se muestra la maqueta ilustrada del producto (`src/components/ProjectMockup.tsx`); un proyecto nuevo sin imagen ni maqueta necesita que agregues su escena ahí o una captura.
5. (Opcional) Agrega enlaces: `links: [{ label: Ver demo, href: "https://…" }]`.
6. Marca uno con `featured: true` para que aparezca seleccionado al cargar el inicio.

Cada proyecto tiene enlace directo desde el inicio: `/?proyecto=agroia`.

**Video del caso (opcional):** pon el MP4 y su portada en `public/videos/` y agrega `video:` al `.md` (ver `gamerzone.md`). Recomendado: H.264 a 720p con `-movflags +faststart` y una portada WebP, por ejemplo:

```bash
ffmpeg -i original.mp4 -vf scale=1280:720 -c:v libx264 -preset slow -crf 24 -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 112k public/videos/mi-caso.mp4
ffmpeg -ss 5 -i original.mp4 -frames:v 1 -vf scale=1280:720 -c:v libwebp -quality 82 public/videos/mi-caso.webp
```

Si un dato está mal escrito, `npm run build` te dice exactamente cuál (los campos se validan con Zod en `src/content.config.ts`).

La imagen para compartir en redes (`/og/<proyecto>.png`) se genera sola al compilar.

### Formulario de contacto

- **Sin configurar:** al enviar, abre WhatsApp con el mensaje ya escrito (usa el número de `site.ts`).
- **Para recibir correos:** crea un formulario gratis en [Formspree](https://formspree.io), copia el endpoint y pégalo en `formEndpoint` dentro de `src/data/site.ts`.

## Desplegar

### GitHub Pages (configurado)

El workflow `.github/workflows/deploy.yml` compila y publica la web en cada push a `main`. También se puede lanzar a mano desde la pestaña **Actions**.

- URL: https://juanezzzzz.github.io/zyvo-web/
- Requisito (una sola vez): **Settings → Pages → Source: GitHub Actions**.
- El dominio y la subcarpeta (`/zyvo-web`) los pone el workflow. En el código, usa siempre `url('/ruta')` de `src/lib/url.ts` para enlaces internos, nunca `href="/ruta"` directo, o se romperán en Pages.

**Dominio propio:** en Settings → Pages → Custom domain escribe el dominio (ej. `zyvosolutions.com`) y configura el DNS como indica GitHub. El siguiente despliegue usa el dominio y quita la subcarpeta solo, sin cambiar código.

### Otros hostings

Es un sitio estático (`npm run build` → carpeta `dist`). Vercel y Netlify detectan Astro solos.

## Estructura

```
src/
  assets/       zy-robot.webp, datacenter.webp (recortadas de /visuales)
  components/   Header, Hero, Services, Projects, Process, Team, Contact, Footer, Iso/Logo, HexBadge
                ProjectShowcase.tsx y ContactForm.tsx son islas React
  scripts/      motion.ts (Lenis + GSAP, respeta prefers-reduced-motion)
  data/         site.ts  ← textos generales, servicios, proceso, stack
  layouts/      Base.astro (SEO, Open Graph, JSON-LD)
  content/      proyectos/*.md  ← un archivo por caso
  pages/        index.astro, 404.astro, proyectos/[slug].astro, og/[slug].png.ts
  styles/       global.css (tokens de marca)
public/         favicon.svg, /projects (capturas)
```

## Pendientes antes de publicar

- [ ] Reemplazar correo, WhatsApp y redes de ejemplo en `src/data/site.ts`.
- [ ] (Opcional) Conectar un dominio propio en Settings → Pages.
- [ ] Agregar capturas reales de los proyectos y enlaces a demos o repos.
