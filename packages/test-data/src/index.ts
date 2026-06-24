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
  {
    id: "bcn-aux-adm-2024",
    type: "fixed",
    title:
      "Auxiliar Administratiu/iva — Test de coneixements del temari (Convocatòria 2024)",
    description:
      "Segon exercici de la primera prova de la convocatòria de la categoria Auxiliar Administratiu/iva (subgrup C2) de l'Ajuntament de Barcelona. 40 preguntes oficials + 5 de reserva. Data de realització: 01/03/2025.",
    saved: true,
    suggestedMinuteLimit: 55,
    rules: {
      scoring: { correctPoints: 1, penaltyPerWrong: 1 / 4, passThreshold: 0.5 },
      navigation: "free",
    },
    metadata: {
      category: "Ajuntament de Barcelona",
      subcategory: "Auxiliar Administratiu",
      year: 2024,
      tags: ["real", "2024", "temari", "oficial"],
    },
    unitIds: [
      "bcn-t1",
      "bcn-t2",
      "bcn-t3",
      "bcn-t4",
      "bcn-t5",
      "bcn-t6",
      "bcn-t7",
      "bcn-t8",
      "bcn-t9",
      "bcn-t10",
      "bcn-t11",
      "bcn-t12",
      "bcn-t13",
      "bcn-t14",
      "bcn-t15",
      "bcn-t16",
      "bcn-t17",
      "bcn-t19",
      "bcn-t20",
    ],
    questions: [
      // Q1
      {
        id: "q-2024-01",
        type: "single",
        prompt: "Quin és un dels valors superiors de l'ordenament jurídic espanyol?",
        options: [
          { id: "q-2024-01-a", text: "La igualtat.", isCorrect: true },
          { id: "q-2024-01-b", text: "La seguretat.", isCorrect: false },
          { id: "q-2024-01-c", text: "La prosperitat.", isCorrect: false },
          { id: "q-2024-01-d", text: "La riquesa.", isCorrect: false },
        ],
        explanation:
          "L'art. 1.1 CE proclama com a valors superiors de l'ordenament jurídic la llibertat, la justícia, la igualtat i el pluralisme polític. La seguretat, la prosperitat i la riquesa no hi figuren.",
        unitIds: ["bcn-t1"],
      },
      // Q2
      {
        id: "q-2024-02",
        type: "single",
        prompt: "Quin és el termini màxim de durada de la detenció preventiva?",
        options: [
          { id: "q-2024-02-a", text: "24 hores.", isCorrect: false },
          { id: "q-2024-02-b", text: "48 hores.", isCorrect: false },
          { id: "q-2024-02-c", text: "72 hores.", isCorrect: true },
          { id: "q-2024-02-d", text: "96 hores.", isCorrect: false },
        ],
        explanation:
          "L'art. 17.2 CE estableix que la detenció preventiva no pot durar més del temps estrictament necessari, i en cap cas superar les setanta-dues hores, moment en el qual el detingut ha de ser posat en llibertat o a disposició de l'autoritat judicial.",
        unitIds: ["bcn-t1"],
      },
      // Q3
      {
        id: "q-2024-03",
        type: "single",
        prompt:
          "Quin és l'òrgan superior col·legiat que dirigeix l'acció política i l'Administració de la Generalitat?",
        options: [
          { id: "q-2024-03-a", text: "El Parlament.", isCorrect: false },
          { id: "q-2024-03-b", text: "La Presidència de la Generalitat.", isCorrect: false },
          { id: "q-2024-03-c", text: "El Govern.", isCorrect: true },
          { id: "q-2024-03-d", text: "El Consell de Garanties Estatutàries.", isCorrect: false },
        ],
        explanation:
          "L'art. 68.1 EAC estableix que el Govern és l'òrgan superior col·legiat que dirigeix l'acció política i l'Administració de la Generalitat.",
        unitIds: ["bcn-t2"],
      },
      // Q4
      {
        id: "q-2024-04",
        type: "single",
        prompt:
          "Quin és l'òrgan fiscalitzador extern dels comptes, de la gestió econòmica i del control d'eficiència de la Generalitat?",
        options: [
          { id: "q-2024-04-a", text: "El Tribunal Superior de Justícia.", isCorrect: false },
          { id: "q-2024-04-b", text: "El Consell de Garanties Estatutàries.", isCorrect: false },
          { id: "q-2024-04-c", text: "El Consell de l'Audiovisual de Catalunya.", isCorrect: false },
          { id: "q-2024-04-d", text: "La Sindicatura de Comptes.", isCorrect: true },
        ],
        explanation:
          "L'art. 80 EAC estableix que la Sindicatura de Comptes és l'òrgan fiscalitzador extern dels comptes, de la gestió econòmica i del control d'eficiència de la Generalitat, dels ens locals i dels altres ens del sector públic de Catalunya.",
        unitIds: ["bcn-t2"],
      },
      // Q5
      {
        id: "q-2024-05",
        type: "single",
        prompt: "Quin és l'òrgan jurisdiccional en què culmina l'organització judicial a Catalunya?",
        options: [
          { id: "q-2024-05-a", text: "El Tribunal Constitucional.", isCorrect: false },
          { id: "q-2024-05-b", text: "El Consell de Justícia de Catalunya.", isCorrect: false },
          {
            id: "q-2024-05-c",
            text: "El Tribunal Superior de Justícia de Catalunya.",
            isCorrect: true,
          },
          { id: "q-2024-05-d", text: "El Tribunal Suprem.", isCorrect: false },
        ],
        explanation:
          "L'art. 95.1 EAC estableix que el Tribunal Superior de Justícia de Catalunya és l'òrgan jurisdiccional en el qual culmina l'organització judicial a Catalunya.",
        unitIds: ["bcn-t2"],
      },
      // Q6
      {
        id: "q-2024-06",
        type: "single",
        prompt:
          "Quin és el percentatge mínim dels recursos ordinaris del pressupost municipal que s'ha de gestionar pels districtes segons la Carta Municipal de Barcelona?",
        options: [
          { id: "q-2024-06-a", text: "10%", isCorrect: false },
          { id: "q-2024-06-b", text: "15%", isCorrect: true },
          { id: "q-2024-06-c", text: "20%", isCorrect: false },
          { id: "q-2024-06-d", text: "25%", isCorrect: false },
        ],
        explanation:
          "La Carta Municipal de Barcelona estableix que els districtes han de gestionar com a mínim el 15% dels recursos ordinaris del pressupost municipal.",
        unitIds: ["bcn-t3"],
      },
      // Q7
      {
        id: "q-2024-07",
        type: "single",
        prompt:
          "Quin és l'òrgan de màxima representació política dels ciutadans en el govern de Barcelona?",
        options: [
          { id: "q-2024-07-a", text: "El Consell Municipal.", isCorrect: true },
          { id: "q-2024-07-b", text: "Els Consells de Districte.", isCorrect: false },
          { id: "q-2024-07-c", text: "La Comissió de Govern.", isCorrect: false },
          { id: "q-2024-07-d", text: "L'Alcalde/essa.", isCorrect: false },
        ],
        explanation:
          "Segons la normativa municipal de Barcelona, el Consell Municipal és l'òrgan de màxima representació política dels ciutadans en el govern de la ciutat.",
        unitIds: ["bcn-t3"],
      },
      // Q8
      {
        id: "q-2024-08",
        type: "single",
        prompt: "Qui constitueix la Junta de Portaveus al municipi de Barcelona?",
        options: [
          { id: "q-2024-08-a", text: "Els regidors de districte.", isCorrect: false },
          {
            id: "q-2024-08-b",
            text: "Els portaveus designats per cada grup municipal.",
            isCorrect: true,
          },
          { id: "q-2024-08-c", text: "Els tinents d'alcalde.", isCorrect: false },
          { id: "q-2024-08-d", text: "Els membres de la Comissió de Govern.", isCorrect: false },
        ],
        explanation:
          "La Junta de Portaveus de l'Ajuntament de Barcelona es constitueix amb els portaveus designats per cadascun dels grups municipals presents al Consell Municipal.",
        unitIds: ["bcn-t3"],
      },
      // Q9
      {
        id: "q-2024-09",
        type: "single",
        prompt:
          "Segons la Llei 39/2015, quin és el termini general per resoldre un procediment administratiu si no s'estableix un termini específic?",
        options: [
          { id: "q-2024-09-a", text: "10 dies hàbils.", isCorrect: false },
          { id: "q-2024-09-b", text: "6 mesos.", isCorrect: false },
          { id: "q-2024-09-c", text: "3 mesos.", isCorrect: true },
          { id: "q-2024-09-d", text: "12 mesos.", isCorrect: false },
        ],
        explanation:
          "L'art. 21.3 de la Llei 39/2015 estableix que, quan la norma reguladora del procediment no fixi un termini màxim, aquest serà de tres mesos.",
        unitIds: ["bcn-t4"],
      },
      // Q10
      {
        id: "q-2024-10",
        type: "single",
        prompt:
          "Segons la llei 39/2015, en quant al còmput de terminis, sempre que aquests s'assenyalin en dies, s'entén que són dies:",
        options: [
          { id: "q-2024-10-a", text: "naturals.", isCorrect: false },
          { id: "q-2024-10-b", text: "la norma no ho especifica.", isCorrect: false },
          {
            id: "q-2024-10-c",
            text: "hàbils, que exclouen del còmput diumenges i festius.",
            isCorrect: false,
          },
          {
            id: "q-2024-10-d",
            text: "hàbils, que exclouen del còmput dissabtes, diumenges i festius.",
            isCorrect: true,
          },
        ],
        explanation:
          "L'art. 30.2 de la Llei 39/2015 estableix que, sempre que els terminis s'assenyalin en dies, s'entén que es tracta de dies hàbils, excloent-ne els dissabtes, els diumenges i els festius.",
        unitIds: ["bcn-t4"],
      },
      // Q11
      {
        id: "q-2024-11",
        type: "single",
        prompt:
          "Els actes de les administracions públiques són nuls de ple dret en el cas següent, entre d'altres (assenyala la resposta correcta):",
        options: [
          {
            id: "q-2024-11-a",
            text: "En el cas que lesionin els drets i les llibertats susceptibles d'empara constitucional.",
            isCorrect: true,
          },
          {
            id: "q-2024-11-b",
            text: "En el cas que estiguin signat per un òrgan que no compleix el criteri de paritat de gènere.",
            isCorrect: false,
          },
          {
            id: "q-2024-11-c",
            text: "En el cas que tinguin un contingut poc raonable.",
            isCorrect: false,
          },
          {
            id: "q-2024-11-d",
            text: "En el cas que siguin constitutius d'incompliment de recomanacions organitzatives de l'òrgan que els ha dictat.",
            isCorrect: false,
          },
        ],
        explanation:
          "L'art. 47.1.a) de la Llei 39/2015 estableix que els actes de les administracions públiques són nuls de ple dret quan lesionin els drets i les llibertats susceptibles d'empara constitucional.",
        unitIds: ["bcn-t5"],
      },
      // Q12
      {
        id: "q-2024-12",
        type: "single",
        prompt:
          "Els actes de les administracions públiques subjectes al dret administratiu es presumeixen vàlids i produeixen efectes, llevat que aquests disposin una altra cosa, des de el següent moment:",
        options: [
          {
            id: "q-2024-12-a",
            text: "Des de la data en que les persones interessades emetin un acusament de rebut.",
            isCorrect: false,
          },
          { id: "q-2024-12-b", text: "Des de la data en què es dictin.", isCorrect: true },
          {
            id: "q-2024-12-c",
            text: "Des de el dia en que es va iniciar l'expedient.",
            isCorrect: false,
          },
          {
            id: "q-2024-12-d",
            text: "Des de que l'acte es publica als diaris oficials.",
            isCorrect: false,
          },
        ],
        explanation:
          "L'art. 38 de la Llei 39/2015 estableix que els actes de les administracions públiques subjectes al dret administratiu es presumiran vàlids i produiran efecte des de la data en la qual es dictin.",
        unitIds: ["bcn-t5"],
      },
      // Q13
      {
        id: "q-2024-13",
        type: "single",
        prompt: "Segons l'ordenança fiscal, l'Impost sobre Vehicles de Tracció Mecànica:",
        options: [
          { id: "q-2024-13-a", text: "Grava la transmissió de vehicles.", isCorrect: false },
          {
            id: "q-2024-13-b",
            text: "Grava la titularitat dels vehicles de tracció mecànica aptes per a circular per les vies públiques, qualsevol que en sigui la classe i categoria.",
            isCorrect: true,
          },
          { id: "q-2024-13-c", text: "Grava la matriculació de vehicles.", isCorrect: false },
          {
            id: "q-2024-13-d",
            text: "Grava la circulació de vehicles per les vies de Barcelona.",
            isCorrect: false,
          },
        ],
        explanation:
          "L'IVTM és un tribut directe que grava la titularitat dels vehicles de tracció mecànica aptes per circular per les vies públiques (art. 92 TRLHL), independentment de la seva classe o categoria.",
        unitIds: ["bcn-t6"],
      },
      // Q14
      {
        id: "q-2024-14",
        type: "single",
        prompt: "Què grava l'impost sobre activitats econòmiques (IAE)?",
        options: [
          {
            id: "q-2024-14-a",
            text: "L'activitat empresarial realitzada dins d'un municipi.",
            isCorrect: true,
          },
          {
            id: "q-2024-14-b",
            text: "Els beneficis econòmics de les empreses.",
            isCorrect: false,
          },
          {
            id: "q-2024-14-c",
            text: "La possessió d'un vehicle destinat a una activitat econòmica.",
            isCorrect: false,
          },
          {
            id: "q-2024-14-d",
            text: "L'increment de valor dels terrenys urbans fruit d'activitat empresarial immobiliària.",
            isCorrect: false,
          },
        ],
        explanation:
          "L'IAE és un tribut directe, el fet imposable del qual el constitueix el mer exercici en territori nacional d'activitats empresarials, professionals o artístiques, independentment del benefici obtingut.",
        unitIds: ["bcn-t6"],
      },
      // Q15
      {
        id: "q-2024-15",
        type: "single",
        prompt: "Què són les taxes municipals?",
        options: [
          {
            id: "q-2024-15-a",
            text: "Són els tributs exigits sense contraprestació.",
            isCorrect: false,
          },
          {
            id: "q-2024-15-b",
            text: "Els tributs, el fet imposable dels quals consisteix en la utilització privativa o l'aprofitament especial del domini públic, la prestació de serveis o la realització d'activitats en règim de dret públic.",
            isCorrect: true,
          },
          {
            id: "q-2024-15-c",
            text: "Els tributs que graven el valor del terrenys, la titularitat dels vehicles i la transmissió de terrenys de naturalesa urbana.",
            isCorrect: false,
          },
          {
            id: "q-2024-15-d",
            text: "Són els tributs, el fet imposable dels quals consisteix en l'obtenció per l'obligat tributari d'un benefici o d'un augment de valor dels seus béns.",
            isCorrect: false,
          },
        ],
        explanation:
          "L'art. 2.2.a) de la Llei General Tributària defineix les taxes com els tributs el fet imposable dels quals consisteix en la utilització privativa o l'aprofitament especial del domini públic, o en la prestació de serveis o realització d'activitats en règim de dret públic.",
        unitIds: ["bcn-t6"],
      },
      // Q16
      {
        id: "q-2024-16",
        type: "single",
        prompt: "La Subvenció és un mitja de l'activitat administrativa:",
        options: [
          { id: "q-2024-16-a", text: "de Contractació.", isCorrect: false },
          { id: "q-2024-16-b", text: "de Policia.", isCorrect: false },
          { id: "q-2024-16-c", text: "Sancionadora.", isCorrect: false },
          { id: "q-2024-16-d", text: "de Foment.", isCorrect: true },
        ],
        explanation:
          "La subvenció és l'instrument paradigmàtic de l'activitat de foment de l'Administració, mitjançant el qual s'incentiva una conducta privada que es considera d'interès general, sense imposar-la coactivament.",
        unitIds: ["bcn-t7"],
      },
      // Q17
      {
        id: "q-2024-17",
        type: "single",
        prompt:
          "Segons la llei 38/2003, de 17 de novembre, General de Subvencions, quin és el termini màxim per resoldre i notificar la resolució del procediment? El termini es computarà a partir de la publicació de la corresponent convocatòria. (Assenyala la resposta correcta):",
        options: [
          {
            id: "q-2024-17-a",
            text: "No pot excedir els sis mesos, llevat que una norma amb rang de llei estableixi un termini més gran o així estigui previst a la normativa de la Unió Europea.",
            isCorrect: true,
          },
          {
            id: "q-2024-17-b",
            text: "No pot excedir els nou mesos, llevat que una norma amb rang de llei estableixi un termini més gran o així estigui previst a la normativa de la Unió Europea.",
            isCorrect: false,
          },
          {
            id: "q-2024-17-c",
            text: "No pot excedir els dotze mesos, llevat que una norma amb rang de llei estableixi un termini més gran o així estigui previst a la normativa de la Unió Europea.",
            isCorrect: false,
          },
          {
            id: "q-2024-17-d",
            text: "no pot excedir els divuit mesos, llevat que una norma amb rang de llei estableixi un termini més gran o així estigui previst a la normativa de la Unió Europea.",
            isCorrect: false,
          },
        ],
        explanation:
          "L'art. 25.4 de la Llei 38/2003 General de Subvencions estableix que el termini màxim per resoldre i notificar la resolució del procediment de concessió de subvencions no podrà excedir sis mesos, excepte que una norma amb rang de llei estableixi un termini major.",
        unitIds: ["bcn-t7"],
      },
      // Q18
      {
        id: "q-2024-18",
        type: "single",
        prompt:
          "Segons el III Pla d'igualtat d'oportunitats entre dones i homes de l'Ajuntament de Barcelona, una de les funcions de la Comissió Paritària de Seguiment del Pla d'Igualtat és:",
        options: [
          {
            id: "q-2024-18-a",
            text: "Fer propostes sobre les mesures que s'han de dur a terme en el Pla d'igualtat.",
            isCorrect: false,
          },
          {
            id: "q-2024-18-b",
            text: "Acompanyar i impulsar la implementació del Pla d'igualtat, informar i assessorar sobre la forma i/o aplicació de les mesures i vigilar-ne l'acompliment.",
            isCorrect: false,
          },
          {
            id: "q-2024-18-c",
            text: "Obtenir informació anual sobre l'evolució global dels Plans d'Igualtat.",
            isCorrect: true,
          },
          {
            id: "q-2024-18-d",
            text: "Emetre informes valoratius sobre el grau d'execució de les mesures del Pla d'igualtat i dels seus resultats, que tindran caràcter preceptiu i vinculant.",
            isCorrect: false,
          },
        ],
        explanation:
          "Segons el III Pla d'igualtat de l'Ajuntament de Barcelona, la Comissió Paritària de Seguiment té entre les seves funcions obtenir informació anual sobre l'evolució global dels Plans d'Igualtat.",
        unitIds: ["bcn-t8"],
      },
      // Q19
      {
        id: "q-2024-19",
        type: "single",
        prompt:
          "Segons l'article 3 de la Llei 4/2023, de 28 de febrer, per a la igualtat real i efectiva de les persones trans i per a la garantia dels drets de les persones LGTBI, tota actitud, conducta o discurs de rebuig cap a les persones bisexuals s'anomena:",
        options: [
          { id: "q-2024-19-a", text: "Transfòbia.", isCorrect: false },
          { id: "q-2024-19-b", text: "LGTBI-fòbia.", isCorrect: false },
          { id: "q-2024-19-c", text: "Homofòbia.", isCorrect: false },
          { id: "q-2024-19-d", text: "Bifòbia.", isCorrect: true },
        ],
        explanation:
          "L'art. 3 de la Llei 4/2023 defineix la bifòbia com tota actitud, conducta o discurs de rebuig, discriminació o violència cap a les persones bisexuals per raó de la seva orientació sexual.",
        unitIds: ["bcn-t8"],
      },
      // Q20
      {
        id: "q-2024-20",
        type: "single",
        prompt:
          "Quin principi estableix que les dades personals han de ser adequades, pertinents i limitades al que és necessari en relació amb els fins per als quals són tractades?",
        options: [
          {
            id: "q-2024-20-a",
            text: "Principi de minimització de les dades.",
            isCorrect: true,
          },
          {
            id: "q-2024-20-b",
            text: "Principi de limitació del termini de conservació.",
            isCorrect: false,
          },
          { id: "q-2024-20-c", text: "Principi d'exactitud.", isCorrect: false },
          {
            id: "q-2024-20-d",
            text: "Principi de licitud, lleialtat i transparència.",
            isCorrect: false,
          },
        ],
        explanation:
          "L'art. 5.1.c) del RGPD estableix el principi de minimització de dades: les dades personals han de ser adequades, pertinents i limitades al que és necessari en relació amb els fins per als quals es tracten.",
        unitIds: ["bcn-t9"],
      },
      // Q21
      {
        id: "q-2024-21",
        type: "single",
        prompt:
          "Són funcionaris interins els que, per raons expressament justificades de necessitat i urgència, són nomenats com a tals quan es doni la circumstància següent, entre d'altres (assenyala la resposta correcta):",
        options: [
          {
            id: "q-2024-21-a",
            text: "L'excés o l'acumulació de tasques per un termini màxim de tres mesos, dins d'un període de dotze mesos.",
            isCorrect: false,
          },
          {
            id: "q-2024-21-b",
            text: "L'existència de places vacants quan no sigui possible la seva cobertura per personal eventual o personal laboral.",
            isCorrect: false,
          },
          {
            id: "q-2024-21-c",
            text: "La substitució transitòria dels titulars, per temps estrictament necessari.",
            isCorrect: true,
          },
          {
            id: "q-2024-21-d",
            text: "L'execució de programes de caràcter temporal, que no poden tenir una durada superior a dos anys, ampliable fins a sis mesos més per les lleis de funció pública que es dictin en desplegament d'aquest Estatut.",
            isCorrect: false,
          },
        ],
        explanation:
          "L'art. 10.1 del TREBEP estableix que la substitució transitòria dels titulars és una de les circumstàncies que justifica el nomenament de funcionaris interins. L'opció A és incorrecta (el TREBEP estableix 6 mesos, no 3); la B és incorrecta (la cobertura és per funcionaris de carrera, no eventual/laboral); la D és incorrecta en la durada.",
        unitIds: ["bcn-t10"],
      },
      // Q22
      {
        id: "q-2024-22",
        type: "single",
        prompt: "Un dels drets individuals exercit col·lectivament dels empleats públics és el següent:",
        options: [
          {
            id: "q-2024-22-a",
            text: "A la llibertat d'expressió dins dels límits de l'ordenament jurídic.",
            isCorrect: false,
          },
          { id: "q-2024-22-b", text: "A la lliure associació professional.", isCorrect: false },
          {
            id: "q-2024-22-c",
            text: "A la inamovibilitat en la condició de funcionari de carrera.",
            isCorrect: false,
          },
          { id: "q-2024-22-d", text: "A la llibertat sindical.", isCorrect: true },
        ],
        explanation:
          "L'art. 15 del TREBEP estableix els drets individuals exercits col·lectivament, entre els quals figura la llibertat sindical. La inamovibilitat i la llibertat d'expressió són drets individuals; la lliure associació professional és diferent de la llibertat sindical.",
        unitIds: ["bcn-t10"],
      },
      // Q23
      {
        id: "q-2024-23",
        type: "single",
        prompt:
          "Segons el Reial decret legislatiu 5/2015, de 30 d'octubre, pel qual s'aprova el text refós de la Llei de l'Estatut bàsic de l'empleat públic, quins són alguns dels fonaments d'actuació? (assenyala la resposta correcta):",
        options: [
          {
            id: "q-2024-23-a",
            text: "Drets limitats de l'empleat públic a les vacances anuals i a la jornada laboral.",
            isCorrect: false,
          },
          {
            id: "q-2024-23-b",
            text: "Igualtat, mèrit i capacitat en l'accés i en la promoció professional.",
            isCorrect: true,
          },
          {
            id: "q-2024-23-c",
            text: "Drets limitats de l'empleat públic a la protecció en cas d'accident laboral.",
            isCorrect: false,
          },
          {
            id: "q-2024-23-d",
            text: "Desenvolupament i qualificació professional puntual dels empleats públics, fora de la jornada laboral.",
            isCorrect: false,
          },
        ],
        explanation:
          "L'art. 1.3 del TREBEP estableix com a fonaments d'actuació, entre d'altres, la igualtat, el mèrit i la capacitat en l'accés i en la promoció professional dels empleats públics.",
        unitIds: ["bcn-t10"],
      },
      // Q24
      {
        id: "q-2024-24",
        type: "single",
        prompt:
          "D'acord amb el TREBEP, quina és la descripció d'una de les modalitats de la carrera professional dels funcionaris de carrera? (Assenyala la resposta correcta):",
        options: [
          {
            id: "q-2024-24-a",
            text: "Promoció interna horitzontal, que consisteix en l'accés a cossos o escales del mateix subgrup professional.",
            isCorrect: true,
          },
          {
            id: "q-2024-24-b",
            text: "Carrera horitzontal, que consisteix en la progressió de grau, categoria, esglaó o altres conceptes anàlegs, i implica canvi de de lloc de treball.",
            isCorrect: false,
          },
          {
            id: "q-2024-24-c",
            text: "Promoció interna vertical, que consisteix en l'ascens en l'estructura de llocs de treball pels procediments de provisió.",
            isCorrect: false,
          },
          {
            id: "q-2024-24-d",
            text: "Carrera vertical que consisteix en l'ascens des d'un cos o escala d'un subgrup, o grup de classificació professional en el supòsit que aquest no tingui subgrup, a un altre de superior.",
            isCorrect: false,
          },
        ],
        explanation:
          "L'art. 18.3 del TREBEP defineix la promoció interna horitzontal com l'accés a cossos o escales del mateix subgrup professional. La carrera horitzontal (art. 17.a) NO implica canvi de lloc de treball; les altres opcions contenen errors en la definició.",
        unitIds: ["bcn-t11"],
      },
      // Q25
      {
        id: "q-2024-25",
        type: "single",
        prompt:
          "Els funcionaris de carrera, quan de temps han d'haver prestat serveis efectius en qualsevol de les administracions públiques per sol·licitar l'excedència voluntària per interès particular?",
        options: [
          {
            id: "q-2024-25-a",
            text: "Al ser funcionari de carrera no és necessari computar temps efectiu.",
            isCorrect: false,
          },
          {
            id: "q-2024-25-b",
            text: "Durant un període mínim de cinc anys immediatament anteriors.",
            isCorrect: true,
          },
          {
            id: "q-2024-25-c",
            text: "Durant un període mínim de dos anys immediatament anteriors.",
            isCorrect: false,
          },
          {
            id: "q-2024-25-d",
            text: "Durant un període mínim de dos anys ininterromputs de prestació.",
            isCorrect: false,
          },
        ],
        explanation:
          "L'art. 89.2 del TREBEP estableix que per sol·licitar l'excedència voluntària per interès particular cal haver prestat serveis efectius en qualsevol administració pública durant un període mínim de cinc anys immediatament anteriors.",
        unitIds: ["bcn-t11"],
      },
      // Q26
      {
        id: "q-2024-26",
        type: "single",
        prompt:
          "Les administracions públiques NO requereixen als interessats l'ús obligatori de signatura per:",
        options: [
          { id: "q-2024-26-a", text: "Interposar recursos.", isCorrect: false },
          { id: "q-2024-26-b", text: "Rebre notificacions electròniques.", isCorrect: true },
          { id: "q-2024-26-c", text: "Renunciar a drets.", isCorrect: false },
          {
            id: "q-2024-26-d",
            text: "Presentar declaracions responsables o comunicacions.",
            isCorrect: false,
          },
        ],
        explanation:
          "L'art. 11.2 de la Llei 39/2015 estableix l'obligatorietat de signatura per a: formular sol·licituds, interposar recursos, renunciar a drets, desistir d'accions, etc. Rebre notificacions electròniques no requereix signatura per part de l'interessat.",
        unitIds: ["bcn-t12"],
      },
      // Q27
      {
        id: "q-2024-27",
        type: "single",
        prompt:
          "Els documents electrònics s'han de conservar en un format que permeti garantir....(assenyala la resposta correcta):",
        options: [
          {
            id: "q-2024-27-a",
            text: "l'eliminació del document en el moment que indiqui la normativa.",
            isCorrect: false,
          },
          {
            id: "q-2024-27-b",
            text: "l'enviament de documentació quan necessitem disposar d'un justificant de la tramesa electrònica.",
            isCorrect: false,
          },
          {
            id: "q-2024-27-c",
            text: "l'autenticitat, la integritat i la conservació del document.",
            isCorrect: true,
          },
          {
            id: "q-2024-27-d",
            text: "la participació en la informació del document.",
            isCorrect: false,
          },
        ],
        explanation:
          "L'art. 17.2 de la Llei 39/2015 estableix que els documents electrònics s'han de conservar en formats que garanteixin l'autenticitat, la integritat i la conservació del document, i que permetin la seva consulta independentment del temps transcorregut.",
        unitIds: ["bcn-t12"],
      },
      // Q28
      {
        id: "q-2024-28",
        type: "single",
        prompt: "Quina es la diferència entre un certificat digital i una signatura electrònica?",
        options: [
          {
            id: "q-2024-28-a",
            text: "El certificat digital no permet identificar la persona i la signatura electrònica sí que ho permet.",
            isCorrect: false,
          },
          {
            id: "q-2024-28-b",
            text: "La signatura electrònica es el conjunt de dades en forma electrònica que poden ser utilitzades com a mitja d'identificació de la persona signant, mentre que el certificat electrònic es un document signat electrònicament per un prestador de serveis de certificació que verifica la signatura i conforma la identitat de la persona.",
            isCorrect: true,
          },
          {
            id: "q-2024-28-c",
            text: "El certificat electrònic únicament serveixi per a les persones jurídiques i la signatura electrònica serveix per a persones físiques.",
            isCorrect: false,
          },
          {
            id: "q-2024-28-d",
            text: "El certificat electrònic únicament serveixi per a les persones físiques i la signatura electrònica serveix per a persones jurídiques.",
            isCorrect: false,
          },
        ],
        explanation:
          "La signatura electrònica és el conjunt de dades electròniques que s'utilitzen per identificar el signant. El certificat electrònic és el document digital emès per un prestador de serveis de certificació que vincula les dades d'identitat d'una persona amb la seva clau pública, permetent verificar la signatura.",
        unitIds: ["bcn-t12"],
      },
      // Q29
      {
        id: "q-2024-29",
        type: "single",
        prompt:
          "Quin tipus de document administratiu es el certificat intern que es produeix dins les actuacions administratives i que acredita l'execució d'un tràmit, com el desglossament d'un document d'un expedient, la presa de possessió d'un funcionari, una modificació de sou, etc.",
        options: [
          { id: "q-2024-29-a", text: "Notificació.", isCorrect: false },
          { id: "q-2024-29-b", text: "Diligència.", isCorrect: true },
          { id: "q-2024-29-c", text: "Resolució.", isCorrect: false },
          { id: "q-2024-29-d", text: "Carta.", isCorrect: false },
        ],
        explanation:
          "La diligència és el document intern que acredita l'execució d'un tràmit dins les actuacions administratives, com el desglossament d'un document d'un expedient, la presa de possessió d'un funcionari o una modificació retributiva.",
        unitIds: ["bcn-t13"],
      },
      // Q30
      {
        id: "q-2024-30",
        type: "single",
        prompt:
          "D'acord la Carta de Serveis d'Atenció a la ciutadania de l'Ajuntament de Barcelona, quin dels següents NO és un canal per rebre informació i realitzar tràmits municipals?",
        options: [
          { id: "q-2024-30-a", text: "010 Telèfon d'Informació Ciutadana.", isCorrect: false },
          { id: "q-2024-30-b", text: "Gaseta Municipal.", isCorrect: true },
          { id: "q-2024-30-c", text: "Oficina Virtual de Tràmits.", isCorrect: false },
          {
            id: "q-2024-30-d",
            text: "Oficines d'Atenció a la Ciutadania (OACs).",
            isCorrect: false,
          },
        ],
        explanation:
          "La Gaseta Municipal és el butlletí oficial de l'Ajuntament on es publiquen acords i actes municipals, però no és un canal per rebre informació ni realitzar tràmits de la Carta de Serveis d'Atenció a la Ciutadania.",
        unitIds: ["bcn-t14"],
      },
      // Q31
      {
        id: "q-2024-31",
        type: "single",
        prompt: "La Seu Electrònica de l'Ajuntament de Barcelona és,",
        options: [
          {
            id: "q-2024-31-a",
            text: "Un espai virtual que té a disposició la ciutadania per accedir a la informació, els serveis i els tràmits de l'Ajuntament.",
            isCorrect: true,
          },
          {
            id: "q-2024-31-b",
            text: "Un taulell electrònic on s'emmagatzemen els actes administratius.",
            isCorrect: false,
          },
          {
            id: "q-2024-31-c",
            text: "El certificat electrònic municipal per a realitzar tràmits.",
            isCorrect: false,
          },
          {
            id: "q-2024-31-d",
            text: "Una oficina d'assistència en matèria de registres.",
            isCorrect: false,
          },
        ],
        explanation:
          "La Seu Electrònica de l'Ajuntament de Barcelona és l'espai virtual accessible des de xarxes de telecomunicacions que posa a disposició de la ciutadania la informació, els serveis i els tràmits de l'Ajuntament, amb plena validesa jurídica.",
        unitIds: ["bcn-t14"],
      },
      // Q32
      {
        id: "q-2024-32",
        type: "single",
        prompt:
          "Indica quina de les següents afirmacions es correcta pel que fa referència als museus de la ciutat de Barcelona:",
        options: [
          {
            id: "q-2024-32-a",
            text: "L'entrada als museus es gratuïta tots els diumenges.",
            isCorrect: false,
          },
          { id: "q-2024-32-b", text: "Hi ha més de 300 museus a la ciutat.", isCorrect: false },
          {
            id: "q-2024-32-c",
            text: "El Museu Picasso ocupa cinc palaus al carrer Montcada.",
            isCorrect: true,
          },
          {
            id: "q-2024-32-d",
            text: "El Museu de Historia de Barcelona (MUHBA) disposa d'una única seu a la plaça del Rei.",
            isCorrect: false,
          },
        ],
        explanation:
          "El Museu Picasso de Barcelona ocupa cinc palaus medievals al carrer Montcada: Palau Aguilar, Palau del Baró de Castellet, Palau Meca, Casa Mauri i Palau Finestres. El MUHBA té múltiples seus a la ciutat.",
        unitIds: ["bcn-t15"],
      },
      // Q33
      {
        id: "q-2024-33",
        type: "single",
        prompt: "La Biblioteca Francesca Bonnemaison (assenyala la resposta correcta):",
        options: [
          {
            id: "q-2024-33-a",
            text: "Està ubicada al districte de Sants-Montjuic.",
            isCorrect: false,
          },
          {
            id: "q-2024-33-b",
            text: "Acull un espai de referència i un fons especialitzat en la dona i els feminismes.",
            isCorrect: true,
          },
          {
            id: "q-2024-33-c",
            text: "No es una de les Biblioteques de la ciutat de Barcelona, sinó de l'àrea metropolitana.",
            isCorrect: false,
          },
          {
            id: "q-2024-33-d",
            text: "Només programa activitats per adults.",
            isCorrect: false,
          },
        ],
        explanation:
          "La Biblioteca Francesca Bonnemaison, ubicada al districte de Ciutat Vella, acull un espai de referència i un fons especialitzat en la dona i els feminismes, sent un centre de referència en documentació feminista.",
        unitIds: ["bcn-t15"],
      },
      // Q34
      {
        id: "q-2024-34",
        type: "single",
        prompt: "Quin dia de l'any podem trobar als carrers de Barcelona \"l'home dels nassos\"?",
        options: [
          { id: "q-2024-34-a", text: "El 31 de desembre.", isCorrect: true },
          { id: "q-2024-34-b", text: "El 24 de setembre.", isCorrect: false },
          { id: "q-2024-34-c", text: "El 12 de febrer.", isCorrect: false },
          { id: "q-2024-34-d", text: "El 15 d'agost.", isCorrect: false },
        ],
        explanation:
          "L'home dels nassos és un personatge del folklore català que apareix el 31 de desembre (Cap d'Any), ja que en principi té tants nassos com dies queden per acabar l'any, és a dir, cap.",
        unitIds: ["bcn-t15"],
      },
      // Q35
      {
        id: "q-2024-35",
        type: "single",
        prompt:
          "Quina afirmació és CORRECTA en relació al Comitè de Seguretat i Salut, segons la Llei 31/1995, de 8 de novembre, de prevenció de riscos laborals?",
        options: [
          {
            id: "q-2024-35-a",
            text: "Es constituirà en totes les empreses o centres de treball que comptin amb més de 100 treballadors/ores.",
            isCorrect: false,
          },
          {
            id: "q-2024-35-b",
            text: "Es constituirà en totes les empreses que pertanyin al sector de la construcció.",
            isCorrect: false,
          },
          {
            id: "q-2024-35-c",
            text: "Es constituirà en totes les empreses o centres de treball que comptin amb 50 o més treballadors/ores.",
            isCorrect: true,
          },
          {
            id: "q-2024-35-d",
            text: "Es constituirà en totes les empreses.",
            isCorrect: false,
          },
        ],
        explanation:
          "L'art. 38.2 de la Llei 31/1995 de Prevenció de Riscos Laborals estableix que el Comitè de Seguretat i Salut es constituirà en totes les empreses o centres de treball que comptin amb 50 o més treballadors.",
        unitIds: ["bcn-t16"],
      },
      // Q36
      {
        id: "q-2024-36",
        type: "single",
        prompt: "Els delegats/ades de prevenció són:",
        options: [
          {
            id: "q-2024-36-a",
            text: "Els/les representants dels treballadors/ores amb funcions específiques en matèria de prevenció de riscos en el treball.",
            isCorrect: true,
          },
          {
            id: "q-2024-36-b",
            text: "Els treballadors/ores que tenen coneixements de prevenció de riscos laborals.",
            isCorrect: false,
          },
          {
            id: "q-2024-36-c",
            text: "Els treballadors/ores amb més experiència de l'empresa.",
            isCorrect: false,
          },
          {
            id: "q-2024-36-d",
            text: "Els/les representants de l'empresa que es designen per a negociar el Conveni.",
            isCorrect: false,
          },
        ],
        explanation:
          "L'art. 35.1 de la Llei 31/1995 defineix els delegats de prevenció com els representants dels treballadors amb funcions específiques en matèria de prevenció de riscos en el treball, designats pels representants del personal.",
        unitIds: ["bcn-t16"],
      },
      // Q37
      {
        id: "q-2024-37",
        type: "single",
        prompt:
          "Cóm es diu la funció que permet veure els canvis realitzats per diferents usuaris en un document Word?",
        options: [
          { id: "q-2024-37-a", text: "Revisió ortogràfica.", isCorrect: false },
          { id: "q-2024-37-b", text: "Control de canvis.", isCorrect: true },
          { id: "q-2024-37-c", text: "Comentaris.", isCorrect: false },
          { id: "q-2024-37-d", text: "Vista de lectura.", isCorrect: false },
        ],
        explanation:
          "La funció «Control de canvis» (Track Changes) de Microsoft Word permet visualitzar i gestionar les modificacions realitzades per un o més usuaris en un document, mostrant insercions, eliminacions i canvis de format.",
        unitIds: ["bcn-t17"],
      },
      // Q38
      {
        id: "q-2024-38",
        type: "single",
        prompt: "Quina combinació de tecles s'utilitza per seleccionar tot el text en un document Word?",
        options: [
          { id: "q-2024-38-a", text: "Ctrl + E", isCorrect: true },
          { id: "q-2024-38-b", text: "Ctrl + T", isCorrect: false },
          { id: "q-2024-38-c", text: "Ctrl + Q", isCorrect: false },
          { id: "q-2024-38-d", text: "Ctrl + A", isCorrect: false },
        ],
        explanation:
          "En Microsoft Word en versió espanyola/catalana, la drecera Ctrl+E permet seleccionar tot el text del document (equivalent a «Seleccionar todo»). Ctrl+T aplica tabulació, Ctrl+Q elimina l'espaiat del paràgraf i Ctrl+A correspon a «Seleccionar todo» en la versió anglesa.",
        unitIds: ["bcn-t17"],
      },
      // Q39
      {
        id: "q-2024-39",
        type: "single",
        prompt: "En excel Microsoft Office, que és un llibre?",
        options: [
          {
            id: "q-2024-39-a",
            text: "És un fitxer que conté un o més fulls de càlcul per ajudar a organitzar les dades.",
            isCorrect: true,
          },
          {
            id: "q-2024-39-b",
            text: "És una eina avançada per calcular, resumir i analitzar dades que permeten veure comparacions, patrons i tendències en elles.",
            isCorrect: false,
          },
          {
            id: "q-2024-39-c",
            text: "És una eina que permet la visualització de les dades.",
            isCorrect: false,
          },
          {
            id: "q-2024-39-d",
            text: "És una expressió que opera sobre els valors d'un rang cel·lular o d'una cèl·lula.",
            isCorrect: false,
          },
        ],
        explanation:
          "Un llibre de treball (workbook) d'Excel és un fitxer que conté un o diversos fulls de càlcul, que permeten organitzar, emmagatzemar i analitzar dades. L'opció B descriu les taules dinàmiques; la D descriu una funció.",
        unitIds: ["bcn-t19"],
      },
      // Q40
      {
        id: "q-2024-40",
        type: "single",
        prompt: "Quina és la funció de les taules dinàmiques en Excel?",
        options: [
          { id: "q-2024-40-a", text: "Crear gràfics.", isCorrect: false },
          {
            id: "q-2024-40-b",
            text: "Resumir i analitzar grans volums de dades.",
            isCorrect: true,
          },
          { id: "q-2024-40-c", text: "Dissenyar plantilles.", isCorrect: false },
          { id: "q-2024-40-d", text: "Protegir dades.", isCorrect: false },
        ],
        explanation:
          "Les taules dinàmiques (PivotTables) d'Excel permeten resumir, analitzar, explorar i presentar grans volums de dades de manera interactiva, permetent creuar variables i obtenir resums sense necessitat de fórmules complexes.",
        unitIds: ["bcn-t20"],
      },
      // PREGUNTES DE RESERVA
      // Q41
      {
        id: "q-2024-41",
        type: "single",
        prompt: "Quin és el termini de renovació dels membres del Tribunal Constitucional?",
        options: [
          { id: "q-2024-41-a", text: "5 anys.", isCorrect: false },
          { id: "q-2024-41-b", text: "9 anys.", isCorrect: true },
          { id: "q-2024-41-c", text: "7 anys.", isCorrect: false },
          { id: "q-2024-41-d", text: "6 anys.", isCorrect: false },
        ],
        explanation:
          "L'art. 159.3 CE estableix que els membres del Tribunal Constitucional són nomenats per un període de nou anys, i el Tribunal es renova per terceres parts cada tres anys.",
        unitIds: ["bcn-t1"],
      },
      // Q42
      {
        id: "q-2024-42",
        type: "single",
        prompt:
          "Segons la llei 39/2015, quan el procediment s'hagi iniciat d'ofici, es produeix la caducitat quan no s'hagi dictat resolució des del seu inici en el transcurs de:",
        options: [
          { id: "q-2024-42-a", text: "1 any.", isCorrect: false },
          { id: "q-2024-42-b", text: "6 mesos.", isCorrect: true },
          { id: "q-2024-42-c", text: "3 mesos.", isCorrect: false },
          { id: "q-2024-42-d", text: "15 dies", isCorrect: false },
        ],
        explanation:
          "L'art. 21.2 de la Llei 39/2015 estableix que el termini màxim per resoldre i notificar la resolució expressa no pot excedir sis mesos, llevat que una norma amb rang de llei estableixi un termini superior. Superant aquest termini sense resolució en un procediment iniciat d'ofici, es produirà la caducitat (art. 25).",
        unitIds: ["bcn-t4"],
      },
      // Q43
      {
        id: "q-2024-43",
        type: "single",
        prompt:
          "El document mitjançant el qual l'Administració dóna a conèixer a la persona interessada una resolució o un acte administratiu és...:",
        options: [
          { id: "q-2024-43-a", text: "Un informe.", isCorrect: false },
          { id: "q-2024-43-b", text: "Un acord.", isCorrect: false },
          { id: "q-2024-43-c", text: "Una diligència", isCorrect: false },
          { id: "q-2024-43-d", text: "Una notificació.", isCorrect: true },
        ],
        explanation:
          "La notificació és l'acte de comunicació pel qual l'Administració posa en coneixement de la persona interessada el contingut d'una resolució o acte administratiu (arts. 40-46 Llei 39/2015).",
        unitIds: ["bcn-t13"],
      },
      // Q44
      {
        id: "q-2024-44",
        type: "single",
        prompt:
          "Quin d'aquests mètodes d'identificació NO són permesos per l'Oficina Virtual de Tràmits de l'Ajuntament de Barcelona?",
        options: [
          { id: "q-2024-44-a", text: "idCAT Mòbil", isCorrect: false },
          { id: "q-2024-44-b", text: "eDNI (DNI electrònic)", isCorrect: false },
          { id: "q-2024-44-c", text: "Cl@ve", isCorrect: false },
          { id: "q-2024-44-d", text: "Tarjeta Sanitària Europea (TSE)", isCorrect: true },
        ],
        explanation:
          "L'Oficina Virtual de Tràmits de l'Ajuntament de Barcelona admet idCAT Mòbil, eDNI i Cl@ve com a mètodes d'identificació digital. La Targeta Sanitària Europea no és un instrument d'identificació vàlid per a la realització de tràmits municipals electrònics.",
        unitIds: ["bcn-t14"],
      },
      // Q45
      {
        id: "q-2024-45",
        type: "single",
        prompt: "En quin districte està ubicat el Museu d'Art contemporani de Barcelona?",
        options: [
          { id: "q-2024-45-a", text: "Sant Martí", isCorrect: false },
          { id: "q-2024-45-b", text: "Sarrià-Sant Gervasi", isCorrect: false },
          { id: "q-2024-45-c", text: "L'Eixample", isCorrect: false },
          { id: "q-2024-45-d", text: "Ciutat Vella", isCorrect: true },
        ],
        explanation:
          "El Museu d'Art Contemporani de Barcelona (MACBA) està ubicat a la plaça dels Àngels, al barri del Raval, que pertany al districte de Ciutat Vella.",
        unitIds: ["bcn-t15"],
      },
    ],
  },
];
