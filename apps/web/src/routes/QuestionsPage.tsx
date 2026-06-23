import { useMemo, useState } from "react";
import { units } from "@tot-opos/curriculum-data";
import type { Unit } from "@tot-opos/types";
import { fixedTests } from "@tot-opos/test-data";
import { useQuestionHistoryStore } from "@/store/question-history-store";
import { IconSearch } from "@tabler/icons-react";
import { QuestionRow } from "@/components/QuestionRow";
import PluralizedNoun from "@/components/PluralizedNoun";
import { cn } from "@/lib/cn";

const ALL_QUESTIONS = fixedTests.flatMap((t) => t.questions);

type FilterStatus = "all" | "new" | "correct" | "incorrect";

function getUnitOptions(): { id: string; name: string; depth: number }[] {
  const result: { id: string; name: string; depth: number }[] = [];

  function walk(parentId: string | null, depth: number) {
    const children = units
      .filter((u) => u.parentId === parentId)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    for (const u of children) {
      result.push({ id: u.id, name: u.name, depth });
      walk(u.id, depth + 1);
    }
  }
  walk(null, 0);
  return result;
}

function getAllDescendantIds(unitId: string, allUnits: Unit[]): string[] {
  const ids: string[] = [unitId];
  const children = allUnits.filter((u) => u.parentId === unitId);
  for (const child of children) {
    ids.push(...getAllDescendantIds(child.id, allUnits));
  }
  return ids;
}

export function QuestionsPage() {
  const historyByQuestionId = useQuestionHistoryStore((s) => s.historyByQuestionId);
  const [search, setSearch] = useState("");
  const [filterUnit, setFilterUnit] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");

  const unitOptions = useMemo(() => getUnitOptions(), []);

  const filteredQuestions = useMemo(() => {
    const unitIds =
      filterUnit === "all"
        ? null
        : new Set(getAllDescendantIds(filterUnit, units));

    return ALL_QUESTIONS.filter((q) => {
      if (unitIds && !q.unitIds.some((id) => unitIds.has(id))) {
        return false;
      }

      const history = historyByQuestionId[q.id];
      const timesAnswered = history?.entries.length ?? 0;
      const lastWasCorrect = history?.entries[0]?.wasCorrect;

      if (filterStatus === "new" && timesAnswered > 0) {
        return false;
      }
      if (filterStatus === "correct" && lastWasCorrect !== true) {
        return false;
      }
      if (filterStatus === "incorrect" && lastWasCorrect !== false) {
        return false;
      }

      if (search) {
        const q2 = search.toLowerCase();
        return (
          q.prompt.toLowerCase().includes(q2) ||
          q.options.some((o) => o.text?.toLowerCase().includes(q2))
        );
      }

      return true;
    });
  }, [historyByQuestionId, filterUnit, filterStatus, search]);

  const statusTabs: { id: FilterStatus; label: string }[] = [
    { id: "all", label: "Todas" },
    { id: "new", label: "Nuevas" },
    { id: "correct", label: "Dominadas" },
    { id: "incorrect", label: "Falladas" },
  ];

  return (
    <div className="space-y-4 py-4">
      <div>
        <h1 className="text-lg font-semibold">Banco de preguntas</h1>
        <p className="text-sm text-muted-foreground">{ALL_QUESTIONS.length} preguntas en total</p>
      </div>

      {/* Filters */}
      <div className="space-y-3">
        {/* Search */}
        <div className="flex items-center gap-2 rounded-md border border-border bg-muted px-3 py-2">
          <IconSearch className="shrink-0 text-muted-foreground" size={16} />
          <input
            type="search"
            placeholder="Buscar en enunciados y opciones..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>

        {/* Unit filter */}
        <select
          value={filterUnit}
          onChange={(e) => setFilterUnit(e.target.value)}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">Todas las unidades</option>
          {unitOptions.map(({ id, name, depth }) => (
            <option key={id} value={id}>
              {"  ".repeat(depth)}{name}
            </option>
          ))}
        </select>

        {/* Status filter */}
        <div className="flex gap-1 flex-wrap">
          {statusTabs.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setFilterStatus(id)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                filterStatus === id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted-foreground/20",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <p className="text-xs text-muted-foreground">
        <PluralizedNoun count={filteredQuestions.length} singular="pregunta encontrada" plural="preguntas encontradas" />
      </p>

      {/* Question list */}
      <div className="space-y-3">
        {filteredQuestions.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground italic">
            No hay preguntas con estos filtros.
          </p>
        ) : (
          filteredQuestions.map((q) => (
            <QuestionRow key={q.id} question={q} history={historyByQuestionId[q.id]} />
          ))
        )}
      </div>
    </div>
  );
}
