import { url } from '../lib/url';
import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import { ArrowRight, ArrowUpRight, Trophy } from 'lucide-react';
import { accents, type Project } from '../lib/projects';
import ProjectCover from './ProjectCover';

export default function ProjectShowcase({ projects }: { projects: Project[] }) {
  const start = Math.max(0, projects.findIndex((p) => p.featured));
  const [active, setActive] = useState(start);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const uid = useId();
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
          className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] lg:col-span-4 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-t lg:border-white/10 lg:px-0"
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
                className={`group relative shrink-0 rounded-md border px-4 py-3 text-left transition-colors lg:rounded-none lg:border-0 lg:border-b lg:border-white/10 lg:py-6 lg:pl-7 ${
                  on ? 'border-azul bg-azul/10 lg:bg-transparent' : 'border-white/10 hover:bg-white/[.03]'
                }`}
              >
                {on && (
                  <motion.span
                    layoutId={`${uid}-marker`}
                    className="absolute inset-y-4 left-0 hidden w-1.5 -skew-y-[30deg] bg-banda lg:block"
                    transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                  />
                )}
                <span className={`wide block whitespace-nowrap font-bold transition-colors lg:text-xl ${on ? 'text-marfil' : 'text-niebla-2 group-hover:text-marfil'}`}>
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
              className="overflow-hidden rounded-xl border border-white/10 bg-acero"
            >
              <a href={url(`/proyectos/${p.slug}/`)} className="group/cover relative block aspect-[16/8] overflow-hidden" style={{ viewTransitionName: `cover-${p.slug}` }} aria-label={`Ver el caso de ${p.name}`}>
                <ProjectCover p={p} />
                {p.highlight && (
                  <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-md bg-senal px-3 py-1.5 text-sm font-semibold text-carbon">
                    <Trophy size={16} aria-hidden="true" />
                    {p.highlight}
                  </span>
                )}
              </a>
              <div className="grid gap-8 p-6 sm:p-8 md:grid-cols-[1.2fr_1fr] md:p-10">
                <div className="min-w-0">
                  <p className="text-sm text-niebla">{p.kind}</p>
                  <h3 className="display mt-2 text-3xl md:text-4xl">{p.name}</h3>
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
                  <h4 className="mt-6 text-sm font-semibold text-marfil">Con qué</h4>
                  <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Tecnologías">
                    {p.stack.map((t) => (
                      <li key={t} className="rounded bg-noche px-2 py-1 font-mono text-xs text-niebla-2">{t}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </MotionConfig>
  );
}
