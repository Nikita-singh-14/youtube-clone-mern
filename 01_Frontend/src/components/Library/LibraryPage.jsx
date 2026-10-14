import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Clock3, Heart, Users } from "lucide-react";

const pages = {
  history: {
    title: "Watch history",
    description: "Videos you have watched recently.",
    icon: Clock3,
    endpoint: "/user/watch-history",
    collection: (data) => data,
  },
  liked: {
    title: "Liked videos",
    description: "Videos you have liked.",
    icon: Heart,
    endpoint: "/like/liked-video",
    collection: (data) => data,
  },
};

const LibraryPage = ({ type }) => {
  const user = useSelector((state) => state.auth.userData);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const page = pages[type];
  const Icon = page.icon;
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    let active = true;

    const loadVideos = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        const response = await fetch(`${API_URL}${page.endpoint}`, {
          credentials: "include",
        });
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result?.message || `Unable to load ${page.title.toLowerCase()}.`);
        }
        if (active) setVideos(page.collection(result?.data ?? []));
      } catch (requestError) {
        if (active) setError(requestError.message || "Unable to load videos.");
      } finally {
        if (active) setLoading(false);
      }
    };

    loadVideos();
    return () => {
      active = false;
    };
  }, [API_URL, page, user]);

  return (
    <section className="min-h-screen bg-[#111] px-4 py-8 text-white sm:px-7">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 flex items-center gap-4">
          <div className="rounded-full bg-purple-500/15 p-3 text-purple-300">
            <Icon size={25} />
          </div>
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">{page.title}</h1>
            <p className="mt-1 text-sm text-gray-400">{page.description}</p>
          </div>
        </div>

        {!user ? (
          <div className="rounded-xl border border-white/10 bg-[#181818] p-8 text-center">
            <p className="text-gray-300">Sign in to see your {page.title.toLowerCase()}.</p>
            <Link className="mt-4 inline-block rounded-full bg-purple-500 px-5 py-2 font-semibold text-black hover:bg-purple-400" to="/login">
              Sign in
            </Link>
          </div>
        ) : loading ? (
          <p className="py-16 text-center text-gray-400">Loading videos...</p>
        ) : error ? (
          <div role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-300">{error}</div>
        ) : videos.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-[#181818] p-10 text-center">
            <Icon className="mx-auto mb-3 text-gray-500" size={34} />
            <h2 className="text-lg font-semibold">Nothing here yet</h2>
            <p className="mt-2 text-sm text-gray-400">Videos you {type === "history" ? "watch" : "like"} will show up here.</p>
            <Link className="mt-5 inline-block rounded-full bg-white px-5 py-2 font-semibold text-black hover:bg-gray-200" to="/">
              Explore videos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {videos.map((video) => (
              <Link
                key={video._id}
                to={`/video/${video._id}`}
                className="group overflow-hidden rounded-xl border border-white/10 bg-[#181818] transition hover:border-white/30"
              >
                <div className="aspect-video overflow-hidden bg-gray-800">
                  <img
                    src={video.thumbnail}
                    alt=""
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex gap-3 p-4">
                  <img
                    src={video.owner?.avatar}
                    alt=""
                    className="h-10 w-10 shrink-0 rounded-full bg-gray-700 object-cover"
                  />
                  <div className="min-w-0">
                    <h2 className="line-clamp-2 font-semibold">{video.title}</h2>
                    <p className="mt-1 truncate text-sm text-gray-400">
                      {video.owner?.username || video.owner?.fullName || "VideoTube creator"}
                    </p>
                    <p className="text-sm text-gray-500">{video.views ?? 0} views</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export const SubscriptionsPage = () => {
  const user = useSelector((state) => state.auth.userData);
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    let active = true;
    const loadChannels = async () => {
      if (!user?._id) {
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(
          `${API_URL}/subscription/subscribed-channels/${user._id}`,
          { credentials: "include" },
        );
        const result = await response.json();
        if (!response.ok) throw new Error(result?.message || "Unable to load subscriptions.");
        if (active) setChannels(result?.data ?? []);
      } catch (requestError) {
        if (active) setError(requestError.message || "Unable to load subscriptions.");
      } finally {
        if (active) setLoading(false);
      }
    };
    loadChannels();
    return () => {
      active = false;
    };
  }, [API_URL, user?._id]);

  return (
    <section className="min-h-screen bg-[#111] px-4 py-8 text-white sm:px-7">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 flex items-center gap-4">
          <div className="rounded-full bg-purple-500/15 p-3 text-purple-300"><Users size={25} /></div>
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">Subscriptions</h1>
            <p className="mt-1 text-sm text-gray-400">Channels you follow.</p>
          </div>
        </div>
        {!user ? (
          <div className="rounded-xl border border-white/10 bg-[#181818] p-8 text-center">
            <p className="text-gray-300">Sign in to see your subscriptions.</p>
            <Link className="mt-4 inline-block rounded-full bg-purple-500 px-5 py-2 font-semibold text-black" to="/login">Sign in</Link>
          </div>
        ) : loading ? (
          <p className="py-16 text-center text-gray-400">Loading subscriptions...</p>
        ) : error ? (
          <div role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-300">{error}</div>
        ) : channels.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-[#181818] p-10 text-center">
            <Users className="mx-auto mb-3 text-gray-500" size={34} />
            <h2 className="text-lg font-semibold">No subscriptions yet</h2>
            <p className="mt-2 text-sm text-gray-400">Subscribe to a channel to find it here.</p>
            <Link className="mt-5 inline-block rounded-full bg-white px-5 py-2 font-semibold text-black" to="/">Explore videos</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {channels.map((entry) => {
              const channel = entry.channel;
              return channel ? (
                <Link key={entry._id} to={`/channel/${channel.username}`} className="flex items-center gap-4 rounded-xl border border-white/10 bg-[#181818] p-5 hover:bg-[#222]">
                  <img src={channel.avatar} alt="" className="h-14 w-14 rounded-full bg-gray-700 object-cover" />
                  <div className="min-w-0">
                    <h2 className="truncate font-semibold">{channel.fullName || channel.username}</h2>
                    <p className="truncate text-sm text-gray-400">@{channel.username}</p>
                  </div>
                </Link>
              ) : null;
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export const HistoryPage = () => <LibraryPage type="history" />;
export const LikedVideosPage = () => <LibraryPage type="liked" />;
