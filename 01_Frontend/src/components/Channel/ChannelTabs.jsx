const tabs = [
  "Videos",
  "Playlist",
  "Tweets",
  "Subscribed",
];

const ChannelTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="px-5 mt-8">

      <div className="flex border-b border-gray-400">

        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              flex-1
              py-3
              text-lg
              transition
              ${
                activeTab === tab
                  ? "bg-white text-[#A56BFF] border-b-2 border-[#A56BFF]"
                  : "text-[#91a0bd] hover:text-white"
              }
            `}
          >
            {tab}
          </button>
        ))}

      </div>

    </div>
  );
};

export default ChannelTabs;