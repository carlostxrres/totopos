# US-017 — Exportar e importar datos de progreso

**Como** opositor que usa la app en varios dispositivos,  
**quiero** poder exportar e importar todos mis datos como un archivo JSON,  
**para** hacer copias de seguridad y transferir mi progreso entre dispositivos.

---

## Criterios de aceptación

1. Existe una página `/ajustes` accesible desde el icono de engranaje en el Header.
2. El botón "Descargar copia de seguridad" descarga un JSON con todos los stores persisted (`tot-opos:*`).
3. El nombre del archivo incluye la fecha: `totopos-backup-YYYY-MM-DD.json`.
4. El botón "Seleccionar archivo de backup" abre un picker de archivos `.json`.
5. Al importar un backup válido, los stores se restauran y la app se recarga.
6. Si el archivo no es JSON válido, se muestra un mensaje de error descriptivo.
7. El botón "Borrar todos los datos" requiere confirmación y recarga la app tras limpiar.

---

## Notas técnicas

- Claves exportadas: `tot-opos:tests`, `tot-opos:progress`, `tot-opos:session`, `tot-opos:history`, `tot-opos:question-history`, `tot-opos:curriculum-ui`, `tot-opos:theme`.
- La importación escribe directamente en `localStorage` y recarga con `window.location.reload()`.
- El borrado usa `localStorage.removeItem` para cada clave y recarga la app.
- No hay validación de esquema en la importación (se confía en que el archivo es un backup propio).
