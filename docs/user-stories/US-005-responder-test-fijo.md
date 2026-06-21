# US-005: Responder un test fijo

| Campo | Valor |
|-------|-------|
| **Epic** | E3: Test fijo |
| **Fase** | 1 |
| **Estado** | pendiente |
| **Milestone** | M4 |

## Historia

Como **usuario opositor**, quiero **responder todas las preguntas de un test fijo en modo lista** para **practicar como en un examen tradicional, con la posibilidad de repasar y cambiar mis respuestas antes de enviar**.

## Criterios de aceptación

### Escenario 1: Reanudar progreso previo
- **Dado que** había empezado este test anteriormente y lo dejé a medias
- **Cuando** navego a `/tests/fixed/:testId`
- **Entonces** veo mis respuestas anteriores pre-cargadas en cada QuestionCard

### Escenario 2: Responder pregunta de selección única
- **Dado que** hay una pregunta de tipo `single`
- **Cuando** selecciono una opción
- **Entonces** esa opción queda marcada, las demás se desmarcan y el pastillo de ProgressPills cambia a color primario

### Escenario 3: Responder pregunta de selección múltiple
- **Dado que** hay una pregunta de tipo `multiple`
- **Cuando** selecciono varias opciones
- **Entonces** todas quedan marcadas; pulsar una marcada la desmarca

### Escenario 4: Borrar respuesta
- **Dado que** he respondido una pregunta
- **Cuando** pulso "Borrar respuesta"
- **Entonces** la pregunta queda sin respuesta, el pastillo vuelve a gris y el contador de respondidas disminuye

### Escenario 5: Marcar pregunta con bookmark
- **Dado que** estoy respondiendo
- **Cuando** pulso el icono de bookmark en una QuestionCard
- **Entonces** la pregunta queda marcada y su pastillo en ProgressPills muestra un punto naranja encima

### Escenario 6: ProgressPills — pregunta activa
- **Dado que** estoy haciendo scroll por las preguntas
- **Cuando** una o más preguntas superan el 50% de visibilidad en el viewport
- **Entonces** sus pastillos en ProgressPills son más altos que los demás (h-5 → h-8), con transición de rebote (spring cubic-bezier); puede haber varias activas simultáneamente

### Escenario 9: Número de pregunta
- **Dado que** estoy respondiendo un test fijo
- **Cuando** veo el enunciado de cada pregunta
- **Entonces** aparece su número antes del texto en gris claro (ej. "2. En quants districtes...")

### Escenario 7: Navegar con los pastillos
- **Cuando** hago click en un pastillo de ProgressPills
- **Entonces** la página hace scroll suave hasta esa pregunta

### Escenario 8: Scroll snap en móvil
- **Dado que** estoy en un dispositivo móvil (<768px)
- **Cuando** hago scroll
- **Entonces** el scroll se encaja (snap) pregunta a pregunta; el botón "Enviar" es el último snap-point y ocupa la altura completa del viewport

## Notas de implementación

- Ruta: `/tests/fixed/:testId` → `FixedTestPage`
- `touchOpened(testId)` al montar
- `useActiveQuestion(questionIds)` para la pregunta activa en ProgressPills
- `useScrollSnap(true)` mientras `showCorrection === false`
- Cada `QuestionCard` tiene `id="question-{questionId}"` en su elemento raíz
- SubHeader sticky: `TimerControl` + `ProgressPills` + contador "X / Y respondidas" + menú dropdown
