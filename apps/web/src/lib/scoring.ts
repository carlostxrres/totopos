import type { FixedTest, Question } from "@tot-opos/types";

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
  const wrongCount = questionResults.filter(
    (r) => !r.isCorrect && r.selectedOptionIds.length > 0,
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
