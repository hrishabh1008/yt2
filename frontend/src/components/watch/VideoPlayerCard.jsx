import React from "react";

const VideoPlayerCard = ({ videoUrl }) => {
  // console.log(videoUrl);
  const videoId = new URL(videoUrl).searchParams.get("v");

  return (
    <div className="aspect-video w-full rounded overflow-hidden">
      <iframe
        width="1236"
        height="695"
        src={
          videoUrl.includes("watch?v=")
            ? `https://www.youtube.com/embed/${videoId}`
            : `${videoUrl}`
        }
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        title="YouTube video player"
        allowFullScreen
        className="w-full h-full rounded-lg"></iframe>
    </div>
  );
};

export default VideoPlayerCard;
