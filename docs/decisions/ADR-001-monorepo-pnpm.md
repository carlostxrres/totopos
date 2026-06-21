# ADR-001: Monorepo con pnpm workspaces

**Fecha:** 2026-06-21
**Estado:** aceptada

## Contexto

El proyecto tiene tres partes claramente diferenciadas: tipos TypeScript compartidos, datos estáticos del temario, datos estáticos de tests de ejemplo, y la aplicación web. En el futuro puede haber una app móvil, un backend API o más paquetes de datos.

Hay que decidir si organizar el proyecto como repositorio único con todo en `src/`, o como monorepo con paquetes separados.

## Decisión

Monorepo con **pnpm workspaces**. Tres paquetes bajo `packages/` y la app bajo `apps/`:

- `@tot-opos/types` — tipos TypeScript compartidos
- `@tot-opos/curriculum-data` — árbol de unidades estático
- `@tot-opos/test-data` — tests fijos de ejemplo
- `@tot-opos/web` — aplicación React principal

## Consecuencias

**Positivas:**
- Los tipos y datos estáticos se comparten con TypeScript path resolution sin necesidad de publicar a npm
- Preparado para añadir `apps/mobile` o `packages/api` en Fase 2 sin reestructurar
- Un solo `pnpm install` en la raíz instala todas las dependencias
- Biome, TypeScript y scripts de build se pueden ejecutar desde la raíz

**Negativas:**
- Mayor complejidad de configuración inicial respecto a un proyecto único
- Los cambios en `@tot-opos/types` afectan a todos los paquetes que lo consumen (hay que asegurarse de que todos compilan)
