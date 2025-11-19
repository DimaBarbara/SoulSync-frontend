import axios from "axios";

export const API_URL = "https://soulsync-backend-prda.onrender.com";
const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

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
    if (error.response.status === 401 && !originalRequest._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get(`${API_URL}/auth/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem("token", response.data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
        return $api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token expired. Logging out.", refreshError);
        localStorage.removeItem("token");
      }
    }

    return Promise.reject(error);
  },
);

export default $api;
