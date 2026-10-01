# Zyvo Solutions · Sitio web

Sitio de presentación de Zyvo Solutions (Control Z Team): servicios, proyectos, proceso, equipo y contacto.

**Stack:** [Astro 5](https://astro.build) + [Tailwind CSS 4](https://tailwindcss.com) · fuentes Archivo y JetBrains Mono servidas localmente con Fontsource · cero JavaScript de frameworks en el cliente (solo dos scripts pequeños: menú móvil y formulario).

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
| "Para quién trabajamos" y cronograma de ejemplo | `src/data/site.ts` |
| Proyectos del portafolio | `src/data/projects.ts` |
| Colores y fuentes de marca | `src/styles/global.css` (bloque `@theme`) |
| Dominio para SEO | `astro.config.mjs` → `site` |

### Agregar un proyecto

1. Copia un objeto en `src/data/projects.ts` y cambia los datos.
2. (Opcional) Pon una captura en `public/projects/mi-proyecto.webp` y escribe `image: '/projects/mi-proyecto.webp'`. Sin imagen se usa la ilustración elegida en `art` (agro, sst, vial o api).
3. (Opcional) Agrega enlaces: `links: [{ label: 'Ver demo', href: 'https://…' }]`.
4. El orden del arreglo es el orden en la página.

### Formulario de contacto

- **Sin configurar:** al enviar, abre WhatsApp con el mensaje ya escrito (usa el número de `site.ts`).
- **Para recibir correos:** crea un formulario gratis en [Formspree](https://formspree.io), copia el endpoint y pégalo en `formEndpoint` dentro de `src/data/site.ts`.

## Desplegar

Es un sitio estático: sirve en cualquier hosting.

- **Vercel / Netlify:** importa el repo; detectan Astro solos (build `npm run build`, salida `dist`).
- **GitHub Pages:** usa la acción oficial `withastro/action`. Si el sitio queda en `usuario.github.io/repo`, agrega `base: '/repo'` en `astro.config.mjs`.

## Estructura

```
src/
  components/   Header, Hero, Audiences, Projects, ProjectArt, HowWeWork, Team, Contact, Footer, Iso (logo), Zy (mascota)
  data/         site.ts, projects.ts  ← contenido editable
  layouts/      Base.astro (SEO, Open Graph, JSON-LD)
  pages/        index.astro
  styles/       global.css (tokens de marca)
public/         favicon.svg, /projects (capturas)
```

## Pendientes antes de publicar

- [ ] Reemplazar correo, WhatsApp y redes de ejemplo en `src/data/site.ts`.
- [ ] Poner el dominio real en `astro.config.mjs`.
- [ ] Agregar capturas reales de los proyectos y enlaces a demos o repos.
- [ ] Crear una imagen `public/og.png` (1200×630) para cuando compartan el link en redes.

## Textos para revisar

Los textos de "El problema" en `src/data/projects.ts` y la historia del equipo en `src/components/Team.astro` son un primer borrador. Ajústenlos con su versión real: los detalles verdaderos son lo que hace que el sitio no se vea genérico.
