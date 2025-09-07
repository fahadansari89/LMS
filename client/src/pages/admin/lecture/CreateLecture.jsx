import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCreateLectureMutation, useGetCourseLectureQuery } from '@/feature/api/courseApi';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import Lectures from './Lectures';
import { motion } from 'framer-motion';

const CreateLecture = () => {
    const params = useParams();
    const courseId = params.courseId;
    const [lectureTitle, setLectureTitle] = useState('');
    const navigate = useNavigate();
    const [createLecture, { data, isLoading, error, isSuccess }] = useCreateLectureMutation();
    const { data: lectureData, isLoading: lectureLoading, isError: lectureError, refetch } = useGetCourseLectureQuery(courseId);

    const createLectureHandler = async () => {
        createLecture({ lectureTitle, courseId });
    };

    useEffect(() => {
        if (isSuccess) {
            refetch();
            toast.success(data?.message);
            setLectureTitle('');
        }
        if (error) {
            toast.error(error?.data?.message);
        }
    }, [isSuccess, error]);

    return (
        <div className="flex-1 mx-10 mt-10">
            {/* Page Header */}
            <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <h1 className="font-bold text-2xl text-gray-800 dark:text-white">Let's Add Your Lectures</h1>
                <p className="text-gray-500 text-sm mt-1 dark:text-white">
                    Provide a title and start building your lecture list.
                </p>
            </motion.div>

            {/* Form Section */}
            <motion.div
                className="space-y-4 bg-white shadow-md rounded-2xl p-6 border border-gray-100 dark:bg-[#0A0A0A]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Lecture Title */}
                <div>
                    <Label className="mb-2 block">Lecture Title</Label>
                    <Input
                        type="text"
                        value={lectureTitle}
                        onChange={(e) => setLectureTitle(e.target.value)}
                        placeholder="Enter lecture name"
                        className="focus:ring-2 focus:ring-primary transition-all duration-300"
                    />
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-3 pt-3">
                    <Button
                        variant="outline"
                        onClick={() => navigate(`/admin/course/${courseId}`)}
                        className="rounded-xl px-5 transition-all duration-300 hover:scale-105"
                    >
                        Back
                    </Button>
                    <Button
                        disabled={isLoading}
                        onClick={createLectureHandler}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md hover:shadow-lg transition-all duration-300"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Creating...
                            </>
                        ) : (
                            'Create'
                        )}
                    </Button>
                </div>
            </motion.div>

            {/* Lecture List */}
            <motion.div
                className="mt-8 "
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <h2 className="text-lg font-semibold mb-3 text-gray-500 dark:text-white">Lecture List</h2>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 dark:bg-[#0A0A0A]">
                    {lectureLoading ? (
                        <p className="text-gray-500">Loading lectures...</p>
                    ) : lectureError ? (
                        <p className="text-red-500">Failed to load lectures</p>
                    ) : lectureData?.lectures?.length === 0 ? (
                        <p className="text-gray-500">No lectures available</p>
                    ) : (
                        <motion.div
                            className="space-y-3"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: { staggerChildren: 0.1 },
                                },
                            }}
                        >
                            {lectureData.lectures.map((lecture, index) => (
                                <motion.div
                                    key={lecture._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Lectures lecture={lecture} courseId={courseId} index={index} />
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default CreateLecture;
