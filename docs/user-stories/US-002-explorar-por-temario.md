# US-002: Explorar tests guardados por temario

| Campo | Valor |
|-------|-------|
| **Epic** | E1: Tests guardados |
| **Fase** | 1 |
| **Estado** | pendiente |
| **Milestone** | M2 |

## Historia

Como **usuario opositor**, quiero **explorar mis tests organizados en el árbol del temario** para **encontrar tests de un tema o bloque concreto sin recordar su nombre exacto**.

## Criterios de aceptación

### Escenario 1: Ver el árbol del temario
- **Dado que** estoy en la pestaña "Tests guardados"
- **Cuando** selecciono el sub-tab "Buscar por temario"
- **Entonces** veo el árbol de unidades como un accordion multinivel

### Escenario 2: Ver tests de un nodo hoja
- **Dado que** hay tests guardados cuyo `unitIds` incluye una unit concreta
- **Cuando** expando ese nodo hoja en el accordion
- **Entonces** veo los TestCards de esos tests

### Escenario 3: Chip "Unidad pura"
- **Dado que** un test tiene `unitIds` que contiene únicamente esa unit (sin otras)
- **Cuando** ese test aparece bajo un nodo hoja
- **Entonces** muestra un chip "Unidad pura" diferenciado

### Escenario 4: Nodo sin tests
- **Dado que** una unit (o rama entera del árbol) no tiene tests guardados
- **Entonces** el nodo aparece en gris claro (`muted-foreground/50`), sin efecto hover, con la etiqueta "sin tests" en cursiva a la derecha — sin necesidad de expandirlo para descubrir que está vacío
- Si se expande de todas formas, el nodo hoja muestra "Sin tests guardados en esta unidad."

### Escenario 5: Estado abierto/cerrado persistido
- **Dado que** he expandido varios nodos del árbol
- **Cuando** recargo la página y vuelvo al sub-tab
- **Entonces** los nodos siguen en el estado abierto/cerrado que los dejé

## Notas de implementación

- Componente: `CurriculumDisplay` en modo `"readonly"`
- `getTestsForUnit(unitId)`: devuelve tests guardados cuyo `unitIds` incluye ese `unitId`
- Estado abierto/cerrado de nodos: `useCurriculumUiStore`
- Los nodos se ordenan alfabéticamente por `name`, desempate por `id`
