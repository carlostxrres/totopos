# US-023 — Nombrar y renombrar un test

**Como** opositor que crea tests personalizados,  
**quiero** poder dar un nombre a mis tests al crearlos y renombrarlos después,  
**para** identificarlos fácilmente en mi lista de tests guardados.

---

## Criterios de aceptación

### Escenario 1: Dar nombre al crear el test
- **Dado que** estoy en el Paso 2 de Crear test
- **Cuando** escribo un nombre en el campo "Nombre del test" (opcional, máx. 80 caracteres)
- **Entonces** el test se crea con ese nombre como `title`
- **Y cuando** dejo el campo vacío
- **Entonces** se usa el nombre por defecto: `Test fijo — <fecha>` para tests fijos, o el campo `title` queda indefinido en tests libres (la `TestCard` muestra "Test libre")

### Escenario 2: Renombrar desde la TestCard
- **Dado que** veo una TestCard en la lista de tests
- **Cuando** abro el menú `···` y selecciono "Renombrar"
- **Entonces** se abre un diálogo con un input prellenado con el nombre actual
- **Y cuando** escribo un nombre nuevo y confirmo
- **Entonces** el test se actualiza en el store con el nuevo `title`
- **Y** la TestCard muestra el nombre nuevo inmediatamente

### Escenario 3: Cancelar renombrado
- **Dado que** el diálogo de renombrar está abierto
- **Cuando** pulso "Cancelar" o presiono Escape
- **Entonces** el diálogo se cierra sin modificar el nombre del test

### Escenario 4: No permitir nombre vacío al renombrar
- **Dado que** el diálogo de renombrar está abierto
- **Cuando** borro todo el texto del input
- **Entonces** el botón "Guardar" queda deshabilitado

---

## Notas técnicas

- Campo `title` en `FixedTest` (obligatorio) y `IndefiniteTest` (opcional) ya soportado en los tipos.
- Acción `renameTest(testId, title)` en `useTestsStore`.
- El campo de nombre en `CreateTestPage` es opcional; si se deja vacío se aplica el nombre por defecto en `buildTest`.
- El diálogo de renombrar en `TestCard` usa Radix `Dialog`, igual que `ConfirmDialog`.
- La opción "Renombrar" está en el `DropdownMenu` junto a "Guardar/Quitar".
