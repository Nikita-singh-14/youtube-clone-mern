
import { Link } from 'react-router-dom'

const VideoCard = ({id, title, thumnail, coverImage}) => {
  return (
    <Link to={`/videolisting/${id}`}>
        <div className='w-full rounded-xl bg-gray-100 p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={coverImage} alt="" />
            </div>
            <h2
            className='text-xl font-bold'>{title}</h2>
        </div>
    </Link>
  )
}

export default VideoCard