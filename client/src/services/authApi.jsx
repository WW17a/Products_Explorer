import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const loginUser = async (credentials) => {
    const response = await axios.post(`${API_URL}/auth/signin`, credentials);
    return response.data;
};

export const signupUser = async (userData) => {
    const response = await axios.post(`${API_URL}/auth/signup`, userData);
    return response.data;
}

