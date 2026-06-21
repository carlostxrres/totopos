import { Link, useLocation } from "react-router-dom";
import { IconBook2, IconHistory, IconPlus } from "@tabler/icons-react";

const links = [
  { to: "/", label: "Tests", icon: IconBook2 },
  { to: "/crear", label: "Crear", icon: IconPlus },
  { to: "/historial", label: "Historial", icon: IconHistory },
];

function isNavActive(to: string, pathname: string): boolean {
  if (to === "/") return pathname === "/" || pathname.startsWith("/tests/");
  return pathname === to || pathname.startsWith(`${to}/`);
}

export function NavBar() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background md:hidden">
      <div className="flex h-16 items-center justify-around px-2">
        {links.map(({ to, label, icon: Icon }) => {
          const active = isNavActive(to, pathname);
          return (
            <Link
              key={to}
              to={to}
              className={`flex flex-1 flex-col items-center gap-1 py-2 text-xs font-medium transition-colors ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
