import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiEye, FiUser, FiHeart, FiPlus, FiTrash2, FiEdit2, } from "react-icons/fi";
import { Button } from "../components";
const AdminDashboard = () => {
  const user = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalViews: 0,
    totalSubscribers: 0,
    totalLikes: 0,
    totalVideos: 0,
  });
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user?._id) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError("");
        const statsResponse = await fetch(
          `${API_URL}/dashboard/channel/${user._id}/stats`,
          { method: "GET", credentials: "include", }
        );
        const statsResult = await statsResponse.json();
        if (!statsResponse.ok) {
          throw new Error(statsResult?.message || "Failed to fetch channel stats");
        }
        setStats(statsResult?.data || {
          totalViews: 0,
          totalSubscribers: 0,
          totalLikes: 0,
          totalVideos: 0,
        }
        );
        const videosResponse = await fetch(
          `${API_URL}/dashboard/channel/${user._id}/videos`,
          { method: "GET", credentials: "include", }
        );
        const videosResult = await videosResponse.json();
        if (!videosResponse.ok) {
          throw new Error(videosResult?.message || "Failed to fetch channel videos");
        }
        setVideos(videosResult?.data || []);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
        setError(error?.message || "Failed to load dashboard.");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [user?._id, API_URL]);
  const formatNumber = (number = 0) => {
    return new Intl.NumberFormat("en-IN").format(number);
  };
  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date)
      .toLocaleDateString("en-GB", { day: "numeric", month: "numeric", year: "numeric", });
  };
  const handleToggle = (video) => {

    setVideos((prevVideos) => prevVideos
      .map((item) => item._id === video._id ?
        { ...item, isPublished: !item.isPublished, } :
        item));
  };
  const handleDelete = async (videoId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this video?");
    if (!confirmDelete) return;
    setVideos((prevVideos) => prevVideos.filter((video) => video._id !== videoId));
  };
  const handleEdit = (videoId) => {
    console.log("Edit video:", videoId);
    navigate(`/admin/video/${videoId}/edit`);
  };
  const handleUpload = () => {
    navigate("uploadvideo");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#101010] text-white flex items-center justify-center">
        <div className="text-gray-400">
          Loading dashboard...
        </div>
      </div>
    );
  } return (
    <div className="min-h-screen bg-[#101010] text-white px-6 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            Welcome Back,{" "} {user?.fullName || user?.username || "Creator"}
          </h1>
          <p className="text-gray-300 mt-1">
            Seamless Video Management, Elevated Results.
          </p>
        </div>

        <Button
          onClick={handleUpload}
          className="flex items-center justify-center gap-2"
        ><FiPlus size={22} />
          Upload video
        </Button>
      </div>
      {error && (
        <div className="mb-6 border border-red-500/30 bg-red-500/10 text-red-400 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {/* Total Views */}
        <div className="border border-gray-600 p-5 min-h-45 flex flex-col justify-between">
          <div className="w-9 h-9 rounded-full bg-[#dfc8ff] text-[#9c5cff] flex items-center justify-center">
            <FiEye size={20} />
          </div>
          <div>
            <p className="text-gray-200 text-lg">
              Total views
            </p>
            <h2 className="text-4xl font-bold mt-1">
              {formatNumber(stats.totalViews)}
            </h2>
          </div>
        </div>
        <div className="border border-gray-600 p-5 min-h-45 flex flex-col justify-between">
          <div className="w-9 h-9 rounded-full bg-[#dfc8ff] text-[#9c5cff] flex items-center justify-center">
            <FiUser size={20} />
          </div>
          <div>
            <p className="text-gray-200 text-lg">
              Total subscribers
            </p>
            <h2 className="text-4xl font-bold mt-1">
              {formatNumber(stats.totalSubscribers)}
            </h2>
          </div>
        </div>
        <div className="border border-gray-600 p-5 min-h-45 flex flex-col justify-between">
          <div className="w-9 h-9 rounded-full bg-[#dfc8ff] text-[#9c5cff] flex items-center justify-center">
            <FiHeart size={20} />
          </div>
          <div>
            <p className="text-gray-200 text-lg">
              Total likes
            </p>
            <h2 className="text-4xl font-bold mt-1">
              {formatNumber(stats.totalLikes)}
            </h2>
          </div>
        </div>
      </div>
      <div className="border border-gray-600 overflow-x-auto">
        <table className="w-full min-w-250 border-collapse">
          {/* Table Header */}
          <thead>
            <tr className="border-b border-gray-600">
              <th className="text-left px-6 py-5 font-semibold"> Status </th>
              <th className="text-left px-6 py-5 font-semibold"> Status </th>
              <th className="text-left px-6 py-5 font-semibold"> Uploaded </th>
              <th className="text-left px-6 py-5 font-semibold"> Rating </th>
              <th className="text-left px-6 py-5 font-semibold"> Date uploaded </th>
              <th className="px-6 py-5"> </th>
            </tr>
          </thead>

          <tbody>
            {videos.length > 0 ? (videos.map((video) => {
              const published = video.isPublished ?? video.published ?? false;
              return (
                <tr
                  key={video._id}
                  className="border-b border-gray-700 last:border-b-0 hover:bg-[#151515] transition-colors" >

                  <td className="px-6 py-5">
                    <button type="button" onClick={() => handleToggle(video)}
                      className={`relative w-15 h-7.5 rounded-full transition-colors ${published ? "bg-[#a765f7]" : "bg-gray-200"}`} >
                      <span
                        className={`absolute top-1 w-5.5 h-5.5 rounded-full bg-black transition-all ${published ? "right-1" : "left-1"}`} />
                    </button>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-block px-3 py-1 rounded-full border text-sm ${published ? "text-green-500 border-green-500" : "text-orange-500 border-orange-500"}`} > {published ? "Published" : "Unpublished"}
                    </span>
                  </td> {/* Video */}
                  <td className="px-6 py-5"> <div className="flex items-center gap-4">
                    {/* Thumbnail */}
                    <div className="w-17.5 h-11.25 bg-gray-800 overflow-hidden flex items-center justify-center shrink-0 rounded">
                      {video.thumbnail ?
                        (<img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />) :
                        (<span className="text-xs text-gray-400"> No image </span>)}
                    </div> {/* Title */} <p className="font-semibold text-white whitespace-nowrap">
                      {video.title} </p>
                  </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-green-200 text-green-700 whitespace-nowrap">
                        {formatNumber(video.likes || 0)}{" "} likes
                      </span>
                      <span className="px-3 py-1 rounded-full bg-red-200 text-red-600 whitespace-nowrap">
                        {formatNumber(video.dislikes || 0)}{" "} dislikes </span> </div> </td> {/* Date */}
                  <td className="px-6 py-5 whitespace-nowrap"> {formatDate(video.createdAt)} </td>
                  {/* Actions */} <td className="px-6 py-5"> <div className="flex items-center gap-5">
                    <button type="button" onClick={() => handleDelete(video._id)}
                      className="text-white hover:text-red-500 transition-colors" title="Delete" >
                      <FiTrash2 size={21} /> </button> <button type="button" onClick={() => handleEdit(video._id)}
                        className="text-white hover:text-purple-400 transition-colors" title="Edit" > <FiEdit2 size={21} />
                    </button> </div> </td> </tr>);
            })) : (<tr> <td colSpan="6" className="text-center py-12 text-gray-500" >
              No videos uploaded yet. </td> </tr>)} </tbody> </table> </div> </div>
  );
}

export default AdminDashboard;