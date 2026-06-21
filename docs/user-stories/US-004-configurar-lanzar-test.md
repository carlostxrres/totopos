# US-004: Configurar y lanzar un test nuevo

| Campo | Valor |
|-------|-------|
| **Epic** | E2: Crear test |
| **Fase** | 1 |
| **Estado** | pendiente |
| **Milestone** | M3 |

## Historia

Como **usuario opositor**, quiero **configurar el tipo, filtros y número de preguntas de mi test** para **crear un test personalizado adaptado a mi preparación actual, y luego guardarlo o empezarlo directamente**.

## Criterios de aceptación

### Escenario 1: Seleccionar tipo de test
- **Dado que** estoy en el Paso 2 de Crear test
- **Cuando** selecciono "Test fijo"
- **Entonces** aparece el campo "Número de preguntas"
- **Y cuando** selecciono "Test libre"
- **Entonces** ese campo desaparece

### Escenario 2: Preguntas disponibles actualizadas en tiempo real
- **Dado que** he configurado algunos filtros
- **Cuando** cambio cualquier opción del formulario (tipo, excluir respondidas, selección de preguntas, nº de preguntas)
- **Entonces** el SubHeader actualiza inmediatamente el contador "X preguntas disponibles"

### Escenario 3: Guardar test sin duplicar
- **Dado que** ya existe un test con exactamente los mismos filtros
- **Cuando** pulso "Guardar test" en el modal de confirmación
- **Entonces** se muestra el aviso "Ya existe un test con estos parámetros" con un enlace al test existente

### Escenario 4: Guardar test nuevo
- **Dado que** no existe ningún test con esos filtros exactos
- **Cuando** pulso "Guardar test" en el modal
- **Entonces** se crea el test con `saved: true` y se muestra una notificación de éxito

### Escenario 5: Comenzar test nuevo directamente
- **Dado que** no existe ningún test con esos filtros exactos
- **Cuando** pulso "Comenzar test" en el modal
- **Entonces** se crea el test con `saved: false` y navega a `/tests/fixed/:id` o `/tests/indefinite/:id`

### Escenario 6: Comenzar test existente sin progreso
- **Dado que** ya existe un test con esos filtros y no tiene progreso activo
- **Cuando** pulso "Comenzar test" en el modal
- **Entonces** navega directamente al test existente

### Escenario 7: Comenzar test existente con progreso
- **Dado que** ya existe un test con esos filtros y tiene progreso activo o sesión abierta
- **Cuando** pulso "Comenzar test" en el modal
- **Entonces** aparece la pregunta "¿Continuar o empezar de nuevo?"
- **Y** el usuario puede elegir continuar (reanuda) o empezar de nuevo (llama a `reset`)

## Notas de implementación

- Ruta: `/crear` → `CreateTestPage`
- `findByFilters`: serialización canónica de unitIds (ordenados) + resto de campos en orden fijo
- `resolveQuestions(allQuestions, filters, questionHistories, now, units)` para calcular preguntas disponibles en tiempo real
- El estado del formulario vive en el componente; solo se persiste en `useTestsStore` al crear
- Modal de confirmación muestra resumen de las unidades y configuración seleccionadas
