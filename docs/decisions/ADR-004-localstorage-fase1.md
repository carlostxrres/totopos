# ADR-004: Persistencia en localStorage sin backend (Fase 1)

**Fecha:** 2026-06-21
**Estado:** aceptada

## Contexto

En Fase 1 no hay autenticación ni servidor. Los datos (tests guardados, historial de intentos, progreso, historial por pregunta) tienen que sobrevivir a recargas de página y a cierres del navegador.

## Decisión

Zustand con el middleware `persist` de `zustand/middleware`. Cada store tiene su propia clave en localStorage con el prefijo `tot-opos:`.

| Store | Clave |
|-------|-------|
| `useTestsStore` | `tot-opos:tests` |
| `useProgressStore` | `tot-opos:progress` |
| `useSessionStore` | `tot-opos:session` |
| `useHistoryStore` | `tot-opos:history` |
| `useQuestionHistoryStore` | `tot-opos:question-history` |
| `useCurriculumUiStore` | `tot-opos:curriculum-ui` |

## Consecuencias

**Positivas:**
- Cero infraestructura: funciona completamente offline
- Implementación inmediata sin complejidad de API ni autenticación
- El middleware `persist` de Zustand maneja serialización/deserialización automáticamente

**Negativas:**
- Los datos quedan atados al dispositivo y al navegador concreto
- El usuario puede perder todos sus datos borrando el localStorage o usando modo incógnito
- Sin sincronización entre dispositivos
- El localStorage tiene un límite de ~5MB por origen; con historial extenso podría alcanzarse

**Plan de migración a Fase 2:**
En Fase 2, el backend leerá el localStorage en el primer login y migrará los datos al servidor. Los stores de Zustand se actualizarán para usar el API en lugar de localStorage como fuente de verdad, conservando `persist` solo como caché local.
