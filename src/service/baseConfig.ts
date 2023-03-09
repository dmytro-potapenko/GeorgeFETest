import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'api',
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
});
