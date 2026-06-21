# US-010: Usar temporizador por pregunta en test libre

| Campo | Valor |
|-------|-------|
| **Epic** | E4: Test libre |
| **Fase** | 1 |
| **Estado** | pendiente |
| **Milestone** | M5 |

## Historia

Como **usuario opositor**, quiero **configurar un temporizador por pregunta en el test libre** para **practicar bajo presión de tiempo y simular las condiciones de un examen por pregunta**.

## Criterios de aceptación

### Escenario 1: Configurar timer al iniciar sesión
- **Dado que** no hay sesión activa para este test y hay preguntas disponibles
- **Cuando** aparece el modal de inicio de sesión
- **Entonces** puedo elegir "Sin temporizador", "Blando" o "Duro" e introducir los segundos (input de segundos, default 60)

### Escenario 2: Timer se reinicia en cada pregunta nueva
- **Dado que** el timer está activo y avanzo a la siguiente pregunta no respondida
- **Cuando** aparece la nueva pregunta
- **Entonces** el countdown se reinicia al valor configurado en segundos

### Escenario 3: Timer no aplica a preguntas ya respondidas
- **Dado que** navego hacia atrás a una pregunta ya confirmada
- **Cuando** veo esa pregunta en modo lectura
- **Entonces** el timer no corre (está pausado o detenido)

### Escenario 4: Timer blando expira
- **Dado que** el timer blando llega a 0 sin que haya confirmado
- **Cuando** expira
- **Entonces** el icono del TimerControl vuelve al estado inactivo, pero puedo seguir respondiendo y confirmando

### Escenario 5: Timer duro expira sin respuesta
- **Dado que** el timer duro llega a 0 antes de que pulse "Confirmar"
- **Cuando** expira
- **Entonces** la pregunta se bloquea y no se registra en `questionHistoryStore` ni en `sessionStore`
- **Y** aparece el botón "Siguiente pregunta" para avanzar

### Escenario 6: Advertencia visual a 15 segundos
- **Cuando** quedan menos de 15 segundos en el countdown
- **Entonces** el TimerControl cambia al color `warning`

## Notas de implementación

- El timer por pregunta **no** se persiste en ningún store (se reinicia en cada pregunta)
- El valor de segundos configurado se guarda en el estado local del componente `IndefiniteTestPage`
- Componente: `TimerControl` (en el SubHeader de `IndefiniteTestPage`)
- Al navegar hacia atrás: pausar/detener el timer mientras se está en modo lectura
- Timer duro: la pregunta "expira" sin responder → no cuenta para las estadísticas de la sesión
