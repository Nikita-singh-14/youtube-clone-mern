import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import VideoCard from '../Card/VideoCard'
import { GoVideo } from "react-icons/go";

const VideoListing = () => {
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [searchParams] = useSearchParams()
    const query = searchParams.get('query') || ''
    const API_URL = import.meta.env.VITE_API_URL

    useEffect(() => {
        const getVideos = async () => {
            try {
                setLoading(true)
                setError('')
                const search = query ? `?query=${encodeURIComponent(query)}` : ''
                const response = await fetch(`${API_URL}/video/allVideos${search}`)
                if (!response.ok) {
                    const result = await response.json()
                    throw new Error(result?.message || "Failed to fetch videos")
                }
                const data = await response.json()
                setVideos(data.data.videos)
            } catch (error) {
                setError(error.message || "Failed to fetch videos.")
            } finally {
                setLoading(false)
            }
        }
        getVideos()
    }, [API_URL, query])

    if (loading) {
        return (
            <div className="min-h-screen bg-[#111] flex justify-center items-center text-white">
                Loading videos...
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#111] px-4 py-6">
            {query && <h1 className="mb-5 text-xl font-semibold text-white">Search results for “{query}”</h1>}
            {error && <div role="alert" className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-300">{error}</div>}
            {/* <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8'>
                {!error && videos.length > 0 ? (
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
                        {query ? "Try a different search term." : "Be the first to upload a video."}
                    </p>
                </div>
            )}
        </div>

    )
}

export default VideoListing