# ADR-009 — Migrar a createBrowserRouter para habilitar useBlocker

**Estado:** Aceptado  
**Fecha:** 2026-06-23

---

## Contexto

Para interceptar cualquier navegación SPA (NavBar, links, `navigate()`, botón atrás) mientras hay una sesión activa en `IndefiniteTestPage`, necesitamos `useBlocker` de React Router. Este hook solo funciona en rutas definidas dentro de un "data router" (`createBrowserRouter`), no en `BrowserRouter`.

## Decisión

Migrar `App.tsx` de `BrowserRouter + <Routes>/<Route>` a `createBrowserRouter(createRoutesFromElements(...))` + `<RouterProvider>`. La definición de rutas se mantiene con la misma sintaxis JSX usando `createRoutesFromElements`.

Se añade un componente `Root` que contiene los efectos de `DataSeeder` y `ThemeApplier`, previamente hijos directos de `BrowserRouter`.

## Consecuencias

**Positivas:**
- `useBlocker` funciona en todos los componentes bajo el router.
- Mejor compatibilidad con otras APIs de React Router v7 (loaders, actions) si se necesitan en el futuro.

**Negativas:**
- Ligero aumento de complejidad en `App.tsx`.
- El router se construye fuera del árbol de componentes React (como objeto constante), lo que implica que las rutas son estáticas (no problem para Fase 1).
