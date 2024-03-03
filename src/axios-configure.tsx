import axios from 'axios';

axios.defaults.baseURL = "http://localhost:3001";

axios.defaults.withCredentials = true;

axios.interceptors.response.use(undefined, error => {
  if (error.response.status === 401 && window.location.pathname !== '/login') {
    window.location.href = '/login';
  }
  return Promise.reject(error);
});
