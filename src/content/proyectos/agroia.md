---
name: AgroIA Casanare
kind: Agente de IA para el agro
summary: Un agente en Telegram que conecta productores y compradores del campo. El productor publica su oferta con una nota de voz; el comprador busca en lenguaje natural.
bullets:
  - Ofertas por nota de voz, sin formularios
  - Búsqueda en lenguaje natural para compradores
  - 344 pruebas automatizadas
  - Desplegado en Render y Vercel
stack: [Python 3.12, FastAPI, Angular 18, Supabase, Telegram Bot API, Docker]
highlight: 1.er lugar, Hackathon Colombia 5.0
accent: senal
order: 1
featured: true
facts:
  - { k: Sector, v: Agro }
  - { k: Canal, v: Telegram }
  - { k: Reconocimiento, v: "1.er lugar, regional Casanare" }
---

## El reto

En Casanare, quien produce y quien compra muchas veces no se encuentran. Los productores tienen poco tiempo para llenar formularios en una app, y los compradores no saben quién tiene qué ni dónde.

## Lo que construimos

Un agente que vive donde la gente ya está: Telegram. El productor manda una **nota de voz** contando qué tiene, cuánto y dónde; el agente la convierte en una oferta publicada. El comprador escribe lo que busca **como lo diría en una conversación** y recibe las ofertas que encajan.

Detrás hay una API en FastAPI, una base de datos en Supabase y un panel web en Angular para administrar la información.

## Cómo lo hicimos

- **Pruebas desde el primer día:** 344 pruebas automatizadas cubren el flujo completo, desde la nota de voz hasta la búsqueda.
- **Despliegue real:** la API corre en Render y el panel en Vercel, empaquetados con Docker.
- **Validado en competencia:** el proyecto ganó el primer lugar en la Hackathon Colombia 5.0, regional Casanare.
