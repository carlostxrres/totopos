import { useEffect } from "react";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Outlet } from "react-router-dom";
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
import { SettingsPage } from "@/routes/SettingsPage";
import { QuestionsPage } from "@/routes/QuestionsPage";

function Root() {
  const seedFixedTests = useTestsStore((s) => s.seedFixedTests);
  const isDark = useThemeStore((s) => s.isDark);

  useEffect(() => {
    seedFixedTests(fixedTests);
  }, [seedFixedTests]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return <Outlet />;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Root />}>
      <Route element={<AppLayout />}>
        <Route index element={<SavedTestsPage />} />
        <Route path="crear" element={<CreateTestPage />} />
        <Route path="historial" element={<HistoryPage />} />
        <Route path="estadisticas" element={<StatsPage />} />
        <Route path="ajustes" element={<SettingsPage />} />
        <Route path="preguntas" element={<QuestionsPage />} />
        <Route path="historial/sesion/:sessionId" element={<SessionDetailPage />} />
        <Route path="historial/:attemptId" element={<AttemptDetailPage />} />
        <Route path="tests/fixed/:testId" element={<FixedTestPage />} />
        <Route path="tests/indefinite/:testId" element={<IndefiniteTestPage />} />
      </Route>
    </Route>
  ),
);

export default function App() {
  return <RouterProvider router={router} />;
}
