# Changelog

Todos los cambios notables de este proyecto se documentan en este archivo.

Formato: [Keep a Changelog](https://keepachangelog.com/es/1.0.0/)
Versionado: [SemVer](https://semver.org/lang/es/)

---

## [Unreleased]

### Added
- Estructura inicial del monorepo (pnpm workspaces)
- Paquetes `@tot-opos/types`, `@tot-opos/curriculum-data`, `@tot-opos/test-data`
- App web `@tot-opos/web` con React 18 + TypeScript + Vite
- Documentación de proyecto en `docs/`
- 2 tests de demostración adicionales: "Temario General" (10 preguntas) y "Auxiliar Administratiu Bloc 2" (10 preguntas)
- Alias `@/` para imports internos de la app web (ver ADR-006)
- Tabler Icons como biblioteca de iconos (`@tabler/icons-react`, ver ADR-007)
- ProgressPills: múltiples preguntas activas simultáneas; animación de rebote al cambiar altura
- Trigger de configuración del temporizador movido al DropdownMenu (ver ADR-008)

### Fixed
- `SessionDetailPage`: las preguntas de sesiones indefinidas mostraban el ID crudo en vez del texto
- `SavedTestsPage`: el filtro "Solo mis tests" estaba declarado pero nunca aplicado
- `IndefiniteTestPage`: el contador "N en pool" mostraba un valor incorrecto al reanudar una sesión
- `FixedTestPage`: "Borrar respuesta" no descontaba del contador de respondidas ni de ProgressPills
- Iconos de botones icon-only aparecían como un punto (SVG aplastado por `px-4` heredado de `.btn` + `max-width:100%` de Tailwind preflight); corregido con `p-0` en `.btn-ghost`

### Added
- Resumen antes del botón "Enviar test": barra de progreso, preguntas sin responder, marcadas sin responder y marcadas respondidas
- Número de pregunta como prefijo en gris antes del enunciado en tests fijos (ej. `2. En quants districtes...`)
- Nodos del árbol de temario sin tests se muestran en gris claro con etiqueta "sin tests" sin necesidad de expandirlos
- `.vscode/settings.json` con `typescript.tsdk` apuntando al TypeScript del workspace para resolver errores de paths en VSCode

### Changed
- Botón guardar/quitar en `TestCard`: sustituido el icono por texto ("Guardar" / "Quitar"), con modal de confirmación al quitar
- Barrel `src/components/icons.tsx` eliminado; todos los iconos se importan directamente de `@tabler/icons-react`
- Botones icon-only (flecha atrás, menú ⋮) usan `text-muted-foreground` para coherencia visual
- NavBar y Header usan `useLocation` para resaltar el tab activo también en sub-rutas (ej. `/tests/*` resalta "Tests")
