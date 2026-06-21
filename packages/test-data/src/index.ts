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
          "/placeholder-organigrama.svg",
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

  // ─── Test 2: Temario General — Constitución y Organización del Estado ─────────
  {
    id: "demo-generic-001",
    type: "fixed",
    title: "Temario General — Constitución y Organización del Estado (Demo)",
    description:
      "Test de repaso sobre la organización constitucional del Estado, el Gobierno, la Administración Local y el procedimiento administrativo.",
    saved: true,
    suggestedMinuteLimit: 15,
    rules: {
      scoring: {
        correctPoints: 1,
        penaltyPerWrong: 1 / 3,
        passThreshold: 0.5,
      },
      navigation: "free",
    },
    metadata: {
      category: "Temario General",
      subcategory: "Administración Pública",
      tags: ["demo", "constitución", "régimen-local", "procedimiento"],
    },
    unitIds: ["tema-2", "tema-3", "tema-5", "tema-6", "tema-7", "tema-8", "tema-9"],
    questions: [
      // Q1 — single, tema-2
      {
        id: "q-gen-001",
        type: "single",
        prompt:
          "Según el artículo 68.1 de la Constitución Española, ¿cuántos Diputados componen el Congreso?",
        options: [
          { id: "q-gen-001-a", text: "Exactamente 350 Diputados", isCorrect: false },
          { id: "q-gen-001-b", text: "Entre 300 y 400 Diputados", isCorrect: true },
          { id: "q-gen-001-c", text: "Entre 200 y 300 Diputados", isCorrect: false },
          { id: "q-gen-001-d", text: "Entre 350 y 500 Diputados", isCorrect: false },
        ],
        explanation:
          "El artículo 68.1 CE establece que «el Congreso se compone de un mínimo de 300 y un máximo de 400 Diputados». La cifra concreta la fija la ley electoral (actualmente 350).",
        unitIds: ["tema-2"],
      },

      // Q2 — single, tema-2
      {
        id: "q-gen-002",
        type: "single",
        prompt: "¿Cuál es la duración del mandato del Congreso de los Diputados?",
        options: [
          { id: "q-gen-002-a", text: "3 años", isCorrect: false },
          { id: "q-gen-002-b", text: "4 años", isCorrect: true },
          { id: "q-gen-002-c", text: "5 años", isCorrect: false },
          { id: "q-gen-002-d", text: "6 años", isCorrect: false },
        ],
        explanation:
          "El artículo 68.4 CE dispone que el Congreso es elegido por cuatro años.",
        unitIds: ["tema-2"],
      },

      // Q3 — single, tema-3
      {
        id: "q-gen-003",
        type: "single",
        prompt:
          "Según el artículo 100 de la Constitución Española, ¿quién nombra y separa a los Ministros?",
        options: [
          { id: "q-gen-003-a", text: "El Presidente del Gobierno, con confirmación del Congreso", isCorrect: false },
          { id: "q-gen-003-b", text: "El Rey, a propuesta del Presidente del Gobierno", isCorrect: true },
          { id: "q-gen-003-c", text: "El Congreso de los Diputados, por mayoría absoluta", isCorrect: false },
          { id: "q-gen-003-d", text: "El Consejo de Estado, de forma autónoma", isCorrect: false },
        ],
        explanation:
          "El art. 100 CE establece que los miembros del Gobierno son nombrados y separados por el Rey, a propuesta de su Presidente.",
        unitIds: ["tema-3"],
      },

      // Q4 — multiple, tema-3
      {
        id: "q-gen-004",
        type: "multiple",
        prompt:
          "¿Cuáles de las siguientes son atribuciones del Gobierno según el artículo 97 de la Constitución Española? (Selecciona todas las correctas)",
        options: [
          { id: "q-gen-004-a", text: "Dirección de la política interior y exterior", isCorrect: true },
          { id: "q-gen-004-b", text: "Ejercicio de la función ejecutiva", isCorrect: true },
          { id: "q-gen-004-c", text: "La potestad reglamentaria", isCorrect: true },
          { id: "q-gen-004-d", text: "Declarar la guerra con plena autonomía, sin intervención de las Cortes", isCorrect: false },
        ],
        explanation:
          "El art. 97 CE atribuye al Gobierno la dirección de la política interior y exterior, la función ejecutiva y la potestad reglamentaria. La declaración de guerra requiere autorización de las Cortes Generales (art. 63.3 CE).",
        unitIds: ["tema-3"],
      },

      // Q5 — single, tema-5
      {
        id: "q-gen-005",
        type: "single",
        prompt:
          "Según el artículo 121 de la Ley 39/2015, ¿cuál es el plazo para interponer un recurso de alzada contra un acto expreso?",
        options: [
          { id: "q-gen-005-a", text: "10 días hábiles", isCorrect: false },
          { id: "q-gen-005-b", text: "1 mes", isCorrect: true },
          { id: "q-gen-005-c", text: "3 meses", isCorrect: false },
          { id: "q-gen-005-d", text: "6 meses", isCorrect: false },
        ],
        explanation:
          "El art. 121 Ley 39/2015 establece que el recurso de alzada contra un acto expreso podrá interponerse en el plazo de un mes.",
        unitIds: ["tema-5"],
      },

      // Q6 — single, tema-6
      {
        id: "q-gen-006",
        type: "single",
        prompt:
          "¿Cómo se caracteriza la responsabilidad patrimonial de la Administración Pública en el ordenamiento español?",
        options: [
          { id: "q-gen-006-a", text: "Responsabilidad subjetiva, solo por culpa del funcionario", isCorrect: false },
          { id: "q-gen-006-b", text: "Responsabilidad objetiva por daños del funcionamiento de los servicios públicos", isCorrect: true },
          { id: "q-gen-006-c", text: "Responsabilidad limitada exclusivamente a actuaciones dolosas", isCorrect: false },
          { id: "q-gen-006-d", text: "Solo existe si hay sentencia judicial firme previa", isCorrect: false },
        ],
        explanation:
          "El art. 32 Ley 40/2015 configura un sistema de responsabilidad objetiva: los particulares tienen derecho a indemnización por el funcionamiento normal o anormal de los servicios públicos.",
        unitIds: ["tema-6"],
      },

      // Q7 — single, tema-7
      {
        id: "q-gen-007",
        type: "single",
        prompt:
          "Según la Ley 7/1985 de Bases del Régimen Local (LBRL), ¿a partir de qué número de habitantes deben prestar los municipios el servicio de alcantarillado de forma obligatoria?",
        options: [
          { id: "q-gen-007-a", text: "1.000 habitantes", isCorrect: false },
          { id: "q-gen-007-b", text: "2.000 habitantes", isCorrect: false },
          { id: "q-gen-007-c", text: "5.000 habitantes", isCorrect: true },
          { id: "q-gen-007-d", text: "10.000 habitantes", isCorrect: false },
        ],
        explanation:
          "El art. 26.1.b LBRL establece que los municipios con población superior a 5.000 habitantes deben prestar, entre otros, el servicio de alcantarillado.",
        unitIds: ["tema-7"],
      },

      // Q8 — single, tema-8
      {
        id: "q-gen-008",
        type: "single",
        prompt:
          "Según la LBRL, ¿a partir de qué población existe Junta de Gobierno Local con carácter obligatorio?",
        options: [
          { id: "q-gen-008-a", text: "1.000 habitantes", isCorrect: false },
          { id: "q-gen-008-b", text: "5.000 habitantes", isCorrect: true },
          { id: "q-gen-008-c", text: "10.000 habitantes", isCorrect: false },
          { id: "q-gen-008-d", text: "20.000 habitantes", isCorrect: false },
        ],
        explanation:
          "El art. 20.1.b LBRL dispone que existirá Junta de Gobierno Local en los municipios con población superior a 5.000 habitantes y en los de menor población cuando lo decida el Pleno.",
        unitIds: ["tema-8"],
      },

      // Q9 — single, tema-8
      {
        id: "q-gen-009",
        type: "single",
        prompt: "¿Quién preside la Junta de Gobierno Local de un Ayuntamiento?",
        options: [
          { id: "q-gen-009-a", text: "El Primer Teniente de Alcalde", isCorrect: false },
          { id: "q-gen-009-b", text: "El Alcalde", isCorrect: true },
          { id: "q-gen-009-c", text: "El Concejal de mayor edad", isCorrect: false },
          { id: "q-gen-009-d", text: "El Secretario del Ayuntamiento", isCorrect: false },
        ],
        explanation:
          "Según el art. 23.2 LBRL, el Alcalde preside la Junta de Gobierno Local.",
        unitIds: ["tema-8"],
      },

      // Q10 — single, tema-9
      {
        id: "q-gen-010",
        type: "single",
        prompt:
          "¿Cuál de los siguientes es un impuesto municipal POTESTATIVO (no obligatorio) según el Real Decreto Legislativo 2/2004?",
        options: [
          { id: "q-gen-010-a", text: "Impuesto sobre Bienes Inmuebles (IBI)", isCorrect: false },
          { id: "q-gen-010-b", text: "Impuesto sobre Vehículos de Tracción Mecánica (IVTM)", isCorrect: false },
          { id: "q-gen-010-c", text: "Impuesto sobre Construcciones, Instalaciones y Obras (ICIO)", isCorrect: true },
          { id: "q-gen-010-d", text: "Impuesto sobre Actividades Económicas (IAE)", isCorrect: false },
        ],
        explanation:
          "El IBI, el IVTM y el IAE son impuestos municipales obligatorios. El ICIO y el Impuesto sobre el Incremento de Valor de los Terrenos de Naturaleza Urbana son de aplicación potestativa.",
        unitIds: ["tema-9"],
      },
    ],
  },

  // ─── Test 3: Auxiliar Administratiu BCN — Bloc 2 (Atenció, Documents, Ofimàtica) ──
  {
    id: "demo-bcn-auxiliar-002",
    type: "fixed",
    title: "Auxiliar Administratiu — Bloc 2: Atenció Ciutadana i Gestió Documental (Demo)",
    description:
      "Test de demostració sobre l'atenció ciutadana, el registre, la gestió documental, l'arxiu i les eines digitals de l'Ajuntament de Barcelona.",
    saved: true,
    suggestedMinuteLimit: 12,
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
      tags: ["demo", "atenció-ciutadana", "gestió-documental", "ofimàtica"],
    },
    unitIds: ["bcn-t4", "bcn-t5", "bcn-t6"],
    questions: [
      // Q1 — single, bcn-t4
      {
        id: "q-bcn-t4-001",
        type: "single",
        prompt:
          "Quina és la funció principal de les Oficines d'Atenció Ciutadana (OAC) de l'Ajuntament de Barcelona?",
        options: [
          { id: "q-bcn-t4-001-a", text: "Gestionar els expedients d'urbanisme i llicències d'obres", isCorrect: false },
          { id: "q-bcn-t4-001-b", text: "Oferir informació i tramitació de gestions municipals als ciutadans", isCorrect: true },
          { id: "q-bcn-t4-001-c", text: "Supervisar el pressupost municipal i els contractes públics", isCorrect: false },
          { id: "q-bcn-t4-001-d", text: "Coordinar els serveis socials dels districtes", isCorrect: false },
        ],
        explanation:
          "Les OAC són els punts d'entrada únics de l'Ajuntament per atendre els ciutadans: informen, tramiten i registren gestions municipals presencialment.",
        unitIds: ["bcn-t4"],
      },

      // Q2 — single, bcn-t4
      {
        id: "q-bcn-t4-002",
        type: "single",
        prompt:
          "Quina és la funció principal del Registre General de l'Ajuntament de Barcelona?",
        options: [
          { id: "q-bcn-t4-002-a", text: "Arxivar la documentació definitiva de l'Ajuntament", isCorrect: false },
          { id: "q-bcn-t4-002-b", text: "Rebre, anotar i distribuir la documentació d'entrada i de sortida", isCorrect: true },
          { id: "q-bcn-t4-002-c", text: "Gestionar el personal de l'Ajuntament", isCorrect: false },
          { id: "q-bcn-t4-002-d", text: "Supervisar les licitacions públiques", isCorrect: false },
        ],
        explanation:
          "El Registre General té la funció de deixar constància de tots els documents que entren i surten de l'Ajuntament, assignant-los un número, data i hora per garantir la traçabilitat.",
        unitIds: ["bcn-t4"],
      },

      // Q3 — multiple, bcn-t4
      {
        id: "q-bcn-t4-003",
        type: "multiple",
        prompt:
          "Quins dels següents principis han de regir l'atenció ciutadana a l'Administració Pública? (Selecciona tots els correctes)",
        options: [
          { id: "q-bcn-t4-003-a", text: "Accessibilitat universal i igualtat de tracte", isCorrect: true },
          { id: "q-bcn-t4-003-b", text: "Transparència i informació proactiva", isCorrect: true },
          { id: "q-bcn-t4-003-c", text: "Eficàcia i qualitat del servei", isCorrect: true },
          { id: "q-bcn-t4-003-d", text: "Restricció de l'accés a la informació per defecte", isCorrect: false },
        ],
        explanation:
          "L'atenció ciutadana ha de regir-se per principis com l'accessibilitat universal, la igualtat, la transparència i l'eficàcia. La restricció per defecte és contrària als principis de bona administració i la Llei de transparència.",
        unitIds: ["bcn-t4"],
      },

      // Q4 — single, bcn-t5
      {
        id: "q-bcn-t5-001",
        type: "single",
        prompt: "Quin dels següents conceptes descriu millor un «expedient administratiu»?",
        options: [
          { id: "q-bcn-t5-001-a", text: "Un document signat per l'alcalde o l'alcaldessa", isCorrect: false },
          {
            id: "q-bcn-t5-001-b",
            text: "El conjunt ordenat de documents i actuacions que serveixen d'antecedent i fonament a una resolució administrativa",
            isCorrect: true,
          },
          { id: "q-bcn-t5-001-c", text: "Un informe tècnic elaborat pel departament jurídic", isCorrect: false },
          { id: "q-bcn-t5-001-d", text: "El registre de les sessions del Consell Municipal", isCorrect: false },
        ],
        explanation:
          "L'art. 70 de la Llei 39/2015 defineix l'expedient administratiu com el conjunt ordenat de documents i actuacions que serveixen d'antecedent i fonament a la resolució administrativa.",
        unitIds: ["bcn-t5"],
      },

      // Q5 — single, bcn-t5
      {
        id: "q-bcn-t5-002",
        type: "single",
        prompt:
          "En el cicle de vida d'un document, quina és la fase en la qual el document ha perdut valor administratiu immediat però conserva un valor historic o de referència?",
        options: [
          { id: "q-bcn-t5-002-a", text: "Fase activa (arxiu de gestió)", isCorrect: false },
          { id: "q-bcn-t5-002-b", text: "Fase semiactiva (arxiu intermedi)", isCorrect: true },
          { id: "q-bcn-t5-002-c", text: "Fase de creació del document", isCorrect: false },
          { id: "q-bcn-t5-002-d", text: "Fase de destrucció certificada", isCorrect: false },
        ],
        explanation:
          "La fase semiactiva correspon a l'arxiu intermedi: el document ja no té ús administratiu diari però es conserva per possibles consultes o per valorar si té valor permanent.",
        unitIds: ["bcn-t5"],
      },

      // Q6 — multiple, bcn-t5
      {
        id: "q-bcn-t5-003",
        type: "multiple",
        prompt:
          "Quins criteris determinen si un document s'ha de conservar permanentment o es pot eliminar? (Selecciona tots els correctes)",
        options: [
          { id: "q-bcn-t5-003-a", text: "Valor administratiu (utilitat per a la gestió)", isCorrect: true },
          { id: "q-bcn-t5-003-b", text: "Valor jurídic (acreditació de drets i obligacions)", isCorrect: true },
          { id: "q-bcn-t5-003-c", text: "Valor històric o cultural (patrimoni documental)", isCorrect: true },
          { id: "q-bcn-t5-003-d", text: "Cost de la impressió original del document", isCorrect: false },
        ],
        explanation:
          "Els criteris de valoració documental són el valor administratiu, el valor jurídic i el valor histórico-cultural. El cost d'impressió no és un criteri de valoració documental.",
        unitIds: ["bcn-t5"],
      },

      // Q7 — single, bcn-t6
      {
        id: "q-bcn-t6-001",
        type: "single",
        prompt:
          "Quin format de fitxer és l'estàndard internacional per a la preservació i l'arxivament a llarg termini de documents electrònics en les administracions públiques?",
        options: [
          { id: "q-bcn-t6-001-a", text: "DOCX (Microsoft Word)", isCorrect: false },
          { id: "q-bcn-t6-001-b", text: "PDF/A (ISO 19005)", isCorrect: true },
          { id: "q-bcn-t6-001-c", text: "XLSX (Microsoft Excel)", isCorrect: false },
          { id: "q-bcn-t6-001-d", text: "HTML5", isCorrect: false },
        ],
        explanation:
          "El format PDF/A (ISO 19005) és l'estàndard establert per a la preservació de documents electrònics a llarg termini. Garanteix que el document serà llegible en el futur sense necessitat del programari original.",
        unitIds: ["bcn-t6"],
      },

      // Q8 — single, bcn-t6
      {
        id: "q-bcn-t6-002",
        type: "single",
        prompt:
          "Quina de les següents afirmacions descriu correctament la signatura electrònica en els documents administratius?",
        options: [
          { id: "q-bcn-t6-002-a", text: "Només poden utilitzar-la funcionaris de rang superior a cap de secció", isCorrect: false },
          { id: "q-bcn-t6-002-b", text: "Garanteix la identitat del signant i la integritat del document", isCorrect: true },
          { id: "q-bcn-t6-002-c", text: "No té validesa jurídica en els procediments administratius", isCorrect: false },
          { id: "q-bcn-t6-002-d", text: "Substitueix el segell físic però no produeix efectes legals", isCorrect: false },
        ],
        explanation:
          "La signatura electrònica reconeguda té els mateixos efectes jurídics que la signatura manuscrita. Garanteix l'autenticitat (identitat del signant) i la integritat (el document no ha estat alterat).",
        unitIds: ["bcn-t6"],
      },

      // Q9 — single, bcn-t6
      {
        id: "q-bcn-t6-003",
        type: "single",
        prompt:
          "En un full de càlcul, quina funció s'utilitza per sumar els valors d'un rang de cel·les que compleixen una condició específica?",
        options: [
          { id: "q-bcn-t6-003-a", text: "=SUMA()", isCorrect: false },
          { id: "q-bcn-t6-003-b", text: "=SUMASI() / SUMAR.SI()", isCorrect: true },
          { id: "q-bcn-t6-003-c", text: "=COMPTAR()", isCorrect: false },
          { id: "q-bcn-t6-003-d", text: "=MITJANA()", isCorrect: false },
        ],
        explanation:
          "La funció SUMAR.SI (SUMIF en anglès) suma els valors d'un rang que compleixen una condició. =SUMA() suma sense condicions, =COMPTAR() compta cel·les amb números i =MITJANA() calcula la mitjana.",
        unitIds: ["bcn-t6"],
      },

      // Q10 — multiple, bcn-t6
      {
        id: "q-bcn-t6-004",
        type: "multiple",
        prompt:
          "Quines de les següents eines formen part de la suite ofimàtica habitual en entorns administratius? (Selecciona totes les correctes)",
        options: [
          { id: "q-bcn-t6-004-a", text: "Processador de textos (ex. Writer / Word)", isCorrect: true },
          { id: "q-bcn-t6-004-b", text: "Full de càlcul (ex. Calc / Excel)", isCorrect: true },
          { id: "q-bcn-t6-004-c", text: "Programari de presentacions (ex. Impress / PowerPoint)", isCorrect: true },
          { id: "q-bcn-t6-004-d", text: "Programari de disseny CAD (ex. AutoCAD)", isCorrect: false },
        ],
        explanation:
          "La suite ofimàtica estàndard inclou el processador de textos, el full de càlcul i el programari de presentacions. El CAD és una eina d'enginyeria/arquitectura, no d'ús general administratiu.",
        unitIds: ["bcn-t6"],
      },
    ],
  },
];
