import { createContext } from "react";
import api from "../../components/api.service";



export const videoContext = createContext({
//fetch all videos
    getAllVideos: async () => {
        try {
            const res = await api.get('/api/videos');
            return res.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },
    
    // Fetch video by ID
    getVideoById : async (id) => {
        try {
            const res = await api.get(`/api/videos/${id}`);
            return res.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },
    
    // Search with multiple filters (e.g. title, category, etc.)
   searchVideos : async (queryParams) => {
    
        try {
            const res = await api.get('/api/videos/search', { params: queryParams });
            return res.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    }
})