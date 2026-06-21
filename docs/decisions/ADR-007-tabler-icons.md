# ADR-007: Tabler Icons como biblioteca de iconos

**Fecha:** 2026-06-21
**Estado:** aceptada

## Contexto

La implementación inicial usaba SVGs inline en `src/components/icons.tsx`. Esto implicaba mantener manualmente cada path SVG y dificultaba añadir nuevos iconos.

## Decisión

Adoptar `@tabler/icons-react` como biblioteca de iconos. El archivo `src/components/icons.tsx` actúa como barrel de re-exports que mapea los nombres locales del proyecto a los nombres de Tabler:

```ts
export { IconArrowLeft as ArrowLeftIcon, IconBookmark as BookmarkIcon, ... } from "@tabler/icons-react";
```

Esto permite cambiar la biblioteca en el futuro sin tocar ningún otro archivo.

**Mapeo de nombres relevante:**
| Nombre local | Tabler |
|---|---|
| `MenuDotsIcon` | `IconDotsVertical` |
| `BookOpenIcon` | `IconBook2` |
| `PauseIcon` | `IconPlayerPause` |
| `PlayIcon` | `IconPlayerPlay` |
| `SaveIcon` | `IconDeviceFloppy` |

## Consecuencias

**Positivas:**
- +2 000 iconos disponibles con consistencia visual
- Tree-shaking nativo: solo se incluyen los iconos usados
- Props estándar de Tabler (`size`, `stroke`, `color`) sin wrapping adicional

**Negativas:**
- Dependencia externa (aunque bien mantenida y estable)
