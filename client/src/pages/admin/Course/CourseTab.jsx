import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import RichTextEditor from '@/components/RichTextEditor';
import { useNavigate, useParams } from 'react-router-dom';
import { useDeleteCourseMutation, useEditCourseMutation, useGetCourseByIdQuery, usePublishCourseMutation } from '@/feature/api/courseApi';
import { toast } from 'sonner';
import { motion } from "framer-motion";

const CourseTab = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: ""
  });

  const params = useParams();
  const courseId = params.courseId;

  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const { data: courseById, isLoading: courseByIdIsLoading, refetch } = useGetCourseByIdQuery(courseId, { refetchOnMountOrArgChange: true });
  const [editCourse, { data, isLoading, isSuccess, error }] = useEditCourseMutation();
  const [publishCourse]=usePublishCourseMutation()
  const [deleteCourse]=useDeleteCourseMutation()

  const handleDelete = async (courseId) => {
  if (window.confirm("Are you sure you want to delete this course?")) {
    try {
      const res = await deleteCourse(courseId).unwrap();
      toast.success(res.message);
      navigate('/admin/course')
      
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete course");
    }
  }
};

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };

  const selectCourseLevel = (value) => {
    setInput({ ...input, courseLevel: value });
  };

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const updateCourseHandler = async () => {
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);
    formData.append("courseThumbnail", input.courseThumbnail);
    await editCourse({ formData, courseId });
  };
const publishStatusHandler=async(action)=>{
  try {
      const response=await publishCourse({courseId, query:action})
      if (response.data) {
        refetch()
        toast.success(response?.data?.message)
      }
  } catch (error) {
    console.log(error);
    
    toast.error("failed to unpublished")
  }
}
  useEffect(() => {
    if (courseById?.course) {
      const course = courseById.course;
      setInput({
        courseTitle: course.courseTitle,
        subTitle: course.subTitle,
        description: course.description,
        category: course.category,
        courseLevel: course.courseLevel,
        coursePrice: course.coursePrice,
        courseThumbnail: course.courseThumbnail
      });
    }
  }, [courseById]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course updated successfully");
    }
    if (error) {
      toast.error(error?.data?.message || "Failed to update");
    }
  }, [isSuccess, error]);

  if (courseByIdIsLoading) {
    return <Loader2 className="h-6 w-6 animate-spin mx-auto mt-10" />;
  }
   

  return (
    <motion.div
      className="mt-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="shadow-lg rounded-2xl border border-gray-200">
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold">Basic Course Information</CardTitle>
            <CardDescription className="text-gray-500">
              Make changes to your course here. Click save when you're done.
            </CardDescription>
          </div>
          <div className="space-x-2 flex">
            <Button disabled={courseById?.course.lectures.length===0} onClick={()=>publishStatusHandler(courseById?.course.isPublished ? "false":"true")} variant="outline" className="transition-all duration-300 hover:scale-105">
               {courseById?.course.isPublished ? "Unpublished" : "Publish"}
            </Button>
            <Button onClick={()=>handleDelete(courseId)} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md hover:shadow-lg transition-all duration-300">
              Remove Course
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-5 mt-5"
          >
            {/* Course Title */}
            <div>
              <Label className="mb-2">Title</Label>
              <Input
                type="text"
                name="courseTitle"
                value={input.courseTitle}
                onChange={changeEventHandler}
                placeholder="Ex. Fullstack Developer"
              />
            </div>

            {/* Subtitle */}
            <div>
              <Label className="mb-2">Subtitle</Label>
              <Input
                type="text"
                name="subTitle"
                value={input.subTitle}
                onChange={changeEventHandler}
                placeholder="Ex. Become a Fullstack Developer in 2 months"
              />
            </div>

            {/* Description */}
            <div>
              <Label className="mb-2">Description</Label>
              <RichTextEditor input={input} setInput={setInput} />
            </div>

            {/* Category, Level, and Price */}
            <div className="flex flex-wrap items-center gap-5">
              <div>
                <Label className="mb-2">Category</Label>
                <Select onValueChange={selectCategory} value={input.category}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Category</SelectLabel>
                      <SelectItem value="Programming Language">Programming Language</SelectItem>
                      <SelectItem value="Frontend Development">Frontend Development</SelectItem>
                      <SelectItem value="Backend Development">Backend Development</SelectItem>
                      <SelectItem value="Fullstack Development">Fullstack Development</SelectItem>
                      <SelectItem value="Web Development">Web Development</SelectItem>
                      <SelectItem value="Mobile Development">Mobile Development</SelectItem>
                      <SelectItem value="Database">Database</SelectItem>
                      <SelectItem value="Docker">Docker</SelectItem>
                      <SelectItem value="Cloud Technologies">Cloud Technologies</SelectItem>
                      <SelectItem value="Ai Tools">Ai Tools</SelectItem>
                      <SelectItem value="Data Science">Data Science</SelectItem>
                      <SelectItem value="Data Analyst">Data Analyst</SelectItem>
                      <SelectItem value="Cyber Security">Cyber Security</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="mb-2">Course Level</Label>
                <Select onValueChange={selectCourseLevel} value={input.courseLevel}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select a course level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Course Level</SelectLabel>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Advance">Advance</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="mb-2">Price (INR)</Label>
                <Input
                  type="number"
                  name="coursePrice"
                  value={input.coursePrice}
                  onChange={changeEventHandler}
                  placeholder="199"
                  className="w-[200px]"
                />
              </div>
            </div>

            {/* Thumbnail */}
            <div>
              <Label className="mb-2">Course Thumbnail</Label>
              <Input
                type="file"
                onChange={selectThumbnail}
                accept="image/*"
                className="w-fit"
              />
              {previewThumbnail && (
                <motion.img
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  src={previewThumbnail}
                  className="w-64 my-3 rounded-xl shadow-md border"
                  alt="Course Thumbnail"
                />
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-5">
              <Button
                variant="outline"
                onClick={() => navigate('/admin/course')}
                className="transition-all duration-300 hover:scale-105"
              >
                Cancel
              </Button>
              <Button
                disabled={isLoading}
                onClick={updateCourseHandler}
                className="transition-all duration-300 hover:scale-105 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md hover:shadow-lg "
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CourseTab;
