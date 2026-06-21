# US-012: Ver corrección de un intento fijo desde el historial

| Campo | Valor |
|-------|-------|
| **Epic** | E5: Historial |
| **Fase** | 1 |
| **Estado** | pendiente |
| **Milestone** | M6 |

## Historia

Como **usuario opositor**, quiero **revisar la corrección completa de un intento pasado** para **ver qué acerté y fallé y aprender de mis errores tiempo después de haberlo hecho**.

## Criterios de aceptación

### Escenario 1: Acceder al detalle desde el historial
- **Dado que** hay un `FixedAttempt` en la lista del historial
- **Cuando** hago click en él
- **Entonces** navego a `/historial/:attemptId`

### Escenario 2: Ver corrección completa
- **Dado que** estoy en `/historial/:attemptId`
- **Cuando** la página carga
- **Entonces** veo `TestCorrection` con puntuación (`score / maxScore`), porcentaje, aprobado/suspenso, fecha y hora de realización, y todas las preguntas corregidas

### Escenario 3: Preguntas en modo lectura
- **Dado que** estoy viendo la corrección de un intento pasado
- **Cuando** veo las QuestionCards
- **Entonces** todas están en modo `showCorrection = true` sin posibilidad de cambiar respuestas

### Escenario 4: Intento no encontrado
- **Dado que** navego directamente a `/historial/:attemptId` con un id que no existe
- **Cuando** la página carga
- **Entonces** veo un mensaje de error claro o soy redirigido a `/historial`

## Notas de implementación

- Ruta: `/historial/:attemptId` → `AttemptDetailPage`
- Obtener el attempt: `useHistoryStore().fixedAttempts.find(a => a.id === attemptId)`
- Componente de corrección: `TestCorrection` en modo lectura (sin acciones)
- El attempt guarda `answers: Record<string, string[]>` y `testId`; hay que recuperar las preguntas del test desde `useTestsStore` para renderizar las QuestionCards
