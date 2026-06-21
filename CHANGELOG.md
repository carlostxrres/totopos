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
