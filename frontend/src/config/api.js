import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3002',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
})

//gán accessToken vào header
api.interceptors.request.use(
    (config) => {
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

export default api