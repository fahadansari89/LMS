import React from "react";
import {
  
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenu,   // ✅ ADD THIS
} from "./components/ui/dropdown-menu";
import { Button } from "./components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./components/ThemeProvider";

const DarkMode = () => {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative border shadow-sm hover:shadow-md transition"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      {/* ✅ FIX: Use Portal */}
      <DropdownMenuPortal>
        <DropdownMenuContent
          className="bg-white dark:bg-gray-900 border shadow-lg rounded-md p-2 z-[9999]"
          align="end"
          sideOffset={6}  // ✅ Adds spacing from button
        >
          <DropdownMenuItem
            onClick={() => setTheme("light")}
            className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
          >
            Light
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme("dark")}
            className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
          >
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme("system")}
            className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
          >
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};

export default DarkMode;
