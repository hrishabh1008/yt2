import React from "react";

const ChannelTabs = () => (
  <div className="flex gap-4 border-b mb-4">
    <button className="px-4 py-2 border-b-2 border-black font-semibold">Home</button>
    <button className="px-4 py-2 text-gray-500">Videos</button>
    <button className="px-4 py-2 text-gray-500">Shorts</button>
    <button className="px-4 py-2 text-gray-500">Live</button>
    <button className="px-4 py-2 text-gray-500">Playlists</button>
    <button className="px-4 py-2 text-gray-500">Community</button>
    <button className="px-4 py-2 text-gray-500">Channels</button>
    <button className="px-4 py-2 text-gray-500">About</button>
  </div>
);

export default ChannelTabs;
