import { Button } from "@/components/ui/button";
import ReactPlayer from 'react-player'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import BuyCourseButton from "@/components/BuyCourseButton";
import { useGetCourseDetailWithStatusQuery } from "@/feature/api/purchaseApi";

const CourseDetail = () => {
    const navigate = useNavigate()
    const params = useParams();
    const courseId = params.courseId
    const { data, isLoading, isError } = useGetCourseDetailWithStatusQuery(courseId)

    if (isLoading) {
        return (
            <h1>Loading...</h1>
        )
    }
    if (isError) {
        return (
            <h1>failed to load coourse</h1>
        )
    }
    const { course, purchased } = data
    console.log(data);
    
    const handleContinueCourse = async () => {
        if (purchased) {
            navigate(`/course-progress/${courseId}`)
        }
    }

    
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-8 mt-18"
        >
            {/* Top Section */}
            <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7 }}
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white shadow-lg"
            >
                <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
                    <h1 className="font-extrabold text-2xl md:text-3xl tracking-tight">
                        {course?.courseTitle}
                    </h1>
                    <p className="text-base md:text-lg opacity-80">
                        {course?.subTitle}
                    </p>
                    <p>
                        Created By{" "}
                        <span className="text-[#C0C4FC] underline italic cursor-pointer hover:text-blue-300 transition">
                            {course?.creator.name}
                        </span>
                    </p>
                    <div className="flex items-center gap-2 text-sm opacity-90">
                        <BadgeInfo size={16} />
                        <p>Last updated: {course?.createdAt.split("T")[0]}</p>
                    </div>
                    <p className="opacity-90">Students enrolled:{course?.enrolledStudents.length}</p>
                </div>
            </motion.div>

            {/* Main Section */}
            <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
                {/* Left Side */}
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    className="w-full lg:w-2/3 space-y-6"
                >
                    <h1 className="font-bold text-xl md:text-2xl text-gray-800 dark:text-white">
                        Description
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: course.description }} />


                    {/* Course Content */}
                    <Card className="shadow-lg hover:shadow-xl transition duration-300">
                        <CardHeader>
                            <CardTitle className="text-lg md:text-xl font-semibold">
                                Course Content
                            </CardTitle>
                            <CardDescription> Total lectures: {course.lectures.length}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {course.lectures.map((lecture, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ scale: 1.02 }}
                                    className="flex items-center gap-3 text-sm cursor-pointer p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                                >
                                    {purchased ? (
                                        <PlayCircle size={18} className="text-blue-600" />
                                    ) : (
                                        <Lock size={18} className="text-gray-500" />
                                    )}
                                    <p className="font-medium"> {lecture.lectureTitle} </p>
                                </motion.div>
                            ))}
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Right Side */}
                <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    className="w-full lg:w-1/3"
                >
                    <Card className="shadow-lg hover:shadow-xl transition duration-300">
                        <CardContent className="p-4 flex flex-col">
                            {/* Thumbnail */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="w-full aspect-video rounded-lg overflow-hidden mb-4 bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
                            >
                                <span className="text-gray-600 dark:text-gray-300 text-sm">
                                    {course?.lectures?.length > 0 && course.lectures[0]?.videoUrl ? (
                                        <video
                                            width="100%"
                                            height="100%"
                                            src={course.lectures[0].videoUrl.replace("http://", "https://")}
                                            controls={true}
                                        />
                                        
                                    ) : (
                                        <div className="flex items-center justify-center w-full h-full text-gray-500 dark:text-gray-300 text-sm">
                                            No video available
                                        </div>
                                    )}
                                </span>
                            </motion.div>
                            
                            {/* Lecture Title */}
                            {course?.lectures?.length > 0 ? course.lectures[0].lectureTitle : "No lecture available"}
                            <Separator className="my-3" />

                            {/* Price */}
                            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                                ₹999 <span className="text-sm line-through opacity-60">₹2,999</span>
                            </h1>
                        </CardContent>

                        {/* Buttons */}
                        <CardFooter className="flex justify-center p-4">
                            {purchased ? (
                                <Button onClick={handleContinueCourse} className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white shadow-lg">
                                    Continue Course
                                </Button>
                            ) : (
                                <BuyCourseButton courseId={courseId} />
                            )}
                        </CardFooter>
                    </Card>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default CourseDetail;
