# ADR-006: Alias `@/` para imports internos

**Fecha:** 2026-06-21
**Estado:** aceptada

## Contexto

Los imports internos de la app web usaban rutas relativas (`../`, `../../`) que son frágiles al mover archivos y dificultan la lectura del grafo de dependencias.

## Decisión

Configurar el alias `@` apuntando a `apps/web/src/` en Vite y TypeScript:

- `vite.config.ts`: `resolve.alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) }`
- `tsconfig.json`: `"paths": { "@/*": ["src/*"] }` con `"baseUrl": "."`

Todos los imports internos usan `@/` en lugar de rutas relativas: `from "@/components/icons"` en vez de `from "../../components/icons"`.

Los imports de paquetes del workspace (`@tot-opos/*`) y de dependencias externas (`react`, `zustand`, etc.) no cambian.

## Consecuencias

**Positivas:**
- Imports legibles e independientes de la profundidad del archivo
- Mover archivos entre carpetas no rompe imports de otros módulos
- Los IDEs resuelven el alias correctamente vía `tsconfig.json`

**Negativas:**
- Ninguna significativa; es convención estándar en proyectos Vite/React
