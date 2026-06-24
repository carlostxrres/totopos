# ADR-007: Tabler Icons como biblioteca de iconos

**Fecha:** 2026-06-21
**Estado:** aceptada

## Contexto

La implementación inicial usaba SVGs inline en `src/components/icons.tsx`. Esto implicaba mantener manualmente cada path SVG y dificultaba añadir nuevos iconos.

## Decisión

Adoptar `@tabler/icons-react` como biblioteca de iconos e importar los componentes directamente en cada archivo consumidor usando los nombres nativos de Tabler (`IconArrowLeft`, `IconCheck`, etc.).

El barrel intermedio `src/components/icons.tsx` fue eliminado: añadía una capa de indirección sin beneficio real, dificultaba el autocompletado del IDE y ocultaba el nombre real del icono al lector del código.

## Convenciones de uso

### Variante de icono

Usar exclusivamente iconos en variante **outline** (trazo). No usar variantes `Filled` salvo cuando el estado activo lo requiera semánticamente (por ejemplo, `IconBookmarkFilled` para indicar que una pregunta está marcada, frente a `IconBookmark` en estado inactivo).

### Tamaños

Dos tamaños, siempre explícitos (no confiar en el default de 24):

| Tamaño | Prop | Uso |
|--------|------|-----|
| **Small** | `size={16}` | Iconos decorativos o indicadores embebidos en UI: inputs de búsqueda, chevrons de árbol, indicadores de estado inline (check/X), iconos en items de menú desplegable, iconos que encabezan líneas de texto |
| **Medium** | `size={20}` | Iconos en botones standalone o de navegación: back, settings, dots, bookmark toggle, play/pause, iconos de la barra de navegación |

La norma de usar siempre un tamaño explícito facilita los code reviews y evita la deuda acumulada de inconsistencias.

## Consecuencias

**Positivas:**
- +2 000 iconos disponibles con consistencia visual
- Tree-shaking nativo: solo se incluyen los iconos usados
- Props estándar de Tabler (`size`, `stroke`, `color`) sin wrapping adicional
- Sistema de dos tamaños semánticos claro y fácil de aplicar

**Negativas:**
- Dependencia externa (aunque bien mantenida y estable)
