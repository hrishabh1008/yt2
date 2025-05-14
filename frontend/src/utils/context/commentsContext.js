import { createContext } from "react";
import api from "../../components/api.service";



export const commentContext = createContext({
   

// Add new comment
addComment :async (data) => {
    console.log(data);

    const res = await api.post('/api/comments', data);
    return res.data;
},

// Edit a comment by ID
editComment : async (id, content) => {
    const res = await api.put(`/api/comments/${id}`, { content });
    return res.data;
},

// Delete a comment by ID
deleteComment : async (id) => {
    const res = await api.delete(`/api/comments/${id}`);
    return res.data;
},

})

