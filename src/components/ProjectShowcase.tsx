import { url } from '../lib/url';
import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Trophy } from 'lucide-react';
import { accents, type Project } from '../lib/projects';
import ProjectCover from './ProjectCover';

export default function ProjectShowcase({ projects }: { projects: Project[] }) {
  const start = Math.max(0, projects.findIndex((p) => p.featured));
  const [active, setActive] = useState(start);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const list = useRef<HTMLDivElement>(null);
  const [atEnd, setAtEnd] = useState(false);
  const [compact, setCompact] = useState(false);
  const first = useRef(true);
  const uid = useId();
  const n = projects.length;
  const go = (i: number) => setActive((i + n) % n);

  // En pantallas pequeñas: gestos de swipe sobre la tarjeta
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    const set = () => setCompact(mq.matches);
    set();
    mq.addEventListener('change', set);
    return () => mq.removeEventListener('change', set);
  }, []);

  // Enlace directo al proyecto: /?proyecto=yopvial abre ese proyecto
  const synced = useRef(false);
  useEffect(() => {
    const slug = new URLSearchParams(location.search).get('proyecto');
    const i = projects.findIndex((x) => x.slug === slug);
    if (i >= 0) setActive(i);
  }, []);
  useEffect(() => {
    if (!synced.current) { synced.current = true; return; }
    const u = new URL(location.href);
    u.searchParams.set('proyecto', projects[active].slug);
    history.replaceState(history.state, '', u);
  }, [active]);

  // Lleva la pestaña activa a la vista dentro de la fila deslizable (sin mover la página)
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const el = list.current, tab = tabs.current[active];
    if (!el || !tab || el.scrollWidth <= el.clientWidth) return;
    el.scrollTo({ left: tab.offsetLeft - 16, behavior: 'smooth' });
  }, [active]);

  const onListScroll = () => {
    const el = list.current;
    if (el) setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  };
  const p = projects[active];

  const onKey = (e: KeyboardEvent) => {
    const keys: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    if (e.key in keys) {
      e.preventDefault();
      const next = (active + keys[e.key] + projects.length) % projects.length;
      setActive(next);
      tabs.current[next]?.focus();
    } else if (e.key === 'Home' || e.key === 'End') {
      e.preventDefault();
      const next = e.key === 'Home' ? 0 : projects.length - 1;
      setActive(next);
      tabs.current[next]?.focus();
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div
          role="tablist"
          aria-label="Proyectos"
          aria-orientation="vertical"
          onKeyDown={onKey}
          ref={list}
          onScroll={onListScroll}
          className={`-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] lg:[mask-image:none] ${atEnd ? '' : '[mask-image:linear-gradient(to_right,black_78%,transparent)]'} lg:col-span-4 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-t lg:border-white/10 lg:px-0`}
        >
          {projects.map((proj, i) => {
            const on = i === active;
            return (
              <button
                key={proj.slug}
                ref={(el) => { tabs.current[i] = el; }}
                role="tab"
                id={`${uid}-tab-${i}`}
                aria-selected={on}
                aria-controls={`${uid}-panel`}
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(i)}
                className={`group relative min-h-11 shrink-0 snap-start rounded-md border px-4 py-3 text-left transition-colors lg:rounded-none lg:border-0 lg:border-b lg:border-white/10 lg:py-6 lg:pl-7 ${
                  on ? 'border-azul bg-azul/15 backdrop-blur-md lg:bg-transparent lg:backdrop-blur-none' : 'border-white/10 hover:border-white/25 hover:bg-white/[.06]'
                }`}
              >
                {on && (
                  <motion.span
                    layoutId={`${uid}-marker`}
                    className="absolute inset-y-4 left-0 hidden w-1.5 -skew-y-[30deg] bg-banda lg:block"
                    transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                  />
                )}
                <span translate="no" className={`wide block whitespace-nowrap font-bold transition-colors lg:text-xl ${on ? 'text-marfil' : 'text-niebla-2 group-hover:text-marfil'}`}>
                  {proj.name}
                </span>
                <span className="mt-1 hidden text-sm text-niebla lg:block">{proj.kind}</span>
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`${uid}-panel`}
          aria-labelledby={`${uid}-tab-${active}`}
          className="relative min-w-0 lg:col-span-8"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.article
              key={p.slug}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              drag={compact ? 'x' : false}
              dragDirectionLock
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60 || info.velocity.x < -400) go(active + 1);
                else if (info.offset.x > 60 || info.velocity.x > 400) go(active - 1);
              }}
              className="glass overflow-hidden rounded-2xl"
            >
              <a href={url(`/proyectos/${p.slug}/`)} className="group/cover relative block aspect-[16/8] overflow-hidden" style={{ viewTransitionName: `cover-${p.slug}` }} aria-label={`Ver el caso de ${p.name}${p.highlight ? `. ${p.highlight}` : ""}`}>
                <ProjectCover p={p} />
                {p.highlight && (
                  <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-md bg-senal px-2.5 py-1 text-xs font-semibold text-carbon sm:bottom-4 sm:left-4 sm:gap-2 sm:px-3 sm:py-1.5 sm:text-sm">
                    <Trophy size={14} aria-hidden="true" />
                    {p.highlight}
                  </span>
                )}
              </a>
              <div className="grid gap-8 p-6 sm:p-8 md:grid-cols-[1.2fr_1fr] md:p-10">
                <div className="min-w-0">
                  <p className="text-sm text-niebla">{p.kind}</p>
                  <h3 className="display mt-2 text-3xl md:text-4xl" translate="no">{p.name}</h3>
                  <p className="mt-4 text-niebla-2">{p.summary}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a href={url(`/proyectos/${p.slug}/`)} className="btn-primary">
                      Ver el caso completo <ArrowRight size={16} aria-hidden="true" />
                    </a>
                    {p.links?.map((l) => (
                        <a key={l.href} href={l.href} target="_blank" rel="noopener" className="btn-ghost !py-2">
                          {l.label} <ArrowUpRight size={16} aria-hidden="true" />
                        </a>
                    ))}
                  </div>
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-marfil">Qué resolvimos</h4>
                  <ul className="mt-3 grid gap-2.5 text-sm text-niebla-2">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex gap-3">
                        <span className="mt-[0.55em] h-1.5 w-3 shrink-0 -skew-y-[30deg]" style={{ background: accents[p.accent] }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>

          {/* Solo en móvil y tablet: anterior / siguiente y posición */}
          <div className="mt-4 flex items-center justify-between lg:hidden">
            <button type="button" onClick={() => go(active - 1)} className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-marfil active:bg-white/10" aria-label="Proyecto anterior">
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <div className="flex items-center gap-2" aria-hidden="true">
              {projects.map((proj, i) => (
                <span key={proj.slug} className={`h-1.5 rounded-full transition-[width,background-color] duration-300 ${i === active ? 'w-6 bg-banda' : 'w-1.5 bg-white/25'}`} />
              ))}
            </div>
            <button type="button" onClick={() => go(active + 1)} className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-marfil active:bg-white/10" aria-label="Proyecto siguiente">
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </div>
          <p className="sr-only" aria-live="polite">Proyecto {active + 1} de {n}: {p.name}</p>
        </div>
      </div>
    </MotionConfig>
  );
}
