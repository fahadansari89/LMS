import React, { useState } from "react";
import Filter from "./Filter";
import SearchResult from "./SearchResult";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useSearchParams } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetSearchCourseQuery } from "@/feature/api/courseApi";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [selectedCategories, setSelectedCatgories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  const { data, isLoading } = useGetSearchCourseQuery({
    searchQuery: query,
    categories: selectedCategories,
    sortByPrice,
  });

  const isEmpty = !isLoading && data?.courses.length === 0;

  const handleFilterChange = (categories, price) => {
    setSelectedCatgories(categories);
    setSortByPrice(price);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
      {/* Heading */}
      <div className="mb-6 text-center md:text-left">
        <h1 className="font-bold text-2xl md:text-3xl text-gray-900 dark:text-gray-100">
          Search Results for <span className="text-indigo-600">"{query}"</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          Showing the best courses for <span className="font-semibold italic text-indigo-500">{query}</span>
        </p>
      </div>

      {/* Layout */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Filter */}
        <div className="md:w-1/4 w-full">
          <Filter handleFilterChange={handleFilterChange} />
        </div>

        {/* Right Results */}
        <div className="flex-1">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, idx) => <CourseSkeleton key={idx} />)
          ) : isEmpty ? (
            <CourseNotFound />
          ) : (
            data?.courses?.map((course) => (
              <SearchResult key={course._id} course={course} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

const CourseNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl shadow-md">
      <AlertCircle className="text-red-500 h-16 w-16 mb-4 animate-bounce" />
      <h1 className="font-bold text-2xl md:text-4xl text-gray-800 dark:text-gray-100 mb-2">
        No Courses Found 😕
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-5 text-center max-w-md">
        Sorry, we couldn’t find any courses matching your search. Try changing filters or browse all courses.
      </p>
      <Link to="/" className="italic">
        <Button variant="default" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg">
          Browse All Courses
        </Button>
      </Link>
    </div>
  );
};

const CourseSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-4 p-4 mb-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all">
      {/* Image */}
      <div className="h-36 w-full md:w-64 rounded-lg overflow-hidden">
        <Skeleton className="h-full w-full" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 flex-1">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-6 w-28 rounded-md" />
      </div>

      {/* Price / Button */}
      <div className="flex flex-col items-center md:items-end justify-between gap-3">
        <Skeleton className="h-6 w-16 rounded-md" />
        <Skeleton className="h-8 w-24 rounded-md" />
      </div>
    </div>
  );
};
