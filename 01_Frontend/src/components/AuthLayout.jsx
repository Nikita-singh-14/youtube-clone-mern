import { Link, Outlet } from "react-router-dom";
import { Play } from "lucide-react";

const AuthLayout = () => (
  <main className="min-h-screen bg-[#0d0d0f] text-white">
    <header className="flex items-center justify-between px-5 py-5 sm:px-10">
      <Link to="/" className="flex items-center gap-2 text-lg font-bold tracking-tight" aria-label="VideoTube home">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500 text-black">
          <Play size={17} fill="currentColor" />
        </span>
        VideoTube
      </Link>
      <Link to="/" className="text-sm text-gray-400 transition hover:text-white">
        Back to videos
      </Link>
    </header>

    <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-center gap-10 px-5 pb-12 sm:px-10 lg:grid-cols-[1fr_0.9fr]">
      {/* <section className="hidden lg:block">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-300">
          Your next favorite video is waiting
        </p>
        <h1 className="mt-5 max-w-xl text-5xl font-bold leading-tight">
          Watch, share, and find your people.
        </h1>
        <p className="mt-5 max-w-lg text-lg leading-8 text-gray-400">
          Sign in to keep your library close, follow creators, and join the conversation.
        </p>
        <div className="mt-10 grid max-w-lg grid-cols-2 gap-4" aria-hidden="true">
          <div className="aspect-video rounded-2xl border border-white/10 bg-gradient-to-br from-purple-500/40 via-fuchsia-500/10 to-[#171719] p-4">
            <div className="flex h-full items-end">
              <span className="rounded-full bg-black/40 px-3 py-1 text-xs text-purple-100">Discover creators</span>
            </div>
          </div>
          <div className="mt-7 aspect-video rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/30 via-cyan-500/10 to-[#171719] p-4">
            <div className="flex h-full items-end">
              <span className="rounded-full bg-black/40 px-3 py-1 text-xs text-blue-100">Build your library</span>
            </div>
          </div>
        </div>
      </section> */}

      <section className="w-full">
        <Outlet />
      </section>
    </div>
  </main>
);

export default AuthLayout;
