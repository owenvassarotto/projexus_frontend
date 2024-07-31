import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})  

api.interceptors.request.use( config => {
    const token = localStorage.getItem('AUTH_TOKEN')
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }    
    return config
})
/* ⬆ For requests that don't require the token, we still send it because it won't be used. */

export default api