const VideoGrid = ({ videos }) => {
  return (
    <div className="p-5">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

        {videos.map((video) => (
          <div
            key={video._id}
            className="bg-gray-800 rounded-lg overflow-hidden"
          >

            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full aspect-video object-cover"
            />

            <div className="p-3">

              <h3 className="text-lg font-semibold">
                {video.title}
              </h3>

              <p className="text-gray-400 text-sm mt-1">
                {video.views} views
              </p>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default VideoGrid;