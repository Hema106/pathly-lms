import { Link, useNavigate } from "react-router-dom";
import { Search, Code2, PenTool, Briefcase, Megaphone, Camera, Music2, ArrowRight } from "lucide-react";
import { useState } from "react";
import { categories } from "../data/categories";
import { courses } from "../data/courses";
import CourseCard from "../components/course/CourseCard";
import Button from "../components/ui/Button";

const icons = { Code2, PenTool, Briefcase, Megaphone, Camera, Music2 };

export default function Home() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const bestsellers = courses.filter((c) => c.bestseller);
  const newest = [...courses].slice(-4).reverse();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(q.trim() ? `/courses?q=${encodeURIComponent(q.trim())}` : "/courses");
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-ink relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-2 gap-10 items-center relative z-10">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-highlight mb-4">92,000+ students learning right now</p>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-white leading-[1.1] mb-5">
              Skills change fast.<br /> Keep your shelf stocked.
            </h1>
            <p className="text-white/70 text-base md:text-lg mb-8 max-w-md">
              Practical courses in design, code, business and more — taught by people who do the work, not just talk about it.
            </p>
            <form onSubmit={handleSearch} className="flex max-w-md">
              <div className="relative flex-1">
                <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-inkSoft" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="What do you want to learn?"
                  className="w-full pl-11 pr-3 py-3.5 rounded-l-md text-sm focus:outline-none"
                />
              </div>
              <button className="bg-primary hover:bg-primary-dark text-white font-display font-semibold px-6 rounded-r-md text-sm">
                Search
              </button>
            </form>
          </div>

          {/* Signature: color-coded "shelf" of spines echoing course card motif */}
          <div className="hidden lg:flex justify-end">
            <div className="flex items-end gap-2 h-64">
              {categories.map((c, i) => (
                <Link
                  key={c.id}
                  to={`/courses?category=${c.id}`}
                  className="group relative flex flex-col justify-end w-9 rounded-t-md transition-all hover:w-11"
                  style={{ height: `${55 + i * 8}%`, backgroundColor: c.spine }}
                >
                  <span className="absolute -rotate-90 origin-bottom-left bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono uppercase tracking-widest text-white/90 hidden group-hover:block">
                    {c.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <h2 className="font-display font-bold text-2xl text-ink mb-6">Browse categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((c) => {
            const Icon = icons[c.icon];
            return (
              <Link
                key={c.id}
                to={`/courses?category=${c.id}`}
                className="flex flex-col items-center gap-2.5 p-5 rounded-lg border border-border hover:border-ink/20 hover:shadow-card transition-all text-center"
              >
                <span className="w-11 h-11 rounded-full flex items-center justify-center" style={{ backgroundColor: `${c.spine}1A` }}>
                  <Icon size={20} style={{ color: c.spine }} />
                </span>
                <span className="text-sm font-semibold text-ink">{c.name}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-2xl text-ink">Bestselling courses</h2>
          <Link to="/courses" className="text-sm font-semibold text-primary flex items-center gap-1 hover:gap-2 transition-all">
            View all <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {bestsellers.map((c) => <CourseCard key={c.id} course={c} />)}
        </div>
      </section>

      {/* Newest */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-8 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-2xl text-ink">Recently updated</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {newest.map((c) => <CourseCard key={c.id} course={c} />)}
        </div>
      </section>

      {/* Teach CTA */}
      <section className="bg-progress-light">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-display font-bold text-2xl text-ink mb-2">Become an instructor</h2>
            <p className="text-inkSoft max-w-md">Share what you know. Publish a course and reach students already looking for it.</p>
          </div>
          <Button variant="accent" size="lg" onClick={() => navigate("/instructor")}>
            Start teaching today
          </Button>
        </div>
      </section>
    </div>
  );
}
