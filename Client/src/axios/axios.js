import axios from 'axios';

export  const apiClient = axios.create({
  baseURL:`http://localhost:5000/api/v1.0.0/`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}` 
  }
});

// baseURL:`http://192.168.1.66:5000/api/v1.0.0/`