# US-007: Enviar y revisar un test fijo

| Campo | Valor |
|-------|-------|
| **Epic** | E3: Test fijo |
| **Fase** | 1 |
| **Estado** | pendiente |
| **Milestone** | M4 |

## Historia

Como **usuario opositor**, quiero **enviar el test y ver la corrección detallada** para **conocer mi puntuación final, qué preguntas acerté y fallé, y aprender de mis errores**.

## Criterios de aceptación

### Escenario 1: Envío con preguntas marcadas sin responder
- **Dado que** hay preguntas con bookmark pero sin respuesta
- **Cuando** pulso "Enviar"
- **Entonces** aparece un ConfirmDialog: "Tienes preguntas marcadas sin responder"
- **Y** el usuario puede cancelar o confirmar el envío

### Escenario 2: Envío con preguntas sin responder (sin marcar)
- **Dado que** hay preguntas sin responder pero ninguna marcada sin responder
- **Cuando** pulso "Enviar"
- **Entonces** aparece un ConfirmDialog: "Quedan X preguntas sin responder"

### Escenario 3: Envío directo cuando todo está respondido
- **Dado que** todas las preguntas tienen respuesta
- **Cuando** pulso "Enviar"
- **Entonces** el test se envía directamente sin confirmación

### Escenario 4: Ver la corrección
- **Dado que** confirmo el envío
- **Cuando** se procesa el resultado
- **Entonces** la vista de preguntas es sustituida por `TestCorrection` en la misma página
- **Y** veo la puntuación (`score / maxScore`), el porcentaje, "Aprobado" o "Suspenso" y la fecha

### Escenario 5: Ver preguntas corregidas
- **Dado que** estoy en la vista de corrección
- **Cuando** veo cada QuestionCard
- **Entonces** las opciones están coloreadas (verde = correcta, rojo = incorrecta seleccionada)
- **Y** si la pregunta tenía `explanation`, se muestra al final de la card

### Escenario 6: CorrectionPills
- **Dado que** estoy en la vista de corrección
- **Cuando** veo los pastillos de CorrectionPills
- **Entonces** cada pastillo es verde (correcta), rojo (incorrecta con respuesta) o gris (sin responder)

### Escenario 7: Registro en historial
- **Cuando** se envía el test
- **Entonces** se crea un `FixedAttempt` en `historyStore`
- **Y** cada respuesta se registra en `questionHistoryStore` con `wasCorrect`
- **Y** el progreso del test se elimina de `progressStore`

## Notas de implementación

- `scoreTest(test, answers)` de `src/lib/scoring.ts`
- `FixedAttempt.id = crypto.randomUUID()`, `completedAt = new Date().toISOString()`
- Orden de comprobación al enviar: primero "marcadas sin responder", luego "sin responder sin marcar"
- `progressStore.clear(testId)` elimina el entry completo tras el envío
- El botón "Enviar" es el último snap-point en móvil (ocupa viewport completo)
