import axios from "axios";

export const API_URL = "/api";
const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

let isRefreshing = false;
let failedQueue: Array<{ resolve: (value: unknown) => void; reject: (reason?: unknown) => void }> = [];

const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token); 
        }
    });
    failedQueue = [];
};

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

$api.interceptors.response.use(
  (response) => {
    if (response.data && response.data.data) {
      response.data = response.data.data;
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (status === 401 && !originalRequest._isRetry) {

        const retryOriginalRequest = new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
        });

        if (!isRefreshing) {
            isRefreshing = true;
            originalRequest._isRetry = true; 

            try {
                const response = await axios.get(`${API_URL}/auth/refresh`, { withCredentials: true });
                const newAccessToken = response.data.accessToken;
                
                localStorage.setItem('token', newAccessToken);
                $api.defaults.headers.Authorization = `Bearer ${newAccessToken}`;

                processQueue(null, newAccessToken);
                
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return $api(originalRequest);

            } catch (refreshError) {
                console.error("Refresh token expired. Logging out.", refreshError);
                localStorage.removeItem("token");
                processQueue(refreshError); 
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }
        
        const newAccessToken = await retryOriginalRequest;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return $api(originalRequest);
    }
    
    return Promise.reject(error);
  },
);

export default $api;