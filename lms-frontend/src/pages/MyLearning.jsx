import { Link } from "react-router-dom";
import { PlayCircle, BookOpen } from "lucide-react";
import { useEnrollment } from "../context/EnrollmentContext";
import { getCategory } from "../data/categories";
import Button from "../components/ui/Button";

export default function MyLearning() {
  const { enrolledCourses } = useEnrollment();

  if (enrolledCourses.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <BookOpen size={40} className="mx-auto text-inkSoft mb-4" />
        <h1 className="font-display font-bold text-2xl text-ink mb-2">No courses yet</h1>
        <p className="text-inkSoft mb-6">Enroll in a course and it'll show up here, ready to pick up anytime.</p>
        <Link to="/courses"><Button size="lg">Browse courses</Button></Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
      <h1 className="font-display font-bold text-2xl text-ink mb-1">My Learning</h1>
      <p className="text-inkSoft text-sm mb-8">{enrolledCourses.length} course{enrolledCourses.length !== 1 ? "s" : ""} in progress</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrolledCourses.map((course) => {
          const cat = getCategory(course.category);
          const progress = course.enrollment?.progress ?? 0;
          return (
            <div key={course.id} className="border border-border rounded-lg overflow-hidden bg-white flex flex-col">
              <div className="relative">
                <img src={course.thumb} alt="" className="w-full aspect-video object-cover" />
                <span className="absolute left-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: cat?.spine }} />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <span className="text-[11px] font-mono uppercase tracking-wider" style={{ color: cat?.spine }}>{cat?.name}</span>
                <h3 className="font-display font-semibold text-ink text-sm mt-1 mb-3 line-clamp-2">{course.title}</h3>

                <div className="mt-auto">
                  <div className="flex items-center justify-between text-xs text-inkSoft mb-1.5 font-mono">
                    <span>{progress}% complete</span>
                    {course.enrollment?.lastLecture && <span className="truncate max-w-[50%]">{course.enrollment.lastLecture}</span>}
                  </div>
                  <div className="h-1.5 rounded-full bg-surfaceAlt mb-4 overflow-hidden">
                    <div className="h-full rounded-full bg-progress" style={{ width: `${progress}%` }} />
                  </div>
                  <Link to={`/learn/${course.id}`}>
                    <Button className="w-full" size="sm">
                      <PlayCircle size={15} /> {progress > 0 ? "Continue" : "Start"} learning
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
