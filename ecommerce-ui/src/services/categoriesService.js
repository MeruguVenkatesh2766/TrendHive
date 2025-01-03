import {BACKEND} from "../utils/config"

export const categoryAPI = {
  getAll: async () => {
    const response = await fetch(`${BACKEND}/category`, {
      headers: getAuthHeader(),
    });
    return handleResponse(response);
  },

  getById: async (id) => {
    const response = await fetch(`${BACKEND}/category/${id}`, {
      headers: getAuthHeader(),
    });
    return handleResponse(response);
  },

  create: async (categoryData) => {
    const response = await fetch(`${BACKEND}/category`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(categoryData),
    });
    return handleResponse(response);
  },

  update: async (id, categoryData) => {
    const response = await fetch(`${BACKEND}/category/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(categoryData),
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await fetch(`${BACKEND}/category/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader(),
    });
    return handleResponse(response);
  }
};