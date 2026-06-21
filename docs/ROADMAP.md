# TotOpos — Roadmap

## Estado actual: Fase 1 — MVP cliente

Todo en el cliente. Datos estáticos en paquetes npm del monorepo. Persistencia en localStorage. Sin backend ni autenticación.

---

## Fases

### Fase 1: MVP cliente ← actual

**Milestones:**

| #   | Milestone                                               | Estado    |
| --- | ------------------------------------------------------- | --------- |
| M1  | Infraestructura: monorepo, paquetes, stores, utilidades | pendiente |
| M2  | Tests guardados y exploración del temario               | pendiente |
| M3  | Crear test (flujo de dos pasos)                         | pendiente |
| M4  | Test fijo (responder, temporizador, corrección)         | pendiente |
| M5  | Test libre (sesión, preguntas, temporizador)            | pendiente |
| M6  | Historial, heatmap y vistas de detalle                  | pendiente |

**Epics y user stories:**

| Epic                | Stories                                                                                                                                                                       | Estado    |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| E1: Tests guardados | [US-001](user-stories/US-001-tests-guardados.md), [US-002](user-stories/US-002-explorar-por-temario.md)                                                                       | pendiente |
| E2: Crear test      | [US-003](user-stories/US-003-seleccionar-unidades.md), [US-004](user-stories/US-004-configurar-lanzar-test.md)                                                                | pendiente |
| E3: Test fijo       | [US-005](user-stories/US-005-responder-test-fijo.md), [US-006](user-stories/US-006-temporizador-test-fijo.md), [US-007](user-stories/US-007-enviar-revisar-test-fijo.md)      | pendiente |
| E4: Test libre      | [US-008](user-stories/US-008-sesion-test-libre.md), [US-009](user-stories/US-009-confirmar-respuesta-test-libre.md), [US-010](user-stories/US-010-temporizador-test-libre.md) | pendiente |
| E5: Historial       | [US-011](user-stories/US-011-historial-actividad.md), [US-012](user-stories/US-012-detalle-intento-fijo.md), [US-013](user-stories/US-013-detalle-sesion-libre.md)            | pendiente |

---

### Fase 2: Backend (planificada)

Autenticación de usuarios, catálogo de tests en servidor, API REST, sincronización del historial entre dispositivos.

### Fase 3: Social y avanzado (planificada)

Compartir tests, estadísticas agregadas, notificaciones de repaso, versionado del árbol de temario.

---

## Backlog Fase 2+

- **Backend:** autenticación, catálogo en servidor, API REST, sincronización de historial entre dispositivos
- **Versionado de temario:** mecanismo para que cambios en el árbol de Units no rompan el historial de intentos anteriores
- **Redo de fallos (US-F2-001):** generar un test libre automático con las preguntas falladas recientemente
- **Estadísticas por unidad:** rendimiento del usuario desglosado por tema/bloque
- **Notificaciones de repaso:** recordatorio cuando llevan X días sin repasar una unidad
- **Social:** compartir tests, estadísticas agregadas, valoraciones de tests

---

## Decisiones de arquitectura (ADRs)

| ADR                                                            | Decisión                                        |
| -------------------------------------------------------------- | ----------------------------------------------- |
| [ADR-001](decisions/ADR-001-monorepo-pnpm.md)                  | Monorepo con pnpm workspaces                    |
| [ADR-002](decisions/ADR-002-sin-tanstack-query-fase1.md)       | Sin TanStack Query en Fase 1                    |
| [ADR-003](decisions/ADR-003-timer-deadlineat-absoluto.md)      | Timer con `deadlineAt` como timestamp absoluto  |
| [ADR-004](decisions/ADR-004-localstorage-fase1.md)             | Persistencia en localStorage sin backend        |
| [ADR-005](decisions/ADR-005-ruta-detalle-sesion-indefinida.md) | Ruta dedicada para detalle de IndefiniteSession |
