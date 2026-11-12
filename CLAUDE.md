
## Git workflow

Este repositorio sigue `GIT_WORKFLOW.md`. Reglas obligatorias para asistentes de IA:

- Ramas `tipo/descripcion-corta` (feature, fix, refactor, docs, chore, release, hotfix) desde `develop` (hotfix desde `main`). Nunca commit directo a `main` ni `develop`.
- Commits en Conventional Commits: `<tipo>(<scope>): <descripción>`, imperativo, minúscula, sin punto final, ≤ 72 caracteres.
- **No añadir coautorías** (`Co-Authored-By`) ni firmas de generación automática en commits, PRs, tags o releases.
- No modificar `user.name` ni `user.email`.
- No hacer `push`, `force-push`, reescritura de historial, merges a `main`/`develop` ni crear tags sin aprobación explícita.
- Proponer el mensaje del commit y el diff antes de ejecutar cuando el cambio no sea trivial.
- Antes de reescribir historial: `git branch backup/<descripcion>-<yyyymmdd>`.

## Skills del equipo

Las skills viven en `.claude/skills/<nombre>/SKILL.md` (origen: repo inicial `santiagoricaurte06/discord`).

- Al empezar cualquier tarea, consulta `.claude/skills/guia-skills/SKILL.md` para decidir qué skill aplicar: grill-me antes de construir, git-workflow en cada commit, anti-slop al cerrar textos, revision-rendimiento si toca imágenes o carga, checklist-lanzamiento antes de deployar el sitio, entrega-al-cliente al cerrar.
- Este es un sitio estático (Astro): revision-seguridad-backend solo aplica si se agrega backend, formularios con servidor o pagos.
- Si el hook `🛡️ proteccion` bloquea un comando, no lo rodees: explica y propón una alternativa segura.
- Todo en español.
