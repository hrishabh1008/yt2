import React from "react";

const VideoPlayerCard = ({ videoUrl }) => {
  console.log(videoUrl);
  const videoId = new URL(videoUrl).searchParams.get("v");

  return (
    <div className="aspect-video w-full rounded overflow-hidden">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allowFullScreen
        className="w-full h-[480px] rounded-lg"></iframe>
    </div>
  );
};

export default VideoPlayerCard;
