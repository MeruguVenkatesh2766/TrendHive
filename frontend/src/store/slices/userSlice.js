import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BACKEND } from "../../utils/config";
import fetchStates from "../../utils/fetchStates";

// Thunk to add a new user
export const addNewUser = createAsyncThunk(
  "user/addNewUser",
  async (userInfo) => {
    try {
      const response = await fetch(`${BACKEND.API_ADDRESS}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("error in reducer:", error);
      throw error;
    }
  }
);

// Thunk for user login
export const userLogin = createAsyncThunk(
  "user/userLogin",
  async (userInfo) => {
    try {
      const response = await fetch(`${BACKEND.API_ADDRESS}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("error in reducer:", error);
      throw error;
    }
  }
);

// Thunk to get user info
export const getUserInfo = createAsyncThunk(
  "user/getUserInfo",
  async ({ userId, token }) => {
    try {
      const response = await fetch(`${BACKEND.API_ADDRESS}/user/${userId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("error in reducer:", error);
      throw error;
    }
  }
);

// Thunk to update user info
export const updateUserInfo = createAsyncThunk(
  "user/updateUserInfo",
  async ({ userId, token, userInfo }) => {
    try {
      const response = await fetch(`${BACKEND.API_ADDRESS}/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(userInfo),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("error in reducer:", error);
      throw error;
    }
  }
);

// Thunk to get all users
export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (token) => {
    try {
      const response = await fetch(`${BACKEND.API_ADDRESS}/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("error in reducer:", error);
      throw error;
    }
  }
);

// Initial state
const initialState = {
  entities: [],
  message: null,
  errors: {},
  loginUser: {
    userId: null,
    token: null,
    authAdmin: false,
  },
  info: {},
  status: fetchStates.idle,
};

// Main slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state, action) => {
      state.loginUser = {
        userId: null,
        token: null,
      };
      state.info = {};
      localStorage.removeItem("digiUser");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewUser.fulfilled, (state, action) => {
        if (action.payload.type !== fetchStates.error) {
          state.entities = state.entities.concat(action.payload.user);
        } else {
          state.message = action.payload.message;
        }
      })
      .addCase(addNewUser.rejected, (state, action) => {
        state.message = action.payload.message;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        if (action.payload.type !== fetchStates.error) {
          state.loginUser = action.payload;
        } else {
          state.message = action.payload.message;
        }
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.message = action.payload.message;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        if (action.payload.type !== fetchStates.error) {
          state.info = action.payload.user;

          if (state.loginUser.userId === null) {
            state.loginUser = JSON.parse(localStorage.getItem("digiUser"));
          }
        } else {
          state.message = action.payload.message;
        }
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.message = action.payload.message;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        if (action.payload.type !== fetchStates.error) {
          const { user } = action.payload;
          state.info = user;
        }
        state.message = action.payload.message;
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.message = action.payload.message;
      })
      .addCase(getAllUsers.pending, (state, action) => {
        state.status = fetchStates.fetching;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        if (action.payload.type !== fetchStates.error) {
          state.status = fetchStates.success;
          state.entities = action.payload.users;
        } else {
          state.status = fetchStates.error;
          state.message = action.payload.message;
        }
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.status = fetchStates.error;
        state.message = action.payload.message;
      });
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;

/**
 * ===== Reusable Selector Functions =====
 */
export const selectAllUsers = (state) => state.user.entities;

export const selectLoginUser = (state) => state.user.loginUser;
