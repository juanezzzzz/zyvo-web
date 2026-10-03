// Datos generales del sitio. Edita aquí y se actualiza en toda la página.
// ⚠️ Los datos de contacto son de ejemplo hasta tener dominio y líneas oficiales.

export const site = {
  name: 'Zyvo Solutions',
  team: 'Control Z Team',
  tagline: 'Construye. Escala. Evoluciona.',
  description:
    'Zyvo Solutions desarrolla software a la medida, APIs y plataformas interactivas desde Yopal, Casanare. Construimos soluciones y enseñamos cómo se hacen.',
  city: 'Yopal, Casanare · Colombia',
  email: 'hola@zyvosolutions.com',
  // Número en formato internacional, sin + ni espacios (se usa para wa.me)
  whatsapp: '573000000000',
  whatsappLabel: '+57 300 000 0000',
  // Si creas un formulario en https://formspree.io pega aquí el endpoint (ej. https://formspree.io/f/abcdwxyz).
  // Si queda vacío, el formulario abre WhatsApp con el mensaje ya escrito.
  formEndpoint: '',
  social: [
    { label: 'GitHub', href: 'https://github.com/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    { label: 'Instagram', href: 'https://www.instagram.com/' },
    { label: 'YouTube', href: 'https://www.youtube.com/' },
  ],
};

export const nav = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Equipo', href: '#equipo' },
  { label: 'Contacto', href: '#contacto' },
];

export const services = [
  {
    title: 'Desarrollo web a la medida',
    text: 'Aplicaciones web y plataformas internas que se ajustan a cómo trabaja tu empresa, no al revés.',
    tags: ['React', 'Angular', 'Astro', 'Next.js'],
    icon: 'web',
  },
  {
    title: 'APIs y backend',
    text: 'Servicios robustos, documentados y probados: microservicios, autenticación, bases de datos e integraciones.',
    tags: ['Go', 'NestJS', 'Django', 'FastAPI'],
    icon: 'api',
  },
  {
    title: 'Plataformas educativas interactivas',
    text: 'Juegos, simuladores y módulos de aprendizaje para capacitar personas de forma que de verdad recuerden.',
    tags: ['Phaser 3', 'GSAP', 'Canvas', 'Web Audio'],
    icon: 'edu',
  },
  {
    title: 'Automatización e IA aplicada',
    text: 'Bots y agentes que ahorran trabajo real: atención por Telegram o WhatsApp, búsqueda en lenguaje natural, flujos automáticos.',
    tags: ['Python', 'Telegram Bot API', 'LLMs'],
    icon: 'ai',
  },
];

// Para quién trabajamos: cada público enlaza a un caso real (slug de src/content/proyectos)
export const audiences = [
  {
    who: 'Productores y cooperativas',
    what: 'Canales para vender sin intermediarios, inventario de cosecha y asistentes por Telegram o WhatsApp que entienden notas de voz.',
    case: { label: 'AgroIA Casanare', slug: 'agroia' },
  },
  {
    who: 'Instituciones de formación',
    what: 'Plataformas de capacitación con juegos, simuladores y seguimiento de progreso por aprendiz.',
    case: { label: 'Zona Segura', slug: 'zona-segura' },
  },
  {
    who: 'Alcaldías y entidades',
    what: 'Herramientas ciudadanas: mapas con reportes de la comunidad, pedagogía, formularios y tableros.',
    case: { label: 'YopVial', slug: 'yopvial' },
  },
  {
    who: 'Empresas y comercios',
    what: 'Sistemas internos, APIs e integraciones entre las herramientas que ya usan: ventas, inventario, suscripciones.',
    case: { label: 'Jobsy', slug: 'jobsy' },
  },
];

export const process = [
  { title: 'Diagnóstico', text: 'Entendemos el problema contigo, levantamos requisitos y definimos qué sí y qué no entra.', time: '1 semana' },
  { title: 'Diseño', text: 'Prototipo navegable y arquitectura técnica. Lo validas antes de escribir la primera línea.', time: '1–2 semanas' },
  { title: 'Desarrollo', text: 'Entregas cada dos semanas para que veas avances reales y ajustes a tiempo.', time: 'según alcance' },
  { title: 'Entrega y soporte', text: 'Despliegue, capacitación y acompañamiento después de salir a producción.', time: 'continuo' },
];

export const stack = [
  { layer: 'Interfaces', items: ['React', 'Angular', 'Astro', 'Next.js', 'TypeScript'] },
  { layer: 'Backend y APIs', items: ['Go', 'NestJS', 'Django', 'FastAPI', 'Python'] },
  { layer: 'Datos e infraestructura', items: ['PostgreSQL', 'MongoDB', 'Supabase', 'Docker'] },
  { layer: 'Interactivo e IA', items: ['Phaser 3', 'GSAP', 'Web Audio', 'LLMs', 'Telegram Bot API'] },
];
