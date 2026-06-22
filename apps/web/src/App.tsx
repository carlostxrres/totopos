import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { fixedTests } from "@tot-opos/test-data";
import { AppLayout } from "@/components/layout/AppLayout";
import { useTestsStore } from "@/store/tests-store";
import { useThemeStore } from "@/store/theme-store";
import { SavedTestsPage } from "@/routes/SavedTestsPage";
import { CreateTestPage } from "@/routes/CreateTestPage";
import { HistoryPage } from "@/routes/HistoryPage";
import { AttemptDetailPage } from "@/routes/AttemptDetailPage";
import { SessionDetailPage } from "@/routes/SessionDetailPage";
import { FixedTestPage } from "@/routes/FixedTestPage";
import { IndefiniteTestPage } from "@/routes/IndefiniteTestPage";
import { StatsPage } from "@/routes/StatsPage";

function DataSeeder() {
  const seedFixedTests = useTestsStore((s) => s.seedFixedTests);
  useEffect(() => {
    seedFixedTests(fixedTests);
  }, [seedFixedTests]);
  return null;
}

function ThemeApplier() {
  const isDark = useThemeStore((s) => s.isDark);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <DataSeeder />
      <ThemeApplier />
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<SavedTestsPage />} />
          <Route path="crear" element={<CreateTestPage />} />
          <Route path="historial" element={<HistoryPage />} />
          <Route path="estadisticas" element={<StatsPage />} />
          <Route path="historial/sesion/:sessionId" element={<SessionDetailPage />} />
          <Route path="historial/:attemptId" element={<AttemptDetailPage />} />
          <Route path="tests/fixed/:testId" element={<FixedTestPage />} />
          <Route path="tests/indefinite/:testId" element={<IndefiniteTestPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
