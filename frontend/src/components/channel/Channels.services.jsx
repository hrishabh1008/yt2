import api from "../api.service";

export const createChannel = async (channelData) => {
  try {
    console.log(channelData);

    const response = await api.post("/api/channel", channelData);
    return response.data;
  } catch (error) {
    throw error?.response?.data || { message: "Failed to create channel" };
  }
};

export const getChannelById = async (channelId) => {
  try {
    const response = await api.get(`/api/channel/${channelId}`);
    return response.data;
  } catch (error) {
    throw error?.response?.data || { message: "Failed to fetch channel info" };
  }
};

export const getChannelByOwner = async (ownerId) => {
  try {
    const response = await api.get(`/api/channel/user/${ownerId}`);
    return response.data;
  } catch (error) {
    if (error?.response?.status === 404) return null;
    throw (
      error?.response?.data || { message: "Failed to fetch channel by user" }
    );
  }
};
