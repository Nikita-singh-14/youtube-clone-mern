const ChannelBanner = ({ channel }) => {
  return (
    <div className="w-full h-54 overflow-hidden">
      <img
        src={channel.coverImage}
        alt={channel.name}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default ChannelBanner;