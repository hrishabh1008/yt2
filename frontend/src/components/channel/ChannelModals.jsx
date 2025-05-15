import React from "react";
import CreateChannel from "./CreateChannel";
import UploadVideoModal from "./UploadVideoModal";

const ChannelModals = ({
  showCreateModal,
  setShowCreateModal,
  user,
  onChannelCreated,
  showUploadModal,
  setShowUploadModal,
  channel,
  onUploadVideo
}) => (
  <>
    {showCreateModal && (
      <CreateChannel
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        user={user}
        onChannelCreated={onChannelCreated}
      />
    )}
    {showUploadModal && (
      <UploadVideoModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        channel={channel}
        user={user}
        onUpload={onUploadVideo}
      />
    )}
  </>
);

export default ChannelModals;
