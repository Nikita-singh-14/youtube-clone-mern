import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ListVideo, Plus, Trash2 } from "lucide-react";

const Collections = () => {
  const user = useSelector((state) => state.auth.userData);
  const [playlists, setPlaylists] = useState([]);
  const [videos, setVideos] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!user?._id) return undefined;
    let active = true;
    const fetchPlaylists = async () => {
      try {
        const [playlistResponse, videoResponse] = await Promise.all([
          fetch(`${API_URL}/playlist/user-playlist/${user._id}`, { credentials: "include" }),
          fetch(`${API_URL}/video/allVideos`),
        ]);
        const [playlistResult, videoResult] = await Promise.all([
          playlistResponse.json(),
          videoResponse.json(),
        ]);
        if (!playlistResponse.ok) {
          throw new Error(playlistResult?.message || "Unable to load playlists.");
        }
        if (!videoResponse.ok) {
          throw new Error(videoResult?.message || "Unable to load playlist videos.");
        }
        if (active) {
          setPlaylists(playlistResult?.data ?? []);
          setVideos(videoResult?.data?.videos ?? []);
        }
      } catch (requestError) {
        if (active) setError(requestError.message || "Unable to load playlists.");
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchPlaylists();
    return () => {
      active = false;
    };
  }, [API_URL, user?._id]);

  const createPlaylist = async (event) => {
    event.preventDefault();
    setError("");
    setNotice("");
    setSaving(true);
    try {
      const response = await fetch(`${API_URL}/playlist/create`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result?.message || "Unable to create playlist.");
      setName("");
      setDescription("");
      setNotice("Playlist created.");
      setPlaylists((current) => [result.data, ...current]);
    } catch (requestError) {
      setError(requestError.message || "Unable to create playlist.");
    } finally {
      setSaving(false);
    }
  };

  const deletePlaylist = async (playlistId) => {
    if (!window.confirm("Delete this playlist?")) return;
    setError("");
    setNotice("");
    try {
      const response = await fetch(`${API_URL}/playlist/delete/${playlistId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result?.message || "Unable to delete playlist.");
      setPlaylists((current) => current.filter((playlist) => playlist._id !== playlistId));
      setNotice("Playlist deleted.");
    } catch (requestError) {
      setError(requestError.message || "Unable to delete playlist.");
    }
  };

  return (
    <section className="min-h-screen bg-[#111] px-4 py-8 text-white sm:px-7">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 flex items-center gap-4">
          <div className="rounded-full bg-purple-500/15 p-3 text-purple-300"><ListVideo size={25} /></div>
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">Your playlists</h1>
            <p className="mt-1 text-sm text-gray-400">Create and organize videos into playlists.</p>
          </div>
        </div>

        {!user ? (
          <div className="rounded-xl border border-white/10 bg-[#181818] p-8 text-center">
            <p className="text-gray-300">Sign in to manage your playlists.</p>
            <Link className="mt-4 inline-block rounded-full bg-purple-500 px-5 py-2 font-semibold text-black" to="/login">Sign in</Link>
          </div>
        ) : (
          <>
            <form onSubmit={createPlaylist} className="mb-7 grid gap-3 rounded-xl border border-white/10 bg-[#181818] p-4 md:grid-cols-[1fr_2fr_auto]">
              <label className="sr-only" htmlFor="playlist-name">Playlist name</label>
              <input id="playlist-name" value={name} onChange={(event) => setName(event.target.value)} required maxLength={100} placeholder="Playlist name" className="rounded-lg border border-white/15 bg-[#111] px-4 py-3 text-white outline-none focus:border-purple-400" />
              <label className="sr-only" htmlFor="playlist-description">Playlist description</label>
              <input id="playlist-description" value={description} onChange={(event) => setDescription(event.target.value)} required maxLength={500} placeholder="Description" className="rounded-lg border border-white/15 bg-[#111] px-4 py-3 text-white outline-none focus:border-purple-400" />
              <button disabled={saving} className="flex items-center justify-center gap-2 rounded-lg bg-purple-500 px-5 py-3 font-semibold text-black hover:bg-purple-400 disabled:opacity-60">
                <Plus size={18} /> {saving ? "Creating..." : "Create playlist"}
              </button>
            </form>

            {error && <div role="alert" className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-300">{error}</div>}
            {notice && <p role="status" className="mb-4 text-sm text-green-300">{notice}</p>}
            {loading ? (
              <p className="py-16 text-center text-gray-400">Loading playlists...</p>
            ) : playlists.length === 0 ? (
              <div className="rounded-xl border border-white/10 bg-[#181818] p-10 text-center">
                <ListVideo className="mx-auto mb-3 text-gray-500" size={34} />
                <h2 className="text-lg font-semibold">No playlists yet</h2>
                <p className="mt-2 text-sm text-gray-400">Create a playlist to start collecting videos.</p>
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {playlists.map((playlist) => {
                  const playlistVideos = videos.filter((video) =>
                    (playlist.videos ?? []).some((id) => String(id?._id ?? id) === video._id),
                  );
                  return (
                    <article key={playlist._id} className="overflow-hidden rounded-xl border border-white/10 bg-[#181818]">
                      <div className="relative aspect-video bg-[#242424]">
                        {playlistVideos[0] ? (
                          <Link to={`/video/${playlistVideos[0]._id}`}>
                            <img src={playlistVideos[0].thumbnail} alt="" className="h-full w-full object-cover" />
                          </Link>
                        ) : (
                          <div className="flex h-full items-center justify-center text-gray-500"><ListVideo size={42} /></div>
                        )}
                        <span className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-xs">
                          {playlist.videos?.length ?? 0} videos
                        </span>
                      </div>
                      <div className="flex items-start justify-between gap-3 p-4">
                        <div className="min-w-0">
                          <h2 className="truncate font-semibold">{playlist.name}</h2>
                          <p className="mt-1 line-clamp-2 text-sm text-gray-400">{playlist.description}</p>
                          {playlistVideos.length > 1 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {playlistVideos.slice(1, 4).map((video) => (
                                <Link key={video._id} to={`/video/${video._id}`} className="rounded-full bg-white/10 px-3 py-1 text-xs text-gray-200 hover:bg-white/20">{video.title}</Link>
                              ))}
                            </div>
                          )}
                        </div>
                        <button type="button" onClick={() => deletePlaylist(playlist._id)} aria-label={`Delete ${playlist.name}`} className="shrink-0 rounded-lg p-2 text-gray-400 hover:bg-red-500/10 hover:text-red-300">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Collections;
