# US-008: Iniciar y navegar una sesión de test libre

| Campo | Valor |
|-------|-------|
| **Epic** | E4: Test libre |
| **Fase** | 1 |
| **Estado** | pendiente |
| **Milestone** | M5 |

## Historia

Como **usuario opositor**, quiero **responder preguntas de un test libre una a una y navegar entre ellas** para **practicar sin límite predefinido, pudiendo repasar las preguntas ya respondidas**.

## Criterios de aceptación

### Escenario 1: Sin preguntas disponibles
- **Dado que** los filtros del test no devuelven ninguna pregunta
- **Cuando** navego a `/tests/indefinite/:testId`
- **Entonces** aparece el modal "No hay preguntas disponibles con estos filtros"
- **Y** al aceptar vuelvo a la pantalla anterior; no hay opción de continuar

### Escenario 2: Pocas preguntas disponibles
- **Dado que** hay entre 1 y 9 preguntas disponibles
- **Cuando** navego al test libre
- **Entonces** aparece el modal "Solo hay X preguntas disponibles. ¿Deseas continuar?"
- **Y** el usuario puede cancelar o confirmar

### Escenario 3: Reanudar sesión activa
- **Dado que** hay una sesión activa en `sessionStore` para este test
- **Cuando** navego al test libre
- **Entonces** la sesión se reanuda directamente en la última pregunta respondida, sin mostrar el modal de timer

### Escenario 4: Navegar a una pregunta ya respondida
- **Dado que** he respondido varias preguntas
- **Cuando** pulso "Anterior"
- **Entonces** veo la pregunta anterior en modo lectura (coloreada, sin botón "Confirmar", sin input activo)

### Escenario 5: No saltar preguntas futuras
- **Dado que** estoy en la pregunta actual (la primera no respondida)
- **Cuando** intento avanzar sin haber confirmado una respuesta
- **Entonces** el botón "Siguiente" está deshabilitado

### Escenario 6: Fin de pool
- **Dado que** he respondido todas las preguntas del pool o no quedan preguntas aplicando los filtros
- **Cuando** llego al final
- **Entonces** veo una pantalla especial con estadísticas de la sesión (respondidas, correctas, %, duración) y un botón para cerrar la sesión

### Escenario 7: Cerrar sesión
- **Dado que** pulso el botón de cerrar en la pantalla de fin de pool (o desde el menú)
- **Cuando** confirmo
- **Entonces** se llama a `sessionStore.closeSession(testId)`, que establece `endedAt` y transfiere la sesión a `historyStore`

### Escenario 8: Salir sin cerrar la sesión
- **Dado que** pulso el botón de volver en el Header
- **Cuando** vuelvo a navegar al test libre
- **Entonces** la sesión sigue activa y se reanuda desde donde la dejé

## Notas de implementación

- Ruta: `/tests/indefinite/:testId` → `IndefiniteTestPage`
- `resolveQuestions` al iniciar para obtener el pool; el orden queda fijo en `session.questionIds`
- `sessionStore.startSession(testId, questionIds, testTitle)` al crear sesión nueva
- Navegación: índice local de pregunta actual; "Anterior" y "Siguiente" actualizan el índice
- No hay "Reiniciar" en test libre; para empezar de cero se crea un nuevo test
