import axios from "axios";
import UseAuthStore from "../stores/UseAuthStore";

const BASE_URL = import.meta.env.MODE === "development"
    ? 'http://localhost:3002'
    : ''; // production: same origin

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
});
console.log('API instance created with interceptors');

//gán accessToken vào header
api.interceptors.request.use(
    (config) => {
        console.log('➡️ Sending request to:', config.url);
        const token = localStorage.getItem('auth-storage');
        if (token) {
            try {
                const parsedToken = JSON.parse(token);
                if (parsedToken?.state?.accessToken) {
                    config.headers.Authorization = `Bearer ${parsedToken.state.accessToken}`;
                }
            } catch (error) {
                console.error("Error parsing auth token: ", error);
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

//tự động gọi refreshToken khi acesstoken hết hạn
api.interceptors.response.use(
    (response) => {
        console.log('✅ Response from:', response.config.url, response.status);
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        //những api không cần 
        if (originalRequest.url.includes("/auth/refresh") ||
            originalRequest.url.includes("/auth/signin") ||
            originalRequest.url.includes("/auth/signup")
        ) {
            return Promise.reject(error) //bỏ qua trả về lỗi
        }

        console.log("⚠️ Interceptor triggered for error:", error.response?.status);
        console.log("🔍 Original request URL:", originalRequest?.url);

        if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            console.log("🔄 Attempting to refresh token...");

            try {
                // Gọi API refresh token (HTTP-only cookie chứa refreshToken)
                const response = await api.post('/auth/refresh', {}, { withCredentials: true });
                const newAccessToken = response.data.accessToken;

                console.log("✅ New access token received:", newAccessToken);

                // Cập nhật access token mới vào localStorage
                localStorage.setItem('auth-storage', JSON.stringify({
                    state: { accessToken: newAccessToken }
                }));
                console.log("💾 Saved new token to localStorage");

                // Cập nhật trong store Zustand
                UseAuthStore.getState().setAccessToken(newAccessToken);
                console.log("📦 Updated Zustand store with new access token");

                // Gắn header mặc định mới cho axios
                api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
                console.log("🧩 Updated default axios Authorization header");

                // Thử gửi lại request gốc
                console.log("🚀 Retrying original request:", originalRequest.url);
                return api(originalRequest);
            } catch (refreshError) {
                console.error("❌ Lỗi khi làm mới token:", refreshError);

                // Xóa dữ liệu đăng nhập và chuyển hướng
                UseAuthStore.getState().clearState();
                localStorage.removeItem('auth-storage');
                console.log("🧹 Cleared user state, redirecting to /signin");
                window.location.href = '/signin';
            }
        }

        console.log('Interceptor error:', error.response?.status);
        return Promise.reject(error);
    }
);



export default api