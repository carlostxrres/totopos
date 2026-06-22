# US-021 — Ver resumen antes de salir de un test libre

**Como** opositor que está haciendo un test libre,  
**quiero** ver un resumen de mi sesión antes de salir,  
**para** poder decidir conscientemente entre pausar (conservar progreso) o cerrar la sesión definitivamente.

---

## Criterios de aceptación

1. Al pulsar el botón "Atrás" del Header durante una sesión activa de test libre, aparece un diálogo en vez de navegar directamente.
2. El diálogo muestra las estadísticas de la sesión actual: preguntas respondidas, correctas, incorrectas y % de acierto.
3. El diálogo ofrece dos opciones:
   - **Pausar y salir**: navega hacia atrás sin cerrar la sesión (el test sigue disponible para continuar).
   - **Cerrar sesión**: cierra la sesión (la mueve al historial) y navega al historial.
4. Si la sesión aún no tiene preguntas respondidas, el resumen de estadísticas no aparece (solo el texto informativo).

---

## Notas técnicas

- La intercepción del botón "Atrás" se implementa con `window.history.pushState(null, '')` + listener `popstate`.
- Al mostrar el diálogo se re-pushea una entrada en el historial para que el back button se pueda pulsar repetidamente.
- El listener `popstate` se limpia al desmontar el componente.
- `useBlocker` de React Router v7 no está disponible en esta versión; de ahí el enfoque con la History API nativa.
