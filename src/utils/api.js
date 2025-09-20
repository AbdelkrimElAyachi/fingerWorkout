import axios from "axios";
import { useAuthStore } from "../stores/authStore";

const url = import.meta.env.VITE_API_URL ?? "http://localhost:9999"

const api = axios.create({
    baseURL : url,
    timeout : 10000
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("auth_token");
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})


api.interceptors.response.use(
    (response) => response,
    (error) => {
        const auth = useAuthStore();
        if(error.response && error.response.status == 401 && auth.token){
            auth.clear();

            window.location = "/login";
        }
        return Promise.reject(error);
    }
)


export default api;
