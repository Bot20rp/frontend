import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://backendsi1-production.up.railway.app/api',
  /*   baseURL : 'http://localhost:4000/api', */
    timeout: 10000
});

// Interceptor para añadir el token en la cabecera de autorización
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Enviar el token en la cabecera
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default instance;
