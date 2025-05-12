import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import FilterButtons from "./FilterButtons";
import VideoThumbnail from "./VideoThumbnail";

import videosData from "../public/videosData.json";
// const videos = videosData.videos;

const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const [filteredVideos, setFilteredVideos] = useState(videosData.videos);

  const handleSearch = (searchQuery) => {
    console.log(searchQuery);
    // navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    const filteredOut = filteredVideos.filter(
      (video) =>
        video.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.Channel.channelName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log(filteredOut);
    setFilteredVideos(filteredOut);
  };

  const handleFilterBtns = (filterId) => {
    if (filterId === "all") {
      setFilteredVideos(videosData.videos);
    } else {
      const filteredOut = videosData.videos.filter((video) =>
        video.genre.toLowerCase().includes(filterId.toLowerCase())
      );
      setFilteredVideos(filteredOut);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header onSearch={handleSearch} toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 pt-16 overflow-hidden">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <main className="flex-1 overflow-auto bg-gray-50 ml-0 p-4">
          <FilterButtons onFilterChange={handleFilterBtns} />
          <div className="flex w-full h-60 flex-wrap justify-evenly gap-6">
            {filteredVideos.map((video) => (
              <VideoThumbnail key={video._id} video={video} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
