import { useEffect, useState } from 'react'
import VideoListView from '../Card/VideoListView'

const VideoList = () => {
    const [videos, setVideos] = useState([])

    useEffect(() => {
        const getVideo = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/video/allVideos`)
                if (!response.ok) {
                    throw new Error("Failed to fetch videos.")
                }
                const data = await response.json()
                setVideos(data.data.videos)
            } catch (error) {
                console.error("Unable to load video list:", error)
            }
        }
        getVideo()
    }, [])




    return (
        <div className="min-h-screen bg-gray-800 px-4 py-6">
            <div className='grid grid-cols-1 gap-x-5 gap-y-8'>
            {videos.length > 0 ? (
                videos.map((video) => (
                    //TODO
                    //when we click any video then it redirect to video details page
                    <VideoListView
                        key={video._id} 
                        video={video}
                        description={video.description} 
                        thumbnail={video.thumbnail}
                        duration={video.duration}
                        createdAt={video.createdAt}
                        views={video.views}
                    />
                ))
            ) : (
                <p className='text-white'>No videos found.</p>
            )}
        
        </div>
        </div>

    )
}

export default VideoList