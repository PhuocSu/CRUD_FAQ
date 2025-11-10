import api from "../config/api";

const AuthService = {
    signin: async (username, password) => {
        try {
            const response = await api.post("/auth/signin",
                { username, password },
                { withCredentials: true });
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
            return response.data;
        } catch (error) {
            console.error("FetchMe error:", error);
            throw error;
        }
    }
}

export default AuthService
