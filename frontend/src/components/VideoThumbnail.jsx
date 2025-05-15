import { Link, useNavigate } from "react-router-dom";
import multiavatar from "@multiavatar/multiavatar/esm";

const VideoThumbnail = ({
  video,
  className,
  onEdit,
  onDelete,
  isOwner,
  channel,
  user,
}) => {
  // console.log(video, className, onEdit, onDelete, isOwner, channel, user);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`watch/${video._id}`);
  };

  const svgCode = (str) => {
    if (str) {
      return multiavatar(str);
    } else {
      return multiavatar("ravi");
    }
  };

  const formatViewCount = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count;
  };

  // Prefer channel prop, fallback to video.channelName logic
  const channelDisplayName =
    (channel && channel?.channelName) ||
    user ||
    (video?.channelName && video?.Channel?.channelName) ||
    (typeof video.channelName === "string"
      ? video.channelName
      : "Unknown Channel");

  // Format date for improved readability
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date)) return dateString;
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col cursor-pointer rounded-lg mb-4 w-80 ${
        className ? className : "xl:w-1/4"
      } h-70 hover:scale-102`}>
      <div className="relative">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-auto rounded-lg object-fill "
          style={{ aspectRatio: "16/9" }}
        />
        {video.duration && (
          <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 py-0.5 rounded">
            {video.duration}
          </div>
        )}
      </div>
      {/* Video details */}
      <div className="flex mt-2">
        {/* Channel avatar */}
        <div className="flex-shrink-0 mr-2">
          <div
            className="w-9 h-9 rounded-full overflow-hidden"
            dangerouslySetInnerHTML={{
              __html: svgCode(video.title || "default"),
            }}
          />
        </div>
        {/* Title and metadata */}
        <div className="flex-1">
          <h3 className="text-sm font-medium line-clamp-2 text-gray-900">
            {video.title}
          </h3>
          <p className="text-xs text-gray-600 mt-1">{channelDisplayName}</p>
          <p className="text-xs text-gray-600">
            {formatViewCount(video.views)} views •{" "}
            {formatDate(video.uploadDate)}
          </p>
          {/* Edit/Delete buttons for owner */}
          {isOwner && (
            <div className="top-2 right-2 flex gap-2 z-20 rounded-lg p-1">
              {onEdit && (
                <button
                  className="bg-yellow-400 hover:bg-yellow-500 text-xs px-2 py-1 rounded shadow font-semibold text-gray-900 border border-yellow-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(video);
                  }}>
                  Edit
                </button>
              )}
              {onDelete && (
                <button
                  className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded shadow font-semibold border border-red-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(video);
                  }}>
                  Delete
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoThumbnail;
