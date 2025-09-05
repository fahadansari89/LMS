import React from 'react'

const CoursesErrorUi = () => {
  return (
   <>
   <div className="flex flex-col items-center justify-center min-h-[70vh] bg-gray-50 dark:bg-[#141414] px-4">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 max-w-md text-center">
          <div className="flex justify-center">
            <div className="bg-red-100 dark:bg-red-600/20 p-4 rounded-full">
              <AlertTriangle className="w-12 h-12 text-red-500 dark:text-red-400" />
            </div>
          </div>
          <h2 className="mt-6 text-2xl font-bold text-gray-800 dark:text-gray-100">
            Oops! Something went wrong
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            We couldn’t fetch the courses right now. Please try again later.
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-md hover:opacity-90 transition duration-300"
          >
            🔄 Retry
          </button>
        </div>
      </div>
   </>
  )
}

export default CoursesErrorUi