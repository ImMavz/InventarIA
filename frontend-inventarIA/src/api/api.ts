import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // La URL de tu NestJS
});

export default api;