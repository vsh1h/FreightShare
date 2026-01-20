import axios from "axios";

const API_BASE_URL = 'https://freightshare-5f2y.onrender.com/api';

export const api=axios.create({
  baseURL:API_BASE_URL
})

export const getDriverStats = async (driverId) => {
  const response = await fetch(`${API_BASE_URL}/dashboard/driver-stats?driverId=${driverId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch driver stats');
  }
  return response.json();
};

export const getAvailableLoads = async () => {
  const response = await fetch(`${API_BASE_URL}/dashboard/available-loads`);
  if (!response.ok) {
    throw new Error('Failed to fetch available loads');
  }
  return response.json();
};

export const getActiveLoads = async (driverId) => {
  const response = await fetch(`${API_BASE_URL}/dashboard/active-loads?driverId=${driverId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch active loads');
  }
  return response.json();
};
