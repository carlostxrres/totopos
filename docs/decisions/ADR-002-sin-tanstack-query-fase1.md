# ADR-002: Sin TanStack Query en Fase 1

**Fecha:** 2026-06-21
**Estado:** aceptada

## Contexto

El spec original planteaba usar TanStack Query con `initialData` para los datos estáticos "preparado para Fase 2 con backend". En Fase 1, todos los datos son imports directos de paquetes npm del monorepo; no hay ninguna llamada HTTP.

## Decisión

No incluir TanStack Query en Fase 1. Los datos estáticos (`units`, `fixedTests`) se importan directamente en los componentes o se inicializan en los stores de Zustand. Los stores de Zustand son la única capa de estado.

## Consecuencias

**Positivas:**
- Sin `QueryClient`, sin `QueryClientProvider`, sin `useQuery` — la app es más simple
- Sin overhead de gestionar estados `isLoading` / `isError` que nunca ocurren con datos estáticos
- Código más fácil de leer para quien no conozca TanStack Query

**Negativas:**
- Añadir TanStack Query en Fase 2 requerirá refactorizar los componentes que consuman datos del API (trabajo estimado: medio-bajo, dado que los datos ya vendrán de funciones bien delimitadas)
- Sin caché de queries en Fase 1 (no es necesaria, pero podría ser un beneficio colateral)

## Alternativa descartada

Incluir TanStack Query desde el principio con `initialData`. Se descarta porque el overhead de la configuración no aporta valor real en Fase 1 y complica innecesariamente el código.
