import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { units } from "@tot-opos/curriculum-data";
import type { FixedTest, IndefiniteTest, IndefiniteTestFilters } from "@tot-opos/types";
import { useTestsStore } from "@/store/tests-store";
import { useQuestionHistoryStore } from "@/store/question-history-store";
import { resolveQuestions } from "@/lib/test-generator";
import { CurriculumDisplay } from "@/components/CurriculumDisplay";
import { TestPreviewDialog } from "@/components/TestPreviewDialog";
import { Button } from "@/components/ui/button";
import { IconSearch } from "@tabler/icons-react";
import PluralizedNoun from "@/components/PluralizedNoun";
import { fixedTests as staticFixedTests } from "@tot-opos/test-data";

type Step = 1 | 2;
type TestType = "fixed" | "indefinite";
type QuestionMode = "all" | "new-only" | "failed-in-last-days";

const ALL_QUESTIONS = staticFixedTests.flatMap((t) => t.questions);

export function CreateTestPage() {
  const navigate = useNavigate();
  const addTest = useTestsStore((s) => s.addTest);
  const findByFilters = useTestsStore((s) => s.findByFilters);
  const questionHistories = useQuestionHistoryStore((s) => s.historyByQuestionId);

  const [step, setStep] = useState<Step>(1);
  const [search, setSearch] = useState("");
  const [selectedUnits, setSelectedUnits] = useState<string[]>([]);

  // Step 2 state
  const [testType, setTestType] = useState<TestType>("fixed");
  const [excludeDays, setExcludeDays] = useState(false);
  const [excludeDaysValue, setExcludeDaysValue] = useState(15);
  const [questionMode, setQuestionMode] = useState<QuestionMode>("all");
  const [failedDays, setFailedDays] = useState(7);
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const [testName, setTestName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [duplicateTestId, setDuplicateTestId] = useState<string | null>(null);

  const filters: IndefiniteTestFilters = useMemo(
    () => ({
      unitIds: selectedUnits,
      excludeAnsweredInLastDays: excludeDays ? excludeDaysValue : undefined,
      questionSelection: questionMode,
      failedInLastDays: questionMode === "failed-in-last-days" ? failedDays : undefined,
    }),
    [selectedUnits, excludeDays, excludeDaysValue, questionMode, failedDays],
  );

  const availableQuestions = useMemo(
    () => resolveQuestions(ALL_QUESTIONS, filters, questionHistories, new Date(), units),
    [filters, questionHistories],
  );

  const minQuestions = Math.min(availableQuestions.length, 5);
  const maxQuestions = availableQuestions.length;

  function buildTest(saved: boolean): FixedTest | IndefiniteTest {
    const trimmedName = testName.trim();
    if (testType === "fixed") {
      const selected = availableQuestions.slice(0, numberOfQuestions);
      return {
        id: crypto.randomUUID(),
        type: "fixed",
        title: trimmedName || `Test fijo — ${new Date().toLocaleDateString("es")}`,
        questions: selected,
        unitIds: selectedUnits,
        saved,
        rules: { scoring: { correctPoints: 1, penaltyPerWrong: 1 / 3, passThreshold: 0.5 }, navigation: "free" },
        metadata: { category: "Personalizado" },
      };
    }
    return {
      id: crypto.randomUUID(),
      type: "indefinite",
      title: trimmedName || undefined,
      unitIds: selectedUnits,
      saved,
      filters,
      metadata: { category: "Personalizado" },
    };
  }

  function handleSave() {
    const existing = testType === "indefinite" ? findByFilters(filters) : undefined;
    if (existing) {
      setDuplicateTestId(existing.id);
      return;
    }
    const test = buildTest(true);
    addTest(test);
    setModalOpen(false);
    navigate("/");
  }

  function handleStart() {
    const existing = testType === "indefinite" ? findByFilters(filters) : undefined;
    if (existing) {
      navigate(`/tests/indefinite/${existing.id}`);
      return;
    }
    const test = buildTest(false);
    addTest(test);
    setModalOpen(false);
    navigate(`/tests/${test.type}/${test.id}`);
  }

  if (step === 1) {
    return (
      <div className="space-y-4 py-4">
        <div className="subheader -mx-4 px-4 py-2 space-y-2">
          <div className="flex items-center gap-2 rounded-md border border-border bg-muted px-3 py-2">
            <IconSearch className="shrink-0 text-muted-foreground" />
            <input
              type="search"
              placeholder="Buscar unidades..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              <PluralizedNoun count={selectedUnits.length} singular="unidad seleccionada" plural="unidades seleccionadas" />
            </span>
            <Button
              variant="primary"
              size="sm"
              disabled={selectedUnits.length === 0}
              onClick={() => setStep(2)}
            >
              Continuar
            </Button>
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-base font-semibold">Paso 1 de 2: escoge las unidades</h2>
          <CurriculumDisplay
            mode="select"
            units={units}
            selected={selectedUnits}
            onChange={setSelectedUnits}
            searchQuery={search}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 py-4">
      <div className="subheader -mx-4 px-4 py-2 flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {availableQuestions.length} preguntas disponibles
        </span>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={() => setStep(1)}>
            ← Unidades
          </Button>
          <Button variant="primary" size="sm" onClick={() => setModalOpen(true)}>
            Crear test
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-base font-semibold">Paso 2 de 2: configuración</h2>
        </div>

        {/* Type */}
        <fieldset className="space-y-2">
          <legend className="text-sm font-medium mb-2">Tipo de test</legend>
          {(["fixed", "indefinite"] as const).map((type) => (
            <label
              key={type}
              className={`option ${testType === type ? "border-primary bg-primary/10" : ""}`}
            >
              <input
                type="radio"
                name="test-type"
                value={type}
                checked={testType === type}
                onChange={() => setTestType(type)}
                className="sr-only"
              />
              <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-current">
                {testType === type && <div className="h-2 w-2 rounded-full bg-current" />}
              </div>
              <div>
                <p className="font-medium text-sm">{type === "fixed" ? "Test fijo" : "Test libre"}</p>
                <p className="text-xs text-muted-foreground">
                  {type === "fixed"
                    ? "Número fijo de preguntas, se envía al terminar."
                    : "Sin límite de preguntas, se deja cuando quieras."}
                </p>
              </div>
            </label>
          ))}
        </fieldset>

        {/* Exclude answered */}
        <div className="space-y-2">
          <label className={`option ${excludeDays ? "border-primary bg-primary/10" : ""}`}>
            <input
              type="checkbox"
              checked={excludeDays}
              onChange={(e) => setExcludeDays(e.target.checked)}
              className="sr-only"
            />
            <div className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border border-current ${excludeDays ? "bg-primary" : ""}`}>
              {excludeDays && <span className="text-[10px] text-primary-foreground">✓</span>}
            </div>
            <div className="flex items-center gap-2 flex-1 flex-wrap">
              <span className="text-sm">Excluir preguntas respondidas en los últimos</span>
              <input
                type="number"
                min={1}
                value={excludeDaysValue}
                onChange={(e) => setExcludeDaysValue(parseInt(e.target.value, 10) || 1)}
                onClick={(e) => e.stopPropagation()}
                disabled={!excludeDays}
                className="w-16 rounded border border-border bg-background px-2 py-0.5 text-sm disabled:opacity-50"
              />
              <span className="text-sm">días.</span>
            </div>
          </label>
        </div>

        {/* Question selection */}
        <fieldset className="space-y-2">
          <legend className="text-sm font-medium mb-2">Selección de preguntas</legend>
          {(["all", "new-only", "failed-in-last-days"] as const).map((mode) => (
            <label
              key={mode}
              className={`option ${questionMode === mode ? "border-primary bg-primary/10" : ""}`}
            >
              <input
                type="radio"
                name="question-mode"
                value={mode}
                checked={questionMode === mode}
                onChange={() => setQuestionMode(mode)}
                className="sr-only"
              />
              <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-current">
                {questionMode === mode && <div className="h-2 w-2 rounded-full bg-current" />}
              </div>
              <div className="flex items-center gap-2 flex-wrap flex-1">
                <span className="text-sm">
                  {mode === "all"
                    ? "Mostrar todo"
                    : mode === "new-only"
                      ? "Solo preguntas nuevas (nunca respondidas)"
                      : "Solo preguntas falladas en los últimos"}
                </span>
                {mode === "failed-in-last-days" && (
                  <>
                    <input
                      type="number"
                      min={1}
                      value={failedDays}
                      onChange={(e) => setFailedDays(parseInt(e.target.value, 10) || 1)}
                      onClick={(e) => e.stopPropagation()}
                      disabled={questionMode !== "failed-in-last-days"}
                      className="w-16 rounded border border-border bg-background px-2 py-0.5 text-sm disabled:opacity-50"
                    />
                    <span className="text-sm">días</span>
                  </>
                )}
              </div>
            </label>
          ))}
        </fieldset>

        {/* Number of questions (fixed only) */}
        {testType === "fixed" && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Número de preguntas</label>
            <input
              type="number"
              min={minQuestions}
              max={maxQuestions}
              value={numberOfQuestions}
              onChange={(e) => setNumberOfQuestions(parseInt(e.target.value, 10))}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="text-xs text-muted-foreground">
              De un total de {availableQuestions.length} preguntas disponibles.
            </p>
          </div>
        )}

        {/* Test name */}
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="test-name">
            Nombre del test
          </label>
          <input
            id="test-name"
            type="text"
            placeholder={
              testType === "fixed"
                ? `Test fijo — ${new Date().toLocaleDateString("es")}`
                : "Test libre"
            }
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
            maxLength={80}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground"
          />
          <p className="text-xs text-muted-foreground">Opcional. Si lo dejas vacío se usará el nombre por defecto.</p>
        </div>
      </div>

      <TestPreviewDialog
        open={modalOpen}
        onOpenChange={setModalOpen}
        title="Crear test"
        summaryItems={[
          { label: "Tipo", value: testType === "fixed" ? "Test fijo" : "Test libre" },
          { label: "Unidades", value: `${selectedUnits.length} seleccionadas` },
          { label: "Preguntas disponibles", value: availableQuestions.length },
          ...(testType === "fixed" ? [{ label: "Preguntas en el test", value: numberOfQuestions }] : []),
          ...(excludeDays ? [{ label: "Excluir respondidas en", value: `${excludeDaysValue} días` }] : []),
          ...(questionMode !== "all" ? [{ label: "Selección", value: questionMode === "new-only" ? "Solo nuevas" : `Falladas en ${failedDays} días` }] : []),
        ]}
        duplicateTestId={duplicateTestId}
        duplicateTestPath={duplicateTestId ? `/tests/${testType}/${duplicateTestId}` : undefined}
        onSave={handleSave}
        onStart={handleStart}
      />

    </div>
  );
}
