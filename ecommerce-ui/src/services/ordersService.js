import {BACKEND} from "../utils/config"

export const orderAPI = {
  getAll: async () => {
    const response = await fetch(`${BACKEND}/order`, {
      headers: getAuthHeader(),
    });
    return handleResponse(response);
  },

  getById: async (id) => {
    const response = await fetch(`${BACKEND}/order/${id}`, {
      headers: getAuthHeader(),
    });
    return handleResponse(response);
  },

  create: async (orderData) => {
    const response = await fetch(`${BACKEND}/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(orderData),
    });
    return handleResponse(response);
  },

  update: async (id, orderData) => {
    const response = await fetch(`${BACKEND}/order/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(orderData),
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await fetch(`${BACKEND}/order/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader(),
    });
    return handleResponse(response);
  }
};