import { Link } from "react-router-dom";
import { Star, Users, Pencil, PlusCircle } from "lucide-react";
import { courses } from "../../data/courses";
import { getCategory } from "../../data/categories";
import Button from "../../components/ui/Button";

const MY_INSTRUCTOR_ID = "i1";

export default function InstructorCourses() {
  const myCourses = courses.filter((c) => c.instructorId === MY_INSTRUCTOR_ID);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-ink mb-1">My Courses</h1>
          <p className="text-inkSoft text-sm">{myCourses.length} published courses</p>
        </div>
        <Link to="/instructor/courses/new">
          <Button><PlusCircle size={16} /> New course</Button>
        </Link>
      </div>

      <div className="space-y-3">
        {myCourses.map((c) => {
          const cat = getCategory(c.category);
          return (
            <div key={c.id} className="flex items-center gap-4 border border-border rounded-lg p-4">
              <img src={c.thumb} alt="" className="w-28 aspect-video object-cover rounded-md shrink-0" />
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-mono uppercase tracking-wider" style={{ color: cat?.spine }}>{cat?.name}</span>
                <h3 className="font-display font-semibold text-sm text-ink truncate">{c.title}</h3>
                <div className="flex items-center gap-4 text-xs text-inkSoft mt-1">
                  <span className="flex items-center gap-1"><Users size={12} /> {c.students.toLocaleString()}</span>
                  <span className="flex items-center gap-1"><Star size={12} className="text-highlight" fill="currentColor" /> {c.rating}</span>
                  <span className="font-mono">₹{c.price}</span>
                </div>
              </div>
              <Link to={`/courses/${c.id}`}>
                <Button variant="outline" size="sm"><Pencil size={13} /> View</Button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
