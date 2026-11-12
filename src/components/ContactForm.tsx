import { contactHref } from '../lib/contact';
import { url } from '../lib/url';
import { legal, site } from '../data/site';
import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import { CheckCircle2, Loader2, Send } from 'lucide-react';

// Formulario corto: dos toques (qué y para cuándo), el nombre y, si quiere, una frase.
// Sin campo de contacto: por WhatsApp el número ya llega con el mensaje.
// Con `endpoint` (Formspree) se pide además un correo o WhatsApp para poder responder.

// Alineado con las dos líneas: software (sistema, plataforma, asistente) y estudio creativo (video, 3D).
// El emoji ayuda a clasificar el mensaje de un vistazo en WhatsApp; el ejemplo guía la frase.
const types = [
  { label: 'Sistema web o integración', emoji: '💻', example: 'Ej.: llevo las ventas y el inventario en un cuaderno y quiero tenerlo en el computador y el celular.' },
  { label: 'Plataforma educativa', emoji: '🎓', example: 'Ej.: una capacitación con juegos para mi equipo, con certificado al final.' },
  { label: 'Asistente o automatización', emoji: '🤖', example: 'Ej.: que un asistente responda por WhatsApp las preguntas y pedidos más comunes.' },
  { label: 'Video con Zy', emoji: '🎬', example: 'Ej.: un video corto para presentar mi negocio en Instagram.' },
  { label: 'Diseño o impresión 3D', emoji: '🧊', example: 'Ej.: llaveros con el logo de mi empresa para un evento.' },
  { label: 'Otra idea', emoji: '✨', example: 'Cuéntanos tu idea en una o dos frases.' },
] as const;
const timings = ['Lo antes posible', 'En 1 a 3 meses', 'Solo estoy explorando'] as const;

type Props = { endpoint: string; successImg?: string };
type Errors = Partial<Record<'tipo' | 'nombre' | 'contacto' | 'autoriza', string>>;

// Texto de la autorización: va igual en la casilla y en el mensaje, con la versión de la política, como prueba.
const AUTORIZACION = `Soy mayor de edad y autorizo a ${legal.responsable} a tratar mis datos para responder mi solicitud, según la política de privacidad vigente desde el ${legal.vigencia}.`;

const field =
  'w-full rounded-md border bg-white px-3.5 py-3 text-base text-noche outline-none transition-[border-color,box-shadow] placeholder:text-tinta-2 focus:border-azul focus:ring-4 focus:ring-azul/15';
const chip =
  'inline-flex min-h-11 w-full items-center rounded-md border border-noche/15 px-3.5 text-sm text-noche transition-colors peer-checked:border-azul peer-checked:bg-azul peer-checked:text-white peer-focus-visible:ring-4 peer-focus-visible:ring-azul/25 hover:border-noche/40 sm:w-auto';

/** Mensaje que llega por WhatsApp: ordenado, con negritas de WhatsApp (*texto*) y la autorización al final. */
function buildMessage(d: { nombre: string; negocio: string; tipo: (typeof types)[number]; plazo: string; mensaje: string }) {
  return [
    'Hola, equipo de Zyvo 👋',
    '',
    `Soy *${d.nombre}*${d.negocio ? ` de *${d.negocio}*` : ''}.`,
    `Me interesa: ${d.tipo.emoji} *${d.tipo.label}*`,
    `Para cuándo: ${d.plazo || 'Aún no lo tengo claro'}`,
    '',
    '*Lo que necesito:*',
    d.mensaje || 'Prefiero contárselo por aquí.',
    '',
    '—',
    `Les escribo desde la página web de Zyvo. ${AUTORIZACION}`,
  ].join('\n');
}

