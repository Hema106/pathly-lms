import { useMemo, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ChevronLeft, ChevronDown, PlayCircle, CheckCircle2, Circle } from "lucide-react";
import { getCourse } from "../data/courses";
import { useEnrollment } from "../context/EnrollmentContext";
import Button from "../components/ui/Button";

export default function CourseLearning() {
  const { id } = useParams();
  const course = getCourse(id);
  const { isEnrolled, setProgress } = useEnrollment();
  const [openSection, setOpenSection] = useState(0);
  const [completed, setCompleted] = useState(() => new Set());
  const [active, setActive] = useState(course?.curriculum?.[0]?.lectures?.[0] || null);

  const allLectures = useMemo(
    () => (course ? course.curriculum.flatMap((s) => s.lectures.map((l) => ({ ...l, section: s.title }))) : []),
    [course]
  );

  if (!course) return <Navigate to="/my-learning" replace />;
  if (!isEnrolled(course.id)) return <Navigate to={`/courses/${course.id}`} replace />;

  const toggleComplete = (title) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title); else next.add(title);
      const pct = Math.round((next.size / allLectures.length) * 100);
      setProgress(course.id, pct, active?.title);
      return next;
    });
  };

  const goToNext = () => {
    const idx = allLectures.findIndex((l) => l.title === active?.title);
    if (idx < allLectures.length - 1) setActive(allLectures[idx + 1]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-ink">
      <header className="flex items-center gap-4 px-4 py-3 border-b border-white/10 text-white shrink-0">
        <Link to={`/courses/${course.id}`} className="flex items-center gap-1.5 text-sm text-white/80 hover:text-white">
          <ChevronLeft size={17} /> Back
        </Link>
        <h1 className="font-display font-semibold text-sm truncate">{course.title}</h1>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row min-h-0">
        {/* Player */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="aspect-video bg-black flex items-center justify-center relative">
            <PlayCircle size={64} className="text-white/70" />
            <span className="absolute bottom-3 left-4 text-white/80 text-xs font-mono">{active?.title}</span>
          </div>
          <div className="bg-white flex-1 p-6">
            <h2 className="font-display font-bold text-lg text-ink mb-1">{active?.title}</h2>
            <p className="text-sm text-inkSoft mb-5">{active?.section} · {active?.duration}</p>
            <div className="flex gap-3">
              <Button variant={completed.has(active?.title) ? "outline" : "primary"} onClick={() => toggleComplete(active?.title)}>
                {completed.has(active?.title) ? <><CheckCircle2 size={16} /> Completed</> : "Mark as complete"}
              </Button>
              <Button variant="ghost" onClick={goToNext}>Next lecture</Button>
            </div>
          </div>
        </div>

        {/* Curriculum sidebar */}
        <aside className="w-full lg:w-96 shrink-0 bg-white border-t lg:border-t-0 lg:border-l border-border overflow-y-auto max-h-[50vh] lg:max-h-none">
          {course.curriculum.map((section, i) => {
            const isOpen = openSection === i;
            return (
              <div key={section.title} className="border-b border-border">
                <button
                  onClick={() => setOpenSection(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-surfaceAlt text-left"
                >
                  <span className="font-display font-semibold text-sm text-ink">{i + 1}. {section.title}</span>
                  <ChevronDown size={15} className={`text-inkSoft transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <ul>
                    {section.lectures.map((lecture) => {
                      const isActive = active?.title === lecture.title;
                      const isDone = completed.has(lecture.title);
                      return (
                        <li key={lecture.title}>
                          <button
                            onClick={() => setActive(lecture)}
                            className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-sm border-t border-border first:border-t-0 ${isActive ? "bg-primary-light" : "hover:bg-surfaceAlt"}`}
                          >
                            {isDone ? <CheckCircle2 size={15} className="text-progress shrink-0" /> : <Circle size={15} className="text-inkSoft shrink-0" />}
                            <span className={`truncate flex-1 ${isActive ? "text-primary font-semibold" : "text-ink"}`}>{lecture.title}</span>
                            <span className="font-mono text-xs text-inkSoft shrink-0">{lecture.duration}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </aside>
      </div>
    </div>
  );
}
