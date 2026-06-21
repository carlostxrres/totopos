import { NavLink } from "react-router-dom";
import { BookOpenIcon, HistoryIcon, PlusIcon } from "@/components/icons";

const links = [
  { to: "/", label: "Tests", icon: BookOpenIcon, end: true },
  { to: "/crear", label: "Crear", icon: PlusIcon, end: false },
  { to: "/historial", label: "Historial", icon: HistoryIcon, end: false },
];

export function NavBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background md:hidden">
      <div className="flex h-16 items-center justify-around px-2">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-1 py-2 text-xs font-medium transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`
            }
          >
            <Icon />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
