import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000',
    timeout: 5000, // Timeout if necessary
    header: {
      'ContentType': 'application/json',
      // Add all custom headers here
    },
  });
