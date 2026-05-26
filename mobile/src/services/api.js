import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export const authService = {
  login: async (email, password) => {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  register: async (email, password, username) => {
    try {
      const response = await apiClient.post('/auth/register', { email, password, username });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  logout: () => {
    apiClient.defaults.headers.common['Authorization'] = '';
  },
};

export const gamesService = {
  getGames: async (system = null, search = '') => {
    try {
      const params = {};
      if (system) params.system = system;
      if (search) params.search = search;

      const response = await apiClient.get('/games', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to load games');
    }
  },

  getFeatured: async () => {
    try {
      const response = await apiClient.get('/games/featured');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to load featured games');
    }
  },

  getGameDetails: async (gameId) => {
    try {
      const response = await apiClient.get(`/games/${gameId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to load game details');
    }
  },
};

export const savesService = {
  getSaves: async (gameId) => {
    try {
      const response = await apiClient.get(`/saves/${gameId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to load saves');
    }
  },

  uploadSave: async (gameId, saveData) => {
    try {
      const response = await apiClient.post('/saves', { gameId, data: saveData });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to upload save');
    }
  },

  downloadSave: async (saveId) => {
    try {
      const response = await apiClient.get(`/saves/${saveId}/download`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to download save');
    }
  },
};

export const profileService = {
  getProfile: async () => {
    try {
      const response = await apiClient.get('/profile');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to load profile');
    }
  },

  updateProfile: async (profileData) => {
    try {
      const response = await apiClient.put('/profile', profileData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update profile');
    }
  },

  getProgress: async () => {
    try {
      const response = await apiClient.get('/profile/progress');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to load progress');
    }
  },
};

export default apiClient;
