import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function EmptyCourseCard() {
  return (
    <div className="w-full flex justify-center items-center mt-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 max-w-md w-full text-center"
      >
        <div className="flex justify-center">
          <div className="bg-blue-100 p-4 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-blue-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 10v6c0 1.1-.9 2-2 2H4a2 2 0 01-2-2v-6" />
              <path d="M12 3l9.5 5.5v.5H2.5v-.5L12 3z" />
            </svg>
          </div>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-4">
          No Courses Enrolled Yet 🎓
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
          Looks like you haven’t enrolled in any courses yet.  
          Start your learning journey today and unlock amazing opportunities!
        </p>
        <Link
          to="/courses"
          className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium shadow-md transition-all"
        >
          Browse Courses
        </Link>
      </motion.div>
    </div>
  );
}
