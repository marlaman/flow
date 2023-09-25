import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const generateTasks = async (goal) => {
  try {
    const response = await api.post('/generate-tasks', { goal });
    return response.data;
  } catch (error) {
    throw error;
  }
};
