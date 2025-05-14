import { createContext } from "react";
import api from "../../components/api.service";

export const channelContext = createContext({

  createChannel : async (channelData) => {
        try {
          console.log(channelData);
      
          const response = await api.post("/api/channel", channelData);
          return response.data;
        } catch (error) {
          throw error?.response?.data || { message: "Failed to create channel" };
        }
      },
      
    getChannelById : async (channelId) => {
        try {
          const response = await api.get(`/api/channel/${channelId}`);
          return response.data;
        } catch (error) {
          throw error?.response?.data || { message: "Failed to fetch channel info" };
        }
      }
      


})

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
