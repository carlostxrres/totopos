# US-015 — Repasar preguntas falladas tras un test fijo

**Como** opositor que acaba de terminar un test,  
**quiero** poder crear automáticamente un nuevo test solo con las preguntas que he fallado,  
**para** reforzar inmediatamente mis puntos débiles sin tener que configurar un test nuevo manualmente.

---

## Criterios de aceptación

1. En la vista de corrección de un test fijo, aparece el botón "Crear test de repaso — X pregunta(s) fallada(s)" si hay al menos una pregunta respondida incorrectamente.
2. El botón no aparece si no hay preguntas falladas (todas correctas o sin responder).
3. Al pulsar el botón, se abre un modal con el resumen del test (tipo, número de preguntas, unidades).
4. El modal ofrece dos opciones:
   - **Guardar test**: crea el test con `saved: true` y cierra el modal.
   - **Comenzar test**: crea el test con `saved: false` y navega directamente a él.
5. El nuevo test tiene el título "Repaso de fallos — {título original}" y conserva las reglas de puntuación del test original.
6. Solo se incluyen las preguntas que se respondieron incorrectamente (no las dejadas en blanco).

---

## Notas técnicas

- Lógica en `TestCorrection.tsx`: filtra `result.questionResults` donde `!isCorrect && selectedOptionIds.length > 0`.
- Al pulsar el botón se abre `TestPreviewDialog` (componente compartido con `CreateTestPage`).
- El `FixedTest` se construye al confirmar en el modal (no al pulsar el botón).
- `FixedTestPage` resetea `showCorrection` con `useEffect([testId])` para evitar que la corrección anterior persista al navegar a un nuevo test.
