import React, { useState } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
// import { useNavigate } from "react-router-dom";
import FilterButtons from "../FilterButtons";
import VideoThumbnail from "../VideoThumbnail";
import { createRoutesFromChildren, useParams } from "react-router-dom";
import videosData from "../../utils/videosData.json";
import VideoPlayerCard from "./VideoPlayerCard";
import CommentSection from "./CommentSection";
// const videos = videosData.videos;

const WatchPageLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { id } = useParams();
  // console.log(id);
  // const navigate = useNavigate();
  // const [filteredVideos, setFilteredVideos] = useState(videosData.videos);
  // const [searchedVideo, setSearchedVideo] = useState(videosData.videos);
  const currentVideo = videosData.videos?.find((video) => video._id == id);
  // console.log(currentVideo);
  const videoURL = currentVideo?.videoUrl;
  // console.log(videoURL);

  const handleSearch = (searchQuery) => {
    // console.log(searchQuery);
    // navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    const lowerQuery = searchQuery.toLowerCase();

    if (searchQuery == "") {
      setFilteredVideos(videosData.videos);
    }
    const searchedVid = videosData.videos.filter((video) => {
      return (
        video.genre?.toLowerCase().includes(lowerQuery) ||
        video.title?.toLowerCase().includes(lowerQuery)
      );
    });
    // console.log(searchedVid);
    // setSearchedVideo(searchedVid);
    setFilteredVideos(searchedVid);
  };

  // const handleFilterBtns = (filterId) => {
  //   if (filterId === "all") {
  //     setFilteredVideos(videosData.videos);
  //   } else {
  //     const filteredOut = videosData.videos.filter((video) =>
  //       video.genre.toLowerCase().includes(filterId.toLowerCase())
  //     );
  //     setFilteredVideos(filteredOut);
  //   }
  // };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header onSearch={handleSearch} toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 pt-16 overflow-hidden">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <main className="flex overflow-auto bg-gray-50 ml-0 p-4 w-full">
          <div className="w-full">
            <VideoPlayerCard videoUrl={videoURL} />

            <CommentSection
              comments={currentVideo?.comments}
              videoId={currentVideo?._id}
              currentUser={currentVideo?.genre}
              onCommentsChanged={currentVideo?.genre}
              videoTitle={currentVideo?.title}
            />
          </div>
          <div className="suggestedVideo w-1/4 m-2 p-2  max-lg:hidden">
            {videosData.videos.map((video) => (
              <VideoThumbnail
                key={video._id}
                video={video}
                className="w-full"
              />
            ))}
          </div>

          {/* <FilterButtons onFilterChange={handleFilterBtns} />
          <div className="flex w-full h-60 flex-wrap justify-evenly gap-6">
            {filteredVideos.map((video) => (
              <VideoThumbnail key={video._id} video={video} />
            ))}
          </div> */}
        </main>
      </div>
    </div>
  );
};

export default WatchPageLayout;
