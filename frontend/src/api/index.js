import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000, // 10 секунд таймаут
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials) => {
    return api.post('/auth/login', credentials);
  },
  
  register: (userData) => {
    return api.post('/auth/register', userData);
  },
  
  logout: () => {
    return api.post('/auth/logout');
  },
  
  getUser: () => {
    return api.get('/auth/user');
  },

  deleteAccount: (passw) => {
    return api.delete('/auth/user', { data: passw });
  },
};

export const postAPI = {
  getPost: (id) => {
    return api.get(`/posts/${id}`);
  },

  getListPosts: () => {
    return api.get('/posts');
  },

  postCreate: (postData) => {
    return api.post('/posts', postData);
  },
  
};

export default api;