export default function ContactForm({ endpoint, successImg }: Props) {
  const [tipo, setTipo] = useState<number | null>(null);
  const [plazo, setPlazo] = useState('');
  const [nombre, setNombre] = useState('');
  const [negocio, setNegocio] = useState('');
  const [contacto, setContacto] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [autoriza, setAutoriza] = useState(false);
  const [trampa, setTrampa] = useState(''); // campo oculto: si lo llenan, es un bot
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const [sent, setSent] = useState<null | { via: 'mail' } | { via: 'wa'; href: string }>(null);

  const validate = (): Errors => {
    const e: Errors = {};
    if (tipo === null) e.tipo = 'Elige qué te gustaría hacer.';
    if (nombre.trim().length < 2) e.nombre = 'Escribe tu nombre.';
    if (endpoint && !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contacto.trim()) || contacto.replace(/\D/g, '').length >= 7))
      e.contacto = 'Escribe un correo válido o un número de WhatsApp.';
    if (!autoriza) e.autoriza = 'Necesitamos tu autorización para poder responderte.';
    return e;
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      // Lleva el foco al primer campo con problema
      document.getElementById(e.tipo ? 'cf-tipo-0' : e.nombre ? 'cf-nombre' : e.contacto ? 'cf-contacto' : 'cf-autoriza')?.focus();
      return;
    }
    const data = { nombre: nombre.trim(), negocio: negocio.trim(), tipo: types[tipo!], plazo, mensaje: mensaje.trim() };
    const text = buildMessage(data);
    setFailed(false);

    if (endpoint) {
      // Bot: se finge el envío y no se manda nada
      if (trampa) { setSent({ via: 'mail' }); return; }
      setSending(true);
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          body: JSON.stringify({ _subject: `${data.tipo.emoji} ${data.tipo.label} · ${data.nombre}`, ...data, tipo: data.tipo.label, contacto: contacto.trim(), mensaje: text, autorizacion: AUTORIZACION, autorizado_en: new Date().toISOString() }),
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        });
        if (!res.ok) throw new Error(String(res.status));
        setSent({ via: 'mail' });
      } catch {
        setFailed(true);
      } finally {
        setSending(false);
      }
      return;
    }
    // Sin endpoint: abre WhatsApp con el mensaje armado. Si el navegador bloquea la ventana, queda el botón.
    const href = contactHref('wa', text);
    window.open(href, '_blank', 'noopener');
    setSent({ via: 'wa', href });
  };

  const reset = () => {
    setSent(null); setTipo(null); setPlazo(''); setMensaje(''); setAutoriza(false); setErrors({});
  };

  const errorText = (k: keyof Errors) =>
    errors[k] ? <span id={`err-${k}`} className="text-sm font-normal text-error-tinta">{errors[k]}</span> : null;

  return (
    <MotionConfig reducedMotion="user">
      <div className="surface-light relative min-w-0 overflow-hidden rounded-2xl p-6 md:p-9">
        <AnimatePresence mode="wait" initial={false}>
          {sent ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="grid min-h-[380px] place-content-center justify-items-center gap-4 text-center"
              role="status"
            >
              {successImg ? (
                <motion.img
                  src={successImg}
                  alt=""
                  width={320}
                  height={373}
                  className="h-40 w-auto"
                  initial={{ y: 16, rotate: -4 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
              ) : (
                <CheckCircle2 size={52} className="text-senal" aria-hidden="true" />
              )}
              <h3 className="display text-2xl text-noche">{sent.via === 'mail' ? 'Mensaje enviado' : 'Tu mensaje está listo'}</h3>
              <p className="max-w-[38ch] text-tinta-2">
                {sent.via === 'mail'
                  ? 'Solemos responder en menos de 24 horas hábiles.'
                  : 'Lo abrimos en WhatsApp con todo escrito. Revísalo y dale enviar; solemos responder en menos de 24 horas hábiles.'}
              </p>
              <div className="mt-2 flex flex-wrap justify-center gap-3">
                {sent.via === 'wa' && (
                  <a href={sent.href} target="_blank" rel="noopener" className="btn bg-whatsapp text-white hover:bg-whatsapp-hondo">
                    Abrir WhatsApp de nuevo
                  </a>
                )}
                <button type="button" onClick={reset} className="btn-ghost !border-noche/20 !text-noche hover:!border-azul">
                  Escribir otro mensaje
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={onSubmit} noValidate className="grid gap-6">
              <fieldset className="grid gap-2" aria-describedby={errors.tipo ? 'err-tipo' : undefined}>
                <legend className="mb-2 text-sm font-medium text-noche">¿Qué te gustaría hacer?</legend>
                <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                  {types.map((t, i) => (
                    <label key={t.label} className="cursor-pointer">
                      <input
                        id={`cf-tipo-${i}`}
                        type="radio"
                        name="tipo"
                        checked={tipo === i}
                        onChange={() => { setTipo(i); setErrors((e) => ({ ...e, tipo: undefined })); }}
                        className="peer sr-only"
                      />
                      <span className={chip}>{t.label}</span>
                    </label>
                  ))}
                </div>
                {errorText('tipo')}
              </fieldset>

              <fieldset className="grid gap-2">
                <legend className="mb-2 text-sm font-medium text-noche">
                  ¿Para cuándo? <span className="font-normal text-tinta-2">(opcional)</span>
                </legend>
                <div className="grid gap-2 sm:flex sm:flex-wrap">
                  {timings.map((t) => (
                    <label key={t} className="cursor-pointer">
                      <input type="radio" name="plazo" checked={plazo === t} onChange={() => setPlazo(t)} className="peer sr-only" />
                      <span className={chip}>{t}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-1.5 text-sm font-medium text-noche">
                  Tu nombre
                  <input
                    id="cf-nombre"
                    value={nombre}
                    onChange={(e) => { setNombre(e.target.value); setErrors((x) => ({ ...x, nombre: undefined })); }}
                    autoComplete="name"
                    aria-invalid={!!errors.nombre}
                    aria-describedby={errors.nombre ? 'err-nombre' : undefined}
                    className={`${field} ${errors.nombre ? 'border-error-tinta' : 'border-noche/15'}`}
                  />
                  {errorText('nombre')}
                </label>
                <label className="grid gap-1.5 text-sm font-medium text-noche">
                  <span>Negocio o institución <span className="font-normal text-tinta-2">(opcional)</span></span>
                  <input value={negocio} onChange={(e) => setNegocio(e.target.value)} autoComplete="organization" className={`${field} border-noche/15`} />
                </label>
              </div>

              {endpoint && (
                <label className="grid gap-1.5 text-sm font-medium text-noche">
                  Correo o WhatsApp para responderte
                  <input
                    id="cf-contacto"
                    value={contacto}
                    onChange={(e) => { setContacto(e.target.value); setErrors((x) => ({ ...x, contacto: undefined })); }}
                    autoComplete="email"
                    autoCapitalize="none"
                    spellCheck={false}
                    aria-invalid={!!errors.contacto}
                    aria-describedby={errors.contacto ? 'err-contacto' : undefined}
                    className={`${field} ${errors.contacto ? 'border-error-tinta' : 'border-noche/15'}`}
                  />
                  {errorText('contacto')}
                </label>
              )}

              <label className="grid gap-1.5 text-sm font-medium text-noche">
                <span>Cuéntanos en una frase <span className="font-normal text-tinta-2">(opcional)</span></span>
                <textarea
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  rows={3}
                  className={`${field} border-noche/15 resize-y`}
                  placeholder={tipo === null ? 'Cuéntanos tu idea en una o dos frases.' : types[tipo].example}
                />
              </label>

              {endpoint && (
                // Campo trampa: invisible para personas, los bots lo llenan. Formspree descarta los envíos con _gotcha.
                <input type="text" name="_gotcha" value={trampa} onChange={(e) => setTrampa(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
              )}

              {/* Aviso de privacidad (art. 15 Decreto 1377 de 2013): quién, para qué, derechos y dónde está la política */}
              <div className="grid gap-3 rounded-md border border-noche/10 bg-marfil-2/60 p-4 text-xs leading-relaxed text-tinta-2">
                <p>
                  <strong className="font-semibold text-noche">Aviso de privacidad.</strong> {site.name} usa tus datos solo para responderte y, si lo pides, enviarte una propuesta. No los vendemos ni te enviamos publicidad. Puedes consultarlos, corregirlos o pedir que los borremos cuando quieras. Este formulario es solo para mayores de 18 años. Detalles en la{' '}
                  <a href={url('/privacidad/')} target="_blank" rel="noopener" className="font-semibold text-noche underline decoration-azul decoration-2 underline-offset-2 hover:text-azul">
                    política de privacidad
                  </a>
                  .
                </p>
                <label className="flex cursor-pointer items-start gap-3 text-sm text-noche">
                  <input
                    id="cf-autoriza"
                    type="checkbox"
                    checked={autoriza}
                    onChange={(e) => { setAutoriza(e.target.checked); setErrors((x) => ({ ...x, autoriza: undefined })); }}
                    aria-invalid={!!errors.autoriza}
                    aria-describedby={errors.autoriza ? 'err-autoriza' : undefined}
                    className="mt-0.5 size-5 shrink-0 accent-azul"
                  />
                  <span>{AUTORIZACION}</span>
                </label>
                {errorText('autoriza')}
              </div>

              <button type="submit" disabled={sending} className="btn-primary w-full !py-4 text-base disabled:opacity-70">
                {sending ? <Loader2 size={18} className="animate-spin" aria-hidden="true" /> : <Send size={18} aria-hidden="true" />}
                {sending ? 'Enviando…' : endpoint ? 'Enviar mensaje' : 'Enviar por WhatsApp'}
              </button>
              {failed && (
                <p role="alert" className="text-sm text-error-tinta">
                  No se pudo enviar. Usa los botones de WhatsApp o correo de la izquierda.
                </p>
              )}
            </motion.form>
          )}
        </AnimatePresence>
        <svg className="pointer-events-none absolute -bottom-px -right-px h-10 w-44" viewBox="0 0 176 40" aria-hidden="true">
          <path d="M176 6 140 26H0v14h176Z" fill="var(--color-banda)" />
        </svg>
      </div>
    </MotionConfig>
  );
}
