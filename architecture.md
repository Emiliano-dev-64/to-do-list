Necesito construir una mini app web de lista de tareas:
- HTML + CSS + JavaScript vanilla (nada de frameworks).
- Permite agregar una tarea, marcarla como hecha, eliminarla.
- Persiste con localStorage.
- 3 archivos: index.html, styles.css, app.js

ANTES de tocar nada: armame un plan numerado de los pasos que vas a seguir, que archivo creas en cada uno de los pasos, y que posibles riesgos identificas. NO escribas código todavía.

Paso 2

 Ahora `styles.css`. Quiero algo simple y prolijo:
 - fuente sans-serif del sistema
 - contenedor central de máx 480px
 - las tareas como tarjetas con padding y borde sutil
 - una variante visual para las tareas "hechas" (gris + tachado)
 - mobile-friendly por default.

 Después abrime `index.html` en el navegador.

Paso 3

Ahora `app.js`. Comportamiento:
- al click en "agregar", leer el input, validar que no esté vacío, agregar la tarea a una lista en memoria y re-renderizar.
- click en una tarea: marca como hecha (toggle).
- click en "x" al lado: la elimina.
- por ahora SIN localStorage -- eso lo agregamos en la iteración siguiente.

Explicame lo que escribiste, sección por sección.

Paso 4

Ahora agregale persistencia con localStorage:
- al iniciar, leer las tareas guardadas y mostrarlas
- después de CADA cambio (agregar, toggle, eliminar) guardar la lista actualizada.

Que la lectura inicial sea defensiva (si no hay nada, arranca con array vacío sin tirar error).

Mostrame el diff. Después refresco el navegador y pruebo que sobreviva al reload.

Ideas de features:

✅ Filtro de tareas, botones tipo:
- All 
- Completed
- Pending

🎨 Categorías / Tags:
- Study
- Work
- Personal
- Gaming
Cada tag con color distinto.

⭐ Prioridades:
- Baja (color verde)
- Media (color amarillo)
- Alta (color rojo)

📅 Fecha límite

Mostrar:

Due tomorrow

o:

Overdue

Los textos en ingles pasalos al español a excepción de "Gaming".

ANTES de hacer nada, primero explicame como añadirías estos features, armame un plan y lo vamos ejecutando paso a paso


Features un poco más avanzados

Estadísticas, algo tipo:

12 tasks completed
3 tasks pending

