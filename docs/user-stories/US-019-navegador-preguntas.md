# US-019 — Explorar el banco de preguntas

**Como** opositor que quiere revisar el material de estudio,  
**quiero** poder explorar todas las preguntas del banco con filtros,  
**para** estudiar preguntas concretas o descubrir qué temas no he practicado aún.

---

## Criterios de aceptación

1. Existe una ruta `/preguntas` accesible desde un enlace en "Tests guardados".
2. La página muestra todas las preguntas con su enunciado, unidades y tipo (única/múltiple).
3. Se puede filtrar por:
   - **Texto libre**: busca en el enunciado y en las opciones.
   - **Unidad**: desplegable con el árbol de unidades; al seleccionar un nodo padre, incluye todos sus descendientes.
   - **Estado**: Todas / Nuevas (sin responder) / Dominadas (último intento correcto) / Falladas (último incorrecto).
4. El contador muestra cuántas preguntas cumplen los filtros activos.
5. Cada pregunta muestra: chips de unidades, tipo, número de veces respondida, fecha y resultado del último intento, y % de acierto.
6. Si no hay preguntas con los filtros activos, se muestra un estado vacío descriptivo.

---

## Notas técnicas

- Las preguntas vienen de `ALL_QUESTIONS` (`@tot-opos/test-data`).
- El historial viene de `useQuestionHistoryStore` (`historyByQuestionId`).
- El filtro por unidad usa `getAllDescendantIds` para incluir preguntas de toda la subrama.
- La página es de solo lectura; no lanza tests desde aquí.
