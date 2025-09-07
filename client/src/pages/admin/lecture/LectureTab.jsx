import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { useEditLectureMutation, useGetLectureByIdQuery, useRemoveLectureMutation } from '@/feature/api/courseApi';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { motion } from "framer-motion";

const MEDIA_API = "http://localhost:8080/media";

const LectureTab = () => {
  const [lectureTittle, setLectureTittle] = useState('');
  const [uploadVedioInfo, setUploadVedioInfo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(false);
  const [btnDisable, setBtnDisable] = useState(true);
  const naviagate = useNavigate();
  const params = useParams();
  const { courseId, lectureId } = params;

  const [editLecture, { data, isLoading, error, isSuccess }] = useEditLectureMutation();
  const [removeLecture, { data: removedata, isLoading: removeLoading, isSuccess: removeSuccess }] =
    useRemoveLectureMutation();
    const {data:lectureData, refetch}=useGetLectureByIdQuery(lectureId)
    const lecture=lectureData?.lecture
    useEffect(() => {
      if (lecture) {
        setLectureTittle(lecture.lectureTitle)
        setIsFree(lecture.isPreviewFree)
        setUploadVedioInfo(lecture.videoInfo)
      }
    }, [lecture]) 
    

  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setMediaProgress(true);
      try {
        const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
          onUploadProgress: ({ loaded, total }) => {
            setUploadProgress(Math.round((loaded * 100) / total));
          },
        });
        if (res.data.success) {
          setUploadVedioInfo({ videoUrl: res.data.data.url, publicId: res.data.data.public_id });
          setBtnDisable(false);
          toast.success(res.data.message);
        }
      } catch (error) {
        toast.error("Video upload failed");
      } finally {
        setMediaProgress(false);
      }
    }
  };

  const editLectureHandler = async () => {
    await editLecture({
      lectureTittle,
      videoInfo: uploadVedioInfo,
      isPreviewFree: isFree,
      courseId,
      lectureId,
    });
    refetch();
  };

  const removeLectureHandler = async () => {
    removeLecture(lectureId);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Lecture updated");
      naviagate(`/admin/course/${courseId}/lecture`)
    }
    if (error) {
      toast.error(error.data.message);
    }
  }, [isSuccess, error]);

  useEffect(() => {
    if (removeSuccess) {
      toast.success(removedata.message);
      naviagate();
    }
  }, [removeSuccess]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="shadow-lg rounded-2xl border border-gray-200 p-2">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-2xl font-semibold text-gray-800 dark:text-white">Edit Lecture</CardTitle>
            <CardDescription className="text-gray-500 dark:text-white">
              Make changes and click save when done.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="destructive"
              onClick={removeLectureHandler}
              disabled={removeLoading}
              className="transition-transform hover:scale-105"
            >
              {removeLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait...
                </>
              ) : (
                "Remove Lecture"
              )}
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Title Input */}
          <div>
            <Label className="text-gray-700 dark:text-white">Title</Label>
            <Input
              value={lectureTittle}
              onChange={(e) => setLectureTittle(e.target.value)}
              type="text"
              placeholder="Ex. Introduction to Javascript"
              className="mt-1 border-gray-300 focus:ring-2 focus:ring-[#2563eb] focus:border-[#2563eb]"
            />
          </div>

          {/* Video Upload */}
          <div>
            <Label className="text-gray- dark:text-white">
              Video <span className="text-red-500">*</span>
            </Label>
            <Input
              type="file"
              accept="video/*"
              onChange={fileChangeHandler}
              className="mt-1 w-fit cursor-pointer border-gray-300 focus:ring-2 focus:ring-[#2563eb] focus:border-[#2563eb]"
            />
          </div>

          {/* Free Video Switch */}
          <div className="flex items-center space-x-3">
            <Switch checked={isFree} onCheckedChange={setIsFree} id="airplane-mode" />
            <Label htmlFor="airplane-mode" className="text-gray-700 font-medium dark:text-white">
              Is this video FREE?
            </Label>
          </div>

          {/* Upload Progress */}
          {mediaProgress && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="my-4 space-y-2"
            >
              <Progress value={uploadProgress} />
              <p className="text-sm text-gray-600">{uploadProgress}% uploaded</p>
            </motion.div>
          )}

          {/* Save Button */}
          <div>
            <Button
              disabled={isLoading || btnDisable}
              onClick={editLectureHandler}
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-md transition-transform hover:scale-105"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait...
                </>
              ) : (
                "Update Lecture"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default LectureTab;
