import api from "../api.service";



// Register a new user
export const signupUser = async (userData) => {
  try {
    const response = await api.post(`/api/auth/register`, userData);
    // console.log(response);
    return response;
  } catch (error) {
    console.log(error.response?.data);
    throw error.response?.data || { message: "Something went wrong!" };
  }
};

// Sign in existing user
export const signinUser = async (userData) => {
  try {
    const response = await api.post(`/api/auth/login`, userData);
    // console.log(response);
    return response;
  } catch (error) {
    console.log(error.response?.data);
    throw error.response?.data || { message: "Something went wrong!" };
  }
};
