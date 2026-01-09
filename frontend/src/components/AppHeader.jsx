import { NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const AppHeader = () => {
  const base =
    "px-3 py-1.5 rounded-lg text-sm transition";
  const inactive = "text-zinc-600 hover:bg-zinc-100";
  const active = "bg-zinc-200 text-zinc-900";

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 bg-white">
      <span className="text-sm font-medium text-zinc-700">
        StudyApp
      </span>

      <nav className="flex items-center gap-2">
        <NavLink
          to="/subjects"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          Materias
        </NavLink>

        <NavLink
          to="/pomodoro"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          Pomodoro
        </NavLink>
      </nav>

      <LogoutButton />
    </header>
  );
};

export default AppHeader;
