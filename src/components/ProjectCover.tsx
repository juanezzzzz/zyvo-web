import { url } from '../lib/url';
import type { Project } from '../lib/projects';
import { Play } from 'lucide-react';
import ProjectMockup from './ProjectMockup';

/** Portada del proyecto: su captura si existe (`image` en el .md); si no, la maqueta ilustrada del producto. */
export default function ProjectCover({ p, large = false }: { p: Project; large?: boolean }) {
  // Con video: su portada y la indicación de que hay video (se reproduce en la página del caso)
  if (p.video) {
    const d = p.video.duration;
    return (
      <div className="relative h-full w-full overflow-hidden bg-carbon">
        <img src={url(p.video.poster)} alt="" width={p.video.width} height={p.video.height} className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/cover:scale-[1.03]" loading={large ? 'eager' : 'lazy'} />
        <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur sm:right-4 sm:top-4">
          <Play size={12} fill="currentColor" aria-hidden="true" /> Video · {Math.floor(d / 60)}:{String(d % 60).padStart(2, '0')}
        </span>
      </div>
    );
  }
  if (p.image) {
    return <img src={url(p.image)} alt={`Captura de ${p.name}`} width={1600} height={800} className="h-full w-full object-cover" loading={large ? 'eager' : 'lazy'} />;
  }
  return (
    <div className="relative h-full w-full overflow-hidden bg-carbon">
      <ProjectMockup p={p} />
    </div>
  );
}
