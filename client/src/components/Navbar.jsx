import { Menu, School } from 'lucide-react';
import React, { useEffect } from 'react';
import { Button } from './ui/button';
import Logo from "../assets/Logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from './ui/sheet';
import DarkMode from '@/DarkMode';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useLogOutUserMutation } from '@/feature/api/authApi';
import { useSelector } from 'react-redux';
import { Arrow, Separator } from '@radix-ui/react-dropdown-menu';

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((Store) => Store.auth);

  const [logOutUser, { data, isSuccess }] = useLogOutUserMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || 'User logout');
      navigate('/login');
    }
  }, [isSuccess]);

  const logOutHandler = async () => {
    await logOutUser();
  };

  return (
    <>
      <div className="h-16 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 fixed top-0 left-0 right-0 z-50 shadow-sm transition duration-300 overflow-hidden">
        {/* Desktop */}
        <div className="max-w-6xl mx-auto hidden md:flex justify-between items-center gap-10 h-full px-6">
          {/* Logo */}
          <div
            onClick={() => navigate('/')}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img src={Logo} alt="Lernify Logo" className="w-10 h-10 rounded-full shadow-lg" />
            <Link to='/'> <h1 className="hidden md:block font-extrabold text-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
              Lernify
            </h1></Link>

          </div>

          {
            user && (
              <div className='flex items-center gap-5'>
                <Link
                  to="/about"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition"
                >
                  About Us
                </Link>

                <Link
                  to="/admin/course/create"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition"
                >
                  Create Course
                </Link>
              </div>
            )
          }
          {/* Right Side */}
          <div className="flex items-center gap-6">
            {user ? (

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="cursor-pointer hover:scale-105 transition">
                    <AvatarImage
                      src={user?.photoUrl || 'https://github.com/shadcn.png'}
                    />

                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-48 shadow-lg rounded-xl p-2"
                  align="end"
                >
                  <DropdownMenuLabel className="text-gray-700 dark:text-gray-200">
                    My Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                    <Link to="mylearning" className="w-full">
                      My Learning
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                    <Link to="profile" className="w-full">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logOutHandler}
                    className="cursor-pointer hover:bg-red-100 dark:hover:bg-red-900 rounded-md text-red-600 dark:text-red-400"
                  >
                    Logout
                  </DropdownMenuItem>


                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/admin/dashboard')} className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                    Dashboard
                  </DropdownMenuItem>


                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => navigate('/login')}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigate('/login')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition"
                >
                  Signup
                </Button>
              </div>
            )}
            <DarkMode />
          </div>
        </div>

        {/* Mobile Device */}
        <div className="flex md:hidden items-center justify-between px-4 h-full">
          <div
            onClick={() => navigate('/')}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img
              src={Logo}
              alt="Lernify Logo"
              className="w-10 h-10 rounded-full shadow-md hover:scale-105 transition-transform duration-300"
            />
            <h1 className="font-extrabold text-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
              Lernify
            </h1>
          </div>
          <MobileNavbar user={user} />
        </div>
      </div>
    </>
  );
};

export default Navbar;

const MobileNavbar = ({ user }) => {
  const navigate = useNavigate();
  const role = 'instructor';
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
          variant="outline"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-5">
          <div className="flex items-center gap-3">
            <img
              src={Logo}
              alt="Lernify Logo"
              className="w-10 h-10 rounded-full shadow-md hover:scale-105 transition-transform duration-300"
            />
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              Lernify
            </h1>
          </div>
          <DarkMode />
        </SheetHeader>
        <Separator className="mr-2 my-2" />
        <nav className="flex flex-col space-y-4 ml-4 text-lg font-medium">
          <Link to={'/my-learning'}><span className="hover:text-blue-600 cursor-pointer transition">
            My Learning
          </span></Link>
          <Link to={'/profile'}>
            <span className="hover:text-blue-600 cursor-pointer transition">
              Edit Profile
            </span>
          </Link>
          <Link to={'/admin/course'}>
            <span className="hover:text-blue-600 cursor-pointer transition">
             Create course
            </span>
          </Link>

          <span className="hover:text-red-500 cursor-pointer transition">
            Logout
          </span>
        </nav>

        <SheetFooter className="mt-6">
          <SheetClose asChild>
            <Button type='submit' onClick={() => navigate('/admin/dashboard')} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition">
              Dashboard
            </Button>
          </SheetClose>
        </SheetFooter>

      </SheetContent>
    </Sheet>
  );
};
