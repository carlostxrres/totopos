# US-001: Ver y filtrar tests guardados

| Campo | Valor |
|-------|-------|
| **Epic** | E1: Tests guardados |
| **Fase** | 1 |
| **Estado** | pendiente |
| **Milestone** | M2 |

## Historia

Como **usuario opositor**, quiero **ver mis tests guardados en una lista y filtrarlos por título** para **acceder rápidamente al test que quiero practicar**.

## Criterios de aceptación

### Escenario 1: Ver la lista de tests guardados
- **Dado que** tengo tests con `saved: true` en el store
- **Cuando** accedo a la ruta `/`
- **Entonces** veo una lista de TestCards con todos esos tests

### Escenario 2: Filtrar por título
- **Dado que** hay tests guardados visibles
- **Cuando** escribo texto en la barra de búsqueda del SubHeader
- **Entonces** solo se muestran los tests cuyo título contiene el texto (sin distinguir mayúsculas)

### Escenario 3: Estado vacío
- **Dado que** no tengo ningún test con `saved: true`
- **Cuando** accedo a la ruta `/`
- **Entonces** veo el mensaje "Aún no tienes tests guardados. Ve a 'Crear test' para empezar."

### Escenario 4: Checkbox "Solo mis tests"
- **Dado que** veo el SubHeader de la pestaña
- **Cuando** marco el checkbox "Solo mis tests"
- **Entonces** solo se muestran los tests con `metadata.category === "Personalizado"` (tests creados por el usuario, no los tests de demostración precargados)

## Notas de implementación

- Ruta: `/` → `SavedTestsPage`
- Sub-tab activo: "Mostrar todo" (el otro es "Buscar por temario", ver US-002)
- Componente de lista: `TestCard` (uno por test)
- Store: `useTestsStore` — filtrar `tests.filter(t => t.saved)`
- Tests personalizados: `metadata.category === "Personalizado"` (asignado en `CreateTestPage`)
- Tests precargados: `metadata.category` diferente (ej. "Ajuntament de Barcelona", "Temario General")
- Menú de opciones en `TestCard`: botón `···` abre un `DropdownMenu` con "Guardar" / "Quitar" (abre `ConfirmDialog` antes de ejecutar) y "Renombrar" (ver US-023)
