import React, { useState, useEffect } from "react";
import { createChannel } from "./Channels.services";

import { useNavigate } from "react-router-dom";

const ChannelModal = ({ isOpen, onClose, onChannelCreated }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user: owner } = useAuth(); // move this before the state

  const [formData, setFormData] = useState({
    channelName: "",
    ownerId: "",
    description: "",
  });

  useEffect(() => {
    if (owner) {
      setFormData((prev) => ({ ...prev, ownerId: owner.userId }));
    }
  }, [owner]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData);
    const newChannel = await createChannel(formData);
    onChannelCreated(newChannel);
    localStorage.setItem("channel", newChannel.newChannel._id);
    onClose();
    navigate("/");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md w-full max-w-md shadow-lg relative">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Create Your Channel</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-xl font-bold cursor-pointer">
            &times;
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Channel Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              value={formData.channelName}
              name="channelName"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer">
            {loading ? "Creating..." : "Create Channel"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChannelModal;
