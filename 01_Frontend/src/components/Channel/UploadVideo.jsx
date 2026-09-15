import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Input from "../Input";
import Button from "../Button";

const UploadVideo = () => {
  const { register, handleSubmit } = useForm();

  const user = useSelector((state) => state.auth.userData);

  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [video, setVideo] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const inputRef = useRef(null);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleFiles = (files) => {
    const selectedFiles = Array.from(files);

    const videoFiles = selectedFiles.filter((file) =>
      file.type.startsWith("video/")
    );

    if (videoFiles.length === 0) {
      setError("Please select a valid video file.");
      return;
    }

    setError("");
    setVideo(videoFiles[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const onSubmit = async (data) => {
  try {
    setError("");

    if (!video) {
      setError("Please select a video.");
      return;
    }

    if (!data.thumbnail || data.thumbnail.length === 0) {
      setError("Please select a thumbnail.");
      return;
    }

    setIsUploading(true);

    const formData = new FormData();

    // IMPORTANT: backend expects "videofile"
    formData.append("videofile", video);

    formData.append("thumbnail", data.thumbnail[0]);
    formData.append("title", data.title);
    formData.append("description", data.description);

    const response = await fetch(
      `${API_URL}/video/upload-video`,
      {
        method: "POST",
        credentials: "include",
        body: formData,
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result?.message || "Failed to upload video"
      );
    }

    console.log("Video uploaded successfully:", result);

    // Redirect to user's channel
    navigate(`/channel/${user?.username}`);

  } catch (error) {
    console.error("Upload video error:", error);
    setError(error?.message || "Failed to upload video.");
  } finally {
    setIsUploading(false);
  }
};

  return (
    <div className="flex items-center justify-center w-full p-10">
      <div className="mx-auto w-full max-w-4xl bg-gray-800 rounded-xl p-8 border border-white/10 text-white">

        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">
            Upload Video
          </h2>

          <Button
            type="submit"
            bgColor="bg-green-600"
            className="hover:bg-green-500 border border-white"
            form="upload-video-form"
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Save"}
          </Button>
        </div>

        <hr className="border-white/10" />

        {/* Error */}
        {error && (
          <p className="text-red-500 mt-5 text-center">
            {error}
          </p>
        )}

        {/* Form */}
        <form
          id="upload-video-form"
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8"
        >
          <div className="space-y-6">

            {/* Video Upload */}
            <div
              className={`
                w-full
                h-96
                border-2 border-dashed
                flex flex-col
                items-center
                justify-center
                transition-all duration-200
                ${
                  isDragging
                    ? "border-[#A56BFF] bg-[#A56BFF]/5"
                    : "border-[#d9d9d9]"
                }
              `}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >

              {/* Upload Icon */}
              <div className="w-30 h-30 rounded-full bg-[#dbc8ff] flex items-center justify-center mb-7.5">
                <svg
                  width="58"
                  height="58"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 16V4"
                    stroke="#A56BFF"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />

                  <path
                    d="M7 9L12 4L17 9"
                    stroke="#A56BFF"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <path
                    d="M5 15V18C5 19.1 5.9 20 7 20H17C18.1 20 19 19.1 19 18V15"
                    stroke="#A56BFF"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <h3 className="text-white text-xl font-semibold mb-4 text-center">
                Drag and drop video files to upload
              </h3>

              <p className="text-[#91a0bd] text-[17px] mb-6 text-center">
                Your videos will be private until you publish them.
              </p>

              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="
                  bg-[#A56BFF]
                  text-black
                  px-4 py-3
                  text-[18px]
                  font-bold
                  cursor-pointer
                  shadow-[6px_6px_0px_#555]
                  hover:bg-[#B47CFF]
                  active:translate-x-0.75
                  active:translate-y-0.75
                  active:shadow-[3px_3px_0px_#555]
                  transition-all
                "
              >
                Select Files
              </button>

              <input
                ref={inputRef}
                type="file"
                accept="video/*"
                hidden
                onChange={handleFileChange}
              />

              {video && (
                <p className="mt-5 text-sm text-gray-300">
                  Selected: {video.name}
                </p>
              )}
            </div>

            {/* Thumbnail */}
            <Input
              label="Thumbnail*"
              placeholder="Select Thumbnail"
              type="file"
              accept="image/*"
              {...register("thumbnail")}
            />

            {/* Title */}
            <Input
              label="Title*"
              placeholder="Enter Title"
              type="text"
              {...register("title")}
            />

            {/* Description */}
            <Input
              label="Description*"
              placeholder="Enter Description"
              type="text"
              {...register("description")}
            />

          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadVideo;