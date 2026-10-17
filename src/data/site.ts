// Datos generales del sitio. Edita aquí y se actualiza en toda la página.
// El WhatsApp y el correo NO van aquí: están protegidos en src/lib/contact.ts (contra scraping).

export const site = {
  name: 'Zyvo Solutions',
  team: 'Control Z Team',
  tagline: 'Construye. Escala. Evoluciona.',
  description:
    'Zyvo Solutions crea páginas y sistemas web a la medida, plataformas educativas, asistentes automáticos y diseño 3D desde Yopal, Casanare. Construimos soluciones y enseñamos cómo se hacen.',
  city: 'Yopal, Casanare · Colombia',
  // Dirección oficial. Las copias en otros servidores (GitHub Pages) apuntan aquí como versión principal.
  domain: 'https://www.zyvolabs.website',
  // Si creas un formulario en https://formspree.io pega aquí el endpoint (ej. https://formspree.io/f/abcdwxyz).
  // Si queda vacío, el formulario abre WhatsApp con el mensaje ya escrito.
  formEndpoint: '',
  // Pega aquí la dirección de cada perfil. Las que queden vacías no se muestran en el pie de página.
  social: [
    { label: 'Instagram', href: '' },
    { label: 'LinkedIn', href: '' },
    { label: 'YouTube', href: '' },
    { label: 'GitHub', href: '' },
  ],
};

// Datos del responsable de los datos personales (Ley 1581 de 2012 y Decreto 1377 de 2013).
// Se usan en la política de privacidad, los términos y el pie de página. Los campos vacíos no se muestran.
export const legal = {
  responsable: 'Zyvo Solutions (Control Z Team)',
  documento: '', // NIT de la empresa o cédula de la persona responsable, ej. 'NIT 901.234.567-8'
  direccion: '', // dirección física para notificaciones, ej. 'Calle 10 # 20-30'
  ciudad: 'Yopal, Casanare, Colombia',
  vigencia: '15 de octubre de 2026', // fecha desde la que rige la política; cámbiala si la actualizas
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

// Para quién trabajamos (sin enlaces a casos: la lista de proyectos va cambiando)
export const audiences = [
  {
    who: 'Productores y cooperativas',
    what: 'Canales para vender sin intermediarios, inventario de cosecha y asistentes por Telegram o WhatsApp que entienden notas de voz.',
  },
  {
    who: 'Instituciones de formación',
    what: 'Plataformas de capacitación con juegos, simuladores y seguimiento de progreso por aprendiz.',
  },
  {
    who: 'Alcaldías y entidades',
    what: 'Herramientas ciudadanas: mapas con reportes de la comunidad, pedagogía, formularios y tableros.',
  },
  {
    who: 'Empresas y comercios',
    what: 'Sistemas para manejar el día a día del negocio y conectar las herramientas que ya usan: ventas, inventario, caja, clientes.',
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
