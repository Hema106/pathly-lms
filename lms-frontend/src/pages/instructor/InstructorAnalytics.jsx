import { courses } from "../../data/courses";

const MY_INSTRUCTOR_ID = "i1";

const monthly = [
  { month: "Feb", value: 42000 },
  { month: "Mar", value: 51000 },
  { month: "Apr", value: 47000 },
  { month: "May", value: 63000 },
  { month: "Jun", value: 71000 },
  { month: "Jul", value: 58000 },
];

export default function InstructorAnalytics() {
  const myCourses = courses.filter((c) => c.instructorId === MY_INSTRUCTOR_ID);
  const max = Math.max(...monthly.map((m) => m.value));

  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-ink mb-1">Analytics</h1>
      <p className="text-inkSoft text-sm mb-8">Estimated revenue and course performance.</p>

      <div className="border border-border rounded-lg p-6 mb-8">
        <h2 className="font-display font-semibold text-ink mb-6">Revenue, last 6 months</h2>
        <div className="flex items-end gap-4 h-48">
          {monthly.map((m) => (
            <div key={m.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
              <span className="text-xs font-mono text-inkSoft">₹{(m.value / 1000).toFixed(0)}k</span>
              <div
                className="w-full rounded-t-md bg-primary/90 hover:bg-primary transition-colors"
                style={{ height: `${(m.value / max) * 100}%` }}
              />
              <span className="text-xs text-inkSoft font-mono">{m.month}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border border-border rounded-lg overflow-hidden">
        <h2 className="font-display font-semibold text-ink px-6 pt-6 pb-4">Course performance</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-inkSoft border-t border-b border-border">
              <th className="font-medium px-6 py-2">Course</th>
              <th className="font-medium px-6 py-2">Students</th>
              <th className="font-medium px-6 py-2">Rating</th>
              <th className="font-medium px-6 py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {myCourses.map((c) => (
              <tr key={c.id} className="border-b border-border last:border-b-0">
                <td className="px-6 py-3 font-display font-medium text-ink max-w-xs truncate">{c.title}</td>
                <td className="px-6 py-3 font-mono text-inkSoft">{c.students.toLocaleString()}</td>
                <td className="px-6 py-3 font-mono text-inkSoft">★ {c.rating}</td>
                <td className="px-6 py-3 font-mono text-inkSoft">₹{c.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
