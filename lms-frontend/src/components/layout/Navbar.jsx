import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, Menu, X, ChevronDown, GraduationCap, LayoutDashboard, LogOut, BookOpen } from "lucide-react";
import { categories } from "../../data/categories";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const [catOpen, setCatOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const catRef = useRef(null);
  const userRef = useRef(null);
  const navigate = useNavigate();
  const { count } = useCart();
  const { user, logout, isAuthenticated } = useAuth();

  useEffect(() => {
    function onClick(e) {
      if (catRef.current && !catRef.current.contains(e.target)) setCatOpen(false);
      if (userRef.current && !userRef.current.contains(e.target)) setUserOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(query.trim() ? `/courses?q=${encodeURIComponent(query.trim())}` : "/courses");
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-1.5 shrink-0 font-display font-bold text-xl text-ink">
          <span className="w-7 h-7 rounded bg-primary flex items-center justify-center">
            <GraduationCap size={17} className="text-white" />
          </span>
          Pathly
        </Link>

        {/* Categories dropdown */}
        <div className="relative hidden md:block" ref={catRef}>
          <button
            onClick={() => setCatOpen((o) => !o)}
            className="flex items-center gap-1 text-sm font-semibold text-ink hover:text-primary px-2 py-2"
          >
            Categories <ChevronDown size={15} className={`transition-transform ${catOpen ? "rotate-180" : ""}`} />
          </button>
          {catOpen && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-cardHover border border-border py-2">
              {categories.map((c) => (
                <Link
                  key={c.id}
                  to={`/courses?category=${c.id}`}
                  onClick={() => setCatOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-ink hover:bg-surfaceAlt"
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.spine }} />
                  {c.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl">
          <div className="relative w-full">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-inkSoft" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search for courses"
              className="w-full pl-9 pr-3 py-2 rounded-full border border-border bg-surfaceAlt text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-white"
            />
          </div>
        </form>

        <div className="flex items-center gap-1 ml-auto">
          <Link
            to="/my-learning"
            className="hidden lg:flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-primary px-3 py-2"
          >
            My Learning
          </Link>

          <Link to="/cart" className="relative p-2 text-ink hover:text-primary" aria-label="Cart">
            <ShoppingCart size={20} />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="relative" ref={userRef}>
              <button
                onClick={() => setUserOpen((o) => !o)}
                className="w-8 h-8 rounded-full bg-primary text-white font-display font-semibold text-sm flex items-center justify-center ml-1"
              >
                {user.name.charAt(0).toUpperCase()}
              </button>
              {userOpen && (
                <div className="absolute top-full right-0 mt-2 w-52 bg-white rounded-lg shadow-cardHover border border-border py-2">
                  <div className="px-4 py-2 border-b border-border mb-1">
                    <p className="text-sm font-semibold text-ink truncate">{user.name}</p>
                    <p className="text-xs text-inkSoft truncate">{user.email}</p>
                  </div>
                  <Link to="/my-learning" onClick={() => setUserOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-ink hover:bg-surfaceAlt">
                    <BookOpen size={15} /> My Learning
                  </Link>
                  <Link to="/instructor" onClick={() => setUserOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-ink hover:bg-surfaceAlt">
                    <LayoutDashboard size={15} /> Instructor Dashboard
                  </Link>
                  <button
                    onClick={() => { logout(); setUserOpen(false); navigate("/"); }}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-coral hover:bg-surfaceAlt w-full text-left"
                  >
                    <LogOut size={15} /> Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2 ml-1">
              <Link to="/login" className="text-sm font-semibold text-ink px-3 py-2 hover:text-primary">Log in</Link>
              <Link to="/signup" className="text-sm font-semibold bg-ink text-white px-4 py-2 rounded-md hover:bg-ink/85">Sign up</Link>
            </div>
          )}

          <button className="md:hidden p-2 text-ink" onClick={() => setMobileOpen((o) => !o)} aria-label="Menu">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border px-4 py-4 space-y-4 bg-white">
          <form onSubmit={handleSearch} className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-inkSoft" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search for courses"
              className="w-full pl-9 pr-3 py-2 rounded-full border border-border bg-surfaceAlt text-sm"
            />
          </form>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((c) => (
              <Link key={c.id} to={`/courses?category=${c.id}`} onClick={() => setMobileOpen(false)} className="text-sm text-ink py-1">
                {c.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2 pt-2 border-t border-border">
            <Link to="/my-learning" onClick={() => setMobileOpen(false)} className="text-sm font-semibold text-ink py-1">My Learning</Link>
            <Link to="/instructor" onClick={() => setMobileOpen(false)} className="text-sm font-semibold text-ink py-1">Instructor Dashboard</Link>
            {!isAuthenticated && (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)} className="text-sm font-semibold text-ink py-1">Log in</Link>
                <Link to="/signup" onClick={() => setMobileOpen(false)} className="text-sm font-semibold text-primary py-1">Sign up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
