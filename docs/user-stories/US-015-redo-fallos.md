# US-015 — Repasar preguntas falladas tras un test fijo

**Como** opositor que acaba de terminar un test,  
**quiero** poder crear automáticamente un nuevo test solo con las preguntas que he fallado,  
**para** reforzar inmediatamente mis puntos débiles sin tener que configurar un test nuevo manualmente.

---

## Criterios de aceptación

1. En la vista de corrección de un test fijo, aparece el botón "Repasar X preguntas falladas" si hay al menos una pregunta respondida incorrectamente.
2. El botón no aparece si no hay preguntas falladas (todas correctas o sin responder).
3. Al pulsar el botón, se crea un nuevo test fijo con las mismas reglas de puntuación y se navega directamente a él.
4. El nuevo test tiene el título "Repaso de fallos — {título original}" y `saved: false`.
5. Solo se incluyen las preguntas que se respondieron incorrectamente (no las dejadas en blanco).

---

## Notas técnicas

- Lógica en `TestCorrection.tsx`: filtra `result.questionResults` donde `!isCorrect && selectedOptionIds.length > 0`.
- El nuevo `FixedTest` se añade a `useTestsStore` y se navega a `/tests/fixed/:newId`.
- No requiere cambios en el modelo de datos ni en los stores.
