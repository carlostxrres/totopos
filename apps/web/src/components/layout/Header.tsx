import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { IconArrowLeft, IconBook2, IconHistory, IconMoon, IconPlus, IconSun } from "@tabler/icons-react";
import { useThemeStore } from "@/store/theme-store";

type HeaderProps = {
  showBack?: boolean;
};

const navLinks = [
  { to: "/", label: "Tests guardados", icon: IconBook2, end: true },
  { to: "/crear", label: "Crear test", icon: IconPlus, end: false },
  { to: "/historial", label: "Historial", icon: IconHistory, end: false },
];

function isNavActive(to: string, pathname: string): boolean {
  if (to === "/") return pathname === "/" || pathname.startsWith("/tests/");
  return pathname === to || pathname.startsWith(`${to}/`);
}

export function Header({ showBack = false }: HeaderProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isDark = useThemeStore((s) => s.isDark);
  const toggleTheme = useThemeStore((s) => s.toggle);

  return (
    <header className="sticky top-0 z-40 h-14 border-b border-border bg-background/95 backdrop-blur">
      <div className="flex h-full items-center gap-2 px-4">
        {showBack && (
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn-ghost -ml-2 flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground"
            aria-label="Volver atrás"
          >
            <IconArrowLeft />
          </button>
        )}

        <span className="font-semibold text-primary">TotOpos</span>

        <button
          type="button"
          onClick={toggleTheme}
          className="ml-auto flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted md:ml-0"
          aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        >
          {isDark ? <IconSun size={18} /> : <IconMoon size={18} />}
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ to, label }) => {
            const active = isNavActive(to, pathname);
            return (
              <NavLink
                key={to}
                to={to}
                className={
                  active
                    ? "rounded-md px-3 py-2 text-sm font-medium transition-colors bg-primary/10 text-primary"
                    : "rounded-md px-3 py-2 text-sm font-medium transition-colors text-muted-foreground hover:bg-muted hover:text-foreground"
                }
              >
                {label}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
