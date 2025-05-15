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

// Delete a video by ID
export const deleteVideo = async (id) => {
  try {
    const res = await api.delete(`/api/videos/${id}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Edit (update) a video by ID
export const editVideo = async (id, data) => {
  try {
    const res = await api.put(`/api/videos/${id}`, data);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Upload a new video
export const uploadVideo = async (data) => {
  try {
    const res = await api.post("/api/videos", data);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
