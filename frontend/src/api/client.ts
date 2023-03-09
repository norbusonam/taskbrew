import axios from 'axios';

const client = axios.create({
  // TODO: make env variable
  baseURL: 'http://localhost:3001/api/',
});

client.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { client };
