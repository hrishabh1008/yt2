import api from "../components/api.service";

// Fetch all videos
export const getAllVideos = async () => {
  try {
      const res = await api.get("/api/videos");
    //   console.log(res)
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Fetch video by ID
export const getVideoById = async (id) => {
  try {
    const res = await api.get(`/api/videos/${id}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Search with multiple filters (e.g. title, category, etc.)
export const searchVideos = async (queryParams) => {
  try {
    const res = await api.get("/api/videos/search", { params: queryParams });
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
