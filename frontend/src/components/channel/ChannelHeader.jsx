import React from "react";

const ChannelHeader = ({ channel, user, onUploadClick }) => {
  const isOwner = user && String(channel.ownerId?._id || channel.ownerId) === String(user._id);
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <h2 className="text-2xl font-bold mb-2">{channel.channelName}</h2>
      <div className="text-gray-700 mb-1">{channel.description}</div>
      <div className="text-gray-500 text-sm mb-2">
        Subscribers: {channel.subscribers || 0}
      </div>
      <div className="flex gap-2 mb-2">
        <button className="bg-black text-white px-4 py-2 rounded-full font-medium">
          Subscribe
        </button>
        <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full font-medium">
          Join
        </button>
        {isOwner && (
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-full font-medium"
            onClick={onUploadClick}
          >
            Upload Video
          </button>
        )}
      </div>
    </div>
  );
};

export default ChannelHeader;
