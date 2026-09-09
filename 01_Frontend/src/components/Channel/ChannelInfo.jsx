import { UserPlus } from "lucide-react";

const ChannelInfo = ({ channel }) => {
  return (
    <div className="px-5">

      <div className="relative flex items-center justify-between">

        {/* Channel Information */}
        <div className="flex items-center gap-5">

          {/* Avatar */}
          <div className="-mt-8">
            <img
              src={channel.avatar}
              alt={channel.name}
              className="
                w-35
                h-35
                rounded-full
                object-cover
                border-2
                border-white
              "
            />
          </div>

          {/* Details */}
          <div className="pt-5">

            <h1 className="text-2xl font-medium">
              {channel.name}
            </h1>

            <p className="text-[#91a0bd]">
              {channel.username}
            </p>

            <p className="text-[#91a0bd]">
              {channel.subscribers} Subscribers ·{" "}
              {channel.subscribed} Subscribed
            </p>

          </div>
        </div>

        {/* Subscribe */}
        <button
          className="
            flex
            items-center
            gap-2
            bg-[#A56BFF]
            text-black
            font-semibold
            px-5
            py-3
            shadow-[6px_6px_0px_#555]
            hover:bg-[#B47CFF]
          "
        >
          <UserPlus size={22} />

          {channel.isSubscribed
            ? "Subscribed"
            : "Subscribe"}
        </button>

      </div>
    </div>
  );
};

export default ChannelInfo;