import React, { useState, useEffect, useContext } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { userContext } from "../../utils/context/usersContext";
import { useChannel } from "../../utils/context/channelContext";
import { ChannelProvider } from "../../utils/context/channelProvider";
import { getChannelByOwner } from "./Channels.services";
import { useVideos } from "../../utils/context/videosContext";
import { deleteVideo, editVideo, uploadVideo } from "../FetchVideosService";
import ChannelHeader from "./ChannelHeader";
import ChannelTabs from "./ChannelTabs";
import ChannelVideoGrid from "./ChannelVideoGrid";
import ChannelModals from "./ChannelModals";

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
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [editVideoId, setEditVideoId] = useState(null);

  // Fetch channel info and videos for this channel
  useEffect(() => {
    const fetchUserChannel = async () => {
      setLoading(true);
      try {
        if (!user || !user._id) {
          setChannel(null);
          setVideos([]);
          setLoading(false);
          return;
        }
        // Check if user owns a channel
        const userChannel = await getChannelByOwner(user._id);
        if (userChannel) {
          setChannel(userChannel);
          localStorage.setItem("channel", userChannel._id);
          // Filter videos for this channel
          const channelVideos = allVideos.filter(
            (v) =>
              v.channelName === userChannel._id ||
              v.channelName?._id === userChannel._id
          );
          setVideos(channelVideos);
        } else {
          setChannel(null);
          setVideos([]);
        }
      } catch (err) {
        setError(err.message || "Failed to load channel");
      } finally {
        setLoading(false);
      }
    };
    fetchUserChannel();
  }, [user, allVideos, setChannel, setVideos, setLoading, setError]);

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
  const handleUploadVideo = async (videoData) => {
    setActionError("");
    setActionSuccess("");
    try {
      const payload = {
        ...videoData,
        channelId: channel._id,
        userId: user._id,
      };
      const res = await uploadVideo(payload);
      setVideos([res.video, ...videos]);
      setActionSuccess("Video uploaded successfully.");
    } catch (err) {
      setActionError(err.message || "Failed to upload video");
    }
  };
  const handleEditVideoModal = (videoId) => {
    setEditVideoId(videoId);
  };
  const handleEditVideoSave = async (newData) => {
    if (!editVideoId) return;
    await handleEditVideo(editVideoId, newData);
    setEditVideoId(null);
  };
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto" />
        <span className="ml-4 text-lg text-gray-700">Loading channel...</span>
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded shadow">
          {error}
        </div>
      </div>
    );

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header onSearch={() => {}} toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 pt-16 overflow-hidden">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <main className="flex-1 overflow-auto bg-transparent ml-0 p-4">
          {/* Channel Details */}
          {channel ? (
            <>
              <ChannelHeader
                channel={channel}
                user={user}
                onUploadClick={() => setShowUploadModal(true)}
              />
              <div className="mb-6">
                <ChannelTabs />
              </div>
              <section className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  Your Videos
                </h3>
                {videos.length === 0 ? (
                  <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500 border border-dashed border-gray-300">
                    <span className="block mb-2 text-2xl">📹</span>
                    No videos yet. Click{" "}
                    <span className="font-semibold text-blue-600">
                      Upload Video
                    </span>{" "}
                    to add your first video!
                  </div>
                ) : (
                  <ChannelVideoGrid
                    videos={videos}
                    user={user}
                    channel={channel}
                    editVideoId={editVideoId}
                    onEditModal={handleEditVideoModal}
                    onDelete={handleDeleteVideo}
                    onEditSave={handleEditVideoSave}
                    setEditVideoId={setEditVideoId}
                  />
                )}
              </section>
            </>
          ) : (
            <div className="bg-white rounded-lg shadow p-8 mb-4 text-center border border-dashed border-gray-300">
              <p className="text-lg text-gray-700 mb-2">No channel found.</p>
              {isSignedIn && (
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="mt-2 bg-blue-600 text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-blue-700 transition">
                  Create Channel
                </button>
              )}
            </div>
          )}
          {/* Feedback messages */}
          <div className="fixed top-4 right-4 z-50">
            {/* {actionError && (
              <div className="bg-red-500 text-white px-4 py-2 rounded shadow animate-fade-in mb-2">
                {actionError}
              </div>
            )} */}
            {actionSuccess && (
              <div className="bg-green-500 text-white px-4 py-2 rounded shadow animate-fade-in">
                {actionSuccess}
              </div>
            )}
          </div>
          {/* Modals for create channel and upload video */}
          <ChannelModals
            showCreateModal={showCreateModal}
            setShowCreateModal={setShowCreateModal}
            user={user}
            onChannelCreated={async (newChannel) => {
              setChannel(newChannel.newChannel);
              setShowCreateModal(false);
            }}
            showUploadModal={showUploadModal}
            setShowUploadModal={setShowUploadModal}
            channel={channel}
            onUploadVideo={handleUploadVideo}
          />
        </main>
      </div>
    </div>
  );
};

const ChannelPageWithProvider = (props) => (
  <ChannelProvider>
    <ChannelPageLayout {...props} />
  </ChannelProvider>
);

export default ChannelPageWithProvider;
