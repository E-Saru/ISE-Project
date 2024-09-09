// import axios from 'axios';

// const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// export const bookMovers = (bookingData) => API.post('/book', bookingData);
// export const processPayment = (paymentData) => API.post('/pay', paymentData);
// export const signup = (userData) => API.post('/auth/signup', userData);
// export const login = (loginData) => API.post('/auth/login', loginData);
// export const googleLogin = () => window.location.href = 'http://localhost:5000/auth/login/google';  // social login URL


// api.js
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Add a request interceptor to include the JWT token in headers
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const bookMovers = (bookingData) => API.post('/book', bookingData);
export const processPayment = (paymentData) => API.post('/pay', paymentData);
export const signup = (userData) => axios.post('http://localhost:5000/auth/signup', userData);
export const login = (loginData) => axios.post('http://localhost:5000/auth/login', loginData);
export const googleLogin = () => window.location.href = 'http://localhost:5000/auth/login/google';
