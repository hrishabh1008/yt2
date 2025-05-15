import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getChannelById } from "../../services/channel.service";

const ChannelDetails = () => {
  const { channelId } = useParams();
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const data = await getChannelById(channelId);
        setChannel(data);
      } catch (err) {
        console.error("Failed to fetch channel:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchChannel();
  }, [channelId]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );

  if (!channel)
    return <div className="p-6 text-center">Channel not found.</div>;

  const tabs = [
    "HOME",
    "VIDEOS",
    "SHORTS",
    "LIVE",
    "PLAYLISTS",
    "COMMUNITY",
    "CHANNELS",
    "ABOUT",
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Channel Banner */}
      <div className="w-full h-48 md:h-56 bg-gray-200 overflow-hidden">
        {channel.bannerUrl ? (
          <img
            src={channel.bannerUrl}
            alt={`${channel.channelName} banner`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-blue-400 to-purple-500"></div>
        )}
      </div>

      {/* Channel Info */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center py-4 border-b">
          {/* Profile Picture */}
          <div className="relative -mt-12 md:-mt-16 mb-4 md:mb-0 mr-6">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-300 overflow-hidden border-4 border-white">
              {channel.profileImageUrl ? (
                <img
                  src={channel.profileImageUrl}
                  alt={`${channel.channelName} profile`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-red-500 text-white text-4xl font-bold">
                  {channel.channelName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>

          {/* Channel Info */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{channel.channelName}</h1>
            <div className="text-gray-500 text-sm mt-1">
              <span>
                @
                {channel.handle ||
                  channel.channelName.toLowerCase().replace(/\s+/g, "")}
              </span>
              <span className="mx-1">•</span>
              <span>{channel.subscriberCount || 0} subscribers</span>
              <span className="mx-1">•</span>
              <span>{channel.videoCount || 0} videos</span>
            </div>
            <p className="text-gray-500 text-sm mt-1 line-clamp-1">
              {channel.description}
            </p>
            <div className="mt-4 flex space-x-3">
              <button className="bg-black text-white px-4 py-2 rounded-full font-medium">
                Subscribe
              </button>
              <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full font-medium">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto scrollbar-hide mt-2">
          <button className="px-6 py-3 whitespace-nowrap font-medium text-black border-b-2 border-black">
            Videos
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChannelDetails;
