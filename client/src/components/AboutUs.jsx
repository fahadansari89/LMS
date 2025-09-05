import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BookOpen, Users, Award, Rocket } from "lucide-react";

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-gray-50 dark:bg-gray-900 min-h-screen pt-20 pb-12"
    >
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 text-center">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white mb-4"
        >
          About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Lernify</span>
        </motion.h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Lernify is your one-stop platform to **learn, grow, and achieve** your goals.
          We provide high-quality courses created by industry experts to help you
          succeed in your career.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-6xl mx-auto px-4 mt-12 grid md:grid-cols-2 gap-8">
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            To empower learners across the globe with the **best-in-class educational content**,
            making quality learning accessible to everyone.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Our Vision</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            To build a **global learning community** where students, teachers, and professionals
            collaborate to **shape the future** of education.
          </p>
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto px-4 mt-16 grid md:grid-cols-3 gap-8">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center"
        >
          <Users className="mx-auto text-blue-600 dark:text-blue-400" size={40} />
          <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-3">10K+</h3>
          <p className="text-gray-600 dark:text-gray-300">Students Enrolled</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center"
        >
          <BookOpen className="mx-auto text-purple-600 dark:text-purple-400" size={40} />
          <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-3">150+</h3>
          <p className="text-gray-600 dark:text-gray-300">Courses Available</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center"
        >
          <Award className="mx-auto text-green-600 dark:text-green-400" size={40} />
          <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-3">50+</h3>
          <p className="text-gray-600 dark:text-gray-300">Expert Instructors</p>
        </motion.div>
      </div>

      {/* Call to Action */}
      <div className="max-w-4xl mx-auto mt-16 text-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-gray-200 mb-6">
            Join thousands of students already achieving their goals with Lernify.
          </p>
          <Button
            onClick={() => navigate("/courses")}
            className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
          >
            Browse Courses
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AboutUs;
