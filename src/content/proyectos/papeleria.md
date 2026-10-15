---
name: Papelería
kind: Sistema de turnos para una papelería
summary: "Un sistema para que cada turno de la papelería cuadre la caja mientras se llena la hoja, controle las copias de cada máquina y lleve el inventario, lo que deben los clientes y los pagos de la quincena, aun sin internet."
bullets:
  - "La caja se cuadra mientras se llena la hoja del turno"
  - "Avisa si las copias anotadas no coinciden con el contador"
  - "El ticket se sube desde el celular con un código QR"
  - "Sigue funcionando aunque se caiga el internet"
  - "Inventario, deudas de clientes y quincena en un solo lugar"
accent: alerta
order: 3
video:
  src: /videos/papeleria.mp4
  poster: /videos/papeleria.webp
  title: Papelería, sistema de turnos a la medida
  duration: 90
  width: 1280
  height: 720
facts:
  - { k: Cliente, v: "Papelería (uso interno)" }
  - { k: Sector, v: "Comercio" }
  - { k: Funciona en, v: "Computador y celular" }
---

## El reto

En una papelería pasan muchas cosas en cada turno: ventas en caja, copias en blanco y negro y a color, recargas, trabajos por encargo. Cuadrar todo eso a mano en un cuaderno toma tiempo y deja espacio para errores.

## Lo que construimos

Un sistema a la medida para el día a día del mostrador y de la oficina.

- **En el mostrador:** el empleado empieza su turno con la meta del día y llena la hoja; el sistema hace el cuadre mientras escribe. Si las copias anotadas no coinciden con el contador de la máquina, avisa. El ticket se sube desde el celular escaneando un código QR, y al cerrar queda un resumen del turno para archivar.
- **Detrás del mostrador:** se compara lo cobrado con lo que llegó al banco, se hace el reconteo del inventario, se lleva lo que debe cada cliente y lo que abona, y se calcula la quincena de cada trabajador.
- **Varias sedes** en el mismo sistema, y pantallas pensadas también para el celular.

## Cómo lo hicimos

- **Funciona sin internet:** si se cae la red, lo registrado se guarda en el equipo y se sube solo cuando vuelve la conexión.
- **Revisión cuidadosa** de las partes delicadas: el cuadre de caja, los contadores de las máquinas y los pagos.
