import { useEffect, useState } from 'react'
import VideoCard from '../Card/VideoCard'
import { GoVideo } from "react-icons/go";

const VideoListing = () => {
    const [videos, setVideos] = useState([])
    const [loading, SetLoading] = useState(true)

    const API_URL = import.meta.env.VITE_API_URL


    useEffect(() => {
        const getVideos = async () => {
            try {
                const response = await fetch(`${API_URL}/video/allVideos`)
                if (!response.ok) {
                    console.log("ERROR: Failed to fetch video")
                    throw new Error("Failed to fetch videos")
                }
                const data = await response.json()

                console.log(data.data.videos)
                setVideos(data.data.videos)

            } catch (error) {
                console.log(error)
            } finally {
                SetLoading(false)
            }
        }
        getVideos()
    }, [API_URL])

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-800 flex justify-center items-center text-white">
                Loading videos...
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-800 px-4 py-6">
            {/* <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8'>
                {videos.length > 0 ? (
                    videos.map((video) => (
                        //TODO
                        //when we click any video then it redirect to video details page
                        <VideoCard
                            key={video._id}
                            video={video}
                            description={video.description}
                            thumbnail={video.thumbnail}
                            duration={video.duration}
                            createdAt={video.createdAt}
                            veiws={video.views}
                        />
                    ))
                ) : (
                    <div className="flex flex-col w-full justify-center items-center bg-gray-800 min-h-screen text-white">
                        <GoVideo />
                        <h3>No Videos available</h3>
                        <p>Please try to search some thing else.</p>
                    </div>
                )}

            </div> */}
             {videos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8">

                    {videos.map((video) => (
                        <VideoCard
                            key={video._id}
                            video={video}
                            description={video.description}
                            thumbnail={video.thumbnail}
                            duration={video.duration}
                            createdAt={video.createdAt}
                            views={video.views}
                        />
                    ))}

                </div>
            ) : (
                <div className="min-h-screen flex flex-col justify-center items-center text-white">
                    <GoVideo className="text-5xl mb-3" />

                    <h3 className="text-xl font-semibold">
                        No Videos Available
                    </h3>

                    <p className="text-gray-400 mt-2">
                        Please try searching for something else.
                    </p>
                </div>
            )}
        </div>

    )
}

export default VideoListing