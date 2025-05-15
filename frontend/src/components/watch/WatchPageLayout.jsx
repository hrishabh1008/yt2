import React, { useState, useContext } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import VideoThumbnail from "../VideoThumbnail";
import { useParams } from "react-router-dom";
import { useVideos } from "../../utils/context/videosContext";
import { userContext } from "../../utils/context/usersContext";
import VideoPlayerCard from "./VideoPlayerCard";
import CommentSection from "./CommentSection";
import { BiLike, BiDislike } from "react-icons/bi";

const WatchPageLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { id } = useParams();
  // console.log(id);
  const { videos, loading, error } = useVideos();
  const { user } = useContext(userContext);
  const currentVideo = videos?.find((video) => video._id === id);
  // console.log(currentVideo);
  const videoURL = currentVideo?.videoUrl;
  const [comments, setComments] = useState(currentVideo?.comments || []);

  // Like/Dislike state
  const [likes, setLikes] = useState(currentVideo?.likes || 0);
  const [dislikes, setDislikes] = useState(currentVideo?.dislikes || 0);
  const [userLiked, setUserLiked] = useState(false);
  const [userDisliked, setUserDisliked] = useState(false);

  // Like/Dislike handlers
  const handleLike = () => {
    if (userLiked) {
      setLikes(likes - 1);
      setUserLiked(false);
    } else {
      setLikes(likes + 1);
      if (userDisliked) {
        setDislikes(dislikes - 1);
        setUserDisliked(false);
      }
      setUserLiked(true);
    }
  };
  const handleDislike = () => {
    if (userDisliked) {
      setDislikes(dislikes - 1);
      setUserDisliked(false);
    } else {
      setDislikes(dislikes + 1);
      if (userLiked) {
        setLikes(likes - 1);
        setUserLiked(false);
      }
      setUserDisliked(true);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Handler to update comments state after add/edit/delete
  const handleCommentsChanged = (newComments) => {
    setComments(newComments);
  };

  if (loading) return <div>Loading video...</div>;
  if (error) return <div>Error loading video: {error.message || error}</div>;
  if (!currentVideo) return <div>Video not found.</div>;

  // Defensive: channelName may be an object (populated) or id
  const channelName =
    currentVideo.channelName?.channelName ||
    currentVideo.channelName ||
    "Unknown Channel";
  const subscribers =
    currentVideo.subscriberCount || currentVideo.channelName?.subscribers || 0;
  const genre = currentVideo.genre || "N/A";

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header onSearch={() => {}} toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 pt-16 overflow-hidden">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <main className="flex overflow-auto bg-gray-50 ml-0 p-4 w-full">
          <div className="w-full">
            <VideoPlayerCard videoUrl={videoURL} />
            {/* Video Details */}
            <div className="bg-white rounded-lg shadow p-4 mb-4">
              <h2 className="text-2xl font-bold mb-2">
                {currentVideo.title || "Untitled Video"}
              </h2>
              <div className="flex flex-wrap items-center gap-4 mb-2">
                <span className="font-semibold text-gray-700">Channel:</span>
                <span className="text-blue-700 font-medium">{channelName}</span>
                <span className="text-gray-500">|</span>
                <span className="font-semibold text-gray-700">
                  Subscribers:
                </span>
                <span className="text-gray-800">
                  {subscribers.toLocaleString()}
                </span>
                <span className="text-gray-500">|</span>
                <span className="font-semibold text-gray-700">Genre:</span>
                <span className="text-gray-800">{genre}</span>
              </div>
              <div className="flex items-center gap-4 mb-2">
                <button
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                    userLiked
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                  onClick={handleLike}
                  aria-label="Like">
                  <BiLike /> {likes}
                </button>
                <button
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                    userDisliked
                      ? "bg-red-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                  onClick={handleDislike}
                  aria-label="Dislike">
                  <BiDislike /> {dislikes}
                </button>
              </div>
              <div className="text-gray-700 whitespace-pre-line mb-2">
                {currentVideo.description || "No description available."}
              </div>
            </div>
            <CommentSection
              comments={comments}
              setComments={setComments}
              videoId={currentVideo?._id}
              currentUser={user}
              onCommentsChanged={handleCommentsChanged}
              videoTitle={currentVideo?.title}
            />
          </div>
          <div className="suggestedVideo w-1/4 m-2 p-2  max-lg:hidden">
            {videos.map((video) => (
              <VideoThumbnail
                key={video._id}
                video={video}
                className="w-full"
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default WatchPageLayout;
