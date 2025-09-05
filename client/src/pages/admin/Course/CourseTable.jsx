import FullPageLoader from "@/components/FullPageLoader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import NoDataImg from "@/assets/undraw_no-data_ig65.svg"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetCreatorCourseQuery } from "@/feature/api/courseApi";
import { Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export function CourseTable() {
  const { data, isLoading, error } = useGetCreatorCourseQuery();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div>
        <FullPageLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] space-y-4">
        <p className="text-red-600 font-semibold text-lg">
          Oops! Something went wrong.
        </p>
        <p className="text-gray-500 text-sm">
          {error?.data?.message ||
            "Failed to fetch courses. Please try again later."}
        </p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (

    <div className="mt-20 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Your Courses
        </h1>
        <Button
          onClick={() => navigate(`create`)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md hover:shadow-lg transition-all duration-300"
        >
          + Create a New Course
        </Button>
      </div>

      {/* If No Courses Found */}
      {data?.courses?.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center bg-white dark:bg-[#1F2937] rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <img
            src={NoDataImg}
            alt="No Courses"
            className="w-72 h-72 mb-6 object-contain"
          />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            No Courses Created Yet
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-center mt-2 max-w-md">
            You haven’t created any courses yet. Start by creating your first
            course and share your knowledge with the world!
          </p>
          <Button
            onClick={() => navigate(`create`)}
            className="mt-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md hover:shadow-lg transition-all duration-300 mb-3"
          >
            Create Your First Course
          </Button>
        </motion.div>
      ) : (
        /* Show Table If Courses Exist */
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg bg-white dark:bg-[#1F2937] overflow-hidden"
        >
          <Table>
            <TableCaption className="text-gray-500 dark:text-gray-400">
              A list of your recently created courses.
            </TableCaption>
            <TableHeader className="bg-gray-100 dark:bg-gray-800">
              <TableRow>
                <TableHead className="w-[120px] text-gray-700 dark:text-gray-300 text-sm font-semibold">
                  Price
                </TableHead>
                <TableHead className="text-gray-700 dark:text-gray-300 text-sm font-semibold">
                  Status
                </TableHead>
                <TableHead className="text-gray-700 dark:text-gray-300 text-sm font-semibold">
                  Title
                </TableHead>
                <TableHead className="text-right text-gray-700 dark:text-gray-300 text-sm font-semibold">
                  Edit
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data?.courses.map((course, index) => (
                <motion.tr
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <TableCell className="font-medium text-gray-800 dark:text-gray-200">
                    {course?.coursePrice || "NA"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`px-3 py-1 rounded-full text-xs ${course?.isPublished
                          ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300"
                          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-300"
                        }`}
                    >
                      {course?.isPublished ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-700 dark:text-gray-300 font-medium">
                    {course.courseTitle}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="transition-transform duration-300 hover:scale-110 hover:bg-blue-100 dark:hover:bg-gray-700"
                      onClick={() => navigate(`${course._id}`)}
                    >
                      <Edit size={18} />
                    </Button>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      )}
    </div>
  );


}

export default CourseTable;
