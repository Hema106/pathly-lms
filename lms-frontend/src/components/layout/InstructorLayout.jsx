import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, BookOpen, PlusCircle, BarChart3, ArrowLeft } from "lucide-react";
import Navbar from "./Navbar";

const links = [
  { to: "/instructor", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/instructor/courses", label: "My Courses", icon: BookOpen },
  { to: "/instructor/courses/new", label: "Create Course", icon: PlusCircle },
  { to: "/instructor/analytics", label: "Analytics", icon: BarChart3 },
];

export default function InstructorLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <aside className="hidden md:flex flex-col w-60 shrink-0 border-r border-border py-6 pr-4 gap-1">
          <NavLink to="/" className="flex items-center gap-2 text-sm text-inkSoft hover:text-ink mb-4 px-3">
            <ArrowLeft size={15} /> Back to Pathly
          </NavLink>
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold transition-colors ${
                  isActive ? "bg-primary-light text-primary" : "text-inkSoft hover:bg-surfaceAlt hover:text-ink"
                }`
              }
            >
              <Icon size={17} /> {label}
            </NavLink>
          ))}
        </aside>
        <main className="flex-1 py-6 px-4 lg:px-8 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
