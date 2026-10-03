// Rutas internas que respetan el `base` de astro.config (GitHub Pages sirve en /zyvo-web/).
// Con dominio propio el base es '/' y url('/x') devuelve '/x'.
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const url = (path = '/') => base + (path.startsWith('/') ? path : `/${path}`);

export const isHome = (pathname: string) => pathname.replace(/\/$/, '') === base;
