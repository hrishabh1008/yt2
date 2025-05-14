import api from "../api.service";



// Register a new user
export const signupUser = async (userData) => {
  try {
    const response = await api.post(`/api/auth/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Something went wrong!" };
  }
};

// Sign in existing user
export const signinUser = async (userData) => {
  try {
    const response = await api.post(`/api/auth/login`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Something went wrong!" };
  }
};
