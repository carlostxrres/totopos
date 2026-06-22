# US-022 — Ver detalles de un test antes de comenzarlo

**Como** opositor con varios tests guardados,  
**quiero** poder ver los detalles de un test sin tener que abrirlo,  
**para** saber qué unidades cubre y cómo he quedado en intentos anteriores antes de decidir si hacerlo.

---

## Criterios de aceptación

1. Cada `TestCard` tiene un botón "Ver detalles" / "Ocultar detalles" debajo de los meta-datos.
2. Al expandir, se muestra un panel con:
   - **Unidades cubiertas**: chips con los nombres de las unidades (máximo 5; si hay más se muestra "+N más").
   - **Últimos intentos** (hasta 3): fecha y resultado.
     - Test fijo: fecha · porcentaje · aprobado/suspenso.
     - Test libre: fecha · nº de respuestas · % de acierto.
3. Si no hay intentos anteriores, se muestra "Sin intentos anteriores."
4. El estado expandido/colapsado es local (no se persiste).

---

## Notas técnicas

- Los nombres de unidades se resuelven desde el árbol de `@tot-opos/curriculum-data`.
- Los intentos se obtienen de `useHistoryStore` (fixedAttempts o indefiniteSessions), filtrados por `testId`.
- Se limita a 3 intentos recientes para no saturar la card.
