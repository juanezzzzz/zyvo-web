import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Cada proyecto es un archivo .md en src/content/proyectos/. El nombre del archivo es la URL: /proyectos/<archivo>
export const projectSchema = z.object({
  name: z.string(),
  kind: z.string(),
  summary: z.string(),
  bullets: z.array(z.string()),
  stack: z.array(z.string()).optional(), // no se muestra en la web
  accent: z.enum(['azul', 'senal', 'alerta', 'luz']),
  order: z.number(),
  featured: z.boolean().optional(),
  // true = no se publica (no aparece en la lista ni tiene página). Para publicarlo, quítalo o pon false.
  draft: z.boolean().default(false),
  highlight: z.string().optional(),
  // Ruta a una captura en /public, ej. '/projects/agroia.webp'
  image: z.string().optional(),
  links: z.array(z.object({ label: z.string(), href: z.string().url() })).default([]),
  // Video del caso (archivos en /public/videos). Si existe, reemplaza a la portada.
  video: z
    .object({
      src: z.string(),
      poster: z.string(),
      title: z.string(),
      duration: z.number(), // segundos
      width: z.number(),
      height: z.number(),
    })
    .optional(),
  // Datos cortos que se muestran al lado del caso (cliente, sector, rol…)
  facts: z.array(z.object({ k: z.string(), v: z.string() })).default([]),
  // Lo que dijo el cliente. `short` va en la tarjeta del inicio; `quote`, en la página del caso.
  // `reported: true` cuando es la opinión de un grupo contada por nosotros (se muestra sin comillas).
  testimonial: z
    .object({
      quote: z.string(),
      short: z.string().optional(),
      author: z.string(),
      role: z.string(),
      reported: z.boolean().default(false),
    })
    .optional(),
});

export const collections = {
  proyectos: defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/proyectos' }), schema: projectSchema }),
};
