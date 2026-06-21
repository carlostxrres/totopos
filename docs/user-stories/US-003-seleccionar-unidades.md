# US-003: Seleccionar unidades del temario para crear un test

| Campo | Valor |
|-------|-------|
| **Epic** | E2: Crear test |
| **Fase** | 1 |
| **Estado** | pendiente |
| **Milestone** | M3 |

## Historia

Como **usuario opositor**, quiero **seleccionar una o varias unidades del temario** para **acotar las preguntas que incluirá mi test personalizado**.

## Criterios de aceptación

### Escenario 1: Seleccionar una unidad hoja
- **Dado que** estoy en el Paso 1 de Crear test
- **Cuando** marco el checkbox de una unidad hoja
- **Entonces** esa unidad queda seleccionada y el contador "X unidades seleccionadas" del SubHeader se incrementa

### Escenario 2: Seleccionar un nodo padre
- **Dado que** hay un nodo con hijos en el árbol
- **Cuando** marco el checkbox del nodo padre
- **Entonces** todos sus descendientes quedan seleccionados automáticamente

### Escenario 3: Desmarcar un nodo padre
- **Dado que** un nodo padre está seleccionado (todos sus hijos marcados)
- **Cuando** desmarco el checkbox del nodo padre
- **Entonces** todos sus descendientes quedan deseleccionados

### Escenario 4: Estado indeterminate
- **Dado que** solo algunos descendientes de un nodo están seleccionados
- **Cuando** veo el checkbox de ese nodo padre
- **Entonces** el checkbox se muestra en estado `indeterminate`

### Escenario 5: Filtrar por búsqueda
- **Dado que** hay unidades en el árbol
- **Cuando** escribo texto en la barra de búsqueda del SubHeader
- **Entonces** solo se muestran las unidades cuyo nombre contiene el texto
- **Y** sus nodos ancestros se expanden automáticamente para que sean visibles

### Escenario 6: Botón "Continuar" deshabilitado
- **Dado que** no hay ninguna unidad seleccionada
- **Cuando** veo el SubHeader del Paso 1
- **Entonces** el botón "Continuar" está deshabilitado

### Escenario 7: Avanzar al Paso 2
- **Dado que** hay al menos una unidad seleccionada
- **Cuando** pulso "Continuar"
- **Entonces** paso al Paso 2 con las unidades seleccionadas

## Notas de implementación

- Componente: `CurriculumDisplay` en modo `"select"`
- El estado de nodos abiertos/cerrados no se persiste en modo `"select"` (se resetea al entrar)
- El estado de selección vive en el componente `CreateTestPage` (estado del formulario)
- La expansión automática por búsqueda se gestiona internamente en `CurriculumDisplay`
