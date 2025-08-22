import axios from 'axios';

// Backend API base URL - matches the Express server
const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 100000,
});

// Create API instance for form data (file uploads)
const apiFormData = axios.create({
  baseURL: API_BASE_URL,
  timeout: 100000,
  // Don't set Content-Type header, let browser set it with boundary for multipart
});

export const itemsAPI = {
  // Get all items for homepage listing
  getAll: async () => {
    try {
      const response = await api.get('/items');
      return response.data;
    } catch (error) {
      throw handleAPIError(error);
    }
  },

  // Get item details by ID
  getDetails: async (id) => {
    try {
      const response = await api.get(`/items/details/${id}`);
      return response.data;
    } catch (error) {
      throw handleAPIError(error);
    }
  },

  // Filter items based on criteria
  filter: async (filterParams) => {
    try {
      const queryString = new URLSearchParams(filterParams).toString();
      const response = await api.get(`/items/filter?${queryString}`);
      return response.data;
    } catch (error) {
      throw handleAPIError(error);
    }
  },

  // Create new item with details and file upload
  createFull: async (formData) => {
    try {
      console.log('Creating item with full details...');
      const response = await apiFormData.post('/items/full', formData);
      console.log('Response:', response.data);
      return response.data;
    } catch (error) {
      throw handleAPIError(error);
    }
  },

  // Legacy method - keeping for backward compatibility
  create: async (itemData) => {
    try {
      console.log('Sending data to:', `${API_BASE_URL}/items`);
      console.log('Data:', itemData);
      
      const response = await api.post('/items', itemData);
      console.log('Response:', response.data);
      return response.data;
    } catch (error) {
      throw handleAPIError(error);
    }
  }
};

// Centralized error handling
function handleAPIError(error) {
  console.error('Full error details:', error);
  
  if (error.code === 'ECONNREFUSED') {
    return new Error(`Cannot connect to server at ${API_BASE_URL}. Is your backend running?`);
  } else if (error.response) {
    return new Error(`Server error: ${error.response.status} - ${error.response.data?.message || 'Unknown error'}`);
  } else if (error.request) {
    return new Error('No response from server. Check if backend is running and CORS is enabled.');
  } else {
    return new Error(`Request setup error: ${error.message}`);
  }
}

export default api;