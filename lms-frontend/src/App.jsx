import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import InstructorLayout from "./components/layout/InstructorLayout";
import Home from "./pages/Home";
import CourseCatalog from "./pages/CourseCatalog";
import CourseDetail from "./pages/CourseDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyLearning from "./pages/MyLearning";
import CourseLearning from "./pages/CourseLearning";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import InstructorDashboard from "./pages/instructor/InstructorDashboard";
import InstructorCourses from "./pages/instructor/InstructorCourses";
import InstructorCourseNew from "./pages/instructor/InstructorCourseNew";
import InstructorAnalytics from "./pages/instructor/InstructorAnalytics";

import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { EnrollmentProvider } from "./context/EnrollmentContext";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <EnrollmentProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/courses" element={<CourseCatalog />} />
                <Route path="/courses/:id" element={<CourseDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/my-learning" element={<MyLearning />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Route>

              <Route path="/learn/:id" element={<CourseLearning />} />

              <Route element={<InstructorLayout />}>
                <Route path="/instructor" element={<InstructorDashboard />} />
                <Route path="/instructor/courses" element={<InstructorCourses />} />
                <Route path="/instructor/courses/new" element={<InstructorCourseNew />} />
                <Route path="/instructor/analytics" element={<InstructorAnalytics />} />
              </Route>

              <Route path="*" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </EnrollmentProvider>
      </CartProvider>
    </AuthProvider>
  );
}
