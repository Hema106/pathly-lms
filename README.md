# Pathly — Learning Management System (Frontend)

Pathly is a Udemy-style Learning Management System frontend built with **React**, **React Router**, and **Tailwind CSS**. It's a frontend-only prototype — all course data is mocked, so it runs standalone with no backend or database required.

The project demonstrates a full LMS navigation flow: browsing and filtering a course catalog, viewing detailed course pages with curriculum previews, adding courses to a cart, a mock checkout flow, a learner dashboard with progress tracking, and a simple in-browser course player. It also includes a separate instructor area with a dashboard, course management, a multi-section course creation form, and an analytics page.

## Features

- 🏠 **Home** — hero section, category browsing, bestseller and recently-updated course rails
- 🔍 **Course catalog** — search, and filter by category, level, and rating
- 📄 **Course detail pages** — curriculum accordion, instructor info, pricing, related courses
- 🛒 **Cart & checkout** — add-to-cart flow with a mock payment form
- 🎓 **My Learning** — enrolled courses with progress bars
- ▶️ **Course player** — lecture list with mark-as-complete and progress syncing
- 🔐 **Auth (mocked)** — login/signup screens, no real backend
- 👨‍🏫 **Instructor dashboard** — stats overview, course list, course creation form, analytics

## Tech stack

- React (Vite)
- React Router
- Tailwind CSS
- lucide-react (icons)

## Status

This is a frontend-only prototype intended as a starting point — state is held in React Context (in-memory), and there's no real backend, authentication, or payment processing wired in yet.
    course/     CourseCard, StarRating, CurriculumAccordion
    ui/         Button, Badge
  context/      CartContext, AuthContext, EnrollmentContext
  data/         Mock courses.js and categories.js
  pages/        Home, CourseCatalog, CourseDetail, Cart, Checkout,
                MyLearning, CourseLearning, Login, Signup,
                instructor/ (Dashboard, Courses, CourseNew, Analytics)
Notes for extending this into a real product
Replace src/data/courses.js and src/data/categories.js with real API calls
AuthContext, CartContext, and EnrollmentContext are in-memory only — swap in real auth and persistence (a backend API, or Supabase/Firebase, etc.)
Checkout.jsx is a mock payment form — plug in a real payment provider (Stripe, Razorpay, etc.)
