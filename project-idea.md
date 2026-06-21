# TotOpos — Guía completa para construir desde cero

## 1. Qué es TotOpos

TotOpos es una SPA de preparación de exámenes para **opositores españoles** (funcionariado). El usuario puede:

- Navegar un catálogo de tests organizados por **temario** (árbol jerárquico de unidades).
- Crear tests a medida filtrando por unidades del temario.
- Hacer tests en dos modos: lista completa (como un examen tradicional) o pregunta a pregunta sin límite (experiencia "TikTok").
- Revisar su historial de resultados y el progreso por pregunta.

**Fase 1 (la que se implementa aquí):** todo en el cliente, datos en `localStorage`. Sin backend ni autenticación. Los tests y el árbol de temario son datos estáticos incluidos en el repositorio.

---

## 2. Stack técnico

| Capa                | Tecnología                                                                                          |
| ------------------- | --------------------------------------------------------------------------------------------------- |
| Framework           | React 18 + TypeScript + Vite                                                                        |
| Estilos             | Tailwind CSS + Radix UI, priorizando `@apply` con clases semánticas sobre utilidades sueltas en JSX |
| Router              | React Router v7                                                                                     |
| Estado global       | Zustand con middleware `persist` (localStorage)                                                     |
| Fetching            | TanStack Query (preparado para Fase 2; en Fase 1 sirve datos estáticos con `initialData`)           |
| Testing unitario    | Vitest + React Testing Library                                                                      |
| Testing e2e         | Playwright                                                                                          |
| Linting/formato     | Biome                                                                                               |
| Gestión de paquetes | pnpm con workspaces (monorepo)                                                                      |

---

## 3. Estructura del monorepo

```
tot-opos/
├── apps/
│   └── web/                              # App React principal
│       ├── src/
│       │   ├── routes/                   # Páginas (una por ruta)
│       │   │   ├── SavedTestsPage.tsx
│       │   │   ├── CreateTestPage.tsx
│       │   │   ├── HistoryPage.tsx
│       │   │   ├── AttemptDetailPage.tsx
│       │   │   ├── FixedTestPage.tsx
│       │   │   └── IndefiniteTestPage.tsx
│       │   ├── components/
│       │   │   ├── layout/
│       │   │   │   ├── AppLayout.tsx
│       │   │   │   ├── Header.tsx
│       │   │   │   └── NavBar.tsx
│       │   │   ├── ui/
│       │   │   │   └── button.tsx        # Wrapper Radix Slot, variantes primary/secondary
│       │   │   ├── icons.tsx             # SVGs inline como componentes React
│       │   │   ├── CurriculumDisplay.tsx
│       │   │   ├── TestCard.tsx
│       │   │   ├── QuestionCard.tsx
│       │   │   ├── TestCorrection.tsx
│       │   │   ├── ProgressPills.tsx
│       │   │   ├── CorrectionPills.tsx
│       │   │   ├── TimerControl.tsx
│       │   │   └── ConfirmDialog.tsx
│       │   ├── store/
│       │   │   ├── tests-store.ts
│       │   │   ├── progress-store.ts
│       │   │   ├── session-store.ts
│       │   │   ├── history-store.ts
│       │   │   └── question-history-store.ts
│       │   ├── hooks/
│       │   │   ├── useTestSummary.ts
│       │   │   ├── useActiveQuestion.ts
│       │   │   ├── useScrollSnap.ts
│       │   │   └── useQuestionHistory.ts
│       │   ├── lib/
│       │   │   ├── scoring.ts
│       │   │   ├── test-generator.ts
│       │   │   ├── relative-time.ts
│       │   │   └── cn.ts
│       │   ├── index.css
│       │   ├── App.tsx
│       │   └── main.tsx
│       ├── e2e/
│       ├── public/
│       ├── tailwind.config.ts
│       ├── vite.config.ts                # Puerto fijo: 5180
│       └── playwright.config.ts
├── packages/
│   ├── types/
│   │   └── src/index.ts                  # Todos los tipos TypeScript compartidos
│   ├── test-data/
│   │   └── src/                          # Fixed-tests estáticos de ejemplo
│   └── curriculum-data/
│       └── src/index.ts                  # units: Unit[] (árbol estático)
├── docs/
├── pnpm-workspace.yaml
└── biome.json
```

**Nombres de paquetes npm:** `@tot-opos/web`, `@tot-opos/types`, `@tot-opos/test-data`, `@tot-opos/curriculum-data`.

**Comandos:**
```bash
pnpm install
pnpm dev           # localhost:5180
pnpm build         # type-check + build
pnpm test          # Vitest
pnpm lint
pnpm format
```

---

## 4. Modelo de datos (`packages/types/src/index.ts`)

