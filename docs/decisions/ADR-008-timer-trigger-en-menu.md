# ADR-008: Trigger de configuración del temporizador en el DropdownMenu

**Fecha:** 2026-06-21
**Estado:** aceptada

## Contexto

El botón de reloj para añadir un temporizador ocupaba espacio permanente en el SubHeader, junto a las ProgressPills y el contador. Al no haber timer activo, ese botón era poco frecuentemente usado y añadía ruido visual.

## Decisión

Mover el trigger de configuración del temporizador al DropdownMenu (`⋮`) bajo la entrada "Temporizador" (con `ClockIcon`). El chip de cuenta atrás (⏸/▶ + MM:SS) permanece en el SubHeader cuando hay un timer activo o pausado; hacer click en él sigue pausando/reanudando.

`TimerControl` recibe `setupOpen: boolean` y `onSetupOpenChange: (open: boolean) => void` del padre para que el DropdownMenu pueda abrir el diálogo de configuración.

```
SubHeader: [chip MM:SS si activo] [ProgressPills] [N/M] [⋮]
DropdownMenu: Temporizador | Ir al principio | Ir al final | ...
```

## Consecuencias

**Positivas:**
- SubHeader más limpio cuando no hay timer activo
- La acción poco frecuente (configurar) va en el menú; la frecuente (ver tiempo) sigue visible

**Negativas:**
- Configurar el timer requiere un paso más (abrir el menú)
