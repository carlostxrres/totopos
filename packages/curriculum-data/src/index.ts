import type { Unit } from "@tot-opos/types";

export const units: Unit[] = [
  // ─── Rama genérica ──────────────────────────────────────────────────────────
  {
    id: "root-generic",
    name: "Temario General de Oposiciones",
    parentId: null,
    type: "raiz",
    order: 1,
  },

  // Bloque I — Constitución
  {
    id: "bloque-constitucion",
    name: "Bloque I: Constitución Española",
    parentId: "root-generic",
    type: "bloque",
    order: 1,
  },
  {
    id: "tema-1",
    name: "Tema 1: La Constitución Española de 1978",
    parentId: "bloque-constitucion",
    type: "tema",
    order: 1,
  },
  {
    id: "tema-1-1",
    name: "Subtema 1.1: Estructura y principios",
    parentId: "tema-1",
    type: "subtema",
    order: 1,
  },
  {
    id: "tema-1-2",
    name: "Subtema 1.2: Derechos y libertades fundamentales",
    parentId: "tema-1",
    type: "subtema",
    order: 2,
  },
  {
    id: "tema-2",
    name: "Tema 2: La Corona y las Cortes Generales",
    parentId: "bloque-constitucion",
    type: "tema",
    order: 2,
  },
  {
    id: "tema-3",
    name: "Tema 3: El Gobierno y la Administración del Estado",
    parentId: "bloque-constitucion",
    type: "tema",
    order: 3,
  },

  // Bloque II — Procedimiento Administrativo
  {
    id: "bloque-procedimiento",
    name: "Bloque II: Procedimiento Administrativo",
    parentId: "root-generic",
    type: "bloque",
    order: 2,
  },
  {
    id: "tema-4",
    name: "Tema 4: La Ley 39/2015 de Procedimiento Administrativo Común",
    parentId: "bloque-procedimiento",
    type: "tema",
    order: 1,
  },
  {
    id: "tema-4-1",
    name: "Subtema 4.1: Los interesados y la representación",
    parentId: "tema-4",
    type: "subtema",
    order: 1,
  },
  {
    id: "tema-4-2",
    name: "Subtema 4.2: El acto administrativo",
    parentId: "tema-4",
    type: "subtema",
    order: 2,
  },
  {
    id: "tema-5",
    name: "Tema 5: Recursos administrativos",
    parentId: "bloque-procedimiento",
    type: "tema",
    order: 2,
  },
  {
    id: "tema-6",
    name: "Tema 6: La responsabilidad patrimonial de la Administración",
    parentId: "bloque-procedimiento",
    type: "tema",
    order: 3,
  },

  // Bloque III — Régimen Local
  {
    id: "bloque-regimen-local",
    name: "Bloque III: Régimen Local",
    parentId: "root-generic",
    type: "bloque",
    order: 3,
  },
  {
    id: "tema-7",
    name: "Tema 7: La Administración Local. El municipio",
    parentId: "bloque-regimen-local",
    type: "tema",
    order: 1,
  },
  {
    id: "tema-8",
    name: "Tema 8: Organización municipal",
    parentId: "bloque-regimen-local",
    type: "tema",
    order: 2,
  },
  {
    id: "tema-9",
    name: "Tema 9: Las competencias municipales y la hacienda local",
    parentId: "bloque-regimen-local",
    type: "tema",
    order: 3,
  },

  // ─── Rama específica: Ajuntament de Barcelona ────────────────────────────────
  {
    id: "root-bcn",
    name: "Ajuntament de Barcelona",
    parentId: null,
    type: "raiz",
    order: 2,
  },
  {
    id: "bcn-auxiliar",
    name: "Auxiliar Administratiu",
    parentId: "root-bcn",
    type: "categoria",
    order: 1,
  },
  {
    id: "bcn-t1",
    name: "Tema 1: L'organització municipal de Barcelona",
    parentId: "bcn-auxiliar",
    type: "tema",
    order: 1,
  },
  {
    id: "bcn-t2",
    name: "Tema 2: El personal al servei de l'Ajuntament",
    parentId: "bcn-auxiliar",
    type: "tema",
    order: 2,
  },
  {
    id: "bcn-t3",
    name: "Tema 3: El procediment administratiu local",
    parentId: "bcn-auxiliar",
    type: "tema",
    order: 3,
  },
  {
    id: "bcn-t4",
    name: "Tema 4: Atenció ciutadana i registre",
    parentId: "bcn-auxiliar",
    type: "tema",
    order: 4,
  },
  {
    id: "bcn-t5",
    name: "Tema 5: Gestió documental i arxiu",
    parentId: "bcn-auxiliar",
    type: "tema",
    order: 5,
  },
  {
    id: "bcn-t6",
    name: "Tema 6: Ofimàtica i eines digitals de l'Ajuntament",
    parentId: "bcn-auxiliar",
    type: "tema",
    order: 6,
  },
];
