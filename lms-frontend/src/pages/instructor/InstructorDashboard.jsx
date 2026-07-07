import { Link } from "react-router-dom";
import { Users, Star, DollarSign, BookOpen, ArrowRight } from "lucide-react";
import { courses } from "../../data/courses";
import { useAuth } from "../../context/AuthContext";

const MY_INSTRUCTOR_ID = "i1"; // demo instructor: Maya Chen

export default function InstructorDashboard() {
  const { user } = useAuth();
  const myCourses = courses.filter((c) => c.instructorId === MY_INSTRUCTOR_ID);
  const totalStudents = myCourses.reduce((s, c) => s + c.students, 0);
  const avgRating = (myCourses.reduce((s, c) => s + c.rating, 0) / myCourses.length).toFixed(1);
  const revenue = myCourses.reduce((s, c) => s + c.students * c.price * 0.02, 0); // mock trailing sales

  const stats = [
    { label: "Total students", value: totalStudents.toLocaleString(), icon: Users, tone: "text-primary bg-primary-light" },
    { label: "Average rating", value: avgRating, icon: Star, tone: "text-highlight-dark bg-highlight/20" },
    { label: "Published courses", value: myCourses.length, icon: BookOpen, tone: "text-coral bg-coral/10" },
    { label: "This month (est.)", value: `₹${Math.round(revenue).toLocaleString()}`, icon: DollarSign, tone: "text-progress bg-progress-light" },
  ];

  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-ink mb-1">Welcome back{user ? `, ${user.name}` : ""}</h1>
      <p className="text-inkSoft text-sm mb-8">Here's how your courses are performing.</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map(({ label, value, icon: Icon, tone }) => (
          <div key={label} className="border border-border rounded-lg p-4">
            <span className={`inline-flex w-9 h-9 rounded-md items-center justify-center mb-3 ${tone}`}>
              <Icon size={17} />
            </span>
            <p className="font-display font-bold text-xl text-ink font-mono">{value}</p>
            <p className="text-xs text-inkSoft">{label}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-bold text-lg text-ink">Your courses</h2>
        <Link to="/instructor/courses" className="text-sm font-semibold text-primary flex items-center gap-1">
          View all <ArrowRight size={14} />
        </Link>
      </div>
      <div className="border border-border rounded-lg divide-y divide-border">
        {myCourses.map((c) => (
          <div key={c.id} className="flex items-center gap-4 p-4">
            <img src={c.thumb} alt="" className="w-24 aspect-video object-cover rounded-md shrink-0" />
            <div className="min-w-0 flex-1">
              <h3 className="font-display font-semibold text-sm text-ink truncate">{c.title}</h3>
              <p className="text-xs text-inkSoft">{c.students.toLocaleString()} students · ★ {c.rating}</p>
            </div>
            <span className="font-mono text-sm text-ink shrink-0">₹{c.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
