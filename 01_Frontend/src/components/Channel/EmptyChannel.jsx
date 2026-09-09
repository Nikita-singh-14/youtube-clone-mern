import { Play } from "lucide-react";

const EmptyChannel = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-5">

      <div
        className="
          w-13
          h-13
          rounded-full
          bg-[#dbc8ff]
          flex
          items-center
          justify-center
          mb-4
        "
      >
        <Play
          size={26}
          strokeWidth={1.8}
          className="text-[#A56BFF]"
        />
      </div>

      {/* Heading */}
      <h2 className="text-xl font-bold mb-3">
        No videos uploaded
      </h2>

      {/* Description */}
      <p className="text-lg text-white max-w-[550px] leading-7">
        This page has yet to upload a video. Search another
        <br />
        page in order to find more videos.
      </p>

    </div>
  );
};

export default EmptyChannel;