```typescript
// ─── Curriculum ─────────────────────────────────────────────────────────────

export type Unit = {
  id: string;
  name: string;
  parentId: string | null; // null en el nodo raíz
  type?: string;            // "bloque", "tema", "subtema", etc. (libre)
  order?: number;           // para ordenar siblings
};

// ─── Questions ──────────────────────────────────────────────────────────────

export type QuestionType = "single" | "multiple";

export type QuestionOption = {
  id: string;
  text?: string;
  image?: string;    // URL alternativa al texto
  isCorrect: boolean;
};

export type Question = {
  id: string;
  type: QuestionType;
  prompt: string;
  promptImage?: string;      // URL de imagen adjunta al enunciado
  options: QuestionOption[];
  explanation?: string;      // Mostrada tras corregir
  unitIds: string[];         // Unit["id"][] — unidades que cubre esta pregunta
  metadata?: {
    sourceYear?: number;
    sourceExam?: string;
  };
};

// ─── Tests ──────────────────────────────────────────────────────────────────

export type TestScoringRules = {
  correctPoints: number;    // Normalmente 1
  penaltyPerWrong: number;  // 0, 1/3, 1/4…
  passThreshold: number;    // Fracción de la puntuación máxima (0–1)
};

export type TestRules = {
  scoring: TestScoringRules;
  navigation: "free" | "linear"; // "linear" reservado para Fase 2
};

export type TestMetadata = {
  category: string;       // "Ayuntamiento de Barcelona"
  subcategory?: string;
  year?: number;
  tags?: string[];
};

export type FixedTest = {
  id: string;
  type: "fixed";
  title: string;
  description?: string;
  questions: Question[];
  unitIds: string[];             // Unit["id"][] que cubre este test
  saved: boolean;
  rules: TestRules;
  metadata: TestMetadata;
  suggestedMinuteLimit?: number; // Minutos recomendados para el temporizador
};

export type QuestionSelectionMode =
  | "all"
  | "new-only"           // Nunca respondidas
  | "failed-in-last-days"; // Falladas en los últimos N días

export type IndefiniteTestFilters = {
  unitIds: string[];
  excludeAnsweredInLastDays?: number;
  questionSelection: QuestionSelectionMode;
  failedInLastDays?: number; // Requerido si questionSelection = "failed-in-last-days"
};

export type IndefiniteTest = {
  id: string;
  type: "indefinite";
  title?: string;       // Auto-generado a partir de los filtros si no se especifica
  unitIds: string[];    // Expandido de filters.unitIds (incluyendo descendientes)
  saved: boolean;
  filters: IndefiniteTestFilters;
  metadata: TestMetadata;
};

export type Test = FixedTest | IndefiniteTest;

// ─── Attempts & Sessions ────────────────────────────────────────────────────

export type FixedAttempt = {
  id: string;
  testId: string;
  testTitle: string;
  completedAt: string;                // ISO datetime
  score: number;
  maxScore: number;
  passed: boolean;
  answers: Record<string, string[]>;  // questionId → optionIds seleccionadas
};

export type IndefiniteAnswer = {
  questionId: string;
  answeredAt: string;   // ISO datetime
  wasCorrect: boolean;
  selectedOptionIds: string[];
};

export type IndefiniteSession = {
  id: string;
  testId: string;
  testTitle?: string;
  startedAt: string;          // ISO datetime
  endedAt?: string;           // undefined = sesión aún en progreso
  questionIds: string[];      // Orden resuelto al iniciar la sesión (aleatorio)
  answers: IndefiniteAnswer[];
};

// ─── Question History ────────────────────────────────────────────────────────

export type QuestionHistoryEntry = {
  answeredAt: string;   // ISO datetime
  wasCorrect: boolean;
};

export type QuestionHistory = {
  questionId: string;
  entries: QuestionHistoryEntry[];
};
```

---

## 5. Rutas

```tsx
// App.tsx
<Routes>
  <Route element={<AppLayout />}>
    <Route index element={<SavedTestsPage />} />
    <Route path="crear" element={<CreateTestPage />} />
    <Route path="historial" element={<HistoryPage />} />
    <Route path="historial/:attemptId" element={<AttemptDetailPage />} />
    <Route path="tests/fixed/:testId" element={<FixedTestPage />} />
    <Route path="tests/indefinite/:testId" element={<IndefiniteTestPage />} />
  </Route>
</Routes>
```

Las tres pestañas globales son: **Tests guardados** (`/`), **Crear test** (`/crear`), **Historial** (`/historial`).

---

## 6. Layout global

### `AppLayout`

Wrapper que contiene `Header`, `NavBar` y `<Outlet />`.

### `Header`

Siempre visible. Contiene:
- Botón de volver atrás (solo cuando la ruta tiene sentido de "volver").
- Logo / nombre de la app.
- En pantallas `md:` y superiores: los links de las tres pestañas globales.

### `NavBar`

Barra de navegación inferior, **visible solo en móvil** (oculta en `md:`). Contiene los links a las tres pestañas. Ocupa posición fija al fondo de la pantalla.

### SubHeader

No es un componente único: es un concepto. Algunas pantallas tienen una barra sticky adicional por debajo del Header, con información de estado global de esa pantalla (progreso del test, controles del timer, etc.). Los contenidos varían por pantalla y se describen en cada sección.

### Área de contenido

`max-w-2xl`, centrada, con padding lateral y margen inferior suficiente para no quedar tapada por la `NavBar` en móvil.

---

## 7. Sistema de diseño

### Tokens de color (`src/index.css`)

Colores en OKLCH (formato: `L% C H`). Se definen como variables CSS y se mapean a colores Tailwind en `tailwind.config.ts`.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background:          98% 0 0;
    --foreground:          20% 0 0;
    --muted:               94% 0 0;
    --muted-foreground:    45% 0 0;
    --border:              88% 0 0;
    --primary:             55% 0.18 260;   /* azul/índigo */
    --primary-foreground:  98% 0 0;
    --success:             55% 0.15 145;   /* verde */
    --success-foreground:  98% 0 0;
    --destructive:         55% 0.2  25;    /* rojo */
    --destructive-foreground: 98% 0 0;
    --warning:             75% 0.15 80;    /* ámbar */
    --warning-foreground:  20% 0 0;
  }

  .dark {
    --background:          18% 0 0;
    --foreground:          95% 0 0;
    --muted:               25% 0 0;
    --muted-foreground:    65% 0 0;
    --border:              30% 0 0;
    --primary:             70% 0.18 260;
    --primary-foreground:  15% 0 0;
    --success:             65% 0.15 145;
    --success-foreground:  15% 0 0;
    --destructive:         65% 0.2  25;
    --destructive-foreground: 15% 0 0;
    --warning:             80% 0.15 80;
    --warning-foreground:  15% 0 0;
  }

  body {
    @apply bg-background text-foreground font-sans;
  }

  :focus-visible {
    @apply outline-none ring-2 ring-primary ring-offset-2 ring-offset-background;
  }
}

