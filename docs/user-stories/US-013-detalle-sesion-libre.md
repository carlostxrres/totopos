# US-013: Ver resumen de una sesión libre desde el historial

| Campo | Valor |
|-------|-------|
| **Epic** | E5: Historial |
| **Fase** | 1 |
| **Estado** | pendiente |
| **Milestone** | M6 |

## Historia

Como **usuario opositor**, quiero **ver el resumen de una sesión de test libre pasada** para **revisar qué preguntas respondí, cómo me fue en cada una y mis estadísticas globales de esa sesión**.

## Criterios de aceptación

### Escenario 1: Acceder al detalle desde el historial
- **Dado que** hay una `IndefiniteSession` cerrada en la lista del historial
- **Cuando** hago click en ella
- **Entonces** navego a `/historial/sesion/:sessionId`

### Escenario 2: Ver cabecera de la sesión
- **Dado que** estoy en `/historial/sesion/:sessionId`
- **Cuando** la página carga
- **Entonces** veo:
  - Título del test (o descripción de filtros si no tiene título)
  - Fecha de inicio y fin de la sesión
  - Duración total
  - Estadísticas: X respondidas, Y correctas, Z%

### Escenario 3: Ver lista de preguntas respondidas
- **Dado que** la sesión tiene respuestas registradas
- **Cuando** veo la lista
- **Entonces** cada entrada muestra el enunciado de la pregunta y un indicador visual de correcto/incorrecto

### Escenario 4: Sesión no encontrada
- **Dado que** navego directamente a `/historial/sesion/:sessionId` con un id que no existe
- **Cuando** la página carga
- **Entonces** veo un mensaje de error claro o soy redirigido a `/historial`

## Notas de implementación

- Ruta: `/historial/sesion/:sessionId` → `SessionDetailPage` (ruta nueva, acordada en ADR-005)
- Obtener la sesión: `useHistoryStore().indefiniteSessions.find(s => s.id === sessionId)`
- Las preguntas de la lista se obtienen cruzando `session.answers[].questionId` con las preguntas del test en `useTestsStore`
- Duración: `new Date(endedAt).getTime() - new Date(startedAt).getTime()`
