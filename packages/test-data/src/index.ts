import type { FixedTest } from "@tot-opos/types";

export const fixedTests: FixedTest[] = [
  // ─── Temario General — Constitución y Organización del Estado ─────────────────
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
      {
        id: "q-gen-007",
        type: "single",
        prompt:
          "Según la Ley 7/1985 de Bases del Régimen Local (LBRL), ¿a partir de qué número de habitantes deben prestar los municipios el servicio de alcantarillado de forma obligatoria?",
        options: [
          { id: "q-gen-007-a", text: "1.000 habitantes", isCorrect: false },
          { id: "q-gen-007-b", text: "2.000 habitantes", isCorrect: false },
          { id: "q-gen-007-c", text: "5.000 habitantes", isCorrect: true },
          { id: "q-gen-007-d", text: "10.000 habitants", isCorrect: false },
        ],
        explanation:
          "El art. 26.1.b LBRL establece que los municipios con población superior a 5.000 habitantes deben prestar, entre otros, el servicio de alcantarillado.",
        unitIds: ["tema-7"],
      },
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

  // ─── Ajuntament de Barcelona — Auxiliar Administratiu/iva — Examen real 2023 ──
  {
    id: "bcn-aux-adm-2023",
    type: "fixed",
    title: "Auxiliar Administratiu/iva — Test de coneixements del temari (Convocatòria 2023)",
    description:
      "Segon exercici de la primera prova de la convocatòria de 163 places d'Auxiliar Administratiu/iva de l'Ajuntament de Barcelona (2023). Inclou les 40 preguntes oficials i les 5 de reserva. Data de realització: 23/11/2024.",
    saved: true,
    suggestedMinuteLimit: 55,
    rules: {
      scoring: {
        correctPoints: 1,
        penaltyPerWrong: 1 / 4,
        passThreshold: 0.5,
      },
      navigation: "free",
    },
    metadata: {
      category: "Ajuntament de Barcelona",
      subcategory: "Auxiliar Administratiu",
      year: 2023,
      tags: ["real", "2023", "temari", "oficial"],
    },
    unitIds: [
      "bcn-t1", "bcn-t2", "bcn-t3", "bcn-t4", "bcn-t5", "bcn-t6",
      "bcn-t7", "bcn-t8", "bcn-t9", "bcn-t10", "bcn-t11", "bcn-t12",
      "bcn-t14", "bcn-t15", "bcn-t16", "bcn-t17", "bcn-t19",
    ],
    questions: [
      // Q1
      {
        id: "q-2023-01",
        type: "single",
        prompt: "Quina potestat exerceixen les Corts Generals?",
        options: [
          { id: "q-2023-01-a", text: "Executiva.", isCorrect: false },
          { id: "q-2023-01-b", text: "Legislativa i executiva.", isCorrect: false },
          { id: "q-2023-01-c", text: "Reglamentària.", isCorrect: false },
          { id: "q-2023-01-d", text: "Legislativa.", isCorrect: true },
        ],
        explanation:
          "Segons l'art. 66 CE, les Corts Generals representen el poble espanyol, exerceixen la potestat legislativa de l'Estat, aproven els seus pressupostos i controlen l'acció del Govern. La potestat executiva correspon al Govern (art. 97 CE) i la reglamentària és una derivada d'aquesta.",
        unitIds: ["bcn-t1"],
      },
      // Q2
      {
        id: "q-2023-02",
        type: "single",
        prompt: "Quin procediment s'estableix per a la investidura del President del Govern?",
        options: [
          { id: "q-2023-02-a", text: "El President del Govern és nomenat directament pel Rei sense necessitat de votació.", isCorrect: false },
          { id: "q-2023-02-b", text: "El candidat a President del Govern ha de rebre la confiança del Congrés dels Diputats, primer per majoria absoluta i, si no es dóna, per majoria simple en una segona votació.", isCorrect: true },
          { id: "q-2023-02-c", text: "El President del Govern és escollit per una majoria de dos terços del Senat.", isCorrect: false },
          { id: "q-2023-02-d", text: "El President del Govern és elegit per sufragi universal directe dels ciutadans/anes espanyols/oles.", isCorrect: false },
        ],
        explanation:
          "L'art. 99 CE estableix que el Rei proposa un candidat a President del Govern. El candidat exposa el seu programa davant el Congrés i sol·licita la seva confiança. Si en la primera votació no obté majoria absoluta, se'n celebra una altra 48 hores després en la qual n'hi ha prou amb la majoria simple (més vots a favor que en contra).",
        unitIds: ["bcn-t1"],
      },
      // Q3
      {
        id: "q-2023-03",
        type: "single",
        prompt:
          "Com s'anomena l'òrgan fiscalitzador extern dels comptes, de la gestió econòmica i del control d'eficiència de la Generalitat, dels ens locals i de la resta del sector públic de Catalunya?",
        options: [
          { id: "q-2023-03-a", text: "Consell de Garanties Estatutàries.", isCorrect: false },
          { id: "q-2023-03-b", text: "Síndic de Greuges.", isCorrect: false },
          { id: "q-2023-03-c", text: "Sindicatura de Comptes.", isCorrect: true },
          { id: "q-2023-03-d", text: "President/a de la Generalitat.", isCorrect: false },
        ],
        explanation:
          "La Sindicatura de Comptes és l'òrgan fiscalitzador extern de l'activitat econòmica, financera i comptable del sector públic de Catalunya (art. 80 EAC). El Síndic de Greuges és el defensor del poble català i el Consell de Garanties Estatutàries vetlla per l'adequació a l'Estatut i a la Constitució.",
        unitIds: ["bcn-t2"],
      },
      // Q4
      {
        id: "q-2023-04",
        type: "single",
        prompt:
          "Quin dels següents drets, que està reconegut a l'Estatut d'Autonomia de Catalunya, NO està expressament reconegut a la Constitució espanyola?",
        options: [
          { id: "q-2023-04-a", text: "Dret a viure amb dignitat el procés de mort.", isCorrect: true },
          { id: "q-2023-04-b", text: "Dret de reunió pacífica i sense armes.", isCorrect: false },
          { id: "q-2023-04-c", text: "Dret a la producció i creació científica.", isCorrect: false },
          { id: "q-2023-04-d", text: "Dret d'associació.", isCorrect: false },
        ],
        explanation:
          "L'art. 20 EAC reconeix el dret a viure amb dignitat el procés de la mort, dret que no apareix expressament a la CE de 1978. Els altres drets esmentats (reunió pacífica, producció científica, associació) sí que estan reconeguts a la CE (arts. 21, 20.1.b i 22 respectivament).",
        unitIds: ["bcn-t2"],
      },
      // Q5
      {
        id: "q-2023-05",
        type: "single",
        prompt:
          "Com es denomina a l'entitat local determinada per l'agrupació de municipis amb personalitat jurídica pròpia i plena capacitat per l'acompliment dels seus fins?",
        options: [
          { id: "q-2023-05-a", text: "Comarca.", isCorrect: false },
          { id: "q-2023-05-b", text: "Regió.", isCorrect: false },
          { id: "q-2023-05-c", text: "Província.", isCorrect: true },
          { id: "q-2023-05-d", text: "Mancomunitat de municipis.", isCorrect: false },
        ],
        explanation:
          "L'art. 141 CE defineix la província com «una entitat local amb personalitat jurídica pròpia, determinada per l'agrupació de municipis». La mancomunitat és una associació voluntària de municipis per a fins comuns, i la comarca és una agrupació de municipis reconeguda per les comunitats autònomes.",
        unitIds: ["bcn-t1"],
      },
      // Q6
      {
        id: "q-2023-06",
        type: "single",
        prompt: "Quina competència NO és pròpia de la Diputació?",
        options: [
          { id: "q-2023-06-a", text: "L'assistència jurídica als ajuntaments.", isCorrect: false },
          { id: "q-2023-06-b", text: "L'assistència econòmica als ajuntaments.", isCorrect: false },
          { id: "q-2023-06-c", text: "Garantir als municipis de menys de 1.000 habitants la prestació dels serveis de secretaria i intervenció.", isCorrect: false },
          { id: "q-2023-06-d", text: "Assumir els deutes dels ajuntaments quan aquests no puguin fer front als mateixos.", isCorrect: true },
        ],
        explanation:
          "La LBRL (arts. 31 i 36) atribueix a les Diputacions l'assistència i la cooperació jurídica, econòmica i tècnica als municipis, i la garantia dels serveis mínims als municipis de menys de 1.000 habitants. Però assumir els deutes dels ajuntaments no és una competència de la Diputació: els ajuntaments responen dels seus propis deutes.",
        unitIds: ["bcn-t1"],
      },
      // Q7
      {
        id: "q-2023-07",
        type: "single",
        prompt:
          "D'acord amb la Carta Municipal de Barcelona, l'alcalde o alcaldessa és el president o presidenta de la Corporació Municipal i té entre d'altres les atribucions següents:",
        options: [
          { id: "q-2023-07-a", text: "Aprovar el Pla general d'Acció Municipal, del Programa d'Actuació, el Pla d'Inversions i el Programa Financer.", isCorrect: false },
          { id: "q-2023-07-b", text: "Organitzar l'administració municipal executiva i nomenar els tinents i les tinentes d'alcalde i els regidors i regidores de districte.", isCorrect: true },
          { id: "q-2023-07-c", text: "Aprovar i modificar el Reglament orgànic que regula la composició i l'elecció dels Consells de Districte.", isCorrect: false },
          { id: "q-2023-07-d", text: "Aprovar el Codi ètic d'actuació de tot el personal al servei del municipi.", isCorrect: false },
        ],
        explanation:
          "Segons la Carta Municipal de Barcelona (Llei 22/1998), l'alcalde/essa té atribuïda l'organització de l'administració municipal executiva i el nomenament dels tinents/es d'alcalde i regidors/es de districte. L'aprovació del Pla d'Acció Municipal correspon al Consell Municipal, i el Reglament orgànic dels Consells de Districte és competència del propi Consell Municipal.",
        unitIds: ["bcn-t3"],
      },
      // Q8
      {
        id: "q-2023-08",
        type: "single",
        prompt: "Quina és una entitat pública empresarial de l'Ajuntament de Barcelona?",
        options: [
          { id: "q-2023-08-a", text: "Barcelona de Serveis Municipals BSM.", isCorrect: false },
          { id: "q-2023-08-b", text: "Barcelona d'Infraestructures Municipals-BIMSA.", isCorrect: false },
          { id: "q-2023-08-c", text: "Institut Municipal d'Hisenda de Barcelona.", isCorrect: false },
          { id: "q-2023-08-d", text: "Institut Municipal de Parcs i Jardins de Barcelona.", isCorrect: true },
        ],
        explanation:
          "L'Institut Municipal de Parcs i Jardins de Barcelona és una entitat pública empresarial de l'Ajuntament. BSM i BIMSA són societats mercantils (SA) de capital municipal. L'Institut Municipal d'Hisenda és un organisme autònom local. La Carta Municipal de Barcelona (Llei 22/1998) preveu aquestes formes organitzatives.",
        unitIds: ["bcn-t3"],
      },
      // Q9
      {
        id: "q-2023-09",
        type: "single",
        prompt:
          "Com s'inicien els procediments d'ofici, d'acord amb la Llei 39/2015, d'1 d'octubre, del procediment administratiu comú de les administracions públiques?",
        options: [
          { id: "q-2023-09-a", text: "Per iniciativa de l'interessat/ada.", isCorrect: false },
          { id: "q-2023-09-b", text: "Per iniciativa de les persones afectades en el procediment.", isCorrect: false },
          { id: "q-2023-09-c", text: "A petició raonada de l'interessat/ada.", isCorrect: false },
          { id: "q-2023-09-d", text: "Per acord de l'òrgan competent.", isCorrect: true },
        ],
        explanation:
          "L'art. 58 Llei 39/2015 estableix que els procediments s'iniciaran d'ofici «per acord de l'òrgan competent, bé per pròpia iniciativa o com a conseqüència d'ordre superior, a petició raonada d'altres òrgans o per denúncia». La iniciativa de l'interessat origina un procediment a instància de part, no d'ofici.",
        unitIds: ["bcn-t4"],
      },
      // Q10
      {
        id: "q-2023-10",
        type: "single",
        prompt:
          "En quin termini s'ha de requerir a la persona interessada que repari la falta o adjunti els documents preceptius, si la sol·licitud d'iniciació no reuneix els requisits exigits per la legislació específica aplicable?",
        options: [
          { id: "q-2023-10-a", text: "7 dies.", isCorrect: false },
          { id: "q-2023-10-b", text: "10 dies.", isCorrect: true },
          { id: "q-2023-10-c", text: "15 dies.", isCorrect: false },
          { id: "q-2023-10-d", text: "20 dies.", isCorrect: false },
        ],
        explanation:
          "L'art. 68.1 Llei 39/2015 disposa que si la sol·licitud no reuneix els requisits, l'Administració ha de requerir la persona interessada perquè, en un termini de deu dies, esmeni la falta o adjunti els documents preceptius, amb indicació que, si no ho fa, es tindrà per desistida la seva petició.",
        unitIds: ["bcn-t4"],
      },
      // Q11
      {
        id: "q-2023-11",
        type: "single",
        prompt:
          "D'acord amb l'article 39.1 de la Llei 39/2015, d'1 d'octubre, del procediment administratiu comú de les administracions públiques, des de quan es presumeixen vàlids i produeixen efectes els actes de les administracions públiques subjectes al dret administratiu?",
        options: [
          { id: "q-2023-11-a", text: "Des de la data de la petició de la persona interessada a l'Administració Pública.", isCorrect: false },
          { id: "q-2023-11-b", text: "Des de la data de l'entrada de la petició de la persona interessada en el registre electrònic de l'Administració Pública.", isCorrect: false },
          { id: "q-2023-11-c", text: "Des de la data en què es dictin, llevat que aquests disposin una altra cosa.", isCorrect: true },
          { id: "q-2023-11-d", text: "Des del dia següent a la data en què es dictin.", isCorrect: false },
        ],
        explanation:
          "L'art. 39.1 Llei 39/2015 estableix: «Els actes de les Administracions Públiques subjectes al Dret Administratiu es presumiran vàlids i produiran efectes des de la data en què es dictin, llevat que establissin una altra cosa.» La producció d'efectes pot ser diferida, però la presumpció de validesa és des de la data de dictat.",
        unitIds: ["bcn-t5"],
      },
      // Q12
      {
        id: "q-2023-12",
        type: "single",
        prompt:
          "Quin recurs poden interposar les persones interessades contra les resolucions i els actes de tràmit, si aquests últims decideixen directament o indirectament el fons de l'afer, determinen la impossibilitat de continuar el procediment, produeixen indefensió o perjudici irreparable a drets i interessos legítims?",
        options: [
          { id: "q-2023-12-a", text: "El recurs extraordinari d'alçada.", isCorrect: false },
          { id: "q-2023-12-b", text: "El recurs d'alçada i potestatiu de reposició.", isCorrect: true },
          { id: "q-2023-12-c", text: "El recurs de extraordinari de reposició.", isCorrect: false },
          { id: "q-2023-12-d", text: "El recurs extraordinari de revisió.", isCorrect: false },
        ],
        explanation:
          "L'art. 112.1 Llei 39/2015 disposa que contra les resolucions i els actes de tràmit que reuneixin les condicions descrites es podran interposar el recurs d'alçada i el potestatiu de reposició. El recurs extraordinari de revisió (art. 125) s'interposa contra actes ferms en via administrativa i en supòsits molt concrets.",
        unitIds: ["bcn-t5"],
      },
      // Q13
      {
        id: "q-2023-13",
        type: "single",
        prompt: "Què és l'impost sobre béns immobles (IBI)?",
        options: [
          { id: "q-2023-13-a", text: "És un tribut directe que grava el valor dels béns immobles.", isCorrect: true },
          { id: "q-2023-13-b", text: "És un tribut indirecte que grava el valor dels béns immobles.", isCorrect: false },
          { id: "q-2023-13-c", text: "És una contribució especial que grava el valor dels béns immobles.", isCorrect: false },
          { id: "q-2023-13-d", text: "No és un tribut.", isCorrect: false },
        ],
        explanation:
          "L'IBI és un tribut directe perquè recau directament sobre el titular del bé, sense possibilitat de traslladar la càrrega tributària a tercers. Grava el valor cadastral dels béns immobles (rústics, urbans i de característiques especials). Es regula als arts. 60-77 del Text refós de la Llei reguladora de les hisendes locals (TRLRHL, RDLeg 2/2004).",
        unitIds: ["bcn-t6"],
      },
      // Q14
      {
        id: "q-2023-14",
        type: "single",
        prompt: "Quina afirmació és CORRECTA en relació a l'impost sobre els vehicles de tracció mecànica (IVTM)?",
        options: [
          { id: "q-2023-14-a", text: "És d'exigència potestativa per als ajuntaments.", isCorrect: false },
          { id: "q-2023-14-b", text: "Es preveu a la normativa com a una contribució especial.", isCorrect: false },
          { id: "q-2023-14-c", text: "És d'exigència obligatòria per als ajuntaments.", isCorrect: true },
          { id: "q-2023-14-d", text: "És un impost de tipus ecològic.", isCorrect: false },
        ],
        explanation:
          "L'IVTM és un impost municipal d'exigència obligatòria per a tots els ajuntaments (art. 92 TRLRHL). Juntament amb l'IBI i l'IAE, forma el nucli d'impostos locals obligatoris. L'ICIO i l'Impost sobre l'Increment de Valor dels Terrenys de Naturalesa Urbana (plusvàlua) són d'exigència potestativa.",
        unitIds: ["bcn-t6"],
      },
      // Q15
      {
        id: "q-2023-15",
        type: "single",
        prompt: "Per la celebració dels matrimonis en forma civil, l'Ajuntament pot:",
        options: [
          { id: "q-2023-15-a", text: "Establir un impost.", isCorrect: false },
          { id: "q-2023-15-b", text: "Establir una contribució especial.", isCorrect: false },
          { id: "q-2023-15-c", text: "Establir una taxa.", isCorrect: true },
          { id: "q-2023-15-d", text: "Establir un preu públic.", isCorrect: false },
        ],
        explanation:
          "Les taxes municipals es poden establir per la prestació de serveis o la realització d'activitats que beneficiïn o afectin de manera particular els subjectes passius. La celebració de matrimonis civils és un servei municipal de sol·licitud voluntària però de recepció individualitzable, que habilita per cobrar una taxa (art. 20 TRLRHL), no un impost ni una contribució especial.",
        unitIds: ["bcn-t6"],
      },
      // Q16
      {
        id: "q-2023-16",
        type: "single",
        prompt:
          "D'acord amb la Llei 38/2003, de 17 de novembre, general de subvencions, quines subvencions poden concedir-se de forma directa, entre d'altres?",
        options: [
          { id: "q-2023-16-a", text: "Les que constin previstes nominativament en els pressupostos de les entitats locals.", isCorrect: true },
          { id: "q-2023-16-b", text: "Les que hagin estat rebutjades en convocatòries obertes anteriors, per manca de pressupost.", isCorrect: false },
          { id: "q-2023-16-c", text: "Les de concurrència competitiva.", isCorrect: false },
          { id: "q-2023-16-d", text: "Les garantides mitjançant dipòsit, fiança o aval.", isCorrect: false },
        ],
        explanation:
          "L'art. 22.2 Llei 38/2003 permet la concessió directa de subvencions en tres supòsits: (a) quan constin previstes nominativament en els pressupostos; (b) quan per raons d'interès públic, social, econòmic o humanitari no sigui possible la convocatòria pública; i (c) quan ho prevegi expressament la normativa reguladora de la subvenció. La concurrència competitiva és la regla general, no l'excepció.",
        unitIds: ["bcn-t7"],
      },
      // Q17
      {
        id: "q-2023-17",
        type: "single",
        prompt:
          "L'article 69 de la Llei 39/2015 del procediment administratiu comú de les administracions públiques, preveu en relació a la declaració responsable que:",
        options: [
          { id: "q-2023-17-a", text: "Les administracions podran requerir en qualsevol moment que s'aporti la documentació que acrediti el compliment dels requisits establerts en la normativa vigent per obtenir el reconeixement d'un dret o facultat o per al seu exercici i la persona interessada haurà aportar-la.", isCorrect: true },
          { id: "q-2023-17-b", text: "Les administracions hauran de requerir periòdicament que s'aporti la documentació que acrediti el manteniment dels requisits establerts en la normativa vigent per obtenir el reconeixement d'un dret o facultat o per al seu exercici i la persona interessada haurà aportar-la.", isCorrect: false },
          { id: "q-2023-17-c", text: "Les administracions hauran de requerir periòdicament que s'aporti una nova declaració que acrediti el manteniment dels requisits establerts en la normativa vigent per obtenir el reconeixement d'un dret o facultat o per al seu exercici.", isCorrect: false },
          { id: "q-2023-17-d", text: "Les administracions podran requerir en qualsevol moment que s'aporti una nova declaració que acrediti el manteniment dels requisits establerts en la normativa vigent per obtenir el reconeixement d'un dret o facultat o per al seu exercici.", isCorrect: false },
        ],
        explanation:
          "L'art. 69.4 Llei 39/2015 estableix que les Administracions «podran» (no «hauran de») requerir «en qualsevol moment» (no periòdicament) que s'aporti la «documentació» (no una nova declaració) que acrediti el compliment dels requisits. La clau és la tríada: facultatiu («podran»), en qualsevol moment i demanant documentació acreditativa.",
        unitIds: ["bcn-t7"],
      },
      // Q18
      {
        id: "q-2023-18",
        type: "single",
        prompt:
          "Per assolir l'objectiu general del III Pla d'igualtat d'oportunitats entre dones i homes de l'Ajuntament de Barcelona es plantegen 7 àmbits d'intervenció. Indiqueu quin és un d'aquests àmbits:",
        options: [
          { id: "q-2023-18-a", text: "Registre retributiu i auditoria retributiva.", isCorrect: false },
          { id: "q-2023-18-b", text: "Representativitat de gènere.", isCorrect: false },
          { id: "q-2023-18-c", text: "Comunicació, llenguatge i imatge corporativa.", isCorrect: true },
          { id: "q-2023-18-d", text: "Promoció professional.", isCorrect: false },
        ],
        explanation:
          "El III Pla d'Igualtat d'Oportunitats entre dones i homes de l'Ajuntament de Barcelona estructura la seva intervenció en 7 àmbits, entre els quals s'inclou «Comunicació, llenguatge i imatge corporativa», orientat a promoure un ús no sexista del llenguatge i de la imatge en les comunicacions internes i externes de l'organització municipal.",
        unitIds: ["bcn-t8"],
      },
      // Q19
      {
        id: "q-2023-19",
        type: "single",
        prompt:
          "Segons l'article 3 de la Llei 4/2023, de 28 de febrer, per a la igualtat real i efectiva de les persones trans i per a la garantia dels drets de les persones LGTBI, com es defineix l'expressió de gènere?",
        options: [
          { id: "q-2023-19-a", text: "L'atracció física, sexual o efectiva cap a una persona.", isCorrect: false },
          { id: "q-2023-19-b", text: "La vivència interna o individual del sexe tal i com cada persona la sent i auto defineix, aquesta pot o no correspondre amb el sexe assignat en néixer.", isCorrect: false },
          { id: "q-2023-19-c", text: "La condició d'aquelles persones nascudes amb unes característiques biològiques, anatòmiques o fisiològiques, una anatomia sexual, uns òrgans reproductius o un patró cromosòmic que no es corresponen amb les nocions socialment establertes dels cossos masculins o femenins.", isCorrect: false },
          { id: "q-2023-19-d", text: "La manifestació que cada persona fa de la seva identitat sexual.", isCorrect: true },
        ],
        explanation:
          "L'art. 3 Llei 4/2023 distingeix: orientació sexual (opció A, atracció cap a altres persones), identitat de gènere (opció B, vivència interna del sexe), condició intersexual (opció C, característiques biològiques no normatives) i expressió de gènere (opció D, manifestació externa de la identitat de cadascú a través de la roba, el comportament o altres elements). La resposta correcta és la D.",
        unitIds: ["bcn-t8"],
      },
      // Q20
      {
        id: "q-2023-20",
        type: "single",
        prompt:
          "D'acord amb la Llei orgànica 3/2018, de 5 de desembre, de protecció de dades personals i garantia dels drets digitals, el tractament de les dades personals d'un/a menor d'edat únicament es pot fonamentar en el seu consentiment:",
        options: [
          { id: "q-2023-20-a", text: "Quan sigui major de catorze anys.", isCorrect: true },
          { id: "q-2023-20-b", text: "Quan sigui major de dotze anys.", isCorrect: false },
          { id: "q-2023-20-c", text: "Quan sigui major de tretze anys.", isCorrect: false },
          { id: "q-2023-20-d", text: "Quan sigui major de disset anys.", isCorrect: false },
        ],
        explanation:
          "L'art. 7 LOPDGDD (LO 3/2018) estableix que el tractament de dades d'un menor únicament es pot basar en el seu consentiment quan sigui major de catorze anys. Per sota d'aquesta edat, cal el consentiment del titular de la pàtria potestat o tutela. Espanya va fixar aquest llindar en 14 anys, en exercici del marge que permet el RGPD europeu.",
        unitIds: ["bcn-t9"],
      },
      // Q21
      {
        id: "q-2023-21",
        type: "single",
        prompt:
          "D'acord amb la Llei de orgànica 3/2018, de 5 de desembre, de protecció de dades personals i garantia dels drets digitals, les dades han de ser:",
        options: [
          { id: "q-2023-21-a", text: "Confidencials, però no necessàriament exactes.", isCorrect: false },
          { id: "q-2023-21-b", text: "Exactes i, si fos necessari, actualitzades.", isCorrect: true },
          { id: "q-2023-21-c", text: "Actualitzades, però poden ser inexactes si han estat obtingudes d'un registre privat per la persona responsable del tractament de dades.", isCorrect: false },
          { id: "q-2023-21-d", text: "En tot cas comprovades per les autoritats administratives.", isCorrect: false },
        ],
        explanation:
          "El principi d'exactitud, recollit a l'art. 5.1.d del RGPD i incorporat a la LOPDGDD, exigeix que les dades personals siguin exactes i, si fos necessari, actualitzades. S'han de prendre mesures raonables per suprimir o rectificar sense dilació les dades inexactes. Aquest principi s'aplica independentment de la font d'origen de les dades.",
        unitIds: ["bcn-t9"],
      },
      // Q22
      {
        id: "q-2023-22",
        type: "single",
        prompt:
          "Quin dels següents drets individuals exercits col·lectivament és reconegut per l'article 15 del text refós de l'Estatut bàsic de l'empleat públic (TREBEP)?",
        options: [
          { id: "q-2023-22-a", text: "Dret a la llibertat d'expressió dels empleats/ades públics/públiques.", isCorrect: false },
          { id: "q-2023-22-b", text: "Dret a la negociació col·lectiva dels empleats/ades públics/públiques.", isCorrect: true },
          { id: "q-2023-22-c", text: "Dret a la formació contínua dels empleats/ades públics/públiques.", isCorrect: false },
          { id: "q-2023-22-d", text: "Dret a la protecció de dades personals dels empleats/ades públics/públiques.", isCorrect: false },
        ],
        explanation:
          "L'art. 15 TREBEP recull els drets individuals exercits col·lectivament: llibertat sindical, negociació col·lectiva, adopció de mesures de conflicte col·lectiu, vaga i reunió. La negociació col·lectiva (art. 15.d) és expressament un d'aquests drets. La formació contínua i la protecció de dades figuren entre els drets individuals (art. 14 TREBEP).",
        unitIds: ["bcn-t10"],
      },
      // Q23
      {
        id: "q-2023-23",
        type: "single",
        prompt:
          "Qui NO queda subjecte al règim disciplinari del TREBEP i a les normes que les lleis de funció pública dictin en desenvolupament d'aquest Estatut?",
        options: [
          { id: "q-2023-23-a", text: "El personal laboral.", isCorrect: false },
          { id: "q-2023-23-b", text: "El personal funcionari.", isCorrect: false },
          { id: "q-2023-23-c", text: "El personal eventual.", isCorrect: false },
          { id: "q-2023-23-d", text: "El personal becari.", isCorrect: true },
        ],
        explanation:
          "El TREBEP (art. 2) s'aplica al personal funcionari de carrera i interí, al personal laboral i al personal eventual de les administracions públiques. Els becaris no mantenen una relació d'ocupació pública sinó una relació de formació, de manera que no queden subjectes al règim disciplinari del TREBEP ni a les seves lleis de desplegament.",
        unitIds: ["bcn-t10"],
      },
      // Q24
      {
        id: "q-2023-24",
        type: "single",
        prompt:
          "En què consisteix la modalitat de carrera horitzontal en la carrera professional del personal funcionari de carrera?",
        options: [
          { id: "q-2023-24-a", text: "La progressió de grau, categoria, esglaó o altres conceptes anàlegs, sense necessitat de canviar de lloc de treball i de conformitat amb el que estableix la normativa.", isCorrect: true },
          { id: "q-2023-24-b", text: "L'ascens en l'estructura de llocs de treball pels procediments de provisió establerts legalment.", isCorrect: false },
          { id: "q-2023-24-c", text: "L'ascens des d'un cos o escala d'un subgrup, o grup de classificació professional en el supòsit que aquest no tingui subgrup, a un altre de superior.", isCorrect: false },
          { id: "q-2023-24-d", text: "L'accés a cossos o escales del mateix subgrup professional.", isCorrect: false },
        ],
        explanation:
          "L'art. 17 TREBEP defineix la carrera horitzontal com la progressió de grau, categoria o escala sense necessitat de canviar de lloc de treball. La carrera vertical (B) implica l'ascens a llocs superiors; la promoció interna vertical (C) suposa pujar a un subgrup o grup superior, i la promoció interna horitzontal (D) és l'accés a cossos del mateix subgrup.",
        unitIds: ["bcn-t11"],
      },
      // Q25
      {
        id: "q-2023-25",
        type: "single",
        prompt:
          "Quin dels següents supòsits habilita per al nomenament de personal funcionari interí, d'acord amb l'article 10 del TREBEP?",
        options: [
          { id: "q-2023-25-a", text: "L'execució de programes de caràcter temporal, que no podran tenir una durada superior a 2 anys, ampliables fins a 12 mesos més per les lleis de funció pública que es dictin en desenvolupament del TREBEP.", isCorrect: false },
          { id: "q-2023-25-b", text: "La substitució transitòria de les persones titulars, durant un termini màxim de 6 mesos.", isCorrect: false },
          { id: "q-2023-25-c", text: "L'excés o acumulació de tasques per termini màxim de 9 mesos, dintre d'un període de 18 mesos.", isCorrect: true },
          { id: "q-2023-25-d", text: "Totes les respostes anteriors són correctes.", isCorrect: false },
        ],
        explanation:
          "L'art. 10.1 TREBEP preveu l'excés o acumulació de tasques com a supòsit habilitant per al nomenament de funcionaris interins. Les opcions A i B contenen especificacions incorrectes: els programes temporals poden durar fins a 3 anys (no 2), i la substitució transitòria no té un límit màxim fix de 6 mesos fixat al TREBEP. L'opció D queda descartada perquè A i B són incorrectes.",
        unitIds: ["bcn-t11"],
      },
      // Q26
      {
        id: "q-2023-26",
        type: "single",
        prompt:
          "Amb quin dels certificats electrònics següents pot fer gestions la ciutadania amb l'administració de l'Ajuntament de Barcelona i assegurar la integritat i la confidencialitat de les dades que es trameten?",
        options: [
          { id: "q-2023-26-a", text: "dniCAT.", isCorrect: false },
          { id: "q-2023-26-b", text: "idCAT.", isCorrect: true },
          { id: "q-2023-26-c", text: "representatsCAT.", isCorrect: false },
          { id: "q-2023-26-d", text: "apodeCAT.", isCorrect: false },
        ],
        explanation:
          "L'idCAT és el certificat digital emès per l'Agència Catalana de Certificació (CATCert) que permet a la ciutadania identificar-se i fer tràmits electrònics amb l'Ajuntament de Barcelona i la resta d'administracions catalanes, garantint la integritat i la confidencialitat de les dades. El «dniCAT» no és un certificat reconegut; «representatsCAT» i «apodeCAT» fan referència a la representació/apoderament, no a la identitat personal.",
        unitIds: ["bcn-t12"],
      },
      // Q27
      {
        id: "q-2023-27",
        type: "single",
        prompt:
          "Què garanteix l'Arxiu electrònic de l'Ajuntament de Barcelona segons el Model de gestió de documents electrònics de l'Ajuntament de Barcelona?",
        options: [
          { id: "q-2023-27-a", text: "La conversió automàtica dels documents electrònics en audiovisuals.", isCorrect: false },
          { id: "q-2023-27-b", text: "La perdurabilitat dels documents mitjançant còpies en paper.", isCorrect: false },
          { id: "q-2023-27-c", text: "L'accés públic i il·limitat a tots els documents i expedients electrònics, sense restriccions.", isCorrect: false },
          { id: "q-2023-27-d", text: "La integritat, autenticitat, confidencialitat, qualitat, protecció, accés, disponibilitat i conservació de la documentació.", isCorrect: true },
        ],
        explanation:
          "El Model de Gestió de Documents Electrònics de l'Ajuntament de Barcelona estableix que l'Arxiu electrònic ha de garantir un conjunt de propietats essencials: integritat (el document no ha estat alterat), autenticitat (és el que diu ser), confidencialitat (accés restringit als autoritzats), qualitat, protecció, accés, disponibilitat i conservació al llarg del temps.",
        unitIds: ["bcn-t12"],
      },
      // Q28
      {
        id: "q-2023-28",
        type: "single",
        prompt: "Què és \"Barcelona a la butxaca\"?",
        options: [
          { id: "q-2023-28-a", text: "Una aplicació mòbil de l'Ajuntament de Barcelona que ofereix els principals serveis municipals per a la ciutadania en un sol punt d'accés.", isCorrect: true },
          { id: "q-2023-28-b", text: "Una oficina d'atenció presencial especialitzada en informació cultural de la ciutat.", isCorrect: false },
          { id: "q-2023-28-c", text: "Un terminal d'autoservei electrònic, ubicat en diferents equipaments, per gestionar de forma presencial els tràmits municipals més sol·licitats.", isCorrect: false },
          { id: "q-2023-28-d", text: "Un canal de comunicació telefònic de l'Ajuntament de Barcelona amb la ciutadania.", isCorrect: false },
        ],
        explanation:
          "«Barcelona a la butxaca» és l'aplicació mòbil oficial de l'Ajuntament de Barcelona que centralitza els principals serveis municipals (tràmits, notícies, incidències, transport, etc.) en un sol punt d'accés des del telèfon mòbil. Els quioscos d'autoservei (opció C) i el telèfon 010 (opció D) són canals diferenciats.",
        unitIds: ["bcn-t14"],
      },
      // Q29
      {
        id: "q-2023-29",
        type: "single",
        prompt: "Quina afirmació és CORRECTA en relació al telèfon 010?",
        options: [
          { id: "q-2023-29-a", text: "És un servei d'informació municipal que atén telefònicament tots els dies de l'any, durant les 24 hores.", isCorrect: false },
          { id: "q-2023-29-b", text: "És un servei d'informació municipal i general sobre equipaments, agenda d'actes i serveis dins de l'àmbit metropolità.", isCorrect: true },
          { id: "q-2023-29-c", text: "No permet fer suggeriments i reclamacions, ni presentar queixes.", isCorrect: false },
          { id: "q-2023-29-d", text: "Té un cost per les persones usuàries, si es truca des de l'Àrea Metropolitana.", isCorrect: false },
        ],
        explanation:
          "El 010 és el servei telefònic d'informació de l'Ajuntament de Barcelona que proporciona informació municipal i general sobre equipaments, agenda d'actes i serveis de l'àmbit metropolità. No opera les 24 hores (opció A incorrecta), sí admet queixes i suggeriments (opció C incorrecta) i és gratuït des de l'Àrea Metropolitana (opció D incorrecta).",
        unitIds: ["bcn-t14"],
      },
      // Q30
      {
        id: "q-2023-30",
        type: "single",
        prompt:
          "Quin dels següents canals és un canal de comunicació en línia, de l'Ajuntament de Barcelona amb la ciutadania?",
        options: [
          { id: "q-2023-30-a", text: "Els quioscos d'autoservei.", isCorrect: false },
          { id: "q-2023-30-b", text: "El telèfon 010.", isCorrect: false },
          { id: "q-2023-30-c", text: "L'Oficina Virtual de tràmits.", isCorrect: true },
          { id: "q-2023-30-d", text: "Les Oficines d'Atenció al Ciutadà.", isCorrect: false },
        ],
        explanation:
          "L'Oficina Virtual de Tràmits (OVT) és el canal en línia (web) de l'Ajuntament de Barcelona per realitzar gestions i tràmits sense necessitat de desplaçament. Els quioscos d'autoservei i les Oficines d'Atenció al Ciutadà (OAC) són canals presencials, i el telèfon 010 és un canal telefònic.",
        unitIds: ["bcn-t14"],
      },
      // Q31
      {
        id: "q-2023-31",
        type: "single",
        prompt: "Quina afirmació és CORRECTA en relació a la Festa tradicional de Sant Medir?",
        options: [
          { id: "q-2023-31-a", text: "Es celebra amb motiu de la diada en honor de Sant Antoni Abat, patró dels animals domèstics.", isCorrect: false },
          { id: "q-2023-31-b", text: "És coneguda principalment per les tones de caramels i llaminadures que es llancen al públic des de cavalls, carrosses i camions.", isCorrect: true },
          { id: "q-2023-31-c", text: "Es celebra el 3 de maig.", isCorrect: false },
          { id: "q-2023-31-d", text: "Es celebra amb motiu de la festivitat del Sant Patró dels herbolaris i dels apicultors.", isCorrect: false },
        ],
        explanation:
          "La festa de Sant Medir es celebra el 3 de març al barri de Gràcia de Barcelona i és famosa per les tones de caramels i llaminadures que les colles llancem al públic des de cavalls, carrosses i camions. Sant Antoni Abat (opció A) és una festa diferent que es celebra el 17 de gener. Sant Medir és el patró dels pagesos i dels hortelans, no específicament dels herbolaris i apicultors (opció D).",
        unitIds: ["bcn-t15"],
      },
      // Q32
      {
        id: "q-2023-32",
        type: "single",
        prompt:
          "Quina biblioteca de la ciutat de Barcelona, va guanyar l'any 2023 el Premi \"Millor Biblioteca Pública del 2023\", que entrega la Federació Internacional d'Associacions e Institucions Bibliotecàries (IFLA) i Systematic?",
        options: [
          { id: "q-2023-32-a", text: "Biblioteca Nacional de Catalunya.", isCorrect: false },
          { id: "q-2023-32-b", text: "Biblioteca Rius i Taulet.", isCorrect: false },
          { id: "q-2023-32-c", text: "Biblioteca Santiago Rusiñol.", isCorrect: false },
          { id: "q-2023-32-d", text: "Biblioteca Gabriel García Márquez.", isCorrect: true },
        ],
        explanation:
          "La Biblioteca Gabriel García Márquez, ubicada al districte 22@ de Barcelona (barri del Poblenou) i inaugurada el 2022, va guanyar el premi IFLA/Systematic Public Library of the Year 2023 gràcies al seu disseny innovador, la seva integració en la comunitat i els seus serveis a la ciutadania. La Biblioteca Nacional de Catalunya és un equipament de la Generalitat, no municipal.",
        unitIds: ["bcn-t15"],
      },
      // Q33
      {
        id: "q-2023-33",
        type: "single",
        prompt: "Quin va ser el primer edifici construït a Barcelona amb la finalitat de ser un museu públic?",
        options: [
          { id: "q-2023-33-a", text: "El Museu Martorell.", isCorrect: true },
          { id: "q-2023-33-b", text: "El Museu del perfum.", isCorrect: false },
          { id: "q-2023-33-c", text: "El Museu d'Arts Aplicades.", isCorrect: false },
          { id: "q-2023-33-d", text: "El Museu de la Música.", isCorrect: false },
        ],
        explanation:
          "El Museu Martorell, inaugurat el 1882 al Parc de la Ciutadella, va ser el primer edifici construït específicament per acollir un museu públic a Barcelona. Va ser fundat gràcies a la donació del naturalista Francesc Martorell i Peña i inicialment va acollir col·leccions de ciències naturals, arqueologia i numismàtica.",
        unitIds: ["bcn-t15"],
      },
      // Q34
      {
        id: "q-2023-34",
        type: "single",
        prompt:
          "Què entenem com a «equip de treball» segons la Llei 31/1995, de 8 de novembre, de prevenció de riscos laborals?",
        options: [
          { id: "q-2023-34-a", text: "El conjunt de les característiques constructives del centre de treball on es desenvolupa la tasca a realitzar pels treballadors/ores.", isCorrect: false },
          { id: "q-2023-34-b", text: "El vestuari especial que fa servir el/la treballador/a, si fa falta, per a desenvolupar una tasca determinada.", isCorrect: false },
          { id: "q-2023-34-c", text: "El conjunt de treballadors/ores als quals s'encarrega fer una determinada tasca en una unitat productiva de l'empresa.", isCorrect: false },
          { id: "q-2023-34-d", text: "Qualsevol màquina, aparell, instrument o instal·lació utilitzada en el treball.", isCorrect: true },
        ],
        explanation:
          "L'art. 4.6 Llei 31/1995 defineix «equip de treball» com «qualsevol màquina, aparell, instrument o instal·lació utilitzada en el treball». El vestuari de protecció s'anomena «equip de protecció individual» (EPI). Les característiques constructives del centre es refereixen al «lloc de treball» (art. 4.7).",
        unitIds: ["bcn-t16"],
      },
      // Q35
      {
        id: "q-2023-35",
        type: "single",
        prompt: "Quina és una competència del delegat/ada de prevenció?",
        options: [
          { id: "q-2023-35-a", text: "Representar a l'empresa davant de la Inspecció de Treball.", isCorrect: false },
          { id: "q-2023-35-b", text: "Fer l'avaluació de riscos del centre de treball.", isCorrect: false },
          { id: "q-2023-35-c", text: "Exercir una tasca de vigilància i control sobre el compliment de la normativa de prevenció de riscos laborals.", isCorrect: true },
          { id: "q-2023-35-d", text: "Sancionar als treballadors/ores que no respectin les normes en prevenció de riscos laborals.", isCorrect: false },
        ],
        explanation:
          "L'art. 36.2 Llei 31/1995 atribueix als delegats de prevenció, entre d'altres, «exercir una tasca de vigilància i control sobre el compliment de la normativa de prevenció de riscos laborals». Representar l'empresa davant la Inspecció (A) correspon a l'empresari/ària. L'avaluació de riscos (B) és obligació de l'empresari/ària. La potestat sancionadora (D) correspon a l'autoritat laboral.",
        unitIds: ["bcn-t16"],
      },
      // Q36
      {
        id: "q-2023-36",
        type: "single",
        prompt: "En Word, què passa si se selecciona un text i es prem la tecla \"Supr\"?",
        options: [
          { id: "q-2023-36-a", text: "Es desa el document.", isCorrect: false },
          { id: "q-2023-36-b", text: "S'obre un document nou.", isCorrect: false },
          { id: "q-2023-36-c", text: "S'elimina el text seleccionat.", isCorrect: true },
          { id: "q-2023-36-d", text: "Es tanca el programa.", isCorrect: false },
        ],
        explanation:
          "En Microsoft Word (i en qualsevol editor de text), prémer la tecla «Supr» (Delete) quan hi ha text seleccionat elimina el text seleccionat. Per desar s'utilitza Ctrl+G, per obrir un document nou Ctrl+U i per tancar el programa Alt+F4.",
        unitIds: ["bcn-t17"],
      },
      // Q37
      {
        id: "q-2023-37",
        type: "single",
        prompt: "En Word, què és una \"Capçalera\"?",
        options: [
          { id: "q-2023-37-a", text: "Una nota al peu de la pàgina.", isCorrect: false },
          { id: "q-2023-37-b", text: "El text que apareix al principi de cada pàgina al marge superior.", isCorrect: true },
          { id: "q-2023-37-c", text: "Un gràfic inserit en el document.", isCorrect: false },
          { id: "q-2023-37-d", text: "Una referència creuada.", isCorrect: false },
        ],
        explanation:
          "La capçalera (header) en Word és la zona del marge superior de la pàgina on es pot inserir text, números de pàgina, logotips, etc. que es repetiran a totes les pàgines. El peu de pàgina (footer) és l'equivalent a la part inferior. No s'ha de confondre amb les notes al peu, que van vinculades a un punt concret del text.",
        unitIds: ["bcn-t17"],
      },
      // Q38
      {
        id: "q-2023-38",
        type: "single",
        prompt: "En Word, què passa quan s'aplica l'opció \"Justifica\" al text?",
        options: [
          { id: "q-2023-38-a", text: "El text s'alinea a l'esquerra.", isCorrect: false },
          { id: "q-2023-38-b", text: "El text s'alinea a la dreta.", isCorrect: false },
          { id: "q-2023-38-c", text: "El text es distribueix uniformement entre els marges.", isCorrect: true },
          { id: "q-2023-38-d", text: "El text se centra.", isCorrect: false },
        ],
        explanation:
          "L'opció «Justifica» (Ctrl+J en Word) distribueix el text de manera que cada línia ocupa exactament l'amplada entre el marge esquerre i el dret, ajustant els espais entre paraules. Alinear a l'esquerra = Ctrl+Q, a la dreta = Ctrl+D, centrar = Ctrl+T.",
        unitIds: ["bcn-t17"],
      },
      // Q39
      {
        id: "q-2023-39",
        type: "single",
        prompt:
          "En Excel, quin format de cel·la multiplica el valor de la cel·la per 100 i mostra el resultat amb un símbol percentual?",
        options: [
          { id: "q-2023-39-a", text: "Moneda.", isCorrect: false },
          { id: "q-2023-39-b", text: "Nombre.", isCorrect: false },
          { id: "q-2023-39-c", text: "Científic.", isCorrect: false },
          { id: "q-2023-39-d", text: "Percentatge.", isCorrect: true },
        ],
        explanation:
          "El format «Percentatge» en Excel multiplica el valor de la cel·la per 100 i afegeix el símbol %. Per exemple, la cel·la amb el valor 0,75 es mostrarà com «75%». El format Moneda afegeix el símbol de divisa, el format Nombre mostra dígits sense transformació i el format Científic utilitza notació exponencial.",
        unitIds: ["bcn-t19"],
      },
      // Q40
      {
        id: "q-2023-40",
        type: "single",
        prompt: "En Excel, què és una cel·la?",
        options: [
          { id: "q-2023-40-a", text: "Un arxiu d'Excel.", isCorrect: false },
          { id: "q-2023-40-b", text: "Un full de càlcul.", isCorrect: false },
          { id: "q-2023-40-c", text: "La intersecció d'una fila i una columna.", isCorrect: true },
          { id: "q-2023-40-d", text: "Un tipus de gràfic.", isCorrect: false },
        ],
        explanation:
          "Una cel·la és la unitat bàsica d'una fulla de càlcul Excel: es forma en la intersecció d'una fila (numerada) i una columna (identificada amb lletres), donant lloc a una adreça única com A1 o B3. Un arxiu d'Excel s'anomena «llibre de treball» (workbook) i pot contenir diverses fulles de càlcul.",
        unitIds: ["bcn-t19"],
      },

      // ── Preguntes de reserva (41–45) ────────────────────────────────────────────

      // Q41
      {
        id: "q-2023-41",
        type: "single",
        prompt:
          "Quina afirmació és CERTA respecte al Consell General del Poder Judicial (CGPJ) segons la Constitució Espanyola?",
        options: [
          { id: "q-2023-41-a", text: "El CGPJ està format exclusivament per jutges/jutgesses i magistrats/ades.", isCorrect: false },
          { id: "q-2023-41-b", text: "El CGPJ està integrat pel President/a del Tribunal Suprem i vint membres més.", isCorrect: true },
          { id: "q-2023-41-c", text: "El CGPJ és presidit pel President/a del Govern d'Espanya.", isCorrect: false },
          { id: "q-2023-41-d", text: "El CGPJ és un òrgan subordinat al Ministeri de Justícia.", isCorrect: false },
        ],
        explanation:
          "L'art. 122.3 CE estableix que el CGPJ «estarà integrat pel President del Tribunal Suprem, que el presidirà, i per vint membres nomenats pel Rei per un període de cinc anys». D'aquests vint membres, dotze han de ser jutges o magistrats i vuit han de ser juristes de reconeguda competència, per la qual cosa no està format exclusivament per jutges (opció A). El CGPJ no depèn del Govern ni del Ministeri de Justícia.",
        unitIds: ["bcn-t1"],
      },
      // Q42
      {
        id: "q-2023-42",
        type: "single",
        prompt: "Quina és la funció principal de la Carta Municipal de Barcelona?",
        options: [
          { id: "q-2023-42-a", text: "Regular el trànsit i el transport públic a la ciutat.", isCorrect: false },
          { id: "q-2023-42-b", text: "Establir les tarifes d'impostos municipals.", isCorrect: false },
          { id: "q-2023-42-c", text: "Definir el règim jurídic i les competències de l'Ajuntament de Barcelona.", isCorrect: true },
          { id: "q-2023-42-d", text: "Coordinar els esdeveniments culturals i esportius a la ciutat.", isCorrect: false },
        ],
        explanation:
          "La Carta Municipal de Barcelona (Llei 22/1998, de 30 de desembre) és la norma que estableix el règim especial de l'Ajuntament de Barcelona, reconeixent-ne la singularitat com a gran municipi. Defineix el seu règim jurídic, l'organització institucional i les competències específiques. No regula el trànsit (A), ni les tarifes fiscals (B), ni els esdeveniments culturals (D), que corresponen a normatives sectorials.",
        unitIds: ["bcn-t3"],
      },
      // Q43
      {
        id: "q-2023-43",
        type: "single",
        prompt:
          "Quin dels següents drets individuals està inclòs en l'article 14 del text refós de l'Estatut bàsic de l'empleat públic (TREBEP)?",
        options: [
          { id: "q-2023-43-a", text: "Dret a la inamobilitat en la condició de funcionari/ària de carrera.", isCorrect: true },
          { id: "q-2023-43-b", text: "Dret a la jubilació anticipada.", isCorrect: false },
          { id: "q-2023-43-c", text: "Dret a la reducció de jornada sense justificació.", isCorrect: false },
          { id: "q-2023-43-d", text: "Dret a la propietat intel·lectual.", isCorrect: false },
        ],
        explanation:
          "L'art. 14.a TREBEP reconeix com a dret individual del personal funcionari «la inamobilitat en la condició de funcionari/ària de carrera». Aquest és precisament el tret que distingeix el funcionariat de la resta de personal al servei de l'Administració. La jubilació anticipada, la reducció de jornada sense justificació i la propietat intel·lectual no figuren a l'art. 14 TREBEP.",
        unitIds: ["bcn-t10"],
      },
      // Q44
      {
        id: "q-2023-44",
        type: "single",
        prompt:
          "En el context de la gestió de documents electrònics de l'administració de l'Ajuntament de Barcelona, quina és la resposta INCORRECTA quant a les metadades?",
        options: [
          { id: "q-2023-44-a", text: "Són dades que defineixen i descriuen altres dades.", isCorrect: false },
          { id: "q-2023-44-b", text: "Són un conjunt d'informació no estructurada.", isCorrect: true },
          { id: "q-2023-44-c", text: "Faciliten la identificació, la descripció i la recuperació de documents electrònics.", isCorrect: false },
          { id: "q-2023-44-d", text: "Les metadades de context informen sobre els agents implicats en la creació, recepció i transmissió del document o sobre la data d'elaboració o recepció del document.", isCorrect: false },
        ],
        explanation:
          "La pregunta demana la resposta INCORRECTA. Les metadades SÍ que són dades que defineixen altres dades (A és correcta), SÍ que faciliten la identificació i recuperació de documents (C és correcta), i SÍ que les metadades de context informen sobre agents i dates (D és correcta). L'opció B és INCORRECTA perquè les metadades constitueixen informació ESTRUCTURADA, no no estructurada: segueixen esquemes i formats predefinits per permetre la seva interoperabilitat.",
        unitIds: ["bcn-t12"],
      },
      // Q45
      {
        id: "q-2023-45",
        type: "single",
        prompt: "Quina és l'extensió predeterminada per a un arxiu d'Excel?",
        options: [
          { id: "q-2023-45-a", text: ".txt", isCorrect: false },
          { id: "q-2023-45-b", text: ".xlsx", isCorrect: true },
          { id: "q-2023-45-c", text: ".docx", isCorrect: false },
          { id: "q-2023-45-d", text: ".pptx", isCorrect: false },
        ],
        explanation:
          "Des de Microsoft Office 2007, l'extensió predeterminada dels arxius Excel és .xlsx (format Open XML). El format antic era .xls. L'extensió .docx correspon a Word, .pptx a PowerPoint i .txt a fitxers de text sense format.",
        unitIds: ["bcn-t19"],
      },
    ],
  },
];
