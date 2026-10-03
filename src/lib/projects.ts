// Tipos y colores de proyecto. Sin imports de servidor: lo usan también las islas React.
import type { z } from 'astro/zod';
import type { projectSchema } from '../content.config';

export type Project = z.infer<typeof projectSchema> & { slug: string };

export const accents: Record<Project['accent'], string> = {
  azul: '#4766F5',
  senal: '#2BD67B',
  alerta: '#F5B544',
  luz: '#7B93FF',
};
