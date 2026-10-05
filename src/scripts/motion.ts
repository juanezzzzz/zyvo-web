// Scroll suave (Lenis) sincronizado con GSAP ScrollTrigger.
// Con "reducir movimiento" activo (Windows con efectos de animación apagados, Android "quitar animaciones",
// iOS "reducir movimiento") no hay scroll suave ni desplazamientos: las animaciones pasan a fundidos
// y la banda de proceso se sigue dibujando con el scroll, que controla la persona.
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;
if (!reduced) {
  lenis = new Lenis({ lerp: 0.11, anchors: { offset: -72 } });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis?.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

// Las posiciones de ScrollTrigger se calculan una vez. Si algo cambia de alto más arriba
// (fuentes que terminan de cargar, el selector de proyectos al hidratarse o al cambiar de proyecto,
// una pregunta frecuente que se abre), se recalculan para que las animaciones de scroll no se desfasen.
let refreshQueued = 0;
const queueRefresh = () => {
  clearTimeout(refreshQueued);
  refreshQueued = window.setTimeout(() => ScrollTrigger.refresh(), 150);
};
let lastHeight = document.body.scrollHeight;
new ResizeObserver(() => {
  const h = document.body.scrollHeight;
  if (Math.abs(h - lastHeight) < 2) return;
  lastHeight = h;
  queueRefresh();
}).observe(document.body);
document.fonts?.ready.then(queueRefresh);

export { gsap, ScrollTrigger, lenis };

/** Ejecuta trabajo que no se ve al cargar (secciones más abajo) cuando el navegador queda libre,
 *  para no competir con el primer pintado. Como máximo espera 700 ms. */
export function whenIdle(fn: () => void) {
  if ('requestIdleCallback' in window) requestIdleCallback(fn, { timeout: 700 });
  else setTimeout(fn, 200);
}

/** Prepara un <path> para dibujarse: devuelve su longitud y lo deja oculto. */
export function primePath(path: SVGPathElement) {
  const len = path.getTotalLength();
  path.style.strokeDasharray = `${len}`;
  path.style.strokeDashoffset = `${len}`;
  return len;
}
