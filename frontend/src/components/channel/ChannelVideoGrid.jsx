import React from "react";
import VideoThumbnail from "../VideoThumbnail";
import EditVideoModal from "./EditVideoModal";

const ChannelVideoGrid = ({ videos, user, channel, editVideoId, onEditModal, onDelete, onEditSave, setEditVideoId }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
      {videos.map((video) => (
        <div key={video._id} className="relative">
          <VideoThumbnail
            video={video}
            isOwner={true}
            user={user}
            channel={channel}
            onEdit={() => onEditModal(video._id)}
            onDelete={() => onDelete(video._id)}
          />
          {editVideoId === video._id && (
            <EditVideoModal
              isOpen={editVideoId === video._id}
              onClose={() => setEditVideoId(null)}
              video={video}
              onEdit={onEditSave}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ChannelVideoGrid;
