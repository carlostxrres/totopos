# US-006: Usar temporizador en test fijo

| Campo | Valor |
|-------|-------|
| **Epic** | E3: Test fijo |
| **Fase** | 1 |
| **Estado** | pendiente |
| **Milestone** | M4 |

## Historia

Como **usuario opositor**, quiero **configurar un temporizador opcional para el test fijo** para **practicar con presión de tiempo real, igual que en el examen oficial**.

## Criterios de aceptación

### Escenario 1: Abrir configuración del timer
- **Dado que** estoy en un test fijo
- **Cuando** abro el menú (⋮) y selecciono "Temporizador"
- **Entonces** se abre el modal con las opciones: "Sin temporizador", "Blando" y "Duro"

### Escenario 2: Timer blando activo
- **Dado que** configuro el timer en modo "Blando" con N minutos
- **Cuando** confirmo la configuración
- **Entonces** el TimerControl muestra el countdown en formato MM:SS
- **Y** el timer es pausable (click en TimerControl lo pausa; otro click lo reanuda)
- **Y cuando** el countdown llega a 0, el icono vuelve al estado inactivo sin bloquear nada

### Escenario 3: Timer duro activo
- **Dado que** configuro el timer en modo "Duro"
- **Cuando** el countdown llega a 0
- **Entonces** todos los campos de respuesta quedan bloqueados (`<fieldset disabled>`)
- **Y** solo el botón "Enviar" permanece activo
- **Y** se muestra un modal de aviso "Tiempo agotado"
- **Y** el timer duro no es pausable

### Escenario 4: Timer sobrevive a recarga de página
- **Dado que** tengo un timer activo con tiempo restante
- **Cuando** recargo la página
- **Entonces** el timer continúa desde el tiempo correcto, calculado como `deadlineAt - Date.now()`

### Escenario 5: Advertencia visual
- **Cuando** quedan menos de 5 minutos en el countdown
- **Entonces** el TimerControl cambia al color `warning`

### Escenario 6: Tiempo por pregunta en el modal
- **Dado que** introduzco N minutos en el input del modal
- **Cuando** veo el texto auxiliar
- **Entonces** muestra "X minutos por pregunta" calculado en tiempo real

### Escenario 7: Tiempo sugerido
- **Dado que** el test tiene `suggestedMinuteLimit`
- **Cuando** abro el modal de configuración del timer
- **Entonces** se muestra "Para este test se recomiendan X minutos"

## Notas de implementación

- El trigger de configuración está en el **DropdownMenu** (`⋮`), no como botón suelto en el SubHeader
- Cuando el timer está activo/pausado se muestra el chip de cuenta atrás (⏸/▶ + MM:SS) en el SubHeader; click = pausa/reanuda
- Componente: `TimerControl` (en el SubHeader de `FixedTestPage`, controlado con `setupOpen`/`onSetupOpenChange`)
- Store: `useProgressStore` — `startTimer`, `pauseTimer`, `resumeTimer`
- `deadlineAt`: ISO datetime absoluto. Al pausar: `pausedRemainingMs = new Date(deadlineAt).getTime() - Date.now()`
- El componente hace `setInterval` de 500ms y calcula `remaining = new Date(deadlineAt).getTime() - Date.now()`
- Default de minutos: `suggestedMinuteLimit` del test, o bien `n_preguntas × 0.5` si no existe
