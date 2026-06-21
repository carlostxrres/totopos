import { Outlet, useMatch } from "react-router-dom";
import { Header } from "./Header";
import { NavBar } from "./NavBar";

export function AppLayout() {
  const isTestPage = useMatch("/tests/*");
  const isAttemptDetail = useMatch("/historial/:attemptId");
  const isSessionDetail = useMatch("/historial/sesion/:sessionId");

  const showBack = !!(isTestPage || isAttemptDetail || isSessionDetail);

  return (
    <div className="min-h-screen">
      <Header showBack={showBack} />
      <main className="mx-auto max-w-2xl px-4 pb-24 md:pb-8">
        <Outlet />
      </main>
      <NavBar />
    </div>
  );
}
