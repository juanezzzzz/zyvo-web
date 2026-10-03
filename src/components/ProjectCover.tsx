import { url } from '../lib/url';
import type { Project } from '../lib/projects';
import ProjectMockup from './ProjectMockup';

/** Portada del proyecto: su captura si existe (`image` en el .md); si no, la maqueta ilustrada del producto. */
export default function ProjectCover({ p, large = false }: { p: Project; large?: boolean }) {
  if (p.image) {
    return <img src={url(p.image)} alt={`Captura de ${p.name}`} width={1600} height={800} className="h-full w-full object-cover" loading={large ? 'eager' : 'lazy'} />;
  }
  return (
    <div className="relative h-full w-full overflow-hidden bg-carbon">
      <ProjectMockup p={p} />
    </div>
  );
}
