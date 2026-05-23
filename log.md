# Log de desarrollo — Lista de Tareas

## Fase 1: Creación inicial

### 1. architecture.md
- Se creó el documento de requerimientos describiendo la app: HTML + CSS + JS vanilla, 3 archivos, lista de tareas con persistencia en localStorage.

### 2. index.html
- Estructura base: `<h1>Lista de Tareas</h1>`, formulario con input + botón "Agregar", mensaje de empty state, y `<ul>` para las tareas.
- Idioma `es`, fuente del sistema, viewport meta para mobile.

### 3. styles.css
- Tema oscuro con fondo `#0b0b1a` y gradiente radial `#1a0a2e`.
- Paleta retrowave: cian neón `#00f0ff`, magenta `#ff44ff` / `#ff00aa`, púrpura `#3a2a5e`.
- Contenedor centrado de 480px. Input con foco magenta. Botón con gradiente magenta y glow.
- Tareas como tarjetas con borde sutil, hover glow. Checkbox con accent-color magenta.
- Tareas completadas: texto tachado + gris `#4a3a6a`.

### 4. app.js
- 4 referencias al DOM: form, input, list, emptyMsg.
- `loadTasks()` y `saveTasks()` para persistencia defensiva con localStorage.
- Estado global: `let tasks = loadTasks()` y `nextId` auto-incremental.
- `addTask(text)` → push `{ id, text, done: false }`, save, render.
- `toggleTask(id)` → flip `done`, save, render.
- `deleteTask(id)` → filter out, save, render.
- `render()` → recorre tasks, crea checkbox + span + delete button por cada una.
- Listener del form: previene default, valida, agrega, limpia input.

**Commits:**
- `fcb92bc` — "To-do list base" (los 3 archivos)
- `2e9513d` — "background re-design" (mejora visual del fondo y glows)

---

## Fase 2: Features nuevos (filtros, categorías, prioridades, fechas)

### Plan
Se definió un plan de 4 pasos:
1. HTML — barra de filtros + campos extra en el form
2. CSS — estilos retrowave coherentes para los nuevos elementos
3. JS — modelo de datos (extender task, filter state, lógica de filtrado)
4. JS — UI dinámica (render de tags, badges, labels de fecha)

### Paso 1: HTML (`index.html`)
- El form ahora tiene dos filas: `task-row` (input + botón) y `task-extra-row` (selects de categoría y prioridad, date picker).
- Categorías: Estudio, Trabajo, Personal, Gaming (textos en español excepto Gaming).
- Prioridades: Baja, Media, Alta.
- Nueva `#filter-bar` con 3 botones: Todas, Completadas, Pendientes. Clase `active` en "Todas".

### Paso 2: CSS (`styles.css`)
- `.task-form` cambió a `flex-direction: column` con `.task-row` interno.
- `.task-select` y `.task-date`: estilo consistente con los inputs (dark bg, borde púrpura, focus magenta).
- `.filter-bar`: botones flex con borde, hover magenta, activo con gradiente + glow magenta.
- `.task-body` y `.task-meta`: wrappers para el contenido de cada tarea.
- Categorías con colores neón:
  - Estudio → cian `#00f0ff`
  - Trabajo → ámbar `#ffaa00`
  - Personal → verde `#00ff78`
  - Gaming → magenta `#ff44ff`
- Prioridades:
  - Baja → verde `#00ff78`
  - Media → amarillo `#ffc800`
  - Alta → rojo `#ff3232`
- Fechas:
  - `overdue` → rojo neón
  - `tomorrow` → amarillo
  - `future` → gris púrpura

### Pasos 3 y 4: JS (`app.js`)
- Nuevas referencias DOM: `categorySelect`, `prioritySelect`, `dateInput`, `filterBar`.
- Nuevo estado: `let currentFilter = 'all'`.
- `addTask()` ahora lee categoría, prioridad y fecha del form. Al enviar, resetea todos los campos.
- `getDueLabel(dueDate)`:
  - Sin fecha → `null`
  - Pasado → `{ text: 'Atrasada', className: 'overdue' }`
  - Hoy → `{ text: 'Vence hoy', className: 'tomorrow' }`
  - Mañana → `{ text: 'Vence mañana', className: 'tomorrow' }`
  - Futuro → fecha formateada con `toLocaleDateString('es', ...)`
- `render()`:
  - Filtra `tasks` según `currentFilter` antes de pintar.
  - Cada tarea se renderiza con: checkbox, `task-body` (texto + `task-meta` opcional con tag, badge y/o fecha), y botón eliminar.
- Listener de filtros: actualiza clase `active` del botón clickeado, cambia `currentFilter`, re-renderiza.

---

## Estado final
- **3 archivos**: `index.html` (59 líneas), `styles.css` (334 líneas), `app.js` (168 líneas)
- **Sin dependencias externas** — vanilla JS, sin build tools
- **Persistencia**: localStorage con key `'tareas'`
- **Tema**: retrowave oscuro con acentos neón
