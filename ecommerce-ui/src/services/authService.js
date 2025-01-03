import {BACKEND} from "../utils/config"

export const authAPI = {
  login: async (email, password) => {
    const response = await fetch(`${BACKEND}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await handleResponse(response);
    localStorage.setItem('token', data.token);
    return data;
  },

  register: async (userData) => {
    const response = await fetch(`${BACKEND}/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  logout: () => {
    localStorage.removeItem('token');
  }
};