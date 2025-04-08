import Navbar from "./pages/Navbar";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/HomePage/Home";
import Dashboard from "./pages/DashBoard/Dashboard";
import DashOverview from "./pages/DashBoard/components/DashOverview/DashOverview";
import DashProfile from "./pages/DashBoard/components/DashProfile";
import DashStandards from "./pages/DashBoard/components/DashStandards/DashStandards";
import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  SignUp,
  useAuth,
  UserButton,
} from "@clerk/clerk-react";
import Standard from "./pages/DashBoard/components/DashStandards/Standard";
import { Toaster } from "./components/ui/sonner";
import Learning from "./pages/Learning/Learning";
import AboutUs from "./pages/AboutPage/AboutUs";
import ContactUs from "./pages/ContactPage/ContactUs";
import DashContactMsg from "./pages/DashBoard/components/DashContactMsg";
import CourseDetail from "./pages/Learning/CourseDetail";
import AdminRoute from "./AdminRoute";

function App() {
  const { isSignedIn } = useAuth();

  return (
    <>
      <Toaster position="top-right" richColors />
      {isSignedIn ? (
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learning" element={<Learning />} />
            <Route path="/learning/course/:std/:id" element={<CourseDetail />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route
              path="/dashboard"
              element={
                <AdminRoute>
                  <Dashboard />
                </AdminRoute>
              }
            >
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<DashOverview />} />
              <Route path="profile" element={<DashProfile />} />
              <Route path="standards" element={<DashStandards />} />
              <Route path="standards/:id" element={<Standard />} />
              <Route path="contactMessages" element={<DashContactMsg />} />
            </Route>

            <Route
              path="*"
              element={
                <div className="w-full h-screen flex justify-center items-center text-3xl capitalize text-red-500">
                  not found !
                </div>
              }
            />
          </Routes>
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/*"
              element={
                <div className="w-full h-screen flex justify-center items-center pt-20">
                  <SignIn />
                </div>
              }
            />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
