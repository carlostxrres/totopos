# US-016 — Ver estadísticas de rendimiento por unidad del temario

**Como** opositor que quiere conocer sus puntos débiles,  
**quiero** ver una vista del temario con mi porcentaje de acierto y cobertura por unidad,  
**para** saber en qué temas debo centrar mi estudio.

---

## Criterios de aceptación

1. Existe una ruta `/estadisticas` accesible desde un enlace en la pestaña Historial.
2. La página muestra un resumen global: total de preguntas, respondidas y % de acierto.
3. El temario se muestra como árbol colapsable (acordeón multinivel).
4. Cada nodo del árbol muestra: "respondidas/total" y "% de acierto" (calculado sobre el último intento de cada pregunta).
5. El % de acierto se colorea: verde ≥70%, ámbar 50–69%, rojo <50%.
6. Una mini barra de progreso combina cobertura (azul) y acierto (color semántico).
7. Los nodos padre agregan las estadísticas de todos sus descendientes.
8. Los nodos sin preguntas no muestran estadísticas.

---

## Notas técnicas

- Datos: `ALL_QUESTIONS` de `@tot-opos/test-data`, árbol de `@tot-opos/curriculum-data`, historial de `useQuestionHistoryStore`.
- El acierto se calcula sobre el **último intento** de cada pregunta (`entries[0].wasCorrect`), no sobre todos los intentos históricos.
- La página es de solo lectura; desde ella no se puede navegar a tests.
- El enlace de vuelta al historial usa el botón de volver del Header.
