# US-018 — Ver métricas globales y racha de estudio en el Historial

**Como** opositor que quiere mantener la motivación,  
**quiero** ver mis métricas globales de estudio al abrir el historial,  
**para** tener una visión rápida de mi actividad acumulada y mantener la racha diaria.

---

## Criterios de aceptación

1. En la parte superior de `/historial` aparecen cuatro KPIs en tarjetas:
   - **Racha actual**: días consecutivos con al menos una pregunta respondida.
   - **Preguntas respondidas**: total acumulado de respuestas registradas.
   - **Tasa de acierto**: % de acierto global sobre todas las respuestas.
   - **Mejor resultado**: % más alto obtenido en un test fijo.
2. Si no hay datos, los valores muestran "—" en lugar de 0%.
3. La racha cuenta hoy como día activo aunque no haya actividad aún (no rompe la racha).
4. Los KPIs se calculan en tiempo real a partir de `useQuestionHistoryStore` y `useHistoryStore`.

---

## Notas técnicas

- `computeStreak` itera hacia atrás desde hoy; si hoy no tiene actividad, comprueba ayer antes de romper la racha.
- Los días de actividad también incluyen fechas de `fixedAttempts` e `indefiniteSessions` para cubrir el caso de que el historial de preguntas se haya limpiado.
