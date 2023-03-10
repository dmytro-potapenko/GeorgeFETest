import axios from 'axios';

export const axiosInstance = axios.create({
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
});
