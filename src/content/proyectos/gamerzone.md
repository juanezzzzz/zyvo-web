---
name: GamerZone
kind: Sistema de gestión para un centro de e-sports
summary: Un solo sistema para manejar la caja por turnos, la bodega, las deudas de clientes y los pagos a trabajadores de GamerZone E-Sports Center, en varias sedes y aun sin internet.
bullets:
  - Hoja de turno que hace el cuadre de caja sola
  - "Usuarios por rol: administrador, cajero y bodega"
  - Varias sedes en un mismo sistema
  - Sigue funcionando sin conexión y sincroniza al volver
  - Cierres de turno en PDF
stack: [React 19, TypeScript, Vite, Tailwind CSS, Supabase, IndexedDB, jsPDF]
accent: azul
order: 2
video:
  src: /videos/gamerzone.mp4
  poster: /videos/gamerzone.webp
  title: GamerZone, sistema a la medida para un centro de e-sports
  duration: 60
  width: 1280
  height: 720
facts:
  - { k: Cliente, v: GamerZone E-Sports Center }
  - { k: Sector, v: Entretenimiento }
  - { k: Formato, v: "Web, en computador y celular" }
---

## El reto

Un centro de e-sports maneja muchas cosas al mismo tiempo: la caja de cada turno, el inventario de la bodega, lo que deben los clientes y lo que se le paga a cada trabajador. Con varias sedes, llevar todo eso por separado hace difícil saber cómo va el negocio.

## Lo que construimos

Un sistema web a la medida donde **cada persona entra con su usuario y ve lo que necesita**: el administrador ve todo el negocio, el cajero registra su turno y el encargado de bodega maneja el inventario.

- **Turnos con cuadre automático:** el cajero registra lo que pasa en su turno y el sistema hace el cuadre. Al cerrar, se genera el PDF del turno.
- **Bodega, deudas y cuentas:** inventario al día, deudas y abonos de clientes, préstamos y cuentas por trabajador, y gastos del local.
- **Varias sedes:** se cambia de sede desde el mismo sistema.
- **Modo noche y modo día**, y pantallas pensadas también para el celular.

## Cómo lo hicimos

- **Funciona sin internet:** si se cae la red, lo registrado se guarda en el equipo (IndexedDB) y se sincroniza solo cuando vuelve la conexión.
- **Pruebas automatizadas** para las partes delicadas: el cuadre, la nómina y los PDF.
- Hecho con React, TypeScript y Vite, con Supabase como base de datos.
