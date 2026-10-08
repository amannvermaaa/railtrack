import axios from 'axios';

// Backend API URL
// Development: local backend
// Production: deployed Render backend
const API_BASE_URL = import.meta.env.PROD
  ? 'https://railtrack-o9l5.onrender.com/api'
  : 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

export const getLiveTrainStatus = async (trainNumber, date) => {
  const response = await apiClient.get('/train-status', {
    params: {
      train_number: trainNumber,
      date,
    },
  });
  return response.data;
};

export const getTrainsBetweenStations = async (fromCode, toCode) => {
  const response = await apiClient.get('/trains', {
    params: {
      from: fromCode,
      to: toCode,
    },
  });
  return response.data;
};

export const searchStations = async (query) => {
  const response = await apiClient.get('/stations/search', {
    params: {
      q: query,
    },
  });
  return response.data;
};

export const getConfigStatus = async () => {
  const response = await apiClient.get('/config');
  return response.data;
};