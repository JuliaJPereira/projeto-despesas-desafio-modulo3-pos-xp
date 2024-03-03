import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001';

axios.interceptors.response.use(Promise.resolve, error => {
  if (error.response.status === 401 && window.location.pathname !== '/login') {
    window.location.href = '/login';
  }
  return Promise.reject(error);
});
