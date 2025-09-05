import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import React from 'react';
import { Link } from 'react-router-dom';

const Course = ({ course }) => {

  return (
    <Link to={`course-detail/${course._id}`}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        <Card className="overflow-hidden rounded-2xl dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
          {/* Course Image */}
          <div className="relative group">
            <img
              src={course.courseThumbnail}
              alt="course"
              className="w-full h-40 object-cover rounded-t-2xl transition-transform duration-500 group-hover:scale-110"
            />

            {/* Gradient Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl"></div>

            {/* Floating Badge */}
            <div className="absolute top-70 right-3">
              <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs shadow-md">
                {course.courseLevel}
              </Badge>
            </div>
          </div>

          {/* Course Content */}
          <CardContent className="px-5 py-4 space-y-3">
            {/* Course Title */}
            <h1 className="font-bold text-lg truncate hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 cursor-pointer">
              {course.courseTitle}
            </h1>
            

            {/* Instructor */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9 border border-gray-200 dark:border-gray-700 shadow-sm">
                  <AvatarImage src={course.creator?.photoUrl || "https://github.com/shadcn.png"} alt="@shadcn" />
                  <AvatarFallback>FA</AvatarFallback>
                </Avatar>
                <h1 className="font-medium text-sm text-gray-700 dark:text-gray-300">{course.creator?.name}</h1>
              </div>
            </div>

            {/* Price & Enroll Button */}
            <div className="flex items-center justify-between mt-2">
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">{course.coursePrice}</span>
              {/* <button className="px-4 py-1.5 text-sm rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md hover:opacity-90 transition">
                Enroll Now
              </button> */}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>

  );
};

export default Course;
