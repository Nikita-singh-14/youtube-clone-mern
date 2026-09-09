import { Link } from "react-router-dom";
const VideoCard = ({
    video,
    thumbnail,
    description,
    createdAt,
    views,
    duration }) => {

    const formatDuration = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = Math.floor(seconds % 60);

        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, "0")}:${remainingSeconds
                .toString()
                .padStart(2, "0")}`;
        }

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

    return (
        <div className="group cursor-pointer hover:bg-gray-700 hover:rounded-2xl p-4">
            <Link to={`/video/${video._id}`}>
            <div className="relative w-full aspect-video overflow-hidden rounded-lg">
                <img
                    src={thumbnail}
                    alt={description}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute bottom-2 right-2 bg-black text-white text-xs px-1.5 py-0.5 rounded">
                    {formatDuration(duration)}
                </span>
            </div>

            <div className="flex gap-3 mt-3">
                <div className="shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white font-semibold">
                        C
                    </div>
                </div>

                <div className="flex-1 min-w-0">

                    {/* Title */}
                    <h2 className="text-white font-semibold text-base leading-5 line-clamp-2">
                        {description}
                    </h2>

                    {/* Channel */}
                    <p className="text-gray-400 text-sm mt-2">
                        Code Master
                    </p>

                    {/* Views + time */}
                    <p className="text-gray-400 text-sm">
                        {views ?? 0} Views · {timeAgo(createdAt)}
                    </p>

                </div>


            </div>
            </Link>

        </div>
    )
}

export default VideoCard