@layer components {
  .btn {
    @apply inline-flex min-h-11 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors
           disabled:pointer-events-none disabled:opacity-50;
  }
  .btn-primary   { @apply btn bg-primary text-primary-foreground hover:opacity-90; }
  .btn-secondary { @apply btn border border-border bg-background text-foreground hover:bg-muted; }

  .option { @apply flex min-h-11 cursor-pointer items-center gap-3 rounded-md border border-border p-3 text-sm transition-colors hover:bg-muted; }
  .option[data-state="checked"] { @apply border-primary bg-primary/10; }
  .option-correct   { @apply border-success bg-success/10; }
  .option-incorrect { @apply border-destructive bg-destructive/10; }

  .card { @apply rounded-lg border border-border bg-background p-4 shadow-sm; }
}
```

### `tailwind.config.ts`

```typescript
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] },
      colors: {
        background:            "oklch(var(--background) / <alpha-value>)",
        foreground:            "oklch(var(--foreground) / <alpha-value>)",
        muted:                 "oklch(var(--muted) / <alpha-value>)",
        "muted-foreground":    "oklch(var(--muted-foreground) / <alpha-value>)",
        border:                "oklch(var(--border) / <alpha-value>)",
        primary:               "oklch(var(--primary) / <alpha-value>)",
        "primary-foreground":  "oklch(var(--primary-foreground) / <alpha-value>)",
        success:               "oklch(var(--success) / <alpha-value>)",
        "success-foreground":  "oklch(var(--success-foreground) / <alpha-value>)",
        destructive:           "oklch(var(--destructive) / <alpha-value>)",
        "destructive-foreground": "oklch(var(--destructive-foreground) / <alpha-value>)",
        warning:               "oklch(var(--warning) / <alpha-value>)",
        "warning-foreground":  "oklch(var(--warning-foreground) / <alpha-value>)",
      },
    },
  },
} satisfies Config;
```

### Reglas de UI

- **Mobile-first.** Ninguna acción depende de `:hover`. Objetivo táctil mínimo 44×44 px.
- **Dark mode** vía clase `.dark` en el `<html>`. Sin detección automática del sistema en Fase 1.
- **Focus:** `ring-2 ring-primary ring-offset-2 ring-offset-background` en `:focus-visible` global.
- **Accesibilidad:** Radix UI para HTML semántico (radio, checkbox, dialog, tooltip, dropdown). ARIA labels en botones de solo icono. `role="alert"` en mensajes de estado crítico (expiración de timer).
- **Tipografía:** Inter (fallback: `system-ui`).

---

## 8. Estado global (Zustand + localStorage)

Todos los stores usan el patrón:
```typescript
export const useFooStore = create<FooState>()(
  persist((set) => ({ ... }), { name: "tot-opos:foo" })
);
```

| Store                     | Clave localStorage          | Contenido                                   |
| ------------------------- | --------------------------- | ------------------------------------------- |
| `useTestsStore`           | `tot-opos:tests`            | Todos los tests (fixed e indefinite)        |
| `useProgressStore`        | `tot-opos:progress`         | Estado en curso de fixed-tests              |
| `useSessionStore`         | `tot-opos:session`          | Sesión activa de indefinite-tests           |
| `useHistoryStore`         | `tot-opos:history`          | FixedAttempts + IndefiniteSessions cerradas |
| `useQuestionHistoryStore` | `tot-opos:question-history` | Historial por pregunta                      |
| `useCurriculumUiStore`    | `tot-opos:curriculum-ui`    | Nodos del accordion abiertos                |

### `useTestsStore`

```typescript
type TestsState = {
  tests: Test[];
  addTest: (test: Test) => void;
  setSaved: (testId: string, saved: boolean) => void;
  findByFilters: (filters: IndefiniteTestFilters) => IndefiniteTest | undefined;
};
```

`findByFilters` serializa los filtros en un string canónico (unitIds ordenados, resto de campos en orden fijo) y compara con los tests existentes para detectar duplicados exactos.

### `useProgressStore`

Estado en curso de un `fixed-test`: respuestas, preguntas marcadas, timestamp de última apertura, estado del timer.

```typescript
export type TimerMode = "hard" | "soft";

export type TestTimer = {
  mode: TimerMode;
  deadlineAt?: string;        // ISO datetime; presente cuando activo
  pausedRemainingMs?: number; // ms restantes; presente cuando pausado
};

export type TestProgress = {
  answers: Record<string, string[]>;   // questionId → optionIds
  flaggedQuestionIds: string[];
  lastOpenedAt: string;                // ISO datetime
  timer?: TestTimer;
};

