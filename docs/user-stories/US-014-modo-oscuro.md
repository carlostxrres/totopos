# US-014 — Cambiar entre modo claro y modo oscuro

**Como** opositor que estudia en condiciones de poca luz,  
**quiero** poder alternar entre modo claro y modo oscuro,  
**para** reducir la fatiga visual al estudiar de noche o en entornos oscuros.

---

## Criterios de aceptación

1. El Header muestra un botón con icono de luna (modo claro activo) o sol (modo oscuro activo).
2. Al pulsar el botón, el tema cambia de inmediato sin recargar la página.
3. La preferencia se persiste en `localStorage` y se restaura al volver a abrir la app.
4. Todos los colores de la interfaz respetan los tokens del sistema de diseño (`--background`, `--foreground`, etc.) tanto en modo claro como oscuro.

---

## Notas técnicas

- El tema se aplica añadiendo/quitando la clase `.dark` en `<html>`.
- Store: `useThemeStore` (`tot-opos:theme` en localStorage).
- El toggle lo gestiona `ThemeApplier` en `App.tsx` con un `useEffect`.
- No se detecta automáticamente la preferencia del sistema (`prefers-color-scheme`); el usuario elige manualmente.
