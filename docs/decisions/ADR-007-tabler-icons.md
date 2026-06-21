# ADR-007: Tabler Icons como biblioteca de iconos

**Fecha:** 2026-06-21
**Estado:** aceptada

## Contexto

La implementación inicial usaba SVGs inline en `src/components/icons.tsx`. Esto implicaba mantener manualmente cada path SVG y dificultaba añadir nuevos iconos.

## Decisión

Adoptar `@tabler/icons-react` como biblioteca de iconos e importar los componentes directamente en cada archivo consumidor usando los nombres nativos de Tabler (`IconArrowLeft`, `IconCheck`, etc.).

El barrel intermedio `src/components/icons.tsx` fue eliminado: añadía una capa de indirección sin beneficio real, dificultaba el autocompletado del IDE y ocultaba el nombre real del icono al lector del código.

## Consecuencias

**Positivas:**
- +2 000 iconos disponibles con consistencia visual
- Tree-shaking nativo: solo se incluyen los iconos usados
- Props estándar de Tabler (`size`, `stroke`, `color`) sin wrapping adicional

**Negativas:**
- Dependencia externa (aunque bien mantenida y estable)
