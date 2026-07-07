import { createContext, useContext, useState } from "react";
import { getCourse } from "../data/courses";

const EnrollmentContext = createContext(null);

// Seed a couple of enrollments so "My Learning" has content to demo.
const seedEnrollments = {
  c1: { progress: 62, lastLecture: "Custom hooks", enrolledOn: "2026-05-02" },
  c5: { progress: 18, lastLecture: "Focus modes", enrolledOn: "2026-06-10" },
};

export function EnrollmentProvider({ children }) {
  const [enrollments, setEnrollments] = useState(seedEnrollments);

  const enroll = (courseIds) => {
    setEnrollments((prev) => {
      const next = { ...prev };
      courseIds.forEach((id) => {
        if (!next[id]) next[id] = { progress: 0, lastLecture: null, enrolledOn: new Date().toISOString().slice(0, 10) };
      });
      return next;
    });
  };

  const setProgress = (courseId, progress, lastLecture) => {
    setEnrollments((prev) => ({
      ...prev,
      [courseId]: { ...prev[courseId], progress, lastLecture },
    }));
  };

  const isEnrolled = (courseId) => !!enrollments[courseId];

  const enrolledCourses = Object.keys(enrollments)
    .map((id) => ({ ...getCourse(id), enrollment: enrollments[id] }))
    .filter((c) => c.id);

  return (
    <EnrollmentContext.Provider value={{ enrollments, enroll, setProgress, isEnrolled, enrolledCourses }}>
      {children}
    </EnrollmentContext.Provider>
  );
}

export function useEnrollment() {
  const ctx = useContext(EnrollmentContext);
  if (!ctx) throw new Error("useEnrollment must be used inside EnrollmentProvider");
  return ctx;
}
