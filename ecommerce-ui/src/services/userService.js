import {BACKEND} from "../utils/config"

export const userAPI = {
  getCurrentUser: async () => {
    const response = await fetch(`${BACKEND}/user/me`, {
      headers: getAuthHeader(),
    });
    return handleResponse(response);
  },

  updateProfile: async (userData) => {
    const response = await fetch(`${BACKEND}/user/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  getOrders: async () => {
    const response = await fetch(`${BACKEND}/user/orders`, {
      headers: getAuthHeader(),
    });
    return handleResponse(response);
  },

  getProducts: async () => {
    const response = await fetch(`${BACKEND}/user/products`, {
      headers: getAuthHeader(),
    });
    return handleResponse(response);
  }
};