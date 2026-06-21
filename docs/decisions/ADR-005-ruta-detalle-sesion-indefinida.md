# ADR-005: Ruta dedicada para detalle de IndefiniteSession

**Fecha:** 2026-06-21
**Estado:** aceptada

## Contexto

El spec original solo define la ruta `/historial/:attemptId` para ver el detalle de un `FixedAttempt`. Las `IndefiniteSession`s cerradas también aparecen en el historial y necesitan una vista de detalle donde el usuario pueda revisar las preguntas que respondió y sus resultados.

Hay dos opciones:
1. Expandir el detalle de la sesión **inline** en `HistoryPage` (sin nueva ruta).
2. Crear una **ruta dedicada** `/historial/sesion/:sessionId`.

## Decisión

Crear la ruta `/historial/sesion/:sessionId` con un componente `SessionDetailPage`, simétrico a `AttemptDetailPage`.

## Consecuencias

**Positivas:**
- URLs directas y compartibles para cada sesión (útil cuando en Fase 2 haya backend y autenticación)
- Patrón consistente: `FixedAttempt` tiene su ruta, `IndefiniteSession` también tiene la suya
- `HistoryPage` no acumula lógica de detalle; cada página tiene una responsabilidad clara
- El botón de volver del Header funciona de forma natural

**Negativas:**
- Una ruta adicional en el router
- La alternativa inline habría sido más simple de implementar

## Alternativa descartada

Expandir inline en `HistoryPage` con un acordeón o modal. Descartada por inconsistencia con el patrón de `AttemptDetailPage` y por hacer `HistoryPage` más compleja.
