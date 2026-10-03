import { accents, type Project } from '../lib/projects';

/** Portada del proyecto: su captura si existe; si no, una generada con la marca (hexágono, banda e iniciales). */
export default function ProjectCover({ p, large = false }: { p: Project; large?: boolean }) {
  if (p.image) return <img src={p.image} alt={`Captura de ${p.name}`} className="h-full w-full object-cover" loading={large ? 'eager' : 'lazy'} />;
  const c = accents[p.accent];
  const initials = p.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div className="hexgrid relative h-full w-full overflow-hidden bg-carbon" aria-hidden="true">
      <svg viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full transition-transform duration-700 ease-out group-hover/cover:scale-[1.03]">
        <path d="M430 30 560 105v150L430 330 300 255V105Z" fill="none" stroke="#C9CED6" strokeOpacity=".35" strokeWidth="2" />
        <path d="M430 62 532 121v118L430 298 328 239V121Z" fill="#05070A" fillOpacity=".7" />
        <path d="M-20 300H190L260 260H420L520 202H700" fill="none" stroke={c} strokeWidth="26" strokeLinejoin="round" />
        <path d="M-20 326H205L275 286H435L535 228H700" fill="none" stroke={c} strokeOpacity=".3" strokeWidth="5" />
      </svg>
      <span className={`display absolute left-6 top-5 leading-none text-marfil/90 ${large ? 'text-[clamp(4rem,10vw,8rem)]' : 'text-[clamp(3rem,7vw,5.5rem)]'}`}>{initials}</span>
    </div>
  );
}
