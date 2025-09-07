import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useCreateCourseMutation } from "@/feature/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";

const AddCourse = () => {
    const navigate = useNavigate();
    const [createCourse, { data, isLoading, error, isSuccess }] =
        useCreateCourseMutation();
    const [courseTitle, setCourseTitle] = useState("");
    const [category, setCategory] = useState("");

    const createCourseHandler = async () => {
        await createCourse({ courseTitle, category });
    };

    const getSelectedQuery = (value) => {
        setCategory(value);
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || "Course created.");
            navigate("/admin/course");
        }
    }, [isSuccess, error, data, navigate]);

    return (
        <motion.div
            className="flex justify-center items-center py-10 "
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8 border border-gray-100 dark:bg-[#0A0A0A]"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
            >
                {/* Heading */}
                <div className="mb-6 text-center">
                    <h1 className="font-bold text-2xl text-primary">
                        Let's Add a New Course 🎓
                    </h1>
                    <p className="text-sm text-gray-500 mt-2">
                        Fill in the basic details to create your course.
                    </p>
                </div>

                {/* Form */}
                <div className="space-y-5">
                    {/* Course Title */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                    >
                        <Label className="text-gray-700 font-medium">Title</Label>
                        <Input
                            type="text"
                            value={courseTitle}
                            onChange={(e) => setCourseTitle(e.target.value)}
                            placeholder="Enter your course name"
                            className="mt-1"
                        />
                    </motion.div>

                    {/* Category */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                    >
                        <Label className="text-gray-700 font-medium">Category</Label>
                        <Select onValueChange={getSelectedQuery}>
                            <SelectTrigger className="w-full mt-1">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Category</SelectLabel>
                                    <SelectItem value="Programming Language">Programming Language</SelectItem>
                                    <SelectItem value="Frontend Development">Frontend Development</SelectItem>
                                    <SelectItem value="Backend Development">Backend Development</SelectItem>
                                    <SelectItem value="FullStack Development">FullStack Development</SelectItem>
                                    <SelectItem value="Web Development">Web Development</SelectItem>
                                    <SelectItem value="Mobile Development">Mobile Development</SelectItem>
                                    <SelectItem value="Database">Database</SelectItem>
                                    <SelectItem value="Docker">Docker</SelectItem>
                                    <SelectItem value="Cloud Technology">Cloud Technology</SelectItem>
                                    <SelectItem value="AI Tools">AI Tools</SelectItem>
                                    <SelectItem value="Data Science">Data Science</SelectItem>
                                    <SelectItem value="Data Analyst">Data Analyst</SelectItem>
                                    <SelectItem value="Cyber Security">Cyber Security</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </motion.div>

                    {/* Buttons */}
                    <motion.div
                        className="flex items-center gap-3 pt-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                    >
                        <Button
                            variant="outline"
                            onClick={() => navigate("/admin/course")}
                            className="w-1/2"
                        >
                            Back
                        </Button>
                        <Button
                            disabled={isLoading}
                            onClick={createCourseHandler}
                             className="transition-all duration-300 hover:scale-105 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md hover:shadow-lg w-1/2 "
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </>
                            ) : (
                                "Create"
                            )}
                        </Button>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default AddCourse;
