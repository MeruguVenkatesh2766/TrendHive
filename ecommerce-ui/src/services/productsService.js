import {BACKEND} from "../utils/config"

export const productAPI = {
  getAll: async (filters = {}) => {
    const queryString = new URLSearchParams(filters).toString();
    const response = await fetch(`${BACKEND}/product?${queryString}`, {
      headers: getAuthHeader(),
    });
    return handleResponse(response);
  },

  getById: async (id) => {
    const response = await fetch(`${BACKEND}/product/${id}`, {
      headers: getAuthHeader(),
    });
    return handleResponse(response);
  },

  create: async (productData) => {
    const formData = new FormData();
    Object.keys(productData).forEach(key => {
      if (key === 'images') {
        productData.images.forEach(image => {
          formData.append('images', image);
        });
      } else {
        formData.append(key, productData[key]);
      }
    });

    const response = await fetch(`${BACKEND}/product`, {
      method: 'POST',
      headers: getAuthHeader(),
      body: formData,
    });
    return handleResponse(response);
  },

  update: async (id, productData) => {
    const formData = new FormData();
    Object.keys(productData).forEach(key => {
      if (key === 'images') {
        productData.images.forEach(image => {
          formData.append('images', image);
        });
      } else {
        formData.append(key, productData[key]);
      }
    });

    const response = await fetch(`${BACKEND}/product/${id}`, {
      method: 'PUT',
      headers: getAuthHeader(),
      body: formData,
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await fetch(`${BACKEND}/product/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader(),
    });
    return handleResponse(response);
  }
};