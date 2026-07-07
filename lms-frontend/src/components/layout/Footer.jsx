import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { categories } from "../../data/categories";

export default function Footer() {
  return (
    <footer className="bg-ink text-white/70 mt-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="flex items-center gap-1.5 font-display font-bold text-lg text-white mb-3">
            <span className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <GraduationCap size={14} className="text-white" />
            </span>
            Pathly
          </Link>
          <p className="text-sm">Learn a new skill, on your own schedule.</p>
        </div>
        <div>
          <h4 className="text-white font-display font-semibold text-sm mb-3">Categories</h4>
          <ul className="space-y-2 text-sm">
            {categories.slice(0, 5).map((c) => (
              <li key={c.id}>
                <Link to={`/courses?category=${c.id}`} className="hover:text-white">{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-display font-semibold text-sm mb-3">Learners</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/courses" className="hover:text-white">Browse courses</Link></li>
            <li><Link to="/my-learning" className="hover:text-white">My learning</Link></li>
            <li><Link to="/cart" className="hover:text-white">Cart</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-display font-semibold text-sm mb-3">Teach</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/instructor" className="hover:text-white">Instructor dashboard</Link></li>
            <li><Link to="/instructor/courses/new" className="hover:text-white">Create a course</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs">
        © {new Date().getFullYear()} Pathly. All rights reserved.
      </div>
    </footer>
  );
}
