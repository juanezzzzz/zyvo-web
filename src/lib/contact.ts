// Datos de contacto protegidos contra scraping: nunca se escriben tal cual en el HTML ni en el código.
// Se guardan invertidos y en base64, y el enlace real se arma en el navegador solo cuando alguien
// interactúa con el botón (pasar el mouse, tocarlo, enfocarlo o hacer clic).
// Para cambiarlos: base64 del texto al revés, p. ej. en la consola: btoa('573000000000'.split('').reverse().join(''))
const ENC = {
  wa: 'NjkwNzk3ODIyMzc1', // WhatsApp, formato internacional sin + ni espacios
  mail: 'bW9jLmxpYW1nQHNub2l0dWxvc292eXp0Y2F0bm9j',
};

const decode = (s: string) => atob(s).split('').reverse().join('');

export type ContactKind = 'wa' | 'mail';

export function contactHref(kind: ContactKind, text?: string) {
  if (kind === 'wa') return `https://wa.me/${decode(ENC.wa)}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
  return `mailto:${decode(ENC.mail)}${text ? `?subject=${encodeURIComponent(text)}` : ''}`;
}

/** Activa los enlaces <a data-contact="wa|mail" data-contact-text="…"> de la página. */
export function armContactLinks() {
  const arm = (e: Event) => {
    const a = (e.target as Element | null)?.closest?.<HTMLAnchorElement>('a[data-contact]');
    if (!a || a.dataset.armed) return;
    a.href = contactHref(a.dataset.contact as ContactKind, a.dataset.contactText);
    a.dataset.armed = '1';
  };
  for (const type of ['pointerover', 'pointerdown', 'touchstart', 'focusin', 'click']) {
    document.addEventListener(type, arm, { capture: true, passive: true });
  }
  // Donde la ley pide mostrar el dato (política de privacidad), se escribe en el navegador, nunca en el HTML
  document.querySelectorAll<HTMLElement>('[data-contact-reveal]').forEach((el) => {
    const v = decode(ENC[el.dataset.contactReveal as ContactKind]);
    el.textContent = el.dataset.contactReveal === 'wa' ? `+${v.slice(0, 2)} ${v.slice(2, 5)} ${v.slice(5, 8)} ${v.slice(8)}` : v;
  });
}
