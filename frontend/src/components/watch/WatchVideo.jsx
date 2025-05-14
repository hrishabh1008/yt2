import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { getVideoById, getAllVideos } from "../services/video.service";
import VideoPlayerCard from "./VideoPlayerCard";
// import CommentSection from "../components/video/CommentSection";
// import SuggestedVideos from "../components/video/SuggestedVideo";
// import { useAuth } from "../context/AuthContext";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { PiShareFatLight } from "react-icons/pi";
import { GoDownload } from "react-icons/go";
import videosData from "../../utils/videosData.json";
const VideoPlayerPage = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  const currentVideo = videosData.videos.filter((video) => video._id === id);
  setVideo(currentVideo);

  // const [suggestedVideos, setSuggestedVideos] = useState([]);
  // const { user: authUser } = useAuth();

  // const fetchVideo = async () => {
  //   const data = await getVideoById(id);
  //   // console.log(data);
  //   setVideo(data);
  // };

  // const fetchSuggestedVideos = async () => {
  //   const data = await getAllVideos();
  //   // console.log(data);
  //   // Exclude current video
  //   const filtered = data.filter((v) => v._id !== id);
  //   setSuggestedVideos(filtered);
  // };

  // useEffect(() => {
  //   fetchVideo();
  //   fetchSuggestedVideos();
  // }, [id]);

  if (!video) return <div className="p-8">Loading...</div>;

  return (
    <div className="flex p-4 space-x-6">
      {/* Left Side */}
      <div className="flex-1">
        <VideoPlayerCard videoUrl={video.videoUrl} />
        <h2 className="text-xl font-bold mt-4">{video.title}</h2>

        {/* Meta Info: Views + Upload Date */}
        {/* <p className="text-sm text-gray-500 mb-3">
          {video.views.toLocaleString()} views •{" "}
          {new Date(video.uploadDate).toLocaleDateString()}
        </p> */}

        {/* Channel + Action Buttons */}
        <div className="flex justify-between items-start mb-4">
          {/* Channel Info */}
          <div className="flex items-center space-x-4">
            <img
              // src={video.channel.avatar}
              // alt={video.channel.channelName}
              className="w-12 h-12 rounded-full"
            />
            <div>
              {/* <h4 className="font-semibold">{video.channel.channelName}</h4> */}
              <p className="text-sm text-gray-500">
                {video.subscriberCount.toLocaleString()} subscribers
              </p>
            </div>
            <button className="ml-4 bg-black text-white px-4 py-1.5 rounded-full font-semibold hover:bg-red-700">
              Subscribe
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <button className="bg-gray-100 px-3 py-1 rounded hover:bg-gray-200 text-sm flex items-center space-x-1">
              <span>
                <AiOutlineLike />
              </span>{" "}
              <span>{video.likes.toLocaleString()}</span>
            </button>
            <button className="bg-gray-100 px-3 py-1 rounded hover:bg-gray-200 text-sm flex items-center space-x-1">
              <span>
                <AiOutlineDislike />
              </span>{" "}
              <span>{video.dislikes.toLocaleString()}</span>
            </button>
            <button className="bg-gray-100 px-3 py-1 rounded hover:bg-gray-200 text-sm flex items-center space-x-1">
              <span>
                <PiShareFatLight />
              </span>{" "}
              <span>Share</span>
            </button>
            <button className="bg-gray-100 px-3 py-1 rounded hover:bg-gray-200 text-sm flex items-center space-x-1">
              <span>
                <GoDownload />
              </span>{" "}
              <span>Download</span>
            </button>
            <button className="bg-gray-100 px-3 py-1 rounded hover:bg-gray-200 text-sm">
              ...
            </button>
          </div>
        </div>

        {/* Video Description */}
        <p className="text-sm text-gray-800 mb-6 whitespace-pre-line">
          {video.description}
        </p>

        {/* Comments */}
        {/* <CommentSection comments={video.comments} /> */}
        {/* <CommentSection
          comments={video.comments}
          videoId={video._id}
          currentUser={authUser}
          onCommentsChanged={fetchVideo}
        /> */}
      </div>

      {/* Right Side: Suggested */}
      {/* <div className="w-[400px]">
        <SuggestedVideos videos={suggestedVideos} />
      </div> */}
    </div>
  );
};

export default VideoPlayerPage;
