import { getCollection } from 'astro:content';
import type { Project } from './projects';

export async function getProjects(): Promise<Project[]> {
  const entries = await getCollection('proyectos');
  return entries.map((e) => ({ ...e.data, slug: e.id })).sort((a, b) => a.order - b.order);
}
