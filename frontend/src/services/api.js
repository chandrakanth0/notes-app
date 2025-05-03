// src/services/api.js
import axios from 'axios';

// Create an Axios instance for API calls
const API = axios.create({
  baseURL: "http://localhost:5000", // Adjust if your backend runs on a different URL/port
  withCredentials: true // Important for maintaining session (cookies) across requests
});

export default API;
