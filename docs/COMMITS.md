# Protocolo de commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/) v1.0.0.

---

## Formato

```
<tipo>[ámbito opcional]: <descripción>

[cuerpo opcional]

[footer(s) opcional(es)]
```

---

## Tipos

| Tipo       | Cuándo usarlo                                                                      |
| ---------- | ---------------------------------------------------------------------------------- |
| `feat`     | Nueva funcionalidad para el usuario                                                |
| `fix`      | Corrección de un bug                                                               |
| `docs`     | Cambios solo en documentación                                                      |
| `style`    | Cambios de formato/estilo que no afectan el comportamiento (espacios, comas, etc.) |
| `refactor` | Refactorización sin añadir features ni corregir bugs                               |
| `test`     | Añadir o corregir tests                                                            |
| `chore`    | Tareas de mantenimiento: builds, dependencias, configuración                       |
| `perf`     | Mejoras de rendimiento                                                             |

---

## Ámbitos

Ámbitos válidos para este monorepo:

| Ámbito            | Descripción                                              |
| ----------------- | -------------------------------------------------------- |
| `types`           | Paquete `@tot-opos/types`                                |
| `curriculum-data` | Paquete `@tot-opos/curriculum-data`                      |
| `test-data`       | Paquete `@tot-opos/test-data`                            |
| `web`             | App principal `@tot-opos/web` (cambios globales)         |
| `store`           | Stores de Zustand (`src/store/`)                         |
| `ui`              | Componentes de UI (`src/components/`)                    |
| `routing`         | Rutas y páginas (`src/routes/`, `App.tsx`)               |
| `hooks`           | Hooks personalizados (`src/hooks/`)                      |
| `lib`             | Utilidades (`src/lib/`)                                  |
| `styles`          | Estilos globales, Tailwind config                        |
| `docs`            | Documentación en `/docs`                                 |
| `config`          | Configuración del monorepo (biome, vite, tsconfig, etc.) |

---

## Reglas

- La descripción va en **infinitivo** y en **español**: `feat(ui): añadir botón de bookmark`
- Longitud máxima de la primera línea: **72 caracteres**
- No terminar la descripción con punto
- Cambios que rompen compatibilidad hacia atrás: añadir `!` después del tipo/ámbito:
  ```
  feat(store)!: cambiar estructura de TestProgress
  ```

---

## Ejemplos

```
feat(routing): añadir ruta /historial/sesion/:sessionId

feat(ui): añadir componente TimerControl con modos blando y duro

fix(store): corregir cálculo de deadlineAt al reanudar timer pausado

refactor(ui): separar lógica de selección de CurriculumDisplay

test(lib): añadir tests unitarios para penalización con fracciones

docs: añadir ADR-002 sobre decisión de omitir TanStack Query en Fase 1

chore(config): configurar Biome con reglas de formato del proyecto

perf(web): memoizar resolveQuestions en CreateTestPage paso 2
```
