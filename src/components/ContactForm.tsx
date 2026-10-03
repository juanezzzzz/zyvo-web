import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import { CheckCircle2, Loader2, Send } from 'lucide-react';

const types = ['Aplicación web', 'API / backend', 'Plataforma educativa', 'Automatización / IA', 'Otro'] as const;

const schema = z.object({
  nombre: z.string().trim().min(2, 'Escribe tu nombre.'),
  contacto: z
    .string()
    .trim()
    .refine(
      (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || v.replace(/\D/g, '').length >= 7,
      'Escribe un correo válido o un número de WhatsApp.',
    ),
  empresa: z.string().trim().optional(),
  tipo: z.enum(types),
  mensaje: z.string().trim().min(10, 'Cuéntanos un poco más: al menos una frase.'),
});
type Values = z.infer<typeof schema>;

type Props = { endpoint: string; whatsapp: string };

const field =
  'w-full rounded-md border bg-white px-3.5 py-3 text-base text-noche outline-none transition-[border-color,box-shadow] placeholder:text-tinta-2/60 focus:border-azul focus:ring-4 focus:ring-azul/15';

export default function ContactForm({ endpoint, whatsapp }: Props) {
  const [sent, setSent] = useState<null | 'mail' | 'wa'>(null);
  const [failed, setFailed] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { tipo: types[0] } });

  const onSubmit = async (data: Values) => {
    setFailed(false);
    if (endpoint) {
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        });
        if (!res.ok) throw new Error(String(res.status));
        reset();
        setSent('mail');
      } catch {
        setFailed(true);
      }
      return;
    }
    // Sin endpoint configurado: abre WhatsApp con el mensaje armado
    const text = `Hola Zyvo, soy ${data.nombre}${data.empresa ? ` de ${data.empresa}` : ''}.\nProyecto: ${data.tipo}\n${data.mensaje}\nContacto: ${data.contacto}`;
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    setSent('wa');
  };

  const err = (k: keyof Values) =>
    errors[k] ? (
      <span id={`err-${k}`} className="text-sm font-normal text-[#C4372D]">
        {errors[k]?.message}
      </span>
    ) : null;
  const aria = (k: keyof Values) => ({ 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `err-${k}` : undefined });
  const border = (k: keyof Values) => (errors[k] ? 'border-[#C4372D]' : 'border-noche/15');

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-w-0 overflow-hidden rounded-xl bg-white p-6 shadow-[0_30px_60px_-30px_rgba(14,18,24,.35)] ring-1 ring-noche/10 md:p-9">
        <AnimatePresence mode="wait" initial={false}>
          {sent ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="grid min-h-[420px] place-content-center justify-items-center gap-4 text-center"
              role="status"
            >
              <CheckCircle2 size={52} className="text-senal" aria-hidden="true" />
              <h3 className="display text-2xl text-noche">{sent === 'mail' ? 'Mensaje enviado' : 'WhatsApp abierto'}</h3>
              <p className="max-w-[36ch] text-tinta-2">
                {sent === 'mail'
                  ? 'Te respondemos en menos de 24 horas hábiles.'
                  : 'Tu mensaje ya está escrito en WhatsApp. Solo falta darle enviar.'}
              </p>
              <button type="button" onClick={() => setSent(null)} className="btn-ghost mt-2 !border-noche/20 !text-noche hover:!border-azul">
                Escribir otro mensaje
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="grid gap-5"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-1.5 text-sm font-medium text-noche">
                  Nombre
                  <input {...register('nombre')} {...aria('nombre')} autoComplete="name" className={`${field} ${border('nombre')}`} />
                  {err('nombre')}
                </label>
                <label className="grid gap-1.5 text-sm font-medium text-noche">
                  Correo o WhatsApp
                  <input {...register('contacto')} {...aria('contacto')} autoComplete="email" autoCapitalize="none" spellCheck={false} className={`${field} ${border('contacto')}`} />
                  {err('contacto')}
                </label>
              </div>
              <label className="grid gap-1.5 text-sm font-medium text-noche">
                <span>
                  Empresa u organización <span className="font-normal text-tinta-2">(opcional)</span>
                </span>
                <input {...register('empresa')} autoComplete="organization" className={`${field} border-noche/15`} />
              </label>
              <fieldset className="grid gap-2">
                <legend className="mb-2 text-sm font-medium text-noche">Tipo de proyecto</legend>
                <div className="flex flex-wrap gap-2">
                  {types.map((t) => (
                    <label key={t} className="cursor-pointer">
                      <input type="radio" value={t} {...register('tipo')} className="peer sr-only" />
                      <span className="inline-flex min-h-11 items-center rounded-md border border-noche/15 px-3.5 text-sm text-noche transition-colors peer-checked:border-azul peer-checked:bg-azul peer-checked:text-white peer-focus-visible:ring-4 peer-focus-visible:ring-azul/25 hover:border-noche/40">
                        {t}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <label className="grid gap-1.5 text-sm font-medium text-noche">
                ¿Qué necesitas?
                <textarea
                  {...register('mensaje')}
                  {...aria('mensaje')}
                  rows={4}
                  className={`${field} ${border('mensaje')} resize-y`}
                  placeholder="Ej.: un sistema para manejar inventario y ventas en dos sedes…"
                />
                {err('mensaje')}
              </label>
              <button type="submit" disabled={isSubmitting} className="btn-primary mt-1 w-full !py-4 text-base disabled:opacity-70">
                {isSubmitting ? <Loader2 size={18} className="animate-spin" aria-hidden="true" /> : <Send size={18} aria-hidden="true" />}
                {isSubmitting ? 'Enviando…' : endpoint ? 'Enviar mensaje' : 'Enviar por WhatsApp'}
              </button>
              {failed && (
                <p role="alert" className="text-sm text-[#C4372D]">
                  No se pudo enviar. Escríbenos por WhatsApp o al correo de la izquierda.
                </p>
              )}
            </motion.form>
          )}
        </AnimatePresence>
        <svg className="pointer-events-none absolute -bottom-px -right-px h-10 w-44" viewBox="0 0 176 40" aria-hidden="true">
          <path d="M176 6 140 26H0v14h176Z" fill="#2456E8" />
        </svg>
      </div>
    </MotionConfig>
  );
}
