
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiOutlinePlusSquare,
  AiOutlineUserAdd,
} from "react-icons/ai";

const VideoDetailsPage = () => {
  const { videoId } = useParams();
  const [loading, setLoading] = useState(true);
  const [relatedVideos, setRelatedVideos] = useState([])
  const [comment, setComment] = useState('')
  const [video, setVideo] = useState(null)

  const API_URL = import.meta.env.VITE_API_URL;

  //fetch video details
  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${API_URL}/video/get-video/${videoId}`)
        if(!response.ok){
          throw new Error("failed to fetch video details")
        }
        const data = await response.json()
        console.log("Video Details:", data)
        setVideo(data.data)

      } catch (error) {
        console.log("Error", error)
      } finally {
        setLoading(false)
      }
    }
    fetchVideoDetails()
  }, [videoId, API_URL])

  //fetch related videos
  useEffect(() => {
    const fetchRelatedVideo = async () => {
      try {
        const response = await fetch(`${API_URL}/video/allVideos`)
        if(!response.ok){
          throw new Error("failed to fetch videos")
        }
        const data = await response.json()
        const videos = data.data.videos || [];
        const filteredVideos = videos.filter(
                    (item) => item._id !== videoId
                );
        console.log("Related Videos:", data)
        setRelatedVideos(filteredVideos)
      } catch (error) {
        console.log("Error:", error)
      }
    }
    fetchRelatedVideo()
  }, [API_URL, videoId])

  const formatDate = (date) => {
        if (!date) return "";

        return new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-800 flex justify-center items-center text-white">
        Loading videos...
      </div>
    )
  }

  if (!video) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        <p>Video not found.</p>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-black text-white px-4 py-5">

            <div className="max-w-375 mx-auto">

                {/* Main Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-5">

                    {/* ================= LEFT SECTION ================= */}
                    <div>

                        {/* Video Player */}
                        <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
                            <video
                                src={video.videoFile}
                                poster={video.thumbnail}
                                controls
                                autoPlay
                                className="w-full h-full object-contain"
                            />
                        </div>

                        {/* Video Information */}
                        <div className="border border-gray-700 rounded-xl mt-5 p-5">

                            {/* Title */}
                            <h1 className="text-2xl font-bold">
                                {video.title}
                            </h1>

                            {/* Views + Date */}
                            <p className="text-gray-300 mt-2">
                                {video.views || video.veiws || 0} Views
                                {" · "}
                                {formatDate(video.createdAt)}
                            </p>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-3 mt-5">

                                <button className="flex items-center gap-2 border border-gray-600 rounded-lg px-5 py-2 hover:bg-gray-800">
                                    <AiOutlineLike size={22} />
                                    Like
                                </button>

                                <button className="flex items-center gap-2 border border-gray-600 rounded-lg px-5 py-2 hover:bg-gray-800">
                                    <AiOutlineDislike size={22} />
                                    Dislike
                                </button>

                                <button className="flex items-center gap-2 border border-gray-600 rounded-lg px-5 py-2 hover:bg-gray-800">
                                    <AiOutlinePlusSquare size={22} />
                                    Save
                                </button>

                            </div>

                            {/* Channel */}
                            <div className="flex items-center justify-between mt-6 pb-5 border-b border-gray-700">

                                <div className="flex items-center gap-4">

                                    <img
                                        src={
                                            video.owner?.avatar ||
                                            "https://via.placeholder.com/50"
                                        }
                                        alt="channel"
                                        className="w-12 h-12 rounded-full object-cover"
                                    />

                                    <div>
                                        <h3 className="font-semibold text-lg">
                                            {video.owner?.username ||
                                                video.owner?.fullName ||
                                                "Unknown Channel"}
                                        </h3>

                                        <p className="text-gray-400">
                                            {video.owner?.subscribersCount ||
                                                0}{" "}
                                            Subscribers
                                        </p>
                                    </div>

                                </div>

                                <button className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-black font-semibold px-5 py-3 rounded-md">
                                    <AiOutlineUserAdd size={22} />
                                    Subscribe
                                </button>

                            </div>

                            {/* Description */}
                            <div className="mt-5">
                                <p className="whitespace-pre-line text-gray-200">
                                    {video.description}
                                </p>
                            </div>

                        </div>

                        {/* ================= COMMENTS ================= */}
                        <div className="border border-gray-700 rounded-xl mt-5 p-5">

                            <h2 className="text-xl font-bold mb-5">
                                {video.comments?.length || 0} Comments
                            </h2>

                            {/* Add Comment */}
                            <div className="mb-6">

                                <input
                                    type="text"
                                    value={comment}
                                    onChange={(e) =>
                                        setComment(e.target.value)
                                    }
                                    placeholder="Add a Comment"
                                    className="w-full bg-transparent border border-gray-500 rounded-lg px-4 py-3 outline-none focus:border-white"
                                />

                            </div>

                            <div className="border-t border-gray-700 pt-5">

                                {video.comments?.length > 0 ? (
                                    video.comments.map((item) => (
                                        <div
                                            key={item._id}
                                            className="flex gap-4 py-5 border-b border-gray-700"
                                        >

                                            <img
                                                src={
                                                    item.user?.avatar ||
                                                    "https://via.placeholder.com/45"
                                                }
                                                alt="user"
                                                className="w-10 h-10 rounded-full"
                                            />

                                            <div>
                                                <div className="flex gap-2">
                                                    <h3 className="font-semibold">
                                                        {item.user?.username ||
                                                            "User"}
                                                    </h3>

                                                    <span className="text-gray-400">
                                                        ·{" "}
                                                        {formatDate(
                                                            item.createdAt
                                                        )}
                                                    </span>
                                                </div>

                                                <p className="mt-2 text-gray-200">
                                                    {item.content}
                                                </p>
                                            </div>

                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-400">
                                        No comments yet.
                                    </p>
                                )}

                            </div>

                        </div>

                    </div>

                    {/* ================= RIGHT SECTION ================= */}
                    <div>

                        <h2 className="text-xl font-bold mb-4">
                            Related Videos
                        </h2>

                        <div className="flex flex-col gap-4">

                            {relatedVideos.map((item) => (
                                <Link
                                    key={item._id}
                                    to={`/video/${item._id}`}
                                    className="flex gap-3 border border-gray-700 p-2 hover:bg-gray-900"
                                >

                                    {/* Thumbnail */}
                                    <div className="relative w-47.5 h-27.5 shrink-0">

                                        <img
                                            src={item.thumbnail}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                        />

                                        {item.duration && (
                                            <span className="absolute bottom-1 right-1 bg-black px-1 text-sm">
                                                {item.duration}
                                            </span>
                                        )}

                                    </div>

                                    {/* Video Information */}
                                    <div className="min-w-0">

                                        <h3 className="font-semibold line-clamp-2">
                                            {item.title}
                                        </h3>

                                        <p className="text-gray-400 mt-2">
                                            {item.owner?.username ||
                                                "Channel"}
                                        </p>

                                        <p className="text-gray-400 text-sm">
                                            {item.views ||
                                                item.veiws ||
                                                0}{" "}
                                            Views ·{" "}
                                            {formatDate(item.createdAt)}
                                        </p>

                                    </div>

                                </Link>
                            ))}

                        </div>

                    </div>

                </div>

            </div>

        </div>
  )
}

export default VideoDetailsPage