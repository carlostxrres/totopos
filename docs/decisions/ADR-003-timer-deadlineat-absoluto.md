# ADR-003: Timer con `deadlineAt` como timestamp absoluto

**Fecha:** 2026-06-21
**Estado:** aceptada

## Contexto

El timer del test fijo necesita sobrevivir a recargas de página: si el usuario tiene 10 minutos en el timer, recarga la página y la reabre 2 minutos después, deberían quedarle 8 minutos.

Hay dos enfoques posibles:
1. Guardar los **segundos restantes** en el momento de la pausa o del desmonte del componente.
2. Guardar un **timestamp absoluto** de cuándo expira el timer.

## Decisión

Guardar `deadlineAt` como ISO datetime absoluto en `useProgressStore` (que persiste en localStorage via Zustand `persist`).

```
startTimer:  deadlineAt = new Date(Date.now() + minutes * 60_000).toISOString()
pauseTimer:  pausedRemainingMs = new Date(deadlineAt).getTime() - Date.now()
             deadlineAt = undefined
resumeTimer: deadlineAt = new Date(Date.now() + pausedRemainingMs).toISOString()
```

El componente calcula los ms restantes en cada tick como `new Date(deadlineAt).getTime() - Date.now()`.

## Consecuencias

**Positivas:**
- El timer no "pierde tiempo" durante una recarga: `Date.now()` sigue avanzando mientras la página está cerrada
- No hay que detectar el evento `beforeunload` ni manejar el ciclo de vida del componente para guardar el tiempo restante
- Cálculo trivial en el componente, sin estado derivado complejo

**Negativas:**
- Si el reloj del sistema del usuario cambia mientras el timer está activo, el tiempo restante puede ser incorrecto (improbable y de impacto despreciable para este caso de uso)
- `pausedRemainingMs` debe guardarse con cuidado: si el usuario recarga mientras el timer está pausado, se reanuda correctamente porque `pausedRemainingMs` también está en el store persistido

## Alcance

Este diseño aplica solo al timer del **test fijo**. El timer del test libre (por pregunta) no necesita persistencia porque se reinicia en cada pregunta y no tiene sentido que sobreviva a una recarga.
