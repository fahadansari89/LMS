import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useEffect, useState } from 'react';
import Course from './Course';
import { Loader2 } from 'lucide-react';
import { useLoadUserQuery, useUpdateUserMutation } from '@/feature/api/authApi';
import EmptyCourseCard from './EmptyCourseCard';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import FullPageLoader from '@/components/FullPageLoader';

const Profile = () => {
  const [name, setName] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);

  const { data, isLoading, isError, refetch } = useLoadUserQuery();
  const [updateUser, { data: updateUserData, isLoading: updateUserIsLoading, isError: updateUserIsError, isSuccess, error }] =
    useUpdateUserMutation();
    if (isLoading) {
      return(
        <FullPageLoader/>
      )
    }

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(updateUserData?.message || 'Profile updated successfully');
    }
    if (updateUserIsError) {
      toast.error(error?.message || 'Failed to update profile');
    }
  }, [isSuccess, updateUserIsError, error, updateUserData]);

  const user = data?.user || {};
  const enrolled = user?.enrolled || [];

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  const updateUserHandler = async () => {
    const formData = new FormData();
    formData.append('name', name || user.name);
    formData.append('profilePhoto', profilePhoto);
    await updateUser(formData);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin w-8 h-8 text-blue-600" />
        <span className="ml-2 text-gray-700 text-lg">Loading profile...</span>
      </div>
    );
  }

  if (isError || !user?._id) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center">
        <h1 className="text-xl font-semibold text-red-500">Failed to load profile 😢</h1>
        <p className="text-gray-600 mt-2">Please try again later.</p>
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-5xl mx-auto px-6 py-10 mt-18"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Title */}
      <motion.h1
        className="font-bold text-3xl text-center md:text-left bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Profile
      </motion.h1>

      {/* Profile Card */}
      <motion.div
        className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-6 flex flex-col md:flex-row items-center md:items-start gap-8 transition-all hover:shadow-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Avatar */}
        <motion.div
          className="flex flex-col items-center"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Avatar className="h-28 w-28 md:h-36 md:w-36 mb-4 border-4 border-blue-500 shadow-md">
            <AvatarImage src={user.photoUrl || 'https://github.com/shadcn.png'} alt={user.name} />
            <AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="mt-2 bg-blue-600 hover:bg-blue-700">
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>Update your profile details below.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Name</Label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Profile Photo</Label>
                  <Input type="file" accept="image/*" className="col-span-3" onChange={onChangeHandler} />
                </div>
              </div>
              <DialogFooter>
                <Button
                  disabled={updateUserIsLoading}
                  onClick={updateUserHandler}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {updateUserIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* User Details */}
        <div className="flex-1 space-y-3">
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Name:{' '}
            <span className="font-normal text-gray-600 dark:text-gray-400">{user.name}</span>
          </p>
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Email:{' '}
            <span className="font-normal text-gray-600 dark:text-gray-400">{user.email}</span>
          </p>
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Role:{' '}
            <span className="font-normal text-gray-600 dark:text-gray-400">{user.role?.toUpperCase()}</span>
          </p>
        </div>
      </motion.div>

      {/* Enrolled Courses */}
      <motion.div
        className="mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {enrolled.length === 0 ? (
          <EmptyCourseCard />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-5">
            {enrolled.map((course) => (
              <motion.div
                key={course._id}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <Course course={course} />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Profile;
