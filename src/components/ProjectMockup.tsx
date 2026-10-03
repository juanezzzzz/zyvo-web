import { useId, type ReactNode } from 'react';
import { accents, type Project } from '../lib/projects';

// Maquetas ilustrativas de cada producto (SVG, sin imágenes): muestran qué hace el proyecto
// mientras no haya capturas reales. Los datos que aparecen son de ejemplo.
// viewBox 800x400; el contenido importante vive entre y=40 y y=360 para tolerar recortes 16:8 y 21:9.

const C = {
  bg: '#090C11', panel: '#11161E', card: '#1B212B', line: '#2A3240',
  text: '#F5F4EF', mute: '#8A93A3', dark: '#0E1218',
  red: '#F0675E', amber: '#F5B544', green: '#2BD67B', blue: '#4766F5',
};
const mono = '"JetBrains Mono Variable", ui-monospace, monospace';
const sans = '"Archivo Variable", system-ui, sans-serif';

function T({ x, y, s = 10, c = C.text, w = 500, f = sans, children, a }: { x: number; y: number; s?: number; c?: string; w?: number; f?: string; children: ReactNode; a?: 'end' | 'middle' }) {
  return <text x={x} y={y} fontSize={s} fill={c} fontWeight={w} fontFamily={f} textAnchor={a}>{children}</text>;
}

/** Ventana de navegador o app de escritorio con barra superior */
function Win({ x, y, w, h, title, children }: { x: number; y: number; w: number; h: number; title: string; children: ReactNode }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={14} fill={C.panel} stroke={C.line} strokeWidth={1.5} />
      <path d={`M${x} ${y + 30}h${w}`} stroke={C.line} />
      {[0, 1, 2].map((i) => <circle key={i} cx={x + 18 + i * 14} cy={y + 15} r={4} fill={C.line} />)}
      <rect x={x + w / 2 - 90} y={y + 7} width={180} height={16} rx={8} fill={C.dark} />
      <T x={x + w / 2} y={y + 18.5} s={8.5} c={C.mute} f={mono} a="middle">{title}</T>
      {children}
    </g>
  );
}

function Agro({ c }: { c: string }) {
  const bars = [6, 12, 18, 10, 16, 22, 14, 8, 18, 12, 6, 14, 20, 10];
  return (
    <g>
      {/* Tarjeta flotante */}
      <g transform="translate(120 110)">
        <rect width={210} height={86} rx={14} fill={C.panel} stroke={C.line} />
        <circle cx={32} cy={43} r={18} fill={c} />
        <rect x={27.5} y={31} width={9} height={14} rx={4.5} fill={C.dark} />
        <path d="M24.5 41a7.5 7.5 0 0 0 15 0M32 48.5v4.5" stroke={C.dark} strokeWidth={2} strokeLinecap="round" fill="none" />
        <T x={60} y={38} s={12} w={700}>Nota de voz</T>
        <T x={60} y={56} s={10} c={C.mute}>se convierte en oferta</T>
      </g>
      {/* Teléfono con el chat del bot */}
      <rect x={440} y={30} width={210} height={420} rx={30} fill="#151B24" stroke={C.line} strokeWidth={3} />
      <rect x={450} y={40} width={190} height={400} rx={22} fill={C.dark} />
      <rect x={450} y={40} width={190} height={46} rx={22} fill={C.card} />
      <rect x={450} y={70} width={190} height={16} fill={C.card} />
      <circle cx={474} cy={63} r={12} fill={c} />
      <T x={492} y={60} s={11} w={700}>AgroIA</T>
      <T x={492} y={74} s={8.5} c={C.mute}>bot en línea</T>
      {/* Nota de voz del productor */}
      <rect x={500} y={98} width={128} height={34} rx={12} fill={c} />
      <path d="M512 109l9 6-9 6z" fill={C.dark} />
      {bars.map((h, i) => <rect key={i} x={528 + i * 5} y={115 - h / 2} width={2.6} height={h} rx={1.3} fill={C.dark} />)}
      <T x={620} y={119} s={8} c={C.dark} w={700} a="end">0:12</T>
      {/* Oferta publicada */}
      <rect x={460} y={142} width={152} height={58} rx={12} fill={C.card} />
      <T x={472} y={160} s={10} w={700}>Oferta publicada</T>
      <T x={472} y={175} s={9} c={C.mute}>40 bultos de arroz</T>
      <T x={472} y={189} s={9} c={C.mute}>Yopal, entrega inmediata</T>
      {/* Pregunta del comprador */}
      <rect x={488} y={210} width={140} height={40} rx={12} fill={c} />
      <T x={500} y={226} s={9.5} c={C.dark} w={600}>¿Quién vende arroz</T>
      <T x={500} y={240} s={9.5} c={C.dark} w={600}>cerca de Aguazul?</T>
      {/* Resultados */}
      <rect x={460} y={260} width={160} height={78} rx={12} fill={C.card} />
      <T x={472} y={278} s={10} w={700}>3 ofertas cerca</T>
      {[0, 1].map((i) => (
        <g key={i} transform={`translate(472 ${288 + i * 22})`}>
          <rect width={16} height={16} rx={4} fill={c} opacity={0.25} />
          <rect x={24} y={3} width={86 - i * 18} height={4} rx={2} fill={C.text} opacity={0.7} />
          <rect x={24} y={10} width={60} height={3} rx={1.5} fill={C.mute} opacity={0.6} />
        </g>
      ))}
      <rect x={460} y={400} width={150} height={26} rx={13} fill={C.card} />
      <circle cx={624} cy={413} r={11} fill={c} />
    </g>
  );
}

