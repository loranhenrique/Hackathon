import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.43.64:3000',
    //baseURL: 'http://192.168.15.17:3000',
});

export default api;
