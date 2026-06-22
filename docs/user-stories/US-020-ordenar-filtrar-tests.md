# US-020 — Ordenar y filtrar tests guardados

**Como** opositor con varios tests guardados,  
**quiero** poder ordenar la lista de tests por diferentes criterios,  
**para** encontrar rápidamente el test que quiero hacer a continuación.

---

## Criterios de aceptación

1. En la vista "Mostrar todo" de Tests guardados, aparece un selector de ordenación.
2. Opciones de orden disponibles:
   - **Más reciente**: por fecha de última actividad (progreso o último intento), descendente.
   - **Más antiguo**: por fecha de última actividad, ascendente.
   - **Nombre**: orden alfabético por título.
   - **Mejor nota**: por el mejor porcentaje obtenido, descendente. Tests sin intentos al final.
3. El selector solo aparece en la sub-pestaña "Mostrar todo" (no en "Por temario").
4. El filtro "Solo míos" sigue funcionando en combinación con el orden.

---

## Notas técnicas

- La ordenación no se persiste (estado local en `useState`); se resetea al salir de la página.
- Para `fixed-tests`: la fecha de actividad toma la más reciente entre `progress.lastOpenedAt` y `fixedAttempts[0].completedAt`.
- Para `indefinite-tests`: la más reciente entre sesión activa y sesión completada.
- Usa `useMemo` para evitar re-ordenar en cada render.