function Zona({ c }: { c: string }) {
  const kit = [
    { n: 'Casco', ok: true }, { n: 'Gafas', ok: true },
    { n: 'Guantes', ok: true }, { n: 'Botas', ok: false },
  ];
  return (
    <g>
      <g transform="translate(90 220)">
        <rect width={190} height={78} rx={14} fill={C.panel} stroke={C.line} />
        <T x={18} y={30} s={11} w={700}>Progreso del aprendiz</T>
        <rect x={18} y={44} width={154} height={8} rx={4} fill={C.card} />
        <rect x={18} y={44} width={116} height={8} rx={4} fill={c} />
        <T x={18} y={66} s={9} c={C.mute}>3 de 4 módulos</T>
      </g>
      <Win x={310} y={40} w={430} h={310} title="zonasegura / dotación EPP">
        <T x={334} y={98} s={14} w={800}>Equipa al trabajador</T>
        <T x={334} y={116} s={9.5} c={C.mute}>Arrastra cada elemento a su lugar</T>
        {/* Puntaje */}
        <rect x={610} y={84} width={110} height={36} rx={10} fill={C.card} />
        <T x={624} y={100} s={8.5} c={C.mute}>Puntaje</T>
        <T x={624} y={114} s={13} w={800} c={c} f={mono}>840</T>
        {/* Trabajador */}
        <g transform="translate(410 150)">
          <rect x={-46} y={-8} width={92} height={180} rx={46} fill={c} opacity={0.08} />
          <circle cx={0} cy={22} r={20} fill="#C9CED6" />
          <path d="M-24 16a24 22 0 0 1 48 0v4h-48z" fill={c} />
          <rect x={-12} y={18} width={24} height={7} rx={3.5} fill={C.dark} opacity={0.8} />
          <rect x={-30} y={48} width={60} height={80} rx={18} fill={C.line} />
          <rect x={-30} y={70} width={60} height={8} fill={c} opacity={0.85} />
          <rect x={-44} y={52} width={14} height={60} rx={7} fill={C.line} />
          <rect x={30} y={52} width={14} height={60} rx={7} fill={C.line} />
          <circle cx={-37} cy={116} r={8} fill={c} />
          <circle cx={37} cy={116} r={8} fill={c} />
        </g>
        {/* Elementos de protección */}
        {kit.map((k, i) => {
          const x = 500 + (i % 2) * 112, y = 140 + Math.floor(i / 2) * 92;
          return (
            <g key={k.n} transform={`translate(${x} ${y})`}>
              <rect width={100} height={80} rx={12} fill={C.card} stroke={k.ok ? 'none' : C.line} strokeDasharray={k.ok ? undefined : '5 4'} />
              <T x={14} y={66} s={10} w={600} c={k.ok ? C.text : C.mute}>{k.n}</T>
              {k.ok ? (
                <g transform="translate(76 22)">
                  <circle r={11} fill={c} />
                  <path d="M-5 0l3.5 3.5L5-3.5" stroke={C.dark} strokeWidth={2.2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </g>
              ) : (
                <circle cx={76} cy={22} r={11} fill="none" stroke={C.mute} strokeDasharray="3 3" />
              )}
              <rect x={14} y={18} width={30} height={22} rx={6} fill={k.ok ? c : C.line} opacity={k.ok ? 0.3 : 0.6} />
            </g>
          );
        })}
      </Win>
    </g>
  );
}

function Vial({ c, id }: { c: string; id: string }) {
  const pins = [
    { x: 470, y: 150, col: C.red }, { x: 600, y: 120, col: C.amber },
    { x: 650, y: 235, col: C.red }, { x: 540, y: 270, col: c },
  ];
  return (
    <g>
      <g transform="translate(80 120)">
        <rect width={200} height={92} rx={14} fill={C.panel} stroke={C.line} />
        <rect x={18} y={18} width={26} height={56} rx={8} fill={C.dark} />
        <circle cx={31} cy={31} r={6} fill={C.red} />
        <circle cx={31} cy={46} r={6} fill={C.line} />
        <circle cx={31} cy={61} r={6} fill={C.line} />
        <T x={58} y={40} s={11} w={700}>Reflejos del</T>
        <T x={58} y={55} s={11} w={700}>semáforo</T>
        <T x={58} y={72} s={9} c={C.mute}>Minijuego</T>
      </g>
      <Win x={310} y={40} w={430} h={310} title="yopvial / mapa de riesgo">
        <clipPath id={`${id}map`}><rect x={311} y={71} width={428} height={278} rx={13} /></clipPath>
        <g clipPath={`url(#${id}map)`}>
          <rect x={311} y={71} width={428} height={278} fill="#0D1219" />
          <rect x={560} y={160} width={70} height={50} rx={6} fill="#12221A" />
          <path d="M300 300C380 280 420 330 500 310S640 260 760 300" stroke="#14304A" strokeWidth={16} fill="none" />
          {[110, 180, 250].map((y) => <path key={y} d={`M300 ${y}L760 ${y - 24}`} stroke={C.card} strokeWidth={7} />)}
          {[380, 470, 560, 660].map((x) => <path key={x} d={`M${x} 60L${x + 30} 360`} stroke={C.card} strokeWidth={7} />)}
          <path d="M300 220L760 140" stroke={C.line} strokeWidth={12} />
          {pins.map((p, i) => (
            <g key={i} transform={`translate(${p.x} ${p.y})`}>
              <circle r={20} fill={p.col} opacity={0.18} />
              <path d="M0 6c-8-9-12-13-12-19a12 12 0 0 1 24 0c0 6-4 10-12 19z" fill={p.col} />
              <rect x={-1.2} y={-19} width={2.4} height={7} rx={1.2} fill={C.dark} />
              <circle cy={-9} r={1.4} fill={C.dark} />
            </g>
          ))}
          <g transform="translate(330 278)">
            <rect width={170} height={52} rx={10} fill={C.card} opacity={0.96} />
            <T x={14} y={22} s={10.5} w={700}>Zonas de riesgo</T>
            <T x={14} y={38} s={9} c={C.mute}>Reportadas por la comunidad</T>
          </g>
        </g>
      </Win>
    </g>
  );
}

function Api({ c }: { c: string }) {
  const rows = [
    { m: 'GET', col: C.green, p: '/stores', d: 'Lista de tiendas' },
    { m: 'POST', col: C.blue, p: '/subscriptions', d: 'Crea una suscripción' },
    { m: 'GET', col: C.green, p: '/users/{id}', d: 'Detalle de usuario' },
    { m: 'PUT', col: C.amber, p: '/plans/{id}', d: 'Actualiza un plan' },
    { m: 'DELETE', col: C.red, p: '/sessions', d: 'Cierra la sesión' },
  ];
  return (
    <g>
      <Win x={300} y={40} w={440} h={310} title="jobsy-api / docs">
        <T x={324} y={96} s={14} w={800}>Jobsy API</T>
        <rect x={404} y={84} width={34} height={16} rx={8} fill={c} opacity={0.2} />
        <T x={421} y={95.5} s={8} c={c} w={700} f={mono} a="middle">v1</T>
        {rows.map((r, i) => (
          <g key={i} transform={`translate(324 ${114 + i * 44})`}>
            <rect width={392} height={36} rx={8} fill={C.card} />
            <rect x={8} y={8} width={58} height={20} rx={5} fill={r.col} />
            <T x={37} y={21.5} s={9} c={C.dark} w={800} f={mono} a="middle">{r.m}</T>
            <T x={78} y={22} s={10.5} f={mono}>{r.p}</T>
            <T x={380} y={22} s={9} c={C.mute} a="end">{r.d}</T>
          </g>
        ))}
      </Win>
      <g transform="translate(60 196)">
        <rect width={250} height={124} rx={14} fill={C.dark} stroke={C.line} />
        <T x={18} y={28} s={9.5} f={mono} c={C.mute}>GET /stores/42</T>
        <T x={18} y={48} s={9.5} f={mono} c={c} w={700}>200 OK</T>
        <T x={18} y={68} s={9.5} f={mono} c={C.text}>{'{ "id": 42,'}</T>
        <T x={18} y={84} s={9.5} f={mono} c={C.text}>{'  "plan": "pro",'}</T>
        <T x={18} y={100} s={9.5} f={mono} c={C.text}>{'  "activa": true }'}</T>
      </g>
    </g>
  );
}

export default function ProjectMockup({ p }: { p: Project }) {
  const id = 'm' + useId().replace(/[^a-zA-Z0-9]/g, '');
  const c = accents[p.accent];
  const scene =
    p.slug === 'agroia' ? <Agro c={c} /> :
    p.slug === 'zona-segura' ? <Zona c={c} /> :
    p.slug === 'yopvial' ? <Vial c={c} id={id} /> :
    p.slug === 'jobsy' ? <Api c={c} /> : null;

  return (
    <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" role="img" aria-label={`Ilustración de ${p.name}`}>
      <defs>
        <pattern id={`${id}hex`} width="30" height="51.96" patternUnits="userSpaceOnUse">
          <path d="M10 0h10l5 8.66-5 8.66H10L5 8.66zM-5 25.98h10l5 8.66-5 8.66H-5l-5-8.66zM25 25.98h10l5 8.66-5 8.66H25l-5-8.66z" fill="none" stroke="#8A93A3" strokeWidth=".6" opacity=".22" />
        </pattern>
        <radialGradient id={`${id}glow`} cx=".68" cy=".45" r=".5">
          <stop offset="0" stopColor={c} stopOpacity=".18" />
          <stop offset="1" stopColor={c} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="400" fill={C.bg} />
      <rect width="800" height="400" fill={`url(#${id}hex)`} />
      <rect width="800" height="400" fill={`url(#${id}glow)`} />
      {/* Banda de integración en el color del proyecto */}
      <path d="M-20 352H230L290 317H520L600 271H820" fill="none" stroke={c} strokeWidth="20" strokeLinejoin="round" opacity=".85" />
      <path d="M-20 374H240L300 339H530L610 293H820" fill="none" stroke={c} strokeWidth="4" opacity=".3" />
      <g className="transition-transform duration-700 ease-out group-hover/cover:translate-y-[-4px]">{scene}</g>
    </svg>
  );
}
