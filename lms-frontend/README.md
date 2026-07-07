# Pathly — LMS Frontend (React)

A Udemy-style learning management system frontend built with React, React Router, and Tailwind CSS. Frontend/navigation only — all data is mocked, no backend required.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

To create a production build:

```bash
npm run build
```

## What's included

- **Public catalog**: Home page, course catalog with category/level/rating filters and search, course detail pages with curriculum preview
- **Learner flow**: Cart, mock checkout, "My Learning" dashboard with progress tracking, and a course player page with lecture completion
- **Auth (mocked)**: Login / signup, no real backend — any email/password works
- **Instructor area**: Dashboard with stats, course list, a multi-section course creation form, and an analytics page
- **Navigation**: Sticky navbar with category dropdown, search, cart badge, and a user menu; a separate sidebar layout for the instructor section

## Structure

```
src/
  components/
    layout/     Navbar, Footer, MainLayout, InstructorLayout
    course/     CourseCard, StarRating, CurriculumAccordion
    ui/         Button, Badge
  context/      CartContext, AuthContext, EnrollmentContext
  data/         Mock courses.js and categories.js
  pages/        Home, CourseCatalog, CourseDetail, Cart, Checkout,
                MyLearning, CourseLearning, Login, Signup,
                instructor/ (Dashboard, Courses, CourseNew, Analytics)
```

## Notes for extending this into a real product

- Replace `src/data/courses.js` and `src/data/categories.js` with real API calls
- `AuthContext`, `CartContext`, and `EnrollmentContext` are in-memory only — swap in real auth and persistence (a backend API, or Supabase/Firebase, etc.)
- `Checkout.jsx` is a mock payment form — plug in a real payment provider (Stripe, Razorpay, etc.)
