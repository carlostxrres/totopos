// ─── Curriculum ──────────────────────────────────────────────────────────────

export type Unit = {
  id: string;
  name: string;
  parentId: string | null;
  type?: string;
  order?: number;
};

// ─── Questions ───────────────────────────────────────────────────────────────

export type QuestionType = "single" | "multiple";

export type QuestionOption = {
  id: string;
  text?: string;
  image?: string;
  isCorrect: boolean;
};

export type Question = {
  id: string;
  type: QuestionType;
  prompt: string;
  promptImage?: string;
  options: QuestionOption[];
  explanation?: string;
  unitIds: string[];
  metadata?: {
    sourceYear?: number;
    sourceExam?: string;
  };
};

// ─── Tests ───────────────────────────────────────────────────────────────────

export type TestScoringRules = {
  correctPoints: number;
  penaltyPerWrong: number;
  passThreshold: number;
};

export type TestRules = {
  scoring: TestScoringRules;
  navigation: "free" | "linear";
};

export type TestMetadata = {
  category: string;
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
  unitIds: string[];
  saved: boolean;
  rules: TestRules;
  metadata: TestMetadata;
  suggestedMinuteLimit?: number;
};

export type QuestionSelectionMode = "all" | "new-only" | "failed-in-last-days";

export type IndefiniteTestFilters = {
  unitIds: string[];
  excludeAnsweredInLastDays?: number;
  questionSelection: QuestionSelectionMode;
  failedInLastDays?: number;
};

export type IndefiniteTest = {
  id: string;
  type: "indefinite";
  title?: string;
  unitIds: string[];
  saved: boolean;
  filters: IndefiniteTestFilters;
  metadata: TestMetadata;
};

export type Test = FixedTest | IndefiniteTest;

// ─── Timer ───────────────────────────────────────────────────────────────────

export type TimerMode = "hard" | "soft";

export type TestTimer = {
  mode: TimerMode;
  deadlineAt?: string;
  pausedRemainingMs?: number;
};

// ─── Progress ────────────────────────────────────────────────────────────────

export type TestProgress = {
  answers: Record<string, string[]>;
  flaggedQuestionIds: string[];
  lastOpenedAt: string;
  timer?: TestTimer;
};

// ─── Attempts & Sessions ─────────────────────────────────────────────────────

export type FixedAttempt = {
  id: string;
  testId: string;
  testTitle: string;
  completedAt: string;
  score: number;
  maxScore: number;
  passed: boolean;
  answers: Record<string, string[]>;
};

export type IndefiniteAnswer = {
  questionId: string;
  answeredAt: string;
  wasCorrect: boolean;
  selectedOptionIds: string[];
};

export type IndefiniteSession = {
  id: string;
  testId: string;
  testTitle?: string;
  startedAt: string;
  endedAt?: string;
  questionIds: string[];
  answers: IndefiniteAnswer[];
};

// ─── Question History ────────────────────────────────────────────────────────

export type QuestionHistoryEntry = {
  answeredAt: string;
  wasCorrect: boolean;
};

export type QuestionHistory = {
  questionId: string;
  entries: QuestionHistoryEntry[];
};
