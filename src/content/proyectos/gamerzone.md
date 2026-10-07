---
name: GamerZone
kind: Sistema para manejar un centro de videojuegos
summary: "Un solo sistema para manejar la caja por turnos, la bodega, lo que deben los clientes y los pagos a los trabajadores de GamerZone E-Sports Center, en varias sedes y aun sin internet."
bullets:
  - "La caja de cada turno se cuadra sola"
  - "Cada persona entra con su usuario: administrador, cajero y bodega"
  - "Varias sedes en un mismo sistema"
  - "Sigue funcionando aunque se caiga el internet"
  - "Cierre de cada turno listo para imprimir"
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
  - { k: Cliente, v: "GamerZone E‑Sports Center" }
  - { k: Sector, v: "Entretenimiento" }
  - { k: Funciona en, v: "Computador y celular" }
---

## El reto

Un centro de videojuegos maneja muchas cosas al mismo tiempo: la caja de cada turno, el inventario de la bodega, lo que deben los clientes y lo que se le paga a cada trabajador. Con varias sedes, llevar todo eso por separado hace difícil saber cómo va el negocio.

## Lo que construimos

Un sistema a la medida donde **cada persona entra con su usuario y ve lo que necesita**: el administrador ve todo el negocio, el cajero registra su turno y el encargado de bodega maneja el inventario.

- **Turnos con cuadre automático:** el cajero registra lo que pasa en su turno y el sistema hace las cuentas. Al cerrar, queda un resumen listo para imprimir.
- **Bodega, deudas y cuentas:** inventario al día, deudas y abonos de clientes, préstamos y pagos por trabajador, y gastos del local.
- **Varias sedes:** se cambia de sede desde el mismo sistema.
- **Modo noche y modo día**, y pantallas pensadas también para el celular.

## Cómo lo hicimos

- **Funciona sin internet:** si se cae la red, lo registrado se guarda en el equipo y se sube solo cuando vuelve la conexión.
- **Revisión cuidadosa** de las partes delicadas: el cuadre de caja, los pagos y los resúmenes de cada turno.
