# Changelog

Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/). Versionado [SemVer](https://semver.org/lang/es/).

## [1.1.0] - 2026-11-12

### Añadido
- **Página de peticiones, quejas y reclamos (`/pqr/`)**: genera un número de radicado con fecha y hora y envía la solicitud por WhatsApp o correo. Respuesta en máximo 15 días hábiles (art. 50 lit. g y art. 58 de la Ley 1480 de 2011). (#1)
- **Pie de página**: teléfono, correo y enlaces a PQR y a la Superintendencia de Industria y Comercio. (#1)
- **Formulario de contacto**: casilla de autorización obligatoria y sin marcar, aviso de privacidad, aviso de mayores de edad y la autorización con la versión de la política dentro del mensaje. Campo trampa contra spam para cuando se active Formspree. (#1)
- **Configuración del repositorio**: skills del equipo, hook de protección, hooks de git, CI de commits y pruebas, plantilla de PR, `CLAUDE.md` y `GIT_WORKFLOW.md`. (#1)

### Cambiado
- **Política de privacidad**: alojamiento real (Vercel y GitHub), transferencia a EE. UU. (Circular Externa 8 de 2017), menores de edad, cómo se da la autorización y solicitudes por PQR. Vigente desde el 12 de noviembre de 2026. (#1)
- **Términos de uso**: uso permitido (Ley 1273 de 2009) y canal de PQR. (#1)
- "Te respondemos en menos de 24 horas hábiles" pasa a "Solemos responder…", para no prometer un plazo exigible (art. 29 Ley 1480). (#1)

### Pendiente
- NIT, razón social y dirección de notificación, cuando la empresa esté constituida (`legal` en `src/data/site.ts`).

## [1.0.0]

- Primera versión publicada de la web de Zyvo Solutions: inicio, servicios, proyectos, estudio, equipo, preguntas frecuentes, contacto, privacidad, términos y 404.
