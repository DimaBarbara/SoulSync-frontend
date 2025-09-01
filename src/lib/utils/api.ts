import axios from "axios"

export const API_URL = 'https://soulsync-backend-t2ik.onrender.com/api'
const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})
$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

$api.interceptors.response.use((response) => {
    if (response.data && response.data.data) {
        response.data = response.data.data;
    }
    return response;
}, (error) => {
    return Promise.reject(error);
});

export default $api