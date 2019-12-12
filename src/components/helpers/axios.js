import axios from "axios"

export const axiosReportsUsers = () => {
    axios.defaults.baseURL = process.env.REACT_APP_API_LOGIN_LIVE
    axios.defaults.headers.common["X-API-KEY"] = 
        process.env.REACT_APP_JWT_SECRET_KEY 
        
    if (token) {
        Axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse (token)}`
    }
    return axios;
}