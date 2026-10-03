---
name: Zona Segura
kind: Plataforma educativa en SST
summary: Plataforma interactiva de seguridad y salud en el trabajo para el SENA. Se aprende jugando, con progreso y puntaje global.
bullets:
  - Juego de dotación de EPP
  - Vocal Hero y respiración guiada
  - Módulo SENA y seguimiento de progreso
stack: [JavaScript, Phaser 3, GSAP, Web Audio]
accent: alerta
order: 2
facts:
  - { k: Sector, v: Educación }
  - { k: Para, v: SENA }
  - { k: Formato, v: Web interactiva }
---

## El reto

Las capacitaciones en seguridad y salud en el trabajo suelen ser presentaciones largas que se olvidan rápido. El SENA necesitaba una forma de que los aprendices practicaran, no solo leyeran.

## Lo que construimos

Una plataforma web con minijuegos que enseñan haciendo:

- **Dotación de EPP:** el aprendiz equipa al trabajador con los elementos de protección correctos para cada tarea.
- **Vocal Hero:** ejercicios de voz que usan el micrófono del navegador.
- **Respiración guiada:** pausas activas con ritmo visual y sonoro.

Cada actividad suma a un puntaje global, y el módulo SENA permite seguir el progreso.

## Cómo lo hicimos

Los juegos están hechos con Phaser 3, las animaciones de la interfaz con GSAP y el audio con la Web Audio API. Todo corre en el navegador, sin instalar nada.
