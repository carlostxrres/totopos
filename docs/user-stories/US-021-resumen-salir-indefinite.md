# US-021 — Ver resumen antes de salir de un test libre

**Como** opositor que está haciendo un test libre,  
**quiero** ver un resumen de mi sesión antes de salir,  
**para** poder decidir conscientemente entre pausar (conservar progreso) o cerrar la sesión definitivamente.

---

## Criterios de aceptación

1. Cualquier intento de navegar fuera de un test libre con sesión activa muestra un diálogo de confirmación — independientemente de si se usa el botón "Atrás" del navegador, el NavBar o cualquier otro enlace de navegación.
2. El diálogo muestra las estadísticas de la sesión actual: preguntas respondidas, correctas, incorrectas y % de acierto.
3. El diálogo ofrece dos opciones:
   - **Pausar y salir**: ejecuta la navegación pendiente sin cerrar la sesión (el test sigue disponible para continuar).
   - **Cerrar sesión**: cierra la sesión (la mueve al historial) y ejecuta la navegación pendiente.
4. Si la sesión aún no tiene preguntas respondidas, el resumen de estadísticas no aparece (solo el texto informativo).
5. Cancelar el diálogo (cerrar sin elegir) aborta la navegación y mantiene al usuario en el test.

---

## Notas técnicas

- Implementado con `useBlocker(!!activeSession)` de React Router v7.
- Requiere el uso de `createBrowserRouter` en lugar de `BrowserRouter` (los data routers de React Router soportan bloqueadores de navegación).
- Cuando el diálogo se confirma, se llama a `blocker.proceed()` para ejecutar la navegación pendiente.
- Cuando se cancela (onOpenChange → false), se llama a `blocker.reset()` para abortar.
