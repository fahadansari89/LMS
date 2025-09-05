import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetPurchasedCoursesQuery } from "@/feature/api/purchaseApi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { TrendingUp, DollarSign, BookOpen } from "lucide-react";

const Dashboard = () => {
  const { data, isSuccess, isError, isLoading } = useGetPurchasedCoursesQuery();

  if (isLoading)
    return <h1 className="text-center text-xl text-gray-600">Loading...</h1>;
  if (isError)
    return (
      <h1 className="text-center text-xl text-red-500">
        Failed to get purchased courses
      </h1>
    );

  // Extract purchased courses safely
  const { purchasedCourse = [] } = data || {};

  const courseData = purchasedCourse.map((course) => ({
    name: course.courseId.courseTitle,
    price: course.courseId.coursePrice,
  }));

  const totalRevenue = purchasedCourse.reduce(
    (acc, element) => acc + (element.amount || 0),
    0
  );

  const totalSales = purchasedCourse.length;

  return (
    <div className="mt-8 space-y-8">
      {/* Top Metrics Section */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {/* Total Sales */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="shadow-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-blue-300 hover:shadow-2xl transition duration-300">
            <CardHeader className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <CardTitle className="text-lg text-gray-800">Total Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-blue-600">{totalSales}</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Total Revenue */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="shadow-xl bg-gradient-to-br from-green-500/20 to-teal-500/20 backdrop-blur-xl border border-green-300 hover:shadow-2xl transition duration-300">
            <CardHeader className="flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-green-600" />
              <CardTitle className="text-lg text-gray-800">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-green-600">₹{totalRevenue}</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Trending Courses */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="shadow-xl bg-gradient-to-br from-pink-500/20 to-red-500/20 backdrop-blur-xl border border-pink-300 hover:shadow-2xl transition duration-300">
            <CardHeader className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-pink-600" />
              <CardTitle className="text-lg text-gray-800">Trending</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-pink-600">
                {purchasedCourse.length > 0
                  ? purchasedCourse[0].courseId.courseTitle
                  : "N/A"}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Chart Section */}
      <Card className="shadow-xl hover:shadow-2xl transition duration-300 bg-white/90 backdrop-blur-lg border border-gray-200">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-700">
            Course Revenue Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          {courseData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={courseData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis
                  dataKey="name"
                  stroke="#6b7280"
                  angle={-25}
                  textAnchor="end"
                  interval={0}
                  tick={{ fontSize: 12 }}
                />
                <YAxis stroke="#6b7280" />
                <Tooltip formatter={(value) => `₹${value}`} />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{ stroke: "#6366f1", strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-gray-500">No data available</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
