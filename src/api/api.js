import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.15.9:3000', // Certifique-se de que esta URL está correta
});

export default api;
