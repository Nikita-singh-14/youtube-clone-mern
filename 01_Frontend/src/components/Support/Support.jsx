import { Link } from "react-router-dom";
import { HelpCircle, ShieldCheck, ScrollText } from "lucide-react";

const Support = () => (
  <section className="min-h-screen bg-[#111] px-4 py-12 text-white sm:px-7">
    <div className="mx-auto max-w-4xl">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-300">Help center</p>
      <h1 className="mt-3 text-3xl font-bold sm:text-4xl">How can we help?</h1>
      <p className="mt-3 max-w-2xl text-gray-400">
        Find account and platform information in our policy pages. For account changes, open your profile settings.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link to="/termsandcondition" className="rounded-xl border border-white/10 bg-[#181818] p-6 transition hover:border-purple-400/50">
          <ScrollText className="mb-4 text-purple-300" size={27} />
          <h2 className="text-lg font-semibold">Terms and conditions</h2>
          <p className="mt-2 text-sm text-gray-400">Review the terms for using VideoTube.</p>
        </Link>
        <Link to="/privacy" className="rounded-xl border border-white/10 bg-[#181818] p-6 transition hover:border-purple-400/50">
          <ShieldCheck className="mb-4 text-purple-300" size={27} />
          <h2 className="text-lg font-semibold">Privacy policy</h2>
          <p className="mt-2 text-sm text-gray-400">Learn about account information and privacy.</p>
        </Link>
        <Link to="/profile" className="rounded-xl border border-white/10 bg-[#181818] p-6 transition hover:border-purple-400/50 sm:col-span-2">
          <HelpCircle className="mb-4 text-purple-300" size={27} />
          <h2 className="text-lg font-semibold">Account settings</h2>
          <p className="mt-2 text-sm text-gray-400">Update profile details or change your password.</p>
        </Link>
      </div>
    </div>
  </section>
);

export default Support;
