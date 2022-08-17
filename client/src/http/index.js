import axios from "axios";

export const api_url = "/api/"

const $api = axios.create({
    withCredentials: true,
    baseURL: api_url,
    }
)

$api.interceptors.request.use((config)=>{
    config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`
    return config;
})

export default $api;