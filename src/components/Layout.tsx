import { BookOpen, Home, Layers3 } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/n5", label: "N5", icon: BookOpen },
  { to: "/n4", label: "N4", icon: Layers3 }
];

export default function Layout() {
  return (
    <div className="min-h-screen bg-washi text-sumi">
      <header className="sticky top-0 z-20 border-b border-stone-200/80 bg-washi/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <NavLink to="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-vermilion text-lg font-bold text-white">
              漢
            </span>
            <span className="hidden text-base font-bold sm:block">Kanji Challenge</span>
          </NavLink>
          <nav className="flex items-center gap-1 rounded-full border border-stone-200 bg-white p-1 shadow-sm">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  [
                    "flex h-10 items-center gap-2 rounded-full px-3 text-sm font-semibold transition",
                    isActive ? "bg-sumi text-white" : "text-zinc-600 hover:bg-stone-100 hover:text-sumi"
                  ].join(" ")
                }
              >
                <Icon aria-hidden="true" size={17} />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <Outlet />
      </main>
    </div>
  );
}
