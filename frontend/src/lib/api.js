import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000',
});

api.interceptors.request.use((config) => {
    const nanokey = localStorage.getItem('nanokey');
    if (nanokey) {
        config.headers['nanokey'] = nanokey; // For wallet endpoints
        config.headers['x-nano-key'] = nanokey; // For proxy endpoint
    }
    return config;
});

export default api;