type ProgressState = {
  progressByTestId: Record<string, TestProgress>;
  touchOpened:  (testId: string) => void;
  setAnswer:    (testId: string, questionId: string, optionIds: string[]) => void;
  toggleFlag:   (testId: string, questionId: string) => void;
  startTimer:   (testId: string, mode: TimerMode, minutes: number) => void;
  pauseTimer:   (testId: string) => void;
  resumeTimer:  (testId: string) => void;
  reset:        (testId: string) => void; // borra respuestas/flags, preserva timer mode
  clear:        (testId: string) => void; // elimina el entry completo (al enviar)
};
```

**Detalle del timer:** `deadlineAt` es un ISO datetime absoluto, calculado como `new Date(Date.now() + minutes * 60_000).toISOString()`. Sobrevive recargas porque `Date.now()` sigue avanzando. Al pausar: `pausedRemainingMs = new Date(deadlineAt).getTime() - Date.now()`. Al reanudar: `deadlineAt = new Date(Date.now() + pausedRemainingMs).toISOString()`.

### `useSessionStore`

Estado en curso de un `indefinite-test`.

```typescript
type SessionState = {
  sessions: Record<string, IndefiniteSession>; // testId → sesión activa
  startSession:  (testId: string, questionIds: string[], testTitle?: string) => void;
  addAnswer:     (testId: string, answer: IndefiniteAnswer) => void;
  closeSession:  (testId: string) => void; // marca endedAt y la transfiere a historyStore
};
```

El timer de `indefinite-test` (por pregunta) no se persiste en el store — se reinicia en cada pregunta. Solo se persiste el `timerSeconds` configurado por el usuario en `useCurriculumUiStore` o en el estado local del componente.

### `useHistoryStore`

```typescript
type HistoryState = {
  fixedAttempts:       FixedAttempt[];
  indefiniteSessions:  IndefiniteSession[];
  addFixedAttempt:     (attempt: FixedAttempt) => void;
  addIndefiniteSession:(session: IndefiniteSession) => void;
};
```

Ambas listas se mantienen con los más recientes primero.

### `useQuestionHistoryStore`

```typescript
type QuestionHistoryState = {
  historyByQuestionId: Record<string, QuestionHistory>;
  recordAnswer: (questionId: string, wasCorrect: boolean) => void;
};
```

`recordAnswer` hace prepend de una nueva `QuestionHistoryEntry` en `entries`.

---

## 9. Utilidades (`src/lib/`)

### `scoring.ts`

```typescript
export type Answer = string[];
export type Answers = Record<string, Answer>;

export type QuestionResult = {
  questionId: string;
  isCorrect: boolean;
  selectedOptionIds: string[];
};

export type TestResult = {
  score: number;
  maxScore: number;
  passed: boolean;
  questionResults: QuestionResult[];
};

function isQuestionCorrect(question: Question, selectedOptionIds: string[]): boolean {
  const correctIds = question.options.filter((o) => o.isCorrect).map((o) => o.id);
  if (correctIds.length !== selectedOptionIds.length) return false;
  return correctIds.every((id) => selectedOptionIds.includes(id));
}

export function scoreTest(test: FixedTest, answers: Answers): TestResult {
  const { correctPoints, penaltyPerWrong, passThreshold } = test.rules.scoring;

  const questionResults = test.questions.map((q) => ({
    questionId: q.id,
    isCorrect: isQuestionCorrect(q, answers[q.id] ?? []),
    selectedOptionIds: answers[q.id] ?? [],
  }));

  const correctCount = questionResults.filter((r) => r.isCorrect).length;
  // Solo penalizan las preguntas respondidas incorrectamente; sin respuesta no penaliza
  const wrongCount = questionResults.filter(
    (r) => !r.isCorrect && r.selectedOptionIds.length > 0
  ).length;

  const maxScore = test.questions.length * correctPoints;
  const score = Math.max(0, correctCount * correctPoints - wrongCount * penaltyPerWrong);

  return {
    score,
    maxScore,
    passed: maxScore > 0 && score / maxScore >= passThreshold,
    questionResults,
  };
}
```

Una pregunta de tipo `multiple` con varias respuestas correctas requiere marcar **exactamente** todas las correctas. Sin crédito parcial.

### `test-generator.ts`

```typescript
export function resolveQuestions(
  allQuestions: Question[],
  filters: IndefiniteTestFilters,
  questionHistories: Record<string, QuestionHistory>,
  now: Date
): Question[]
```

Algoritmo:
1. Partir del pool: preguntas cuyo `unitIds` incluya alguno de `filters.unitIds` o sus descendientes en el árbol.
2. Si `filters.excludeAnsweredInLastDays` existe: eliminar preguntas con alguna entrada en los últimos N días.
3. Si `questionSelection = "new-only"`: solo preguntas sin ninguna entrada en `QuestionHistory`.
4. Si `questionSelection = "failed-in-last-days"`: solo preguntas cuya entrada más reciente en los últimos `failedInLastDays` días fue incorrecta.
5. Barajar el resultado aleatoriamente y devolverlo.

Para `fixed-test`, `resolveQuestions` se usa en el paso 2 de "Crear test" para calcular cuántas preguntas hay disponibles y aplicar el límite `numberOfQuestions`.

### `relative-time.ts`

```typescript
const formatter = new Intl.RelativeTimeFormat("es", { numeric: "auto" });

