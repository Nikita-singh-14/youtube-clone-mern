import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ChannelVideos = () => {
    const { username } = useParams();

    const [channel, setChannel] = useState(null);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchChannel = async () => {
            try {
                setLoading(true);

                const response = await fetch(
                    `${API_URL}/user/c/${username}`
                );

                const result = await response.json();

                console.log("Channel response:", result);

                if (!response.ok) {
                    throw new Error(
                        result.message || "Failed to fetch channel"
                    );
                }

                /*
                 * Adjust this according to your backend response.
                 * Common response:
                 *
                 * result.data = {
                 *   channel,
                 *   videos
                 * }
                 */

                setChannel(result.data?.channel);
                setVideos(result.data?.videos || []);

            } catch (error) {
                console.error("Channel error:", error);
            } finally {
                setLoading(false);
            }
        };

        if (username) {
            fetchChannel();
        }
    }, [username, API_URL]);

    const formatDuration = (seconds) => {
        if (!seconds) return "0:00";

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);

        return `${minutes}:${remainingSeconds
            .toString()
            .padStart(2, "0")}`;
    };

    const timeAgo = (date) => {
        const seconds = Math.floor(
            (new Date() - new Date(date)) / 1000
        );

        if (seconds < 60) {
            return `${seconds} seconds ago`;
        }

        const minutes = Math.floor(seconds / 60);

        if (minutes < 60) {
            return `${minutes} minutes ago`;
        }

        const hours = Math.floor(minutes / 60);

        if (hours < 24) {
            return `${hours} hours ago`;
        }

        const days = Math.floor(hours / 24);

        if (days < 30) {
            return `${days} days ago`;
        }

        const months = Math.floor(days / 30);

        return `${months} months ago`;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                Loading channel...
            </div>
        );
    }

    if (!channel) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                Channel not found
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">

            {/* Channel Banner */}
            <div className="w-full h-52 overflow-hidden bg-gray-800">

                <img
                    src={
                        channel.coverImage ||
                        "https://via.placeholder.com/1200x300"
                    }
                    alt="Channel banner"
                    className="w-full h-full object-cover"
                />

            </div>

            {/* Channel Information */}
            <div className="px-6 py-5 flex items-center justify-between">

                <div className="flex items-center gap-5">

                    {/* Avatar */}
                    <img
                        src={
                            channel.avatar ||
                            "https://via.placeholder.com/100"
                        }
                        alt={channel.username}
                        className="w-24 h-24 rounded-full object-cover border-2 border-white"
                    />

                    <div>

                        <h1 className="text-2xl font-bold">
                            {channel.fullName || channel.username}
                        </h1>

                        <p className="text-gray-400">
                            @{channel.username}
                        </p>

                        <p className="text-gray-400 mt-1">
                            {channel.subscribersCount || 0} Subscribers
                        </p>

                    </div>

                </div>

                <button className="bg-purple-500 hover:bg-purple-600 text-black font-semibold px-6 py-3 rounded-md">
                    Subscribe
                </button>

            </div>

            {/* Tabs */}
            <div className="border-b border-gray-700 px-6">

                <div className="flex gap-12">

                    <button className="px-6 py-4 border-b-2 border-purple-500 text-purple-400">
                        Videos
                    </button>

                    <button className="px-6 py-4 text-gray-400">
                        Playlists
                    </button>

                    <button className="px-6 py-4 text-gray-400">
                        Tweets
                    </button>

                    <button className="px-6 py-4 text-gray-400">
                        Subscribed
                    </button>

                </div>

            </div>

            {/* Video List */}
            <div className="p-6">

                {videos.length === 0 ? (

                    <div className="text-center py-20 text-gray-400">
                        No videos uploaded yet.
                    </div>

                ) : (

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

                        {videos.map((video) => (

                            <Link
                                key={video._id}
                                to={`/video/${video._id}`}
                                className="group"
                            >

                                {/* Thumbnail */}
                                <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-800">

                                    <img
                                        src={video.thumbnail}
                                        alt={video.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />

                                    {/* Duration */}
                                    <span className="absolute bottom-2 right-2 bg-black px-2 py-1 rounded text-xs">
                                        {formatDuration(video.duration)}
                                    </span>

                                </div>

                                {/* Video Info */}
                                <div className="mt-3">

                                    <h2 className="font-semibold text-base line-clamp-2 group-hover:text-purple-400">
                                        {video.title}
                                    </h2>

                                    <p className="text-gray-400 text-sm mt-2">
                                        {video.views || 0} Views ·{" "}
                                        {timeAgo(video.createdAt)}
                                    </p>

                                </div>

                            </Link>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
};

export default ChannelVideos;