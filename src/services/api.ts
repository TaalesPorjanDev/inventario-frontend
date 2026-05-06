import axios from 'axios';

const api = axios.create({
  baseURL: 'https://inventario-backend-mw06.onrender.com/api/v1',
});

export default api;
