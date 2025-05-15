import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import FilterButtons from "./FilterButtons";
import VideoThumbnail from "./VideoThumbnail";
import { useVideos } from "../utils/context/videosContext";

const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { videos, loading, error } = useVideos();
  const [filteredVideos, setFilteredVideos] = useState([]);

  React.useEffect(() => {
    setFilteredVideos(videos);
  }, [videos]);

  const handleSearch = (searchQuery) => {
    const lowerQuery = searchQuery.toLowerCase();
    if (searchQuery === "") {
      setFilteredVideos(videos);
      return;
    }
    const searchedVid = videos.filter((video) => {
      return (
        video.genre?.toLowerCase().includes(lowerQuery) ||
        video.title?.toLowerCase().includes(lowerQuery)
      );
    });
    setFilteredVideos(searchedVid);
  };

  const handleFilterBtns = (filterId) => {
    if (filterId === "all") {
      setFilteredVideos(videos);
    } else {
      const filteredOut = videos.filter((video) =>
        video.genre?.toLowerCase().includes(filterId.toLowerCase())
      );
      setFilteredVideos(filteredOut);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  if (loading) return <div>Loading videos...</div>;
  if (error) return <div>Error loading videos: {error.message || error}</div>;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header onSearch={handleSearch} toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 pt-16 overflow-hidden">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <main className="flex-1 overflow-auto bg-gray-50 ml-0 p-4">
          <FilterButtons onFilterChange={handleFilterBtns} />
          <div className="flex w-full h-60 flex-wrap justify-evenly gap-6">
            {filteredVideos.map((video) => (
              <VideoThumbnail
                key={video._id}
                video={video}
                channel={video?.Channel || video.channelName || ""}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
