import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import HeroSection from './pages/student/HeroSection'
import MainLayout from './layout/MainLayout'
import Courses from './pages/student/Courses'
import MyLearning from './pages/student/MyLearning'
import Profile from './pages/student/Profile'
import Sidebar from './pages/admin/lecture/SideBar'
import Dashboard from './pages/admin/lecture/Dashboard'
import CourseTable from './pages/admin/Course/CourseTable'
import AddCourse from './pages/admin/Course/AddCourse'
import EditCourse from './pages/admin/Course/EditCourse'
import CreateLecture from './pages/admin/lecture/CreateLecture'
import EditLecture from './pages/admin/lecture/EditLecture'
import CourseDetail from './pages/student/CourseDetail'
import CourseProgress from './pages/student/CourseProgress'
import SearchPage from './pages/student/SearchPage'
import { AdminRoute, AuthenticatedUser, ProtectedRoute } from './components/ProtectedRoute'
import PurchaseCourseProtectedRoute from './components/PurchaseCourseProtectedRoute'
import { ThemeProvider } from './components/ThemeProvider'
import SupportChat from './components/SupportChat'
import ForgotPassword from './components/ForgetPassword'
import ResetPassword from './components/ResetPassword'
import Footer from './components/Footer'
import AboutUs from './components/AboutUs'

const appRouter = createBrowserRouter(
  [
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: (
            <>
              <HeroSection />
              <Courses />
              <Footer/>
              {/* <SupportChat/> */}
            </>
          )
        },
        {
          path: "login",
          element: <AuthenticatedUser><Login /></AuthenticatedUser>
        },
        {
          path: "about",
          element: <AboutUs/>
        },
        {
          path: "forgot-password",
          element: <AuthenticatedUser><ForgotPassword /></AuthenticatedUser>
        },
        {
          path: "reset-password/:token",
          element: <AuthenticatedUser><ResetPassword /></AuthenticatedUser>
        },
        {
          path: "mylearning",
          element: <ProtectedRoute><MyLearning /></ProtectedRoute>
        },
        {
          path: "mylearning/course-detail/:courseId",
          element: <ProtectedRoute><CourseDetail /></ProtectedRoute>
        },
        {
          path: "profile",
          element: <ProtectedRoute><Profile /></ProtectedRoute>
        },
        {
          path: "course/search",
          element: <ProtectedRoute><SearchPage /></ProtectedRoute>

        },
        {
          path: "courses",
          element: <Courses />
        },
        {
          path: "courses/course-detail/:courseId",
          element: <ProtectedRoute><CourseDetail /></ProtectedRoute>
        },

        {
          path: "course-detail/:courseId",
          element: <ProtectedRoute><CourseDetail /></ProtectedRoute>
        },
        {
          path: "course-progress/:courseId",
          element: <ProtectedRoute><PurchaseCourseProtectedRoute><CourseProgress /></PurchaseCourseProtectedRoute></ProtectedRoute>
        },
        //admin routes 
        {
          path: "admin",
          element: <Sidebar />,
          children: [
            {
              path: "dashboard",
              element: <Dashboard />
              
            },
            {
              path: "course",
              element: <CourseTable />

            },
            {
              path: "course/create",
              element: <AddCourse />

            },
            {
              path: "course/:courseId",
              element: <EditCourse />

            },
            {
              path: "course/:courseId/lecture",
              element: <CreateLecture />

            },
            {
              path: "course/:courseId/lecture/:lectureId",
              element: <EditLecture />

            },
          ]
        }
      ]
    },
  ]
)
function App() {

  return (
    <main>
      {/* <ThemeProvider>

      </ThemeProvider> */}
      <RouterProvider router={appRouter} />

    </main>
  )
}

export default App
