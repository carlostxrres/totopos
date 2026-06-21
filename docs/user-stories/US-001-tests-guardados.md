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
- **Cuando** marco o desmarco el checkbox "Solo mis tests"
- **Entonces** en Fase 1 el comportamiento no cambia (siempre muestra todos); el estado se persiste en localStorage

## Notas de implementación

- Ruta: `/` → `SavedTestsPage`
- Sub-tab activo: "Mostrar todo" (el otro es "Buscar por temario", ver US-002)
- Componente de lista: `TestCard` (uno por test)
- Store: `useTestsStore` — filtrar `tests.filter(t => t.saved)`
- El checkbox "Solo mis tests" persiste en `useCurriculumUiStore` o estado local con `localStorage`
