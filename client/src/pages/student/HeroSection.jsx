import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
const navigate = useNavigate();
  const searchHandler = (e) => {
    e.preventDefault();
    if(searchQuery.trim() !== ""){
      navigate(`/course/search?query=${searchQuery}`)
    }
    setSearchQuery("");
  }
  return (
    <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-28 px-4 text-center overflow-hidden">
      
      {/* Animated Background Circles */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2 }}
        className="absolute top-10 left-10 w-40 h-40 bg-blue-400 opacity-20 rounded-full blur-2xl"
      />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2 }}
        className="absolute bottom-10 right-10 w-56 h-56 bg-purple-500 opacity-20 rounded-full blur-3xl"
      />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Heading Animation */}
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-white text-5xl md:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg"
        >
          Unlock Your Potential with{" "}
          <span className="text-yellow-300">Lernify</span>
        </motion.h1>

        {/* Subtitle Animation */}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-gray-100 dark:text-gray-400 text-lg md:text-xl mb-8"
        >
          Discover, Learn, and Upskill with our wide range of courses.
        </motion.p>

        {/* Search Bar */}
        <motion.form
          onSubmit={searchHandler}
          values={searchQuery}
          onChange={(e)=>setSearchQuery(e.target.value)}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-2xl overflow-hidden max-w-xl mx-auto mb-6 border border-gray-200 dark:border-gray-700"
        >
          <Input
            type="text"
            placeholder="Search Courses"
            className="flex-grow border-none focus-visible:ring-0 px-6 py-4 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 bg-transparent"
          />
          <Button
            type="submit"
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-r-full hover:opacity-90 transition-all duration-300"
          >
            <Search size={18} /> Search
          </Button>
        </motion.form>

        {/* Explore Button */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <Button onClick={()=>navigate(`/course/search?query`)} className="bg-yellow-400 text-gray-900 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-yellow-300 transition-all duration-300 hover:scale-105">
             Explore Courses
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
