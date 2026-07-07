import { Link } from "react-router-dom";
import StarRating from "./StarRating";
import Badge from "../ui/Badge";
import { getCategory } from "../../data/categories";

export default function CourseCard({ course }) {
  const cat = getCategory(course.category);

  return (
    <Link
      to={`/courses/${course.id}`}
      className="group relative flex flex-col bg-white rounded-lg overflow-hidden shadow-card hover:shadow-cardHover transition-shadow duration-200"
    >
      {/* Category spine — signature element */}
      <span
        className="absolute left-0 top-0 bottom-0 w-1.5 z-10"
        style={{ backgroundColor: cat?.spine }}
        aria-hidden="true"
      />
      <div className="relative overflow-hidden">
        <img
          src={course.thumb}
          alt=""
          className="w-full aspect-video object-cover group-hover:scale-[1.04] transition-transform duration-300"
          loading="lazy"
        />
        {course.bestseller && (
          <span className="absolute top-2 left-3">
            <Badge tone="highlight">Bestseller</Badge>
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1.5 p-4 pl-5 flex-1">
        <span className="text-[11px] font-mono uppercase tracking-wider" style={{ color: cat?.spine }}>
          {cat?.name}
        </span>
        <h3 className="font-display font-semibold text-ink leading-snug line-clamp-2">{course.title}</h3>
        <p className="text-xs text-inkSoft line-clamp-2">{course.subtitle}</p>
        <p className="text-xs text-inkSoft mt-0.5">{course.instructor}</p>
        <StarRating rating={course.rating} showCount count={course.ratingCount} />
        <div className="mt-auto pt-2 flex items-baseline gap-2 font-mono">
          <span className="font-semibold text-ink">₹{course.price}</span>
          <span className="text-xs text-inkSoft line-through">₹{course.originalPrice}</span>
        </div>
      </div>
    </Link>
  );
}
