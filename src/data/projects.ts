// Portafolio. Para agregar un proyecto, copia un objeto y cambia los datos.
// `art` elige la ilustración (agro | sst | vial | api). Si tienes una captura real,
// ponla en /public/projects/ y escribe `image: '/projects/archivo.webp'`: reemplaza la ilustración.

export type Project = {
  slug: string;
  name: string;
  sector: string;
  problem: string;
  built: string;
  detail: string;
  stack: string[];
  award?: string;
  art: 'agro' | 'sst' | 'vial' | 'api';
  image?: string;
  links?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    slug: 'agroia',
    name: 'AgroIA Casanare',
    sector: 'Agro',
    problem:
      'Los productores del llano venden a través de intermediarios y muchos no usan formularios ni apps complicadas.',
    built:
      'Un asistente en Telegram: el productor manda una nota de voz con lo que tiene para vender y queda publicado. El comprador pregunta en sus palabras y recibe las ofertas que le sirven.',
    detail: '344 pruebas automatizadas. Desplegado en Render y Vercel.',
    stack: ['Python 3.12', 'FastAPI', 'Angular 18', 'Supabase', 'Telegram Bot API', 'Docker'],
    award: '1.er lugar · Hackathon Regional Casanare (Colombia 5.0)',
    art: 'agro',
    links: [],
  },
  {
    slug: 'zona-segura',
    name: 'Zona Segura',
    sector: 'Formación · SST',
    problem: 'Las capacitaciones de seguridad y salud en el trabajo se olvidan rápido cuando son solo diapositivas.',
    built:
      'Una plataforma para el SENA donde se aprende jugando: vestir al trabajador con su EPP, ejercicios de voz y de respiración guiada, con progreso y puntaje global.',
    detail: 'Auditoría completa del sistema de puntaje antes de entregar.',
    stack: ['JavaScript', 'Phaser 3', 'GSAP', 'Web Audio'],
    art: 'sst',
    links: [],
  },
  {
    slug: 'yopvial',
    name: 'YopVial',
    sector: 'Seguridad vial',
    problem: 'En Yopal la pedagogía vial no llegaba a jóvenes y los puntos de riesgo no estaban en ningún mapa.',
    built:
      'Minijuegos (Ruta Segura, Reflejos del semáforo, Parquea bien) y un mapa de la ciudad con zonas de riesgo reportadas por la comunidad.',
    detail: 'Funciona con teclado y pantalla táctil.',
    stack: ['JavaScript', 'Phaser 3', 'Leaflet', 'OpenStreetMap', 'Supabase'],
    art: 'vial',
    links: [],
  },
  {
    slug: 'jobsy',
    name: 'Jobsy',
    sector: 'Backend',
    problem: 'Un sistema con tienda y suscripciones necesitaba crecer por partes sin romper lo que ya funcionaba.',
    built:
      'Microservicios en Go con esquemas separados para tienda y suscripciones, una API en Django REST para la tienda y una API social en NestJS.',
    detail: 'Todas las APIs documentadas con Swagger.',
    stack: ['Go', 'Beego', 'PostgreSQL', 'Django REST', 'NestJS', 'MongoDB'],
    art: 'api',
    links: [],
  },
];
