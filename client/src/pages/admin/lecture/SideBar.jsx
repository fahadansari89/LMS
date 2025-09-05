import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    {
      name: "Dashboard",
      icon: <ChartNoAxesColumn size={20} />,
      path: "/admin/dashboard",
    },
    {
      name: "Courses",
      icon: <SquareLibrary size={20} />,
      path: "/admin/course",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-[#111827] transition-colors duration-300">
      {/* Sidebar */}
      <div className="hidden lg:flex flex-col w-[260px] space-y-8 border-r border-gray-200 dark:border-gray-700 p-5 fixed top-0 left-0 h-screen shadow-sm bg-white dark:bg-[#1F2937]">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-6 justify-center">
          <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            LMS Admin
          </span>
        </div>

        {/* Navigation */}
        <div className="space-y-2">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300
                  ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
              >
                <span
                  className={`${
                    isActive ? "text-white" : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {item.icon}
                </span>
                <h1 className="font-medium text-[16px]">{item.name}</h1>
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        <div className="absolute bottom-6 left-0 w-full text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2025 LMS Admin
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-[260px] p-6 sm:p-10 transition-all duration-300">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
