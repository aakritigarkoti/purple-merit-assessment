import axios from 'axios';

// LOCALHOST (Commented out):
// const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// LIVE RENDER SERVER:
const API = axios.create({ baseURL: 'https://purple-merit-assessment-0fx8.onrender.com/api' });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;