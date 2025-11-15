import api from "../config/api";

const AuthService = {
    signin: async (username, password) => {
        try {
            const response = await api.post("/auth/signin",
                { username, password },
                { withCredentials: true });
            console.log('Signin response:', response.data); // Đoạn này log toàn bộ response
            return response.data;
        } catch (error) {
            console.error("Signin error:", error);
            throw error;
        }
    },
    signup: async (displayedName, username, password, email, phoneNumber) => {
        try {
            const response = await api.post("/auth/signup",
                { displayedName, username, password, email, phoneNumber },
                { withCredentials: true });
            return response.data;
        } catch (error) {
            console.error("Signup error:", error);
            throw error;
        }
    },
    signout: async () => {
        try {
            const response = await api.post("/auth/signout", {}, { withCredentials: true });
            return response.data;
        } catch (error) {
            console.error("Signout error:", error);
            throw error;
        }
    },
    fetchMe: async () => {
        try {
            const response = await api.get("/users/me", { withCredentials: true });
            return response.data.user;
        } catch (error) {
            console.error("FetchMe error:", error);
            throw error;
        }
    },

    updateProfile: async (displayedName, password, email, phoneNumber) => {
        try {
            const response = await api.put("/users/me/profile",
                { displayedName, password, email, phoneNumber },
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            console.error("UpdateProfile error:", error);
            throw error;
        }
    },
    refresh: async () => {
        try {
            console.log('🔄 Gọi API refresh token...');
            const response = await api.post("/auth/refresh", {}, { withCredentials: true });
            console.log('✅ Phản hồi từ /auth/refresh:', response.data);
            return response.data.accessToken;
        } catch (error) {
            console.error("Refresh error:", error);
            throw error;
        }
    }
}

export default AuthService
