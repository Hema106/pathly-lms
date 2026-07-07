import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Button from "../components/ui/Button";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email || "student@example.com");
    navigate(location.state?.from || "/");
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <Link to="/" className="inline-flex items-center gap-2 font-display font-bold text-xl text-ink mb-4">
          <span className="w-7 h-7 rounded bg-primary flex items-center justify-center">
            <GraduationCap size={17} className="text-white" />
          </span>
          Pathly
        </Link>
        <h1 className="font-display font-bold text-2xl text-ink">Log in to your account</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 border border-border rounded-lg p-6">
        <label className="flex flex-col gap-1.5 text-sm">
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          Password
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </label>
        <Button type="submit" className="w-full" size="lg">Log in</Button>
        <p className="text-xs text-inkSoft text-center">This is a demo — any email/password logs you in.</p>
      </form>

      <p className="text-sm text-inkSoft text-center mt-6">
        New to Pathly? <Link to="/signup" className="text-primary font-semibold">Sign up</Link>
      </p>
    </div>
  );
}