export function formatRelativeTime(isoDate: string, now: Date = new Date()): string {
  const diffMs = new Date(isoDate).getTime() - now.getTime();
  const UNITS = [
    { unit: "year",   ms: 365 * 24 * 60 * 60 * 1000 },
    { unit: "month",  ms:  30 * 24 * 60 * 60 * 1000 },
    { unit: "day",    ms:       24 * 60 * 60 * 1000 },
    { unit: "hour",   ms:            60 * 60 * 1000 },
    { unit: "minute", ms:                 60 * 1000 },
  ] as const;
  for (const { unit, ms } of UNITS) {
    if (Math.abs(diffMs) >= ms)
      return formatter.format(Math.round(diffMs / ms), unit);
  }
  return formatter.format(Math.round(diffMs / 1000), "second");
}
```

### `cn.ts`

```typescript
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(inputs));
}
```

---

## 10. Hooks personalizados

### `useTestSummary(testId)`

Combina `useProgressStore` y `useHistoryStore` para un test. Devuelve:
- `isInProgress: boolean` — hay progreso activo o sesión abierta.
- `lastOpenedAt: string | undefined` — ISO datetime.
- `answeredCount: number`
- `answers: Record<string, string[]>`
- `flaggedQuestionIds: string[]`
- `timer: TestTimer | undefined`
- `bestScore / bestMaxScore / bestPassed` — del mejor `FixedAttempt`.
- `timesDone: number`

### `useActiveQuestion(questionIds: string[]): string | null`

Usa `IntersectionObserver` (threshold 0.5) para detectar qué pregunta está más del 50% visible en el viewport. Devuelve el id de la primera pregunta visible en orden de documento. Cada pregunta debe tener `id="question-{questionId}"` en su elemento raíz DOM.

```typescript
export function useActiveQuestion(questionIds: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);
  useEffect(() => {
    const elements = questionIds
      .map((id) => document.getElementById(`question-${id}`))
      .filter((el): el is HTMLElement => el !== null);
    const intersecting = new Set<string>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const rawId = entry.target.id.replace("question-", "");
        entry.isIntersecting ? intersecting.add(rawId) : intersecting.delete(rawId);
      }
      setActiveId(questionIds.find((id) => intersecting.has(id)) ?? null);
    }, { threshold: 0.5 });
    for (const el of elements) observer.observe(el);
    return () => { observer.disconnect(); intersecting.clear(); };
  }, [questionIds]);
  return activeId;
}
```

### `useScrollSnap(enabled: boolean)`

Activa `scroll-snap-type: y mandatory` sobre `document.documentElement` cuando `enabled` es true y la pantalla es móvil (< 768 px). Aplica `scroll-padding-top: 7.9rem` para compensar el Header (3.5 rem) y la barra sticky (~4.4 rem). Se restaura al desmontar o al desactivar.

### `useQuestionHistory(questionId: string)`

Wrapper sobre `useQuestionHistoryStore` para una pregunta concreta. Devuelve:
- `timesAnswered: number`
- `lastAnsweredAt: string | undefined`
- `lastWasCorrect: boolean | undefined`
- `successRate: number` (0–1)

---

## 11. Componentes

### `QuestionCard`

Renderiza una pregunta con sus opciones. Usa Radix `RadioGroup` (tipo `single`) o `CheckboxGroup` (tipo `multiple`) para el HTML semántico.

Props:
```typescript
type QuestionCardProps = {
  question: Question;
  selectedOptionIds: string[];
  onChange: (optionIds: string[]) => void;
  showCorrection: boolean;
  isFlagged?: boolean;
  onToggleFlag?: () => void;
  showHistory?: boolean;      // Muestra la sección de historial (indefinite-test)
  questionHistory?: QuestionHistory;
};
```

Comportamiento:
- `<fieldset disabled={showCorrection}>` bloquea todos los controles en modo corrección sin necesidad de pasar props extra a cada opción.
- En modo corrección, cada opción recibe `.option-correct` o `.option-incorrect` según su `isCorrect`.
- El botón de marcar (`BookmarkIcon` / `BookmarkFilledIcon`) llama a `onToggleFlag`.
- El label de tipo ("Selección única" / "Selección múltiple") y el botón "Borrar respuesta" se ocultan cuando `showCorrection = true`.
- Si `showHistory = true` y hay historial, muestra debajo del enunciado:
  - "Esta pregunta se ha respondido X veces."
  - "Respondida por última vez: [fecha relativa]. Fue [correcta / incorrecta]."
  - "Tasa de acierto: X%."

Si existe `question.promptImage`, se muestra la imagen entre el enunciado y las opciones.

Si existe `question.explanation` y `showCorrection = true`, se muestra la explicación al final de la card.

### `TestCorrection`

Vista de corrección de un `FixedAttempt` completo. Muestra:
1. Encabezado: puntuación (`score / maxScore`), porcentaje, aprobado/suspenso, "Completado el {fecha y hora}".
2. `CorrectionPills`.
3. Todas las preguntas en modo `showCorrection = true` con `QuestionCard`.

### `ProgressPills`

Barra de pastillas para la barra sticky durante un `fixed-test`. Un pastillo por pregunta.

Estados visuales:
- Gris: sin responder.
- Color primario: respondida.
- Punto naranja encima: marcada con bookmark.
- Borde destacado: pregunta activa (la visible en el viewport, según `useActiveQuestion`).

Click en un pastillo hace scroll a `#question-{questionId}`.

### `CorrectionPills`

Barra de pastillas en la vista de corrección. Un pastillo por pregunta:
- Verde (`success`): correcta.
- Rojo (`destructive`): incorrecta (respondida pero mal).
- Gris: sin responder.

### `TimerControl`

Botón compacto para el timer. Se usa tanto en `FixedTestPage` (timer de test completo) como en `IndefiniteTestPage` (timer por pregunta).

Estado visual:
- **Inactivo:** icono de reloj. Click → modal de configuración.
- **Activo:** muestra countdown `MM:SS`. Click → pausa.
- **Pausado:** muestra tiempo restante. Click → reanuda.
- **Advertencia:** color `warning` cuando quedan menos de 5 minutos (fixed) o menos de 15 segundos (indefinite).

El modal de configuración tiene:
- Tres opciones: "Sin temporizador", "Blando", "Duro".
- Input de minutos (fixed-test) o segundos (indefinite-test).
- Texto auxiliar para fixed-test: "X minutos por pregunta" (recalculado en tiempo real).
- Texto de recomendación si el test tiene `suggestedMinuteLimit`: "Para este test se recomiendan X minutos."

### `ConfirmDialog`

Modal de confirmación reutilizable. Props:
```typescript
type ConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel: string;
  onConfirm: () => void;
  variant?: "default" | "destructive";
};
```

Usa Radix `Dialog`. Variante `destructive` muestra el botón de confirmación en rojo.

### `CurriculumDisplay`

Árbol de `Unit`s renderizado como accordion multinivel. Admite dos modos:

**Modo `"readonly"`:** navegar el árbol. Los nodos hoja muestran listas de `TestCard`s. Los nodos abiertos/cerrados se persisten en `useCurriculumUiStore`. Puede haber varios nodos abiertos a la vez.

