import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import {
    AiOutlineLike,
    AiOutlinePlusSquare,
    AiOutlineUserAdd,
} from "react-icons/ai";

const VideoDetailsPage = () => {
    const { videoId } = useParams();
    const [loading, setLoading] = useState(true);
    const [relatedVideos, setRelatedVideos] = useState([])
    const [comment, setComment] = useState('')
    const [video, setVideo] = useState(null)
    const [comments, setComments] = useState([])
    const [playlists, setPlaylists] = useState([])
    const [selectedPlaylist, setSelectedPlaylist] = useState("")
    const [showPlaylists, setShowPlaylists] = useState(false)
    const [liked, setLiked] = useState(false)
    const [subscribed, setSubscribed] = useState(false)
    const [actionBusy, setActionBusy] = useState(false)
    const [actionError, setActionError] = useState("")
    const user = useSelector((state) => state.auth.userData)
    const navigate = useNavigate()

    const API_URL = import.meta.env.VITE_API_URL;

    //fetch video details
    useEffect(() => {
        const fetchVideoDetails = async () => {
            try {
                setLoading(true)
                const response = await fetch(`${API_URL}/video/get-video/${videoId}`)
                if (!response.ok) {
                    throw new Error("failed to fetch video details")
                }
                const data = await response.json()
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
                if (!response.ok) {
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

    useEffect(() => {
        let active = true
        const loadComments = async () => {
            if (!user) {
                setComments([])
                return
            }
            try {
                const response = await fetch(`${API_URL}/comment/video-comment/${videoId}`, {
                    credentials: "include",
                })
                const result = await response.json()
                if (!response.ok) throw new Error(result?.message || "Unable to load comments.")
                if (active) setComments(result?.data ?? [])
            } catch (error) {
                if (active) setActionError(error.message || "Unable to load comments.")
            }
        }
        loadComments()
        return () => { active = false }
    }, [API_URL, user, videoId])

    useEffect(() => {
        let active = true
        const loadUserVideoState = async () => {
            if (!user) {
                setLiked(false)
                return
            }
            try {
                const response = await fetch(`${API_URL}/like/liked-video`, {
                    credentials: "include",
                })
                const result = await response.json()
                if (!response.ok) throw new Error(result?.message || "Unable to load your liked videos.")
                if (active) setLiked((result?.data ?? []).some((item) => item._id === videoId))
            } catch (error) {
                if (active) setActionError(error.message || "Unable to load your liked videos.")
            }
        }
        loadUserVideoState()
        return () => { active = false }
    }, [API_URL, user, videoId])

    const requireLogin = () => {
        if (!user) {
            navigate("/login")
            return false
        }
        return true
    }

    const toggleLike = async () => {
        if (!requireLogin()) return
        setActionBusy(true)
        setActionError("")
        try {
            const response = await fetch(`${API_URL}/like/video-like/${videoId}`, {
                method: "PATCH",
                credentials: "include",
            })
            const result = await response.json()
            if (!response.ok) throw new Error(result?.message || "Unable to update like.")
            setLiked((value) => !value)
        } catch (error) {
            setActionError(error.message || "Unable to update like.")
        } finally {
            setActionBusy(false)
        }
    }

    const toggleSubscription = async () => {
        if (!requireLogin() || !video?.owner) return
        setActionBusy(true)
        setActionError("")
        try {
            const response = await fetch(`${API_URL}/subscription/toggle/${video.owner}`, {
                method: "PATCH",
                credentials: "include",
            })
            const result = await response.json()
            if (!response.ok) throw new Error(result?.message || "Unable to update subscription.")
            setSubscribed((value) => !value)
        } catch (error) {
            setActionError(error.message || "Unable to update subscription.")
        } finally {
            setActionBusy(false)
        }
    }

    const submitComment = async (event) => {
        event.preventDefault()
        if (!requireLogin()) return
        if (!comment.trim()) return
        setActionBusy(true)
        setActionError("")
        try {
            const response = await fetch(`${API_URL}/comment/add-comment`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: comment.trim(), video: videoId }),
            })
            const result = await response.json()
            if (!response.ok) throw new Error(result?.message || "Unable to post comment.")
            setComments((current) => [{ ...result.data, owner: user }, ...current])
            setComment("")
        } catch (error) {
            setActionError(error.message || "Unable to post comment.")
        } finally {
            setActionBusy(false)
        }
    }

    const openPlaylistPicker = async () => {
        if (!requireLogin()) return
        setActionError("")
        try {
            const response = await fetch(`${API_URL}/playlist/user-playlist/${user._id}`, {
                credentials: "include",
            })
            const result = await response.json()
            if (!response.ok) throw new Error(result?.message || "Unable to load playlists.")
            setPlaylists(result?.data ?? [])
            setShowPlaylists(true)
        } catch (error) {
            setActionError(error.message || "Unable to load playlists.")
        }
    }

    const addToPlaylist = async (event) => {
        event.preventDefault()
        if (!selectedPlaylist) return
        setActionBusy(true)
        setActionError("")
        try {
            const response = await fetch(`${API_URL}/playlist/add-video/${selectedPlaylist}/${videoId}`, {
                method: "PATCH",
                credentials: "include",
            })
            const result = await response.json()
            if (!response.ok) throw new Error(result?.message || "Unable to save video to playlist.")
            setShowPlaylists(false)
            setSelectedPlaylist("")
        } catch (error) {
            setActionError(error.message || "Unable to save video to playlist.")
        } finally {
            setActionBusy(false)
        }
    }

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
                                src={video.videofile}
                                poster={video.thumbnail}
                                controls
                                autoPlay
                                className="w-full h-full object-contain" 
                             />

                            {/* <video
                                src={video.videoFile?.url || video.videoFile}
                                poster={video.thumbnail?.url || video.thumbnail}
                                controls
                                autoPlay
                                className="w-full h-full object-contain"
                            /> */}
                            
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

                                <button type="button" disabled={actionBusy} onClick={toggleLike} aria-pressed={liked} className={`flex items-center gap-2 border border-gray-600 rounded-lg px-5 py-2 hover:bg-gray-800 ${liked ? "text-purple-300" : ""}`}>
                                    <AiOutlineLike size={22} />
                                    {liked ? "Liked" : "Like"}
                                </button>

                                <button type="button" onClick={openPlaylistPicker} className="flex items-center gap-2 border border-gray-600 rounded-lg px-5 py-2 hover:bg-gray-800">
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

                                <button type="button" disabled={actionBusy} onClick={toggleSubscription} className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-black font-semibold px-5 py-3 rounded-md disabled:opacity-60">
                                    <AiOutlineUserAdd size={22} />
                                    {subscribed ? "Subscribed" : "Subscribe"}
                                </button>

                            </div>

                            {/* Description */}
                            <div className="mt-5">
                                <p className="whitespace-pre-line text-gray-200">
                                    {video.description}
                                </p>
                            </div>

                        </div>
                        {actionError && <p role="alert" className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">{actionError}</p>}
                        {showPlaylists && (
                            <form onSubmit={addToPlaylist} className="mt-4 flex flex-wrap items-center gap-3 rounded-lg border border-white/10 bg-[#181818] p-4">
                                <label htmlFor="save-playlist" className="text-sm text-gray-300">Save to playlist</label>
                                <select id="save-playlist" value={selectedPlaylist} onChange={(event) => setSelectedPlaylist(event.target.value)} required className="min-w-48 rounded-lg border border-white/20 bg-[#111] px-3 py-2 text-white">
                                    <option value="">Choose a playlist</option>
                                    {playlists.map((playlist) => <option key={playlist._id} value={playlist._id}>{playlist.name}</option>)}
                                </select>
                                <button disabled={actionBusy || !playlists.length} className="rounded-lg bg-purple-500 px-4 py-2 font-semibold text-black disabled:opacity-50">{actionBusy ? "Saving..." : "Add"}</button>
                                {!playlists.length && <Link to="/playlists" className="text-sm text-purple-300 underline">Create a playlist</Link>}
                            </form>
                        )}

                        {/* ================= COMMENTS ================= */}
                        <div className="border border-gray-700 rounded-xl mt-5 p-5">

                            <h2 className="text-xl font-bold mb-5">
                                {comments.length} Comments
                            </h2>

                            {/* Add Comment */}
                            <form onSubmit={submitComment} className="mb-6 flex gap-2">

                                <input
                                    type="text"
                                    value={comment}
                                    onChange={(e) =>
                                        setComment(e.target.value)
                                    }
                                    disabled={!user || actionBusy}
                                    placeholder="Add a Comment"
                                    className="w-full bg-transparent border border-gray-500 rounded-lg px-4 py-3 outline-none focus:border-white"
                                />
                                <button type="submit" disabled={!user || actionBusy || !comment.trim()} className="rounded-lg bg-purple-500 px-4 font-semibold text-black disabled:opacity-50">Post</button>
                            </form>
                            {!user && <p className="mb-5 text-sm text-gray-400"><Link to="/login" className="text-purple-300 underline">Sign in</Link> to comment.</p>}

                            <div className="border-t border-gray-700 pt-5">

                                {comments.length > 0 ? (
                                    comments.map((item) => (
                                        <div
                                            key={item._id}
                                            className="flex gap-4 py-5 border-b border-gray-700"
                                        >

                                            <img
                                                src={
                                                    item.owner?.avatar ||
                                                    "https://via.placeholder.com/45"
                                                }
                                                alt="user"
                                                className="w-10 h-10 rounded-full"
                                            />

                                            <div>
                                                <div className="flex gap-2">
                                                    <h3 className="font-semibold">
                                                        {item.owner?.username ||
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