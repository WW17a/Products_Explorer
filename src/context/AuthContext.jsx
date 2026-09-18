import { createContext, useContext, useState } from "react";
import { loginUser, signupUser } from "../services/authApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");

        if (!storedUser || storedUser === "undefined") {
            return null;
        }
           
        try {
            return JSON.parse(storedUser);
        } catch {
            localStorage.removeItem("user");
            return null;
        }
    });

    const login = async (credentials) => {
        const data = await loginUser(credentials);

        localStorage.setItem(
            "user",
            JSON.stringify(data.user)
        );

        setUser(data.user);

        return data;
    };

    const signup = async (userData) => {
        const data = await signupUser(userData);

        localStorage.setItem(
            "user",
            JSON.stringify(data.user)
        );

        setUser(data.user);

        return data;
    };

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: user ? true : false,
                login,
                signup,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};