**Modo `"select"`:** cada nodo tiene un checkbox (estilo TreeSelect):
- Marcar un nodo padre: marca todos sus descendientes.
- Desmarcar un nodo padre: desmarca todos sus descendientes.
- Si solo algunos descendientes están marcados: el padre muestra `indeterminate`.
- Los nodos abiertos/cerrados no se persisten (se resetean al entrar al paso 1 de "Crear test").
- Si se proporciona `searchQuery`, se filtran los nodos y se expanden los que contienen coincidencias.

```typescript
type CurriculumDisplayProps =
  | {
      mode: "readonly";
      units: Unit[];
      getTestsForUnit: (unitId: string) => Test[];
    }
  | {
      mode: "select";
      units: Unit[];
      selected: string[];
      onChange: (selected: string[]) => void;
      searchQuery?: string;
    };
```

Los nodos se ordenan alfabéticamente por `name` dentro de cada nivel.

### `TestCard`

Card para un test (fixed o indefinite). Muestra:
- Chip de tipo: "Test fijo" / "Test libre".
- Número de preguntas (`questions.length` para fixed; "Variable" para indefinite).
- Cuándo se realizó por última vez (`formatRelativeTime`) o "Nunca realizado".
- Para fixed-test: porcentaje de acierto del último intento.
- Para indefinite-test: porcentaje de acierto de la última sesión.
- Botón principal: "Comenzar" (nunca iniciado) o "Continuar" (con progreso/sesión activa).
- Menú secundario: "Guardar" / "Quitar de guardados".

---

## 12. Pestaña "Tests guardados"

Ruta: `/`. Muestra los tests con `saved: true`.

### SubHeader

- Barra de búsqueda de texto (filtra por título del test).
- Checkbox "Solo mis tests" (en Fase 1 siempre muestra todos; estado persistido en localStorage).

### Body: dos sub-tabs

**"Mostrar todo":** lista plana de `TestCard`s. Estado vacío si no hay tests guardados: "Aún no tienes tests guardados. Ve a 'Crear test' para empezar."

**"Buscar por temario":** `CurriculumDisplay` en modo `"readonly"`. Cada nodo hoja del árbol muestra las `TestCard`s de los tests cuyo `unitIds` incluya esa unit. Los tests cuyo `unitIds` contenga **únicamente** esa unit se muestran primero, con un chip "Unidad pura".

---

## 13. Pestaña "Crear test"

Ruta: `/crear`. Flujo de dos pasos. El estado del formulario vive en el componente; al crear el test se persiste en `useTestsStore`.

### Paso 1: Seleccionar unidades

**SubHeader:**
- Barra de búsqueda de texto (filtra las units visibles en el accordion).
- Texto "X unidades seleccionadas".
- Botón "Continuar" (habilitado solo si ≥1 unit seleccionada).

**Body:**
Título "Paso 1 de 2: escoge las unidades".
`CurriculumDisplay` en modo `"select"`. El usuario puede marcar tanto nodos hoja como categorías enteras.

### Paso 2: Configuración

**SubHeader:**
- Texto "X preguntas disponibles" (calculado en tiempo real con `resolveQuestions` usando los filtros del formulario y el historial actual).
- Botón "Crear test" → abre el modal de confirmación.

**Body:**
Título "Paso 2 de 2: configuración".

Formulario:

1. **Tipo de test** — RadioCards descriptivas:
   - "Test fijo": número fijo de preguntas, se envía al terminar.
   - "Test libre": sin límite de preguntas, se deja cuando se quiera.

2. **Excluir preguntas respondidas** — CheckboxCard:
   - "Excluir preguntas respondidas en los últimos X días."
   - X = input numérico, default 15.

3. **Selección de preguntas** — RadioCards:
   - "Mostrar todo."
   - "Solo preguntas nuevas" — nunca respondidas.
   - "Solo preguntas falladas en los últimos X días" — X = input numérico.

4. **Número de preguntas** (solo si tipo = "Test fijo"):
   - Input numérico. Mínimo: `min(total_disponibles, 5)`. Máximo: `total_disponibles`.
   - Texto: "De un total de X preguntas disponibles."

### Modal "Crear test"

Se abre al pulsar "Crear test" en el SubHeader del paso 2.

Muestra:
- Resumen de las unidades seleccionadas y opciones de configuración.
- Botón **"Guardar test"**:
  - Si ya existe un test con exactamente esos filtros (`findByFilters`): alerta "Ya existe un test con estos parámetros" con enlace al test.
  - Si no existe: crea el test con `saved: true` → notificación de éxito.
- Botón **"Comenzar test"**:
  - Si ya existe un test con esos filtros exactos: navega a ese test.
    - Si el test tenía progreso/sesión activa: modal "Ya habías comenzado este test. ¿Continuar o empezar de nuevo?" → CONTINUAR / EMPEZAR DE NUEVO.
  - Si no existe: crea el test con `saved: false` y navega a él.

---

## 14. Hacer un fixed-test (`FixedTestPage`)

Ruta: `/tests/fixed/:testId`.

Al montar: `touchOpened(testId)` en `progressStore`.

### Layout

**SubHeader (sticky):** pegado al Header.
- `TimerControl` (timer de test completo).
- `ProgressPills` (un pastillo por pregunta; ver sección de componentes).
- Conteo "X / Y respondidas".
- Menú dropdown:
  - "Ir al principio" → scroll al inicio.
  - "Ir al final" → scroll al botón de Enviar.
  - "Guardar test" / "Quitar de guardados" → toggle `saved`.
  - "Reiniciar test" → `ConfirmDialog` destructivo. Si el usuario confirma: `reset(testId)`. Deshabilitado si no hay ninguna respuesta.

**Body:** todas las preguntas en una sola pantalla, con scroll. Cada `QuestionCard` tiene `id="question-{questionId}"` para `useActiveQuestion` y para el scroll de los pastillos.

