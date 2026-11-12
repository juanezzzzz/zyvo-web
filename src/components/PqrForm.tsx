import { contactHref } from '../lib/contact';
import { url } from '../lib/url';
import { legal, site } from '../data/site';
import { useState, type FormEvent } from 'react';
import { Copy, Mail, Send } from 'lucide-react';

// Canal de peticiones, quejas y reclamos (art. 50 lit. g Ley 1480 de 2011).
// El sitio es estático: el radicado se genera aquí con la fecha y la hora, se le muestra a la persona
// y viaja dentro del mensaje (WhatsApp o correo), que queda como constancia para las dos partes.

const kinds = [
  { label: 'Petición', hint: 'Pedir información o un trámite.' },
  { label: 'Queja', hint: 'Inconformidad con la atención o el servicio.' },
  { label: 'Reclamo', hint: 'Algo que contratamos no se cumplió como se acordó.' },
  { label: 'Sugerencia', hint: 'Una idea para mejorar.' },
  { label: 'Datos personales', hint: 'Consultar, corregir o borrar tus datos, o retirar la autorización.' },
] as const;

const AUTORIZACION = `Autorizo a ${legal.responsable} a tratar mis datos para atender esta solicitud, según la política de privacidad vigente desde el ${legal.vigencia}.`;

const field =
  'w-full rounded-md border bg-white px-3.5 py-3 text-base text-noche outline-none transition-[border-color,box-shadow] placeholder:text-tinta-2 focus:border-azul focus:ring-4 focus:ring-azul/15';
const chip =
  'inline-flex min-h-11 w-full items-center rounded-md border border-noche/15 px-3.5 text-sm text-noche transition-colors peer-checked:border-azul peer-checked:bg-azul peer-checked:text-white peer-focus-visible:ring-4 peer-focus-visible:ring-azul/25 hover:border-noche/40 sm:w-auto';

type Errors = Partial<Record<'tipo' | 'nombre' | 'detalle' | 'autoriza', string>>;
type Radicado = { numero: string; fecha: string; texto: string; asunto: string };

const pad = (n: number) => String(n).padStart(2, '0');

/** PQR-AAAAMMDD-HHMM-XXXX: fecha y hora de Colombia y 4 caracteres al azar para que no se repita. */
function nuevoRadicado(d: Date) {
  const co = new Date(d.toLocaleString('en-US', { timeZone: 'America/Bogota' }));
  const azar = Math.random().toString(36).slice(2, 6).toUpperCase().padEnd(4, '0');
  const numero = `PQR-${co.getFullYear()}${pad(co.getMonth() + 1)}${pad(co.getDate())}-${pad(co.getHours())}${pad(co.getMinutes())}-${azar}`;
  const fecha = d.toLocaleString('es-CO', { timeZone: 'America/Bogota', dateStyle: 'long', timeStyle: 'short' });
  return { numero, fecha };
}

