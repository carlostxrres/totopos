# US-009: Confirmar respuesta y ver historial de pregunta

| Campo | Valor |
|-------|-------|
| **Epic** | E4: Test libre |
| **Fase** | 1 |
| **Estado** | pendiente |
| **Milestone** | M5 |

## Historia

Como **usuario opositor**, quiero **confirmar mi respuesta a una pregunta y ver inmediatamente si es correcta** para **aprender en el momento y revisar mi historial en esa pregunta específica**.

## Criterios de aceptación

### Escenario 1: Botón "Confirmar" deshabilitado
- **Dado que** no he seleccionado ninguna opción
- **Cuando** veo el botón "Confirmar"
- **Entonces** está deshabilitado

### Escenario 2: Confirmar respuesta correcta
- **Dado que** he seleccionado la opción correcta
- **Cuando** pulso "Confirmar"
- **Entonces** la opción seleccionada se colorea en verde y las incorrectas sin seleccionar no cambian
- **Y** aparece el botón "Siguiente pregunta"
- **Y** el botón "Borrar respuesta" desaparece

### Escenario 3: Confirmar respuesta incorrecta
- **Dado que** he seleccionado una opción incorrecta
- **Cuando** pulso "Confirmar"
- **Entonces** la opción seleccionada se colorea en rojo y la(s) opción(es) correcta(s) se colorean en verde

### Escenario 4: Mostrar explicación
- **Dado que** la pregunta tiene `explanation` y he confirmado la respuesta
- **Cuando** veo la QuestionCard en modo corrección
- **Entonces** la explicación se muestra al final de la card

### Escenario 5: Ver historial de pregunta (modo activo)
- **Dado que** el toggle "Mostrar historial de pregunta" está activado y la pregunta tiene historial
- **Cuando** veo la QuestionCard antes de confirmar
- **Entonces** se muestra:
  - "Esta pregunta se ha respondido X veces."
  - "Respondida por última vez: [fecha relativa]. Fue [correcta / incorrecta]."
  - "Tasa de acierto: X%."

### Escenario 6: Ocultar historial de pregunta
- **Dado que** el toggle "Mostrar historial de pregunta" está desactivado
- **Cuando** veo la QuestionCard
- **Entonces** la sección de historial no se muestra

### Escenario 7: Registro de la respuesta
- **Cuando** pulso "Confirmar"
- **Entonces** se llama a `sessionStore.addAnswer` con los datos de la respuesta
- **Y** se llama a `questionHistoryStore.recordAnswer(questionId, wasCorrect)`

## Notas de implementación

- Componente: `QuestionCard` con `showHistory` y `questionHistory` props
- `showHistory` refleja el toggle del menú dropdown, persistido en localStorage
- `useQuestionHistory(questionId)` para acceder al historial formateado
- `formatRelativeTime` de `src/lib/relative-time.ts`
- La sección de historial muestra datos del historial **antes** de la respuesta actual (no incluye la que se acaba de confirmar)