En móvil, scroll snap: cada pregunta hace `scroll-snap-align: start`. El botón de Enviar es el último snap-point y ocupa la altura completa del viewport. Implementado con `useScrollSnap(true)` mientras `showCorrection = false`.

**Botón "Enviar":** al pulsar, antes de corregir:
- Si hay preguntas marcadas con bookmark sin responder: `ConfirmDialog` "Tienes preguntas marcadas sin responder."
- Si hay preguntas sin responder (y sin marcar): `ConfirmDialog` "Quedan X preguntas sin responder."
- Si todo respondido: envío directo.

Al confirmar el envío:
1. `scoreTest(test, answers)` → `TestResult`.
2. Construir `FixedAttempt` con `id = crypto.randomUUID()`, `completedAt = new Date().toISOString()`.
3. `historyStore.addFixedAttempt(attempt)`.
4. Por cada respuesta: `questionHistoryStore.recordAnswer(questionId, wasCorrect)`.
5. `progressStore.clear(testId)`.
6. Mostrar `TestCorrection` en la misma página (sustituye el formulario).

### Configuración del timer

El modal de `TimerControl` ofrece:
1. Sin temporizador.
2. Blando: pausable; al expirar puede seguir respondiendo. El icono vuelve al estado inactivo al expirar (puede reiniciarse).
3. Duro: no pausable; al expirar bloquea todos los campos y solo deja pulsar "Enviar". Muestra modal de aviso al expirar.

Minutos por defecto:
- Si el test tiene `suggestedMinuteLimit`: ese valor.
- Si no: `n_preguntas × 0.5` (30 segundos por pregunta).

El modal muestra siempre el texto "X minutos por pregunta" (actualizado en tiempo real al cambiar el input).

Si el test tiene `suggestedMinuteLimit`, muestra además: "Para este test se recomiendan X minutos."

---

## 15. Hacer un indefinite-test (`IndefiniteTestPage`)

Ruta: `/tests/indefinite/:testId`.

### Inicio de sesión

Al navegar a un indefinite-test:

1. Ejecutar `resolveQuestions` con los filtros del test y el historial actual → pool de preguntas.
2. **Sin preguntas:** modal "No hay preguntas disponibles con estos filtros." → OK → vuelve atrás. Sin botón de continuar.
3. **Entre 1 y 9 preguntas:** modal "Solo hay X preguntas disponibles. ¿Deseas continuar?" → ATRÁS / CONTINUAR.
4. **≥10 preguntas (o el usuario confirmó):**
   - Si hay una sesión activa en `sessionStore` para este test: se reanuda desde la última pregunta respondida.
   - Si no: mostrar modal de configuración del timer → al confirmar, crear la sesión con `sessionStore.startSession(testId, questionIds)`.

### Configuración del timer (por pregunta)

Modal con tres opciones:
1. Sin temporizador.
2. Blando: pausable; al expirar puede seguir respondiendo.
3. Duro: no pausable; al expirar bloquea la pregunta y muestra botón "Siguiente pregunta" (la pregunta queda sin responder, no se registra en el historial).

Input de **segundos** (no minutos). Valor por defecto: 60.

El timer se reinicia al avanzar a cada nueva pregunta no respondida. Al volver a una pregunta ya respondida, el timer no aplica (esa pantalla está en modo lectura).

### Layout

**SubHeader (sticky):**
- `TimerControl` (timer por pregunta, se reinicia en cada nueva pregunta).
- "X respondidas · Y correctas · Z incorrectas · W% acierto" (acumulado en la sesión).
- Número de preguntas disponibles en el pool.
- Menú dropdown:
  - Toggle "Mostrar historial de pregunta" (activado por defecto; estado persistido en localStorage).
  - "Guardar test" / "Quitar de guardados".

**Body:** una pregunta por pantalla.

Estructura de cada pantalla de pregunta:

1. `QuestionCard` con la pregunta y sus opciones.
2. Debajo: label de tipo + botón "Borrar respuesta" (disponible hasta confirmar).
3. Si el modo "Mostrar historial de pregunta" está activo y hay historial:
   - "Esta pregunta se ha respondido X veces."
   - "Respondida por última vez: [fecha relativa]. Fue [correcta / incorrecta]."
   - "Tasa de acierto: X%."
4. Botón "Confirmar" (habilitado solo si hay ≥1 opción seleccionada).
5. Tras confirmar: la `QuestionCard` entra en modo corrección (opciones coloreadas + explicación). El botón "Borrar respuesta" desaparece. Aparece botón "Siguiente pregunta".

**Navegación:** botones Anterior / Siguiente. Solo se puede navegar hacia preguntas ya respondidas y la pregunta actual. No se puede saltar a una pregunta futura sin responder.

Al llegar al final del pool (todas respondidas o no quedan preguntas aplicando los filtros), se muestra una pantalla especial como si fuera una pregunta más: "No quedan más preguntas disponibles." Con estadísticas de la sesión y botón para cerrarla y volver.

### Confirmar respuesta

Al pulsar "Confirmar":
1. `sessionStore.addAnswer(testId, { questionId, answeredAt, wasCorrect, selectedOptionIds })`.
2. `questionHistoryStore.recordAnswer(questionId, wasCorrect)`.
3. La `QuestionCard` entra en modo corrección.

### Salir

El botón de volver del Header puede pulsarse en cualquier momento. La sesión queda guardada (`endedAt` no establecido). Al volver al test, se reanuda desde la última pregunta respondida.

No hay "Reiniciar" en indefinite-test. Si se quiere empezar de cero hay que crear un nuevo test.

Para cerrar explícitamente la sesión (desde la pantalla "No quedan preguntas" o desde el menú), se llama a `sessionStore.closeSession(testId)`, que establece `endedAt` y transfiere la sesión a `historyStore.addIndefiniteSession(session)`.

