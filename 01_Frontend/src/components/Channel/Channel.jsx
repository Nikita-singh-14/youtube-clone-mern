import { useCallback, useEffect, useState } from "react";
import ChannelBanner from "./ChannelBanner";
import ChannelInfo from "./ChannelInfo";
import ChannelTabs from "./ChannelTabs";
import EmptyChannel from "./EmptyChannel";
import VideoGrid from "./VideoGrid";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Channel = () => {
  const [activeTab, setActiveTab] = useState("Videos");
  const [videos, setVideos] = useState([]);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tabResult, setTabResult] = useState(null);
  const tabLoading = !tabResult || tabResult.channelId !== channel?._id || tabResult.tab !== activeTab;
  const tabData = tabLoading ? [] : tabResult.data;
  const tabError = tabLoading ? "" : tabResult.error;
  const [subscriptionLoading, setSubscriptionLoading] = useState(false);
  const user = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();

  const { username } = useParams();

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    let active = true;
    const fetchChannel = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await fetch(`${API_URL}/user/c/${username}`, {
          credentials: "include",
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to fetch channel.");
        const channelData = data.data;
        const videoResponse = await fetch(
          `${API_URL}/video/allVideos?userId=${encodeURIComponent(channelData._id)}`,
        );
        const videoData = await videoResponse.json();
        if (!videoResponse.ok) throw new Error(videoData.message || "Failed to fetch channel videos.");
        if (active) {
          setChannel(channelData);
          setVideos(videoData.data?.videos ?? []);
        }
      } catch (requestError) {
        if (active) setError(requestError.message || "Unable to load this channel.");
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchChannel();
    return () => {
      active = false;
    };
  }, [API_URL, username]);

  useEffect(() => {
    if (!channel || activeTab === "Videos") return undefined;
    let active = true;
    const loadTab = async () => {
      try {
        const endpoints = {
          Playlist: `/playlist/user-playlist/${channel._id}`,
          Tweets: `/tweet/user-tweet/${channel._id}`,
          Subscribed: `/subscription/subscribed-channels/${channel._id}`,
        };
        const response = await fetch(`${API_URL}${endpoints[activeTab]}`, {
          credentials: "include",
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result?.message || `Unable to load ${activeTab.toLowerCase()}.`);
        if (active) setTabResult({ tab: activeTab, channelId: channel._id, data: result?.data ?? [], error: "" });
      } catch (requestError) {
        if (active) setTabResult({ tab: activeTab, channelId: channel._id, data: [], error: requestError.message || `Unable to load ${activeTab.toLowerCase()}.` });
      }
    };
    loadTab();
    return () => {
      active = false;
    };
  }, [API_URL, activeTab, channel]);

  const handleSubscribe = useCallback(async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setSubscriptionLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_URL}/subscription/toggle/${channel._id}`, {
        method: "PATCH",
        credentials: "include",
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result?.message || "Unable to update subscription.");
      setChannel((current) => ({
        ...current,
        isSubscribed: !current.isSubscribed,
        subscribersCount: Math.max(0, (current.subscribersCount || 0) + (current.isSubscribed ? -1 : 1)),
      }));
    } catch (requestError) {
      setError(requestError.message || "Unable to update subscription.");
    } finally {
      setSubscriptionLoading(false);
    }
  }, [API_URL, channel, navigate, user]);

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
        <div role="alert">{error}</div>
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

      <ChannelInfo channel={channel} onSubscribe={handleSubscribe} subscriptionLoading={subscriptionLoading} />

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
      {activeTab !== "Videos" && (
        <div className="px-5 py-6">
          {tabLoading ? (
            <p className="text-center text-gray-400">Loading {activeTab.toLowerCase()}...</p>
          ) : tabError ? (
            <p role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-300">{tabError}</p>
          ) : tabData.length === 0 ? (
            <EmptyChannel />
          ) : activeTab === "Playlist" ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tabData.map((playlist) => (
                <article key={playlist._id} className="rounded-xl border border-white/10 bg-[#181818] p-5">
                  <h2 className="font-semibold">{playlist.name}</h2>
                  <p className="mt-2 text-sm text-gray-400">{playlist.description}</p>
                  <p className="mt-3 text-xs text-gray-500">{playlist.videos?.length ?? 0} videos</p>
                </article>
              ))}
            </div>
          ) : activeTab === "Tweets" ? (
            <div className="mx-auto max-w-3xl space-y-3">
              {tabData.map((tweet) => (
                <article key={tweet._id} className="rounded-xl border border-white/10 bg-[#181818] p-5">
                  <p className="whitespace-pre-wrap">{tweet.content}</p>
                  <p className="mt-3 text-xs text-gray-500">{new Date(tweet.createdAt).toLocaleDateString()}</p>
                </article>
              ))}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tabData.map((entry) => entry.channel ? (
                <Link key={entry._id} to={`/channel/${entry.channel.username}`} className="flex items-center gap-4 rounded-xl border border-white/10 bg-[#181818] p-4 hover:bg-[#222]">
                  <img src={entry.channel.avatar} alt="" className="h-12 w-12 rounded-full bg-gray-700 object-cover" />
                  <span>{entry.channel.fullName || entry.channel.username}</span>
                </Link>
              ) : null)}
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default Channel;