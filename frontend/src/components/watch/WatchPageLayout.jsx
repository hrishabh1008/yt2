import React, { useState } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import VideoThumbnail from "../VideoThumbnail";
import { useParams } from "react-router-dom";
import { useVideos } from "../../utils/context/videosContext";
import VideoPlayerCard from "./VideoPlayerCard";
import CommentSection from "./CommentSection";

const WatchPageLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { id } = useParams();
  console.log(id);
  const { videos, loading, error } = useVideos();
  const currentVideo = videos?.find((video) => video._id === id);
  console.log(currentVideo);
  const videoURL = currentVideo?.videoUrl;

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  if (loading) return <div>Loading video...</div>;
  if (error) return <div>Error loading video: {error.message || error}</div>;
  if (!currentVideo) return <div>Video not found.</div>;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header onSearch={() => {}} toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 pt-16 overflow-hidden">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <main className="flex overflow-auto bg-gray-50 ml-0 p-4 w-full">
          <div className="w-full">
            <VideoPlayerCard videoUrl={videoURL} />
            <CommentSection
              comments={currentVideo?.comments || []}
              videoId={currentVideo?._id}
              currentUser={currentVideo?.genre}
              onCommentsChanged={currentVideo?.genre}
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
