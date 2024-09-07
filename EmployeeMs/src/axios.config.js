import axios from 'axios';

const axiosBase = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL 
});

console.log('Axios base URL:', axiosBase.defaults.baseURL);

export default axiosBase;