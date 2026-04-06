import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { LayoutDashboard, Globe, TrendingUp, Layers, UserCircle, Menu, X, Landmark } from "lucide-react";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/countries", icon: Globe, label: "Countries" },
  { to: "/equities", icon: TrendingUp, label: "Equities" },
  { to: "/themes", icon: Layers, label: "Themes" },
  { to: "/italy", icon: Landmark, label: "Italy Passport" },
  { to: "/profile", icon: UserCircle, label: "Profile" },
];

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-navy-900 flex">
      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-navy-700 border-b border-navy-500/30 flex items-center justify-between px-4 py-3">
        <button onClick={() => setSidebarOpen(true)} className="text-gray-400 hover:text-white p-1">
          <Menu size={22} />
        </button>
        <h1 className="text-base font-bold text-teal-500">Global Optionality</h1>
        <div className="w-8" />
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/60" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-navy-700 border-r border-navy-500/30 flex flex-col
        transform transition-transform duration-200 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}>
        <div className="p-6 border-b border-navy-500/30 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-teal-500">Global Optionality</h1>
            <p className="text-xs text-gray-400 mt-1">PanBuddha Hub</p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={() => setSidebarOpen(false)}
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
      <main className="flex-1 overflow-auto pt-14 lg:pt-0">
        <Outlet />
      </main>
    </div>
  );
}
