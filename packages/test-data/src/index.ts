import type { FixedTest } from "@tot-opos/types";

export const fixedTests: FixedTest[] = [
  {
    id: "demo-bcn-auxiliar-001",
    type: "fixed",
    title: "Auxiliar Administratiu — Bloc 1 (Demo)",
    description:
      "Test de demostració sobre l'organització municipal de Barcelona i el procediment administratiu local.",
    saved: true,
    suggestedMinuteLimit: 10,
    rules: {
      scoring: {
        correctPoints: 1,
        penaltyPerWrong: 1 / 3,
        passThreshold: 0.5,
      },
      navigation: "free",
    },
    metadata: {
      category: "Ajuntament de Barcelona",
      subcategory: "Auxiliar Administratiu",
      year: 2024,
      tags: ["demo", "organització", "procediment"],
    },
    unitIds: ["bcn-t1", "bcn-t2", "bcn-t3"],
    questions: [
      // Q1 — single, bcn-t1
      {
        id: "q-bcn-001",
        type: "single",
        prompt:
          "Quin és l'òrgan unipersonal de govern de màxima representació de l'Ajuntament de Barcelona?",
        options: [
          { id: "q-bcn-001-a", text: "El Consell Municipal", isCorrect: false },
          { id: "q-bcn-001-b", text: "L'Alcalde o Alcaldessa", isCorrect: true },
          { id: "q-bcn-001-c", text: "La Junta de Govern Local", isCorrect: false },
          { id: "q-bcn-001-d", text: "El Síndic de Greuges", isCorrect: false },
        ],
        explanation:
          "L'Alcalde o Alcaldessa és el màxim representant de l'Ajuntament i president/a de la Corporació Municipal.",
        unitIds: ["bcn-t1"],
      },

      // Q2 — single, bcn-t1
      {
        id: "q-bcn-002",
        type: "single",
        prompt: "En quants districtes es divideix administrativament la ciutat de Barcelona?",
        options: [
          { id: "q-bcn-002-a", text: "8 districtes", isCorrect: false },
          { id: "q-bcn-002-b", text: "10 districtes", isCorrect: true },
          { id: "q-bcn-002-c", text: "12 districtes", isCorrect: false },
          { id: "q-bcn-002-d", text: "15 districtes", isCorrect: false },
        ],
        unitIds: ["bcn-t1"],
      },

      // Q3 — multiple, bcn-t2
      {
        id: "q-bcn-003",
        type: "multiple",
        prompt:
          "Quines de les següents situacions administratives pot tenir un funcionari de l'Ajuntament de Barcelona? (Selecciona totes les correctes)",
        options: [
          { id: "q-bcn-003-a", text: "Servei actiu", isCorrect: true },
          { id: "q-bcn-003-b", text: "Excedència voluntària", isCorrect: true },
          { id: "q-bcn-003-c", text: "Suspensió de funcions", isCorrect: true },
          { id: "q-bcn-003-d", text: "Baixa definitiva immediata sense expedient", isCorrect: false },
        ],
        explanation:
          "Les situacions administratives regulades inclouen el servei actiu, l'excedència (voluntària o forçosa) i la suspensió de funcions. La baixa definitiva sense expedient disciplinari no és una situació administrativa regulada.",
        unitIds: ["bcn-t2"],
      },

      // Q4 — single, bcn-t3, with promptImage
      {
        id: "q-bcn-004",
        type: "single",
        prompt:
          "Segons la Llei 39/2015, quin és el termini màxim per resoldre un procediment administratiu quan la norma no en fixa cap de específic?",
        promptImage:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/BOE_logo.svg/320px-BOE_logo.svg.png",
        options: [
          { id: "q-bcn-004-a", text: "3 mesos", isCorrect: false },
          { id: "q-bcn-004-b", text: "6 mesos", isCorrect: true },
          { id: "q-bcn-004-c", text: "1 any", isCorrect: false },
          { id: "q-bcn-004-d", text: "No hi ha termini supletori", isCorrect: false },
        ],
        explanation:
          "L'article 21.3 de la Llei 39/2015 estableix que el termini màxim supletori per resoldre i notificar és de 6 mesos.",
        unitIds: ["bcn-t3"],
      },

      // Q5 — single, bcn-t3
      {
        id: "q-bcn-005",
        type: "single",
        prompt:
          "Quin efecte produeix el silenci administratiu positiu en un procediment iniciat a sol·licitud de l'interessat?",
        options: [
          { id: "q-bcn-005-a", text: "Desestima la sol·licitud", isCorrect: false },
          {
            id: "q-bcn-005-b",
            text: "Estima la sol·licitud, tret que una norma estableixi el contrari",
            isCorrect: true,
          },
          { id: "q-bcn-005-c", text: "Obliga l'Administració a reiniciar el procediment", isCorrect: false },
          { id: "q-bcn-005-d", text: "No té cap efecte jurídic", isCorrect: false },
        ],
        unitIds: ["bcn-t3"],
      },

      // Q6 — single, tema-1-1 (genèric)
      {
        id: "q-const-001",
        type: "single",
        prompt: "En quin any va entrar en vigor la Constitució Espanyola vigent?",
        options: [
          { id: "q-const-001-a", text: "1975", isCorrect: false },
          { id: "q-const-001-b", text: "1977", isCorrect: false },
          { id: "q-const-001-c", text: "1978", isCorrect: true },
          { id: "q-const-001-d", text: "1979", isCorrect: false },
        ],
        explanation:
          "La Constitució Espanyola va ser aprovada per referèndum el 6 de desembre de 1978 i va entrar en vigor el 29 de desembre del mateix any.",
        unitIds: ["tema-1-1"],
      },

      // Q7 — multiple, tema-1-2
      {
        id: "q-const-002",
        type: "multiple",
        prompt:
          "Quins dels següents drets estan reconeguts com a drets fonamentals a la Secció 1a del Capítol II de la Constitució Espanyola? (Selecciona tots els correctes)",
        options: [
          { id: "q-const-002-a", text: "Dret a la vida", isCorrect: true },
          { id: "q-const-002-b", text: "Dret a la propietat privada", isCorrect: false },
          { id: "q-const-002-c", text: "Dret a la llibertat ideològica i religiosa", isCorrect: true },
          { id: "q-const-002-d", text: "Dret a la tutela judicial efectiva", isCorrect: true },
        ],
        explanation:
          "El dret a la propietat privada (art. 33 CE) es troba a la Secció 2a i no gaudeix de la protecció reforçada dels drets fonamentals de la Secció 1a.",
        unitIds: ["tema-1-2"],
      },

      // Q8 — single, tema-4-2
      {
        id: "q-proc-001",
        type: "single",
        prompt:
          "Quina és la diferència principal entre la nul·litat de ple dret i l'anul·labilitat d'un acte administratiu?",
        options: [
          {
            id: "q-proc-001-a",
            text: "La nul·litat no pot ser sanada; l'anul·labilitat pot ser convalidada",
            isCorrect: true,
          },
          {
            id: "q-proc-001-b",
            text: "L'anul·labilitat és més greu que la nul·litat",
            isCorrect: false,
          },
          {
            id: "q-proc-001-c",
            text: "La nul·litat només afecta actes favorables per al ciutadà",
            isCorrect: false,
          },
          {
            id: "q-proc-001-d",
            text: "No hi ha diferència pràctica entre totes dues",
            isCorrect: false,
          },
        ],
        unitIds: ["tema-4-2"],
      },
    ],
  },
];