export default function PqrForm() {
  const [tipo, setTipo] = useState<number | null>(null);
  const [nombre, setNombre] = useState('');
  const [contacto, setContacto] = useState('');
  const [detalle, setDetalle] = useState('');
  const [autoriza, setAutoriza] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [radicado, setRadicado] = useState<Radicado | null>(null);
  const [copiado, setCopiado] = useState(false);

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    const e: Errors = {};
    if (tipo === null) e.tipo = 'Elige el tipo de solicitud.';
    if (nombre.trim().length < 2) e.nombre = 'Escribe tu nombre.';
    if (detalle.trim().length < 10) e.detalle = 'Cuéntanos qué pasó o qué necesitas.';
    if (!autoriza) e.autoriza = 'Necesitamos tu autorización para atender la solicitud.';
    setErrors(e);
    if (Object.keys(e).length) {
      document.getElementById(e.tipo ? 'pqr-tipo-0' : e.nombre ? 'pqr-nombre' : e.detalle ? 'pqr-detalle' : 'pqr-autoriza')?.focus();
      return;
    }
    const { numero, fecha } = nuevoRadicado(new Date());
    const k = kinds[tipo!];
    const texto = [
      `*${k.label}* · Radicado *${numero}*`,
      `Fecha y hora: ${fecha}`,
      '',
      `Nombre: ${nombre.trim()}`,
      contacto.trim() ? `Contacto: ${contacto.trim()}` : null,
      '',
      '*Detalle:*',
      detalle.trim(),
      '',
      '—',
      `Enviado desde la página de PQR de ${site.name}. ${AUTORIZACION}`,
    ].filter((l) => l !== null).join('\n');
    setRadicado({ numero, fecha, texto, asunto: `${k.label} · ${numero}` });
  };

  const copiar = async () => {
    if (!radicado) return;
    try { await navigator.clipboard.writeText(radicado.numero); setCopiado(true); } catch { /* el número sigue a la vista */ }
  };

  const errorText = (k: keyof Errors) =>
    errors[k] ? <span id={`err-${k}`} className="text-sm font-normal text-error-tinta">{errors[k]}</span> : null;

  if (radicado) {
    return (
      <div className="surface-light grid gap-5 rounded-2xl p-6 md:p-9" role="status">
        <p className="text-sm text-tinta-2">Tu número de radicado</p>
        <div className="flex flex-wrap items-center gap-3">
          <p className="display break-all text-2xl text-noche md:text-3xl">{radicado.numero}</p>
          <button type="button" onClick={copiar} className="btn-ghost !border-noche/20 !px-3 !py-2 !text-noche hover:!border-azul">
            <Copy size={16} aria-hidden="true" /> {copiado ? 'Copiado' : 'Copiar'}
          </button>
        </div>
        <p className="text-tinta-2">Fecha y hora: {radicado.fecha}</p>
        <p className="text-tinta-2">Guárdalo: con él puedes preguntar por tu solicitud.</p>
        <p className="font-medium text-noche">Falta un paso: envíanos la solicitud por uno de estos medios. Ya va escrita, con el radicado.</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <a href={contactHref('wa', radicado.texto)} target="_blank" rel="noopener" className="btn bg-whatsapp text-white hover:bg-whatsapp-hondo">
            <Send size={18} aria-hidden="true" /> Enviar por WhatsApp
          </a>
          <a href={contactHref('mail', radicado.asunto, radicado.texto.replace(/\*/g, ''))} className="btn bg-noche text-marfil hover:bg-acero">
            <Mail size={18} aria-hidden="true" /> Enviar por correo
          </a>
        </div>
        <p className="text-sm text-tinta-2">
          Respondemos las peticiones, quejas y reclamos en máximo 15 días hábiles. Las solicitudes sobre datos personales: consultas en 10 días hábiles y reclamos en 15.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="surface-light grid gap-6 rounded-2xl p-6 md:p-9">
      <fieldset className="grid gap-2" aria-describedby={errors.tipo ? 'err-tipo' : undefined}>
        <legend className="mb-2 text-sm font-medium text-noche">Tipo de solicitud</legend>
        <div className="grid gap-2 sm:flex sm:flex-wrap">
          {kinds.map((k, i) => (
            <label key={k.label} className="cursor-pointer" title={k.hint}>
              <input
                id={`pqr-tipo-${i}`}
                type="radio"
                name="tipo"
                checked={tipo === i}
                onChange={() => { setTipo(i); setErrors((x) => ({ ...x, tipo: undefined })); }}
                className="peer sr-only"
              />
              <span className={chip}>{k.label}</span>
            </label>
          ))}
        </div>
        {tipo !== null && <p className="text-sm text-tinta-2">{kinds[tipo].hint}</p>}
        {errorText('tipo')}
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm font-medium text-noche">
          Tu nombre
          <input
            id="pqr-nombre"
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
          <span>Correo o celular <span className="font-normal text-tinta-2">(opcional)</span></span>
          <input value={contacto} onChange={(e) => setContacto(e.target.value)} autoComplete="email" autoCapitalize="none" spellCheck={false} className={`${field} border-noche/15`} />
        </label>
      </div>

      <label className="grid gap-1.5 text-sm font-medium text-noche">
        Qué pasó o qué necesitas
        <textarea
          id="pqr-detalle"
          value={detalle}
          onChange={(e) => { setDetalle(e.target.value); setErrors((x) => ({ ...x, detalle: undefined })); }}
          rows={5}
          aria-invalid={!!errors.detalle}
          aria-describedby={errors.detalle ? 'err-detalle' : undefined}
          className={`${field} resize-y ${errors.detalle ? 'border-error-tinta' : 'border-noche/15'}`}
          placeholder="Incluye fechas, el proyecto o servicio y lo que esperas que hagamos."
        />
        {errorText('detalle')}
      </label>

      <div className="grid gap-3 rounded-md border border-noche/10 bg-marfil-2/60 p-4 text-xs leading-relaxed text-tinta-2">
        <p>
          <strong className="font-semibold text-noche">Aviso de privacidad.</strong> {site.name} usa estos datos solo para atender tu solicitud. Puedes consultarlos, corregirlos o pedir que los borremos. Detalles en la{' '}
          <a href={url('/privacidad/')} target="_blank" rel="noopener" className="font-semibold text-noche underline decoration-azul decoration-2 underline-offset-2 hover:text-azul">política de privacidad</a>.
        </p>
        <label className="flex cursor-pointer items-start gap-3 text-sm text-noche">
          <input
            id="pqr-autoriza"
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

      <button type="submit" className="btn-primary w-full !py-4 text-base">Generar radicado</button>
    </form>
  );
}