---

## 16. Pestaña "Historial"

Ruta: `/historial`.

### Body, tres secciones

**1. Calendario de actividad (heatmap)**

16 semanas hacia atrás, alineado a lunes. Cada celda es un día. La intensidad del color refleja el número de respuestas correctas ese día, sumando tanto `FixedAttempt`s como respuestas de `IndefiniteSession`s.

- Etiquetas de días en el eje Y: Lun, Mar, Mié, Jue, Vie, Sáb, Dom (mostrar solo Lun/Mié/Vie/Dom para no saturar).
- Etiquetas de meses en el eje X, alineadas a límites de semana.
- Al hacer click o tap en una celda: tooltip con fecha formateada, nº de respondidas y nº de correctas.

**2. Tests en progreso**

Lista de `fixed-tests` con `progressStore` activo + `indefinite-sessions` con `endedAt` indefinido. Para cada uno:
- Nombre del test.
- Fixed: "X / Y respondidas (Z%)." Indefinite: "X respondidas."
- "Abierto [fecha relativa]."
- Click → navega al test.

Refresh de las fechas relativas cada 30 segundos.

**3. Intentos y sesiones completadas**

Lista unificada de `FixedAttempt`s + `IndefiniteSession`s cerradas, ordenada de más reciente a más antiguo.

- Fixed attempt: título del test, fecha, puntuación (`score / maxScore`), aprobado/suspenso. Click → `/historial/:attemptId`.
- Indefinite session: título del test (o descripción de filtros), fecha, "X respondidas · Y correctas · Z%", duración. Click → vista de resumen de sesión (lista de preguntas respondidas con su resultado).

### `AttemptDetailPage` (ruta `/historial/:attemptId`)

Carga el `FixedAttempt` por id desde `historyStore` y renderiza `TestCorrection` en modo lectura.

---

## 17. Datos estáticos de ejemplo

### `packages/curriculum-data/src/index.ts`

Exporta `units: Unit[]`. El árbol de ejemplo cubre al menos:
- Temario genérico de oposiciones (Constitución, Procedimiento Administrativo, Régimen Local).
- Al menos un temario concreto (ej: Ajuntament de Barcelona → Auxiliar Administratiu → temas 1–6).

Cada unit tiene `id`, `name`, `parentId` y `order`.

### `packages/test-data/src/`

Al menos un `FixedTest` de demostración con 6–10 preguntas. Reglas típicas: `correctPoints: 1`, `penaltyPerWrong: 1/3`, `passThreshold: 0.5`. Incluir preguntas de tipo `single` y `multiple`, alguna con `promptImage` y alguna con `explanation`.

---

## 18. Decisiones de diseño no obvias

1. **Timer con timestamp absoluto:** `deadlineAt` es ISO datetime, no "segundos restantes". Sobrevive recargas porque `Date.now()` sigue corriendo. Esto aplica al timer de fixed-test. El timer por pregunta de indefinite-test **no** necesita persistencia porque se reinicia en cada pregunta.

2. **Corrección todo-o-nada:** en preguntas `multiple`, hay que marcar exactamente todas las correctas. Sin crédito parcial.

3. **`<fieldset disabled>` para modo lectura:** `QuestionCard` usa `<fieldset disabled={showCorrection}>` para bloquear todos los controles sin pasar props a cada opción individualmente.

4. **`useScrollSnap` modifica `<html>` directamente:** scroll-snap debe activarse a nivel de documento. El hook cambia `document.documentElement.style` y lo restaura al desmontar.

5. **`useActiveQuestion` con `IntersectionObserver`:** threshold 0.5 — una pregunta está "activa" cuando más del 50% de su altura es visible. Se elige la primera en orden de documento si varias coinciden.

6. **`findByFilters` con serialización canónica:** para detectar tests duplicados, los `unitIds` se ordenan antes de serializar. El resto de campos del filtro se serializa en orden fijo. Si el hash coincide, es el mismo test.

7. **Tests sin guardar:** al pulsar "Comenzar test" sin guardar en el modal de "Crear test", el test se crea con `saved: false`. Existe en `useTestsStore` (para poder reanudar), aparece en el historial si se hace algún intento, pero no en "Tests guardados". El usuario puede guardarlo después desde la TestCard o desde dentro del test.

8. **Sesión indefinite sobrevive recargas:** `useSessionStore` persiste en localStorage. Al recargar mientras hay una sesión activa, se reanuda desde la última pregunta respondida. Las preguntas ya respondidas y su corrección son visibles al navegar hacia atrás.

9. **Timer duro en indefinite-test:** al expirar, la pregunta se bloquea. Si el usuario no había respondido, la pregunta no se registra en el historial (queda sin responder a efectos estadísticos). Se muestra el botón "Siguiente pregunta" para avanzar.

10. **Orden del accordion:** nodos ordenados alfabéticamente por `name` dentro de cada nivel. Desempate por `id`.

11. **Menú dropdown vs. modales:** acciones de navegación (Ir al principio, Ir al final) y toggles de estado (Guardar/Quitar, Historial de pregunta) en el dropdown. Acciones destructivas o que requieren confirmación (Reiniciar, Enviar con preguntas pendientes, Empezar de nuevo sesión) en modales.

---

## 19. Lo que queda pendiente para fases futuras

- **Backend:** autenticación, catálogo en servidor, API REST, sincronización de historial.
- **Versionado de temario:** mecanismo para que cambios en el árbol de Units no rompan el histórico de intentos.
- **US-003 (redo de fallos):** generar un indefinite-test automático con las preguntas falladas.
- **Estadísticas por unidad:** rendimiento del usuario desglosado por tema.
- **Notificaciones de repaso:** recordatorio cuando llevan X días sin repasar una unidad.
- **Social:** compartir tests, estadísticas agregadas, valoraciones.
