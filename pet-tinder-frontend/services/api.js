import axios from 'axios';

// Create an Axios instance with a base URL for our backend
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:5000', // Your Flask backend URL
  headers: {
    'Content-Type': 'application/json'
  }
});

// This is where you'll define all your API calls
export default {
  signup(userData) {
    return apiClient.post('/auth/signup', userData);
  },
  login(credentials) {
    return apiClient.post('/auth/login', credentials);
  }
  // We will add more functions here later for pets, matches, etc.
};