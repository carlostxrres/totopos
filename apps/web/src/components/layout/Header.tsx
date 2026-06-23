import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { IconArrowLeft, IconBook2, IconHistory, IconMoon, IconPlus, IconSettings, IconSun } from "@tabler/icons-react";
import { useThemeStore } from "@/store/theme-store";
import Logo from "@/components/Logo"
import { type PropsWithChildren } from "react"

type HeaderProps = {
  showBack?: boolean;
};

const navLinks = [
  { to: "/", label: "Tests guardados", icon: IconBook2, end: true, accepted: ["/preguntas", "/tests/"] },
  { to: "/crear", label: "Crear test", icon: IconPlus, end: false },
  { to: "/historial", label: "Historial", icon: IconHistory, end: false },
];

function isNavActive(to: string, accepted: string[] | undefined, pathname: string): boolean {
  if (to === "/") {
    return pathname === "/" || (Array.isArray(accepted) && accepted.some(a => pathname.startsWith(a)));
  }

  return pathname === to || pathname.startsWith(`${to}/`);
}

interface ButtonNextToTitleProps extends PropsWithChildren {
  nav: number;
}

export function Header({ showBack = false }: HeaderProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isDark = useThemeStore((s) => s.isDark);
  const toggleTheme = useThemeStore((s) => s.toggle);

  const ButtonNextToTitle = ({ children, nav }: ButtonNextToTitleProps) => (
    <button
      type="button"
      onClick={() => navigate(nav)}
      className="btn-ghost -ml-2 flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground"
      aria-label="Volver atrás"
    >
      {children}
    </button>
  )

  return (
    <header className="sticky top-0 z-40 h-14 border-b border-border bg-background/95 backdrop-blur">

      <div className="flex h-full items-center gap-2 px-4 justify-between">
        <div className="flex items-center gap-2 px-4">
          {showBack ?
            <ButtonNextToTitle nav={-1}>
              <IconArrowLeft size={24} />
            </ButtonNextToTitle>
            :
            <ButtonNextToTitle nav={0}>
              <Logo size={24} />
            </ButtonNextToTitle>
          }

          <span className="font-semibold text-primary">TotOpos</span>
        </div>


        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ to, accepted, label }) => {
            const active = isNavActive(to, accepted, pathname);
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

        <div className="flex items-center gap-2 px-4">
          <button
            type="button"
            onClick={toggleTheme}
            className="ml-auto flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted md:ml-0"
            aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
          >
            {isDark ? <IconSun size={18} /> : <IconMoon size={18} />}
          </button>
          <NavLink
            to="/ajustes"
            className={({ isActive }) =>
              `flex h-9 w-9 items-center justify-center rounded-md transition-colors ${isActive ? "text-primary" : "text-muted-foreground hover:bg-muted"
              }`
            }
            aria-label="Ajustes"
          >
            <IconSettings size={18} />
          </NavLink>
        </div>
      </div>
    </header>
  );
}
