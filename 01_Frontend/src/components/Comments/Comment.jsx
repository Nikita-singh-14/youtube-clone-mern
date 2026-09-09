import { useEffect, useState } from 'react'

const Comment = () => {
    const [comment, setComment] = useState([])
    const API_URL = import.meta.env.VITE_API_URL;
    useEffect(() => {
       const getComment = async() => {
            try {
                const response = await fetch(`${API_URL}/comments`)
                if(!response.ok){
                    console.log("something went wrong! while fetching comments")
                }
                const comments = await response.json();
                console.log(comment)
                setComment(comments)

            } catch (error) {
                console.log(error)
            }
        }
    }, [comment])

  return (
    <div>

    </div>
  )
}

export default Comment