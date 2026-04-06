import { Outlet, NavLink } from "react-router-dom";
import { LayoutDashboard, Globe, TrendingUp, Layers, UserCircle } from "lucide-react";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/countries", icon: Globe, label: "Countries" },
  { to: "/equities", icon: TrendingUp, label: "Equities" },
  { to: "/themes", icon: Layers, label: "Themes" },
  { to: "/profile", icon: UserCircle, label: "Profile" },
];

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-navy-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-navy-700 border-r border-navy-500/30 flex flex-col">
        <div className="p-6 border-b border-navy-500/30">
          <h1 className="text-xl font-bold text-teal-500">Global Optionality</h1>
          <p className="text-xs text-gray-400 mt-1">PanBuddha Hub</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-teal-500/15 text-teal-400 font-medium"
                    : "text-gray-400 hover:text-white hover:bg-navy-500/30"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-navy-500/30 text-xs text-gray-500">
          v0.1.0 — MVP
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
