/** @format */

import axios from 'axios';

const commonAPI = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});
commonAPI.interceptors.request.use((config) => {
  const apiKey = sessionStorage.getItem('apiKey');

  if (apiKey) {
    config.headers['apiKey'] = apiKey;
  }

  return config;
});

export default commonAPI;
