# US-011: Ver historial de actividad y tests en progreso

| Campo | Valor |
|-------|-------|
| **Epic** | E5: Historial |
| **Fase** | 1 |
| **Estado** | pendiente |
| **Milestone** | M6 |

## Historia

Como **usuario opositor**, quiero **ver mi actividad en un calendario de los últimos meses y los tests que tengo en curso** para **entender mi constancia y retomar los tests que dejé a medias**.

## Criterios de aceptación

### Escenario 1: Ver el heatmap de actividad
- **Dado que** tengo intentos y sesiones pasadas con respuestas correctas
- **Cuando** navego a `/historial`
- **Entonces** veo un heatmap de 16 semanas hacia atrás, alineado a lunes
- **Y** la intensidad del color de cada celda refleja el número de respuestas correctas ese día

### Escenario 2: Tooltip del heatmap
- **Dado que** hay actividad registrada en un día
- **Cuando** hago click o tap en esa celda del heatmap
- **Entonces** aparece un tooltip con la fecha formateada, el nº total de respuestas y el nº de correctas

### Escenario 3: Etiquetas del heatmap
- **Cuando** veo el heatmap
- **Entonces** el eje Y muestra las etiquetas de días: Lun, Mié, Vie, Dom (no todos los días para no saturar)
- **Y** el eje X muestra etiquetas de mes alineadas al límite de semana

### Escenario 4: Ver tests en progreso
- **Dado que** tengo un fixed-test con progreso activo en `progressStore`
- **Cuando** veo la sección "Tests en progreso"
- **Entonces** aparece con su nombre, "X / Y respondidas (Z%)" y la fecha relativa de última apertura

### Escenario 5: Ver sesiones indefinidas abiertas
- **Dado que** tengo una `IndefiniteSession` con `endedAt` indefinido en `sessionStore`
- **Cuando** veo la sección "Tests en progreso"
- **Entonces** aparece con el nombre del test, "X respondidas" y la fecha relativa de inicio

### Escenario 6: Navegar a un test en progreso
- **Cuando** hago click en un test de la sección "En progreso"
- **Entonces** navego a `/tests/fixed/:id` o `/tests/indefinite/:id`

### Escenario 7: Refresh de fechas relativas
- **Cuando** llevo 30 segundos en la página de historial
- **Entonces** las fechas relativas de "Tests en progreso" se actualizan automáticamente

### Escenario 8: Ver lista de intentos y sesiones completadas
- **Dado que** tengo `FixedAttempt`s y `IndefiniteSession`s cerradas
- **Cuando** veo la sección de completados
- **Entonces** aparece una lista unificada ordenada de más reciente a más antiguo
- **Y** cada item muestra: tipo, título, fecha, resultado y un enlace al detalle

## Notas de implementación

- Ruta: `/historial` → `HistoryPage`
- Heatmap: combina respuestas de `fixedAttempts` (por `completedAt`) y `indefiniteSessions` (por `answers[].answeredAt`)
- Sección "En progreso": `useProgressStore` + `useSessionStore`
- Sección "Completados": `useHistoryStore.fixedAttempts` + `useHistoryStore.indefiniteSessions` (solo las cerradas)
- Refresh cada 30s: `setInterval` con `useState` para forzar re-render o `useEffect` con dependencia de tiempo
