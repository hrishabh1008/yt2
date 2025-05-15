import { Link, useNavigate } from "react-router-dom";
import multiavatar from "@multiavatar/multiavatar/esm";
// import { formatDistanceToNow } from "date-fns";

const VideoThumbnail = ({ video, className }) => {
  const navigate = useNavigate();
  // console.log(video);
  // const avatarContainer = useRef(null);
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
  // let avatarSvg = multiavatar(svgCode);
  // console.log(avatarSvg);
  // Format the view count
  const formatViewCount = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count;
  };

  // Format the upload date
  // const formatUploadDate = (dateString) => {
  //   try {
  //     const date = new Date(dateString);
  //     return formatDistanceToNow(date);
  //   } catch (error) {
  //     return dateString;
  //   }
  // };

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col cursor-pointer mb-4 w-80 ${
        className ? className : "xl:w-1/4"
      }  h-70 hover:scale-102`}>
      <Link>
        <div className="relative">
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-full h-auto rounded-lg object-cover"
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
          {/* Channel avatar */}
          <div className="flex-shrink-0 mr-2">
            <div
              className="w-9 h-9 rounded-full overflow-hidden"
              dangerouslySetInnerHTML={{
                __html: svgCode(video.title || "default"),
              }}
            />
            {/* <img
            src={avatarSvg || "/default-avatar.png"}
            alt={video.channelName}
            className="w-9 h-9 rounded-full"
          /> */}
          </div>
          {/* Title and metadata */}
          <div className="flex-1">
            <h3 className="text-sm font-medium line-clamp-2 text-gray-900">
              {video.title}
            </h3>
            <p className="text-xs text-gray-600 mt-1">
              {video.Channel.channelName}
            </p>
            <p className="text-xs text-gray-600">
              {formatViewCount(video.views)} views • {video.uploadDate}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VideoThumbnail;
