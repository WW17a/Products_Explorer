import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const loginUser = async (credentials) => {
    const response = await axios.post(
        `${API_URL}/signin`,
        credentials
    );

    return response.data;
};

export const signupUser = async (userData) => {
    const response = await axios.post(
        `${API_URL}/signup`,
        userData
    );
    
    return response.data;
    
};