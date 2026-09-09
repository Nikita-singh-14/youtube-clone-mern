import { useEffect, useState } from "react";
import ChannelBanner from "./ChannelBanner";
import ChannelInfo from "./ChannelInfo";
import ChannelTabs from "./ChannelTabs";
import EmptyChannel from "./EmptyChannel";
import VideoGrid from "./VideoGrid";
import { useParams } from "react-router-dom";

const Channel = () => {
  const [activeTab, setActiveTab] = useState("Videos");
  const [videos, setVideos] = useState([]);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('')

  const {username} = useParams();

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchChannel = async() => {
      try {
        setLoading(true);
        setError("");
        const response = await fetch(`${API_URL}/user/c/${username}`,
        {
          Credential: 'include',
        }
      )
      console.log("Status:", response.status);
      console.log(response);

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch channel");
      }

      setChannel(data.data)

      const videoResponse = await fetch(
          `${API_URL}video/user/${username}`,
          {
            credentials: "include",
          }
        );

        if (!videoResponse.ok) {
          const errorText = await videoResponse.text();
          throw new Error(errorText || "Failed to fetch videos");
        }

        const videoData = await videoResponse.json();

        setVideos(videoData.data || []);

      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchChannel()
  },[username])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111111] text-white flex items-center justify-center">
        Loading channel...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#111111] text-red-500 flex items-center justify-center">
        {error}
      </div>
    );
  }

  if (!channel) {
    return (
      <div className="min-h-screen bg-[#111111] text-white flex items-center justify-center">
        Channel not found
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-[#111111] text-white">

      <ChannelBanner channel={channel} />

      <ChannelInfo channel={channel} />

      <ChannelTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {activeTab === "Videos" && (
        videos.length === 0 ? (
          <EmptyChannel />
        ) : (
          <VideoGrid videos={videos} />
        )
      )}

    </div>
  );
};

export default Channel;