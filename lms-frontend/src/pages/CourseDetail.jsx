import { useParams, Link, useNavigate } from "react-router-dom";
import { Check, Clock, BarChart3, Globe, Signal, ShoppingCart, Heart } from "lucide-react";
import { getCourse, getRelatedCourses } from "../data/courses";
import { getCategory } from "../data/categories";
import StarRating from "../components/course/StarRating";
import CurriculumAccordion from "../components/course/CurriculumAccordion";
import CourseCard from "../components/course/CourseCard";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import { useCart } from "../context/CartContext";
import { useEnrollment } from "../context/EnrollmentContext";

export default function CourseDetail() {
  const { id } = useParams();
  const course = getCourse(id);
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();
  const { isEnrolled, enrollments } = useEnrollment();

  if (!course) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h1 className="font-display font-bold text-2xl text-ink mb-2">Course not found</h1>
        <p className="text-inkSoft mb-6">The course you're looking for doesn't exist or was removed.</p>
        <Link to="/courses"><Button>Browse courses</Button></Link>
      </div>
    );
  }

  const cat = getCategory(course.category);
  const related = getRelatedCourses(course);
  const enrolled = isEnrolled(course.id);
  const inCart = isInCart(course.id);
  const totalLectures = course.curriculum.reduce((s, sec) => s + sec.lectures.length, 0);

  return (
    <div>
      {/* Header */}
      <section className="bg-ink text-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 grid lg:grid-cols-[1fr_380px] gap-10">
          <div className="max-w-2xl">
            <Link to={`/courses?category=${course.category}`} className="text-xs font-mono uppercase tracking-widest" style={{ color: cat?.spine }}>
              {cat?.name}
            </Link>
            <h1 className="font-display font-bold text-2xl md:text-3xl mt-2 mb-3 leading-tight">{course.title}</h1>
            <p className="text-white/70 mb-4">{course.subtitle}</p>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <StarRating rating={course.rating} showCount count={course.ratingCount} />
              <span className="text-white/60 text-sm">{course.students.toLocaleString()} students</span>
            </div>
            <p className="text-sm text-white/70">
              Created by <span className="text-white font-semibold">{course.instructor}</span> · {course.instructorTitle}
            </p>
            <p className="text-xs text-white/50 mt-2">Last updated {course.lastUpdated} · {course.language}</p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 grid lg:grid-cols-[1fr_380px] gap-10 py-10">
        {/* Main content */}
        <div className="min-w-0 space-y-10">
          <div className="border border-border rounded-lg p-6">
            <h2 className="font-display font-bold text-lg text-ink mb-4">What you'll learn</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {course.whatYouWillLearn.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-inkSoft">
                  <Check size={16} className="text-progress mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display font-bold text-lg text-ink mb-4">Course content</h2>
            <p className="text-sm text-inkSoft mb-3">
              {course.curriculum.length} sections · {totalLectures} lectures · {course.hours} total hours
            </p>
            <CurriculumAccordion sections={course.curriculum} unlocked={enrolled} />
          </div>

          <div>
            <h2 className="font-display font-bold text-lg text-ink mb-4">Requirements</h2>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-inkSoft">
              {course.requirements.map((r) => <li key={r}>{r}</li>)}
            </ul>
          </div>

          <div>
            <h2 className="font-display font-bold text-lg text-ink mb-4">Description</h2>
            <p className="text-sm text-inkSoft leading-relaxed">{course.description}</p>
          </div>

          <div className="border-t border-border pt-8">
            <h2 className="font-display font-bold text-lg text-ink mb-4">Instructor</h2>
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-primary-light text-primary font-display font-bold text-xl flex items-center justify-center shrink-0">
                {course.instructor.charAt(0)}
              </div>
              <div>
                <p className="font-display font-semibold text-ink">{course.instructor}</p>
                <p className="text-sm text-inkSoft mb-2">{course.instructorTitle}</p>
                <div className="flex flex-wrap gap-4 text-xs text-inkSoft font-mono">
                  <span>★ {course.rating} rating</span>
                  <span>{course.ratingCount.toLocaleString()} reviews</span>
                  <span>{course.students.toLocaleString()} students</span>
                </div>
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <div className="border-t border-border pt-8">
              <h2 className="font-display font-bold text-lg text-ink mb-5">More {cat?.name} courses</h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {related.map((c) => <CourseCard key={c.id} course={c} />)}
              </div>
            </div>
          )}
        </div>

        {/* Sticky purchase card */}
        <div className="lg:relative">
          <div className="lg:sticky lg:top-24 border border-border rounded-lg shadow-cardHover overflow-hidden bg-white">
            <img src={course.thumb} alt="" className="w-full aspect-video object-cover" />
            <div className="p-5">
              {enrolled ? (
                <>
                  <Badge tone="progress">Enrolled</Badge>
                  <p className="text-sm text-inkSoft mt-3 mb-4">
                    Progress: <span className="font-mono font-semibold text-ink">
                      {enrollments[course.id]?.progress ?? 0}%
                    </span>
                  </p>
                  <Button className="w-full" size="lg" onClick={() => navigate(`/learn/${course.id}`)}>
                    Continue learning
                  </Button>
                </>
              ) : (
                <>
                  <div className="flex items-baseline gap-2 font-mono mb-1">
                    <span className="font-display font-bold text-2xl text-ink">₹{course.price}</span>
                    <span className="text-inkSoft line-through text-sm">₹{course.originalPrice}</span>
                  </div>
                  <p className="text-xs text-coral font-semibold mb-4">
                    {Math.round((1 - course.price / course.originalPrice) * 100)}% off — limited time
                  </p>
                  <div className="space-y-2.5">
                    <Button
                      className="w-full"
                      variant="accent"
                      size="lg"
                      onClick={() => navigate("/checkout", { state: { buyNow: course.id } })}
                    >
                      Buy now
                    </Button>
                    <Button
                      className="w-full"
                      variant={inCart ? "outline" : "primary"}
                      size="lg"
                      onClick={() => { if (!inCart) addToCart(course); else navigate("/cart"); }}
                    >
                      <ShoppingCart size={16} /> {inCart ? "Go to cart" : "Add to cart"}
                    </Button>
                    <Button className="w-full" variant="ghost" size="md">
                      <Heart size={15} /> Wishlist
                    </Button>
                  </div>
                </>
              )}

              <div className="mt-5 pt-5 border-t border-border space-y-2.5 text-sm text-inkSoft">
                <div className="flex items-center gap-2"><Clock size={15} /> {course.hours} hours on-demand video</div>
                <div className="flex items-center gap-2"><Signal size={15} /> Level: {course.level}</div>
                <div className="flex items-center gap-2"><BarChart3 size={15} /> {totalLectures} lectures</div>
                <div className="flex items-center gap-2"><Globe size={15} /> {course.language}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
