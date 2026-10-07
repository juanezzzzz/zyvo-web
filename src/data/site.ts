// Datos generales del sitio. Edita aquí y se actualiza en toda la página.
// ⚠️ Los datos de contacto son de ejemplo hasta tener dominio y líneas oficiales.

export const site = {
  name: 'Zyvo Solutions',
  team: 'Control Z Team',
  tagline: 'Construye. Escala. Evoluciona.',
  description:
    'Zyvo Solutions crea páginas y sistemas web a la medida, plataformas educativas, asistentes automáticos y diseño 3D desde Yopal, Casanare. Construimos soluciones y enseñamos cómo se hacen.',
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
    title: 'Páginas y sistemas web a la medida',
    text: 'Herramientas para tu negocio que se ajustan a cómo trabajas, no al revés: ventas, inventario, turnos, reservas y más.',
    icon: 'web',
  },
  {
    title: 'Conectamos tus herramientas',
    text: 'Hacemos que los programas que ya usas se hablen entre sí, para que no tengas que pasar la misma información a mano dos veces.',
    icon: 'api',
  },
  {
    title: 'Plataformas educativas interactivas',
    text: 'Juegos, simuladores y módulos de aprendizaje para capacitar a las personas de forma que de verdad recuerden.',
    icon: 'edu',
  },
  {
    title: 'Asistentes y tareas automáticas',
    text: 'Asistentes que responden por WhatsApp o Telegram y procesos que se hacen solos, para que tu equipo dedique el tiempo a lo importante.',
    icon: 'ai',
  },
  {
    title: 'Diseño 3D e impresión en resina',
    text: 'Modelamos tu idea en 3D, la animamos si hace falta y la imprimimos en resina: desde llaveros con tu logo hasta piezas a la medida.',
    icon: 'print3d',
    link: { label: 'Ver cómo lo hacemos', href: '#contenido' },
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
    what: 'Sistemas para manejar el día a día del negocio y conectar las herramientas que ya usan: ventas, inventario, caja, clientes.',
    case: { label: 'GamerZone', slug: 'gamerzone' },
  },
];

// Preguntas frecuentes (también se publican como FAQPage para Google)
export const faq = [
  {
    q: '¿Cuánto cuesta un proyecto?',
    a: 'Depende de lo que haya que construir. Después del diagnóstico te entregamos una propuesta con tiempos y costos concretos, sin letra pequeña, y decides si seguimos.',
  },
  {
    q: '¿Cuánto tiempo toma?',
    a: 'Depende del tamaño del proyecto. Después de la primera reunión te damos un cronograma claro, y durante el desarrollo te mostramos avances que puedes probar.',
  },
  {
    q: '¿El código queda a mi nombre?',
    a: 'Sí. Te entregamos todo lo construido, con su documentación, y te explicamos cómo funciona. El proyecto es tuyo.',
  },
  {
    q: '¿Qué pasa después de la entrega?',
    a: 'Dejamos el sistema funcionando, capacitamos a tu equipo y te acompañamos después de que empiecen a usarlo.',
  },
  {
    q: '¿Pueden mejorar un sistema que ya tengo?',
    a: 'Sí. Revisamos lo que ya usas y te decimos qué conviene mejorar, conectar o cambiar, desde un ajuste puntual hasta un sistema completo.',
  },
  {
    q: '¿Solo trabajan con empresas de Casanare?',
    a: 'Estamos en Yopal y podemos reunirnos en persona. Si estás en otra ciudad, trabajamos por videollamada de la misma forma.',
  },
];

export const process = [
  { title: 'Diagnóstico', text: 'Entendemos el problema contigo y definimos juntos qué se va a construir y qué no.' },
  { title: 'Diseño', text: 'Te mostramos cómo se va a ver y funcionar antes de construirlo, para que lo apruebes.' },
  { title: 'Desarrollo', text: 'Construimos y te mostramos avances que puedes probar, para ajustar a tiempo.' },
  { title: 'Entrega y soporte', text: 'Lo dejamos funcionando, capacitamos a tu equipo y te acompañamos después.' },
];
