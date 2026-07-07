import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import { courses } from "../data/courses";
import { categories } from "../data/categories";
import CourseCard from "../components/course/CourseCard";

const levels = ["Beginner", "Intermediate", "All Levels"];

export default function CourseCatalog() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") || "";
  const activeCategory = params.get("category") || "";
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = courses.filter((c) => {
      const matchesQuery = q
        ? (c.title + c.subtitle + c.instructor).toLowerCase().includes(q.toLowerCase())
        : true;
      const matchesCategory = activeCategory ? c.category === activeCategory : true;
      const matchesLevel = selectedLevels.length ? selectedLevels.includes(c.level) : true;
      const matchesRating = c.rating >= minRating;
      return matchesQuery && matchesCategory && matchesLevel && matchesRating;
    });

    if (sort === "price-low") result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "price-high") result = [...result].sort((a, b) => b.price - a.price);
    if (sort === "rating") result = [...result].sort((a, b) => b.rating - a.rating);
    if (sort === "newest") result = [...result].reverse();

    return result;
  }, [q, activeCategory, selectedLevels, minRating, sort]);

  const toggleLevel = (level) => {
    setSelectedLevels((prev) => (prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]));
  };

  const setCategory = (id) => {
    const next = new URLSearchParams(params);
    if (id) next.set("category", id); else next.delete("category");
    setParams(next);
  };

  const clearAll = () => {
    setSelectedLevels([]);
    setMinRating(0);
    setParams({});
  };

  const FilterPanel = (
    <div className="space-y-7">
      <div>
        <h3 className="font-display font-semibold text-sm text-ink mb-3">Category</h3>
        <div className="space-y-2">
          <button onClick={() => setCategory("")} className={`block text-sm ${!activeCategory ? "text-primary font-semibold" : "text-inkSoft hover:text-ink"}`}>
            All categories
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={`flex items-center gap-2 text-sm ${activeCategory === c.id ? "text-primary font-semibold" : "text-inkSoft hover:text-ink"}`}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.spine }} />
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-display font-semibold text-sm text-ink mb-3">Level</h3>
        <div className="space-y-2">
          {levels.map((l) => (
            <label key={l} className="flex items-center gap-2 text-sm text-inkSoft cursor-pointer">
              <input type="checkbox" checked={selectedLevels.includes(l)} onChange={() => toggleLevel(l)} className="accent-primary" />
              {l}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-display font-semibold text-sm text-ink mb-3">Rating</h3>
        <div className="space-y-2">
          {[4.5, 4.0, 3.5].map((r) => (
            <label key={r} className="flex items-center gap-2 text-sm text-inkSoft cursor-pointer">
              <input type="radio" name="rating" checked={minRating === r} onChange={() => setMinRating(r)} className="accent-primary" />
              {r}+ stars
            </label>
          ))}
          <label className="flex items-center gap-2 text-sm text-inkSoft cursor-pointer">
            <input type="radio" name="rating" checked={minRating === 0} onChange={() => setMinRating(0)} className="accent-primary" />
            Any rating
          </label>
        </div>
      </div>

      <button onClick={clearAll} className="text-xs font-semibold text-coral">Clear all filters</button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl text-ink">
          {q ? `Results for "${q}"` : activeCategory ? categories.find((c) => c.id === activeCategory)?.name : "All courses"}
        </h1>
        <p className="text-inkSoft text-sm mt-1">{filtered.length} course{filtered.length !== 1 ? "s" : ""}</p>
      </div>

      <div className="flex gap-8">
        <aside className="hidden lg:block w-56 shrink-0">{FilterPanel}</aside>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-5 gap-3">
            <button onClick={() => setShowFilters(true)} className="lg:hidden flex items-center gap-1.5 text-sm font-semibold border border-border rounded-md px-3 py-1.5">
              <SlidersHorizontal size={14} /> Filters
            </button>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="ml-auto text-sm border border-border rounded-md px-3 py-1.5 bg-white"
            >
              <option value="relevance">Sort: Relevance</option>
              <option value="rating">Sort: Highest rated</option>
              <option value="price-low">Sort: Price low to high</option>
              <option value="price-high">Sort: Price high to low</option>
              <option value="newest">Sort: Newest</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-border rounded-lg">
              <p className="font-display font-semibold text-ink mb-1">No courses match those filters</p>
              <p className="text-sm text-inkSoft">Try widening your search or clearing a filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((c) => <CourseCard key={c.id} course={c} />)}
            </div>
          )}
        </div>
      </div>

      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setShowFilters(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-white p-5 overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display font-bold text-ink">Filters</h3>
              <button onClick={() => setShowFilters(false)}><X size={20} /></button>
            </div>
            {FilterPanel}
          </div>
        </div>
      )}
    </div>
  );
}
