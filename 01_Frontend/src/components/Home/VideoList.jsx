import React, { useEffect, useState } from 'react'
import VideoListView from '../Card/VideoListView'

const VideoList = () => {
    const [videos, setVideos] = useState([])

    useEffect(() => {
        const getVideo = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/v1/video/allVideos")
                if (!response.ok) {
                    console.log("ERROR: Failed to fetch video")
                }
                const data = await response.json()
                console.log(data.data.videos)
                setVideos(data.data.videos)
            } catch (error) {
                console.log(error)
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
                        veiws={video.veiws}
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