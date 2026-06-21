import { NavLink, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, BookOpenIcon, HistoryIcon, PlusIcon } from "../icons";

type HeaderProps = {
  showBack?: boolean;
};

const navLinks = [
  { to: "/", label: "Tests guardados", icon: BookOpenIcon, end: true },
  { to: "/crear", label: "Crear test", icon: PlusIcon, end: false },
  { to: "/historial", label: "Historial", icon: HistoryIcon, end: false },
];

export function Header({ showBack = false }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 h-14 border-b border-border bg-background/95 backdrop-blur">
      <div className="flex h-full items-center gap-2 px-4">
        {showBack && (
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn-ghost -ml-2 flex h-9 w-9 items-center justify-center rounded-md"
            aria-label="Volver atrás"
          >
            <ArrowLeftIcon />
          </button>
        )}

        <span className="font-semibold text-primary">TotOpos</span>

        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {navLinks.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
