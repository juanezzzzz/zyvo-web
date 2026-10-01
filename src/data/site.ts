// Datos generales del sitio. Edita aquí y se actualiza en toda la página.
// ⚠️ Correo, WhatsApp y redes son de ejemplo hasta tener dominio y líneas oficiales.

export const site = {
  name: 'Zyvo Solutions',
  team: 'Control Z Team',
  tagline: 'Construye. Escala. Evoluciona.',
  description:
    'Estudio de software en Yopal, Casanare. Hacemos aplicaciones web, APIs y plataformas para el agro, la educación, el sector público y las empresas de la región.',
  city: 'Yopal, Casanare',
  coords: '5°20′N 72°23′O',
  email: 'hola@zyvosolutions.com',
  // Número en formato internacional, sin + ni espacios (se usa para wa.me)
  whatsapp: '573000000000',
  whatsappLabel: '+57 300 000 0000',
  // Endpoint de https://formspree.io (ej. https://formspree.io/f/abcdwxyz).
  // Vacío = el formulario abre WhatsApp con el mensaje ya escrito.
  formEndpoint: '',
  social: [
    { label: 'GitHub', href: 'https://github.com/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    { label: 'Instagram', href: 'https://www.instagram.com/' },
    { label: 'YouTube', href: 'https://www.youtube.com/' },
  ],
};

export const nav = [
  { label: 'Para quién', href: '#para-quien' },
  { label: 'Trabajos', href: '#trabajos' },
  { label: 'Cómo trabajamos', href: '#como' },
  { label: 'Equipo', href: '#equipo' },
];

// "Para quién trabajamos": cada fila enlaza a un caso del portafolio.
export const audiences = [
  {
    who: 'Productores y cooperativas',
    what: 'Canales para vender sin intermediarios, inventario de cosecha y asistentes por Telegram o WhatsApp que entienden notas de voz.',
    case: { label: 'AgroIA Casanare', href: '#agroia' },
  },
  {
    who: 'Instituciones de formación',
    what: 'Plataformas de capacitación con juegos, simuladores y seguimiento de progreso por aprendiz.',
    case: { label: 'Zona Segura', href: '#zona-segura' },
  },
  {
    who: 'Alcaldías y entidades',
    what: 'Herramientas ciudadanas: mapas con reportes de la comunidad, pedagogía, formularios y tableros.',
    case: { label: 'YopVial', href: '#yopvial' },
  },
  {
    who: 'Empresas y comercios',
    what: 'Sistemas internos, APIs e integraciones entre las herramientas que ya usan: ventas, inventario, suscripciones.',
    case: { label: 'Jobsy', href: '#jobsy' },
  },
];

// Cronograma de ejemplo (semanas 1–8). start/end inclusivos.
export const timeline = [
  { phase: 'Diagnóstico', detail: 'Reunión, requisitos y alcance por escrito', start: 1, end: 1 },
  { phase: 'Diseño', detail: 'Prototipo navegable y arquitectura', start: 2, end: 3 },
  { phase: 'Desarrollo', detail: 'Entregas parciales para que pruebes y ajustes', start: 3, end: 7, sprints: [4, 6] },
  { phase: 'Entrega', detail: 'Despliegue, capacitación y documentación', start: 8, end: 8 },
];
