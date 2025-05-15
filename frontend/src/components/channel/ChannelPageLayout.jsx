import React, { useState, useEffect, useContext } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { userContext } from "../../utils/context/usersContext";
import { useChannel } from "../../utils/context/channelContext";
import { ChannelProvider } from "../../utils/context/channelProvider";
import { getChannelById } from "./Channels.services";
import { useVideos } from "../../utils/context/videosContext";
import VideoThumbnail from "../VideoThumbnail";
import { deleteVideo, editVideo } from "../FetchVideosService";
import CreateChannel from "./CreateChannel";

const ChannelPageLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, isSignedIn } = useContext(userContext);
  const {
    channel,
    setChannel,
    videos,
    setVideos,
    loading,
    setLoading,
    error,
    setError,
  } = useChannel();
  const { videos: allVideos } = useVideos();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [actionError, setActionError] = useState("");
  const [actionSuccess, setActionSuccess] = useState("");

  // Fetch channel info and videos for this channel
  useEffect(() => {
    const fetchChannelAndVideos = async () => {
      setLoading(true);
      try {
        // Assume channelId is stored in localStorage after creation or login
        const channelId = localStorage.getItem("channel");
        if (!channelId) {
          setChannel(null);
          setVideos([]);
          setLoading(false);
          return;
        }
        const channelData = await getChannelById(channelId);
        setChannel(channelData);
        // Filter videos for this channel
        const channelVideos = allVideos.filter(
          (v) => v.channelName === channelId || v.channelName?._id === channelId
        );
        setVideos(channelVideos);
      } catch (err) {
        setError(err.message || "Failed to load channel");
      } finally {
        setLoading(false);
      }
    };
    fetchChannelAndVideos();
  }, [allVideos, setChannel, setVideos, setLoading, setError]);

  // Edit and delete video handlers (no reload)
  const handleDeleteVideo = async (videoId) => {
    setActionError("");
    setActionSuccess("");
    try {
      await deleteVideo(videoId);
      setVideos(videos.filter((v) => v._id !== videoId));
      setActionSuccess("Video deleted successfully.");
    } catch (err) {
      setActionError(err.message || "Failed to delete video");
    }
  };
  const handleEditVideo = async (videoId, newData) => {
    setActionError("");
    setActionSuccess("");
    try {
      const updated = await editVideo(videoId, newData);
      setVideos(
        videos.map((v) => (v._id === videoId ? { ...v, ...updated } : v))
      );
      setActionSuccess("Video updated successfully.");
    } catch (err) {
      setActionError(err.message || "Failed to update video");
    }
  };

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  if (loading) return <div>Loading channel...</div>;
  if (error) return <div className="text-red-600 p-4">{error}</div>;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header onSearch={() => {}} toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 pt-16 overflow-hidden">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <main className="flex-1 overflow-auto bg-gray-50 ml-0 p-4">
          {/* Channel Details */}
          {channel ? (
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
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-4 mb-4 text-center">
              <p>No channel found.</p>
              {isSignedIn && (
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
                  Create Channel
                </button>
              )}
            </div>
          )}

          {actionError && (
            <div className="text-red-600 mb-2">{actionError}</div>
          )}
          {actionSuccess && (
            <div className="text-green-600 mb-2">{actionSuccess}</div>
          )}

          {/* Tabs */}
          <div className="flex gap-4 border-b mb-4">
            <button className="px-4 py-2 border-b-2 border-black font-semibold">
              Home
            </button>
            <button className="px-4 py-2 text-gray-500">Videos</button>
            <button className="px-4 py-2 text-gray-500">Shorts</button>
            <button className="px-4 py-2 text-gray-500">Live</button>
            <button className="px-4 py-2 text-gray-500">Playlists</button>
            <button className="px-4 py-2 text-gray-500">Community</button>
            <button className="px-4 py-2 text-gray-500">Channels</button>
            <button className="px-4 py-2 text-gray-500">About</button>
          </div>

          {/* Channel Videos List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((video) => (
              <div key={video._id} className="relative group">
                <VideoThumbnail video={video} />
                {/* Edit/Delete only for channel owner */}
                {user &&
                  channel &&
                  String(channel.ownerId) === String(user._id) && (
                    <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                      <button
                        className="bg-yellow-400 text-black px-2 py-1 rounded"
                        onClick={() =>
                          handleEditVideo(video._id, {
                            /* newData */
                          })
                        }>
                        Edit
                      </button>
                      <button
                        className="bg-red-600 text-white px-2 py-1 rounded"
                        onClick={() => handleDeleteVideo(video._id)}>
                        Delete
                      </button>
                    </div>
                  )}
              </div>
            ))}
          </div>

          {/* Create Channel Modal (if needed) */}
          {showCreateModal && (
            <CreateChannel
              isOpen={showCreateModal}
              onClose={() => setShowCreateModal(false)}
              user={user}
              onChannelCreated={async (newChannel) => {
                setChannel(newChannel.newChannel);
                setShowCreateModal(false);
              }}
            />
          )}
        </main>
      </div>
    </div>
  );
};

// Wrap with ChannelProvider for state management
const ChannelPageWithProvider = (props) => (
  <ChannelProvider>
    <ChannelPageLayout {...props} />
  </ChannelProvider>
);

export default ChannelPageWithProvider;
