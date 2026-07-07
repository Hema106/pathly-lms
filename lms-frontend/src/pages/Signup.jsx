import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Button from "../components/ui/Button";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(name || "New Student", email || "student@example.com", role);
    navigate(role === "instructor" ? "/instructor" : "/");
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
        <h1 className="font-display font-bold text-2xl text-ink">Create your account</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 border border-border rounded-lg p-6">
        <label className="flex flex-col gap-1.5 text-sm">
          Full name
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jordan Lee"
            className="border border-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </label>
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
        <div>
          <span className="text-sm block mb-1.5">I want to</span>
          <div className="flex gap-2">
            {["student", "instructor"].map((r) => (
              <button
                type="button"
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 text-sm font-semibold py-2 rounded-md border ${role === r ? "border-primary bg-primary-light text-primary" : "border-border text-inkSoft"}`}
              >
                {r === "student" ? "Learn" : "Teach"}
              </button>
            ))}
          </div>
        </div>
        <Button type="submit" className="w-full" size="lg">Sign up</Button>
        <p className="text-xs text-inkSoft text-center">This is a demo — no verification required.</p>
      </form>

      <p className="text-sm text-inkSoft text-center mt-6">
        Already have an account? <Link to="/login" className="text-primary font-semibold">Log in</Link>
      </p>
    </div>
  );
}
