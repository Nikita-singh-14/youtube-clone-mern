import { useRef, useState } from "react";
import Input from "../Input";
import Button from "../Button";
import { useForm } from "react-hook-form";

const UploadVideo = () => {
  const { register, handleSubmit } = useForm();

  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [video, setVideo] = useState(null);

  const inputRef = useRef(null);

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

    console.log("Selected video:", videoFiles[0]);
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

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    console.log("Video:", video);
  };

  return (
    <div className="flex items-center justify-center w-full p-10">
      <div className="mx-auto w-full max-w-4xl bg-gray-800 rounded-xl p-8 border border-white/10 text-white">


        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">
            Upload Video
          </h2>

          <Button
            type="submit"
            bgColor="bg-green-600"
            className="hover:bg-green-500 border border-white"
            form="upload-video-form"
          >
            Save
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

              {/* Heading */}
              <h3 className="text-white text-xl font-semibold mb-4 text-center">
                Drag and drop video files to upload
              </h3>

              {/* Description */}
              <p className="text-[#91a0bd] text-[17px] mb-6 text-center">
                Your videos will be private until you publish them.
              </p>

              {/* Select Button */}
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

              {/* Hidden Input */}
              <input
                ref={inputRef}
                type="file"
                accept="video/*"
                multiple
                hidden
                onChange={handleFileChange}
              />

              {/* Selected Video */}
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