import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BACKEND } from "../../utils/config";
import fetchStates from "../../utils/fetchStates";

// Thunk to create a new order
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async ({ orderInfo, token }) => {
    try {
      const response = await fetch(`${BACKEND.API_ADDRESS}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(orderInfo),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("error in reducer:", error);
      throw error.message;
    }
  }
);

// Thunk to fetch all orders
export const getOrders = createAsyncThunk("order/getOrders", async (token) => {
  try {
    const response = await fetch(`${BACKEND.API_ADDRESS}/order`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error in reducer:", error);
    throw error.message;
  }
});

// Thunk to update the status of an order
export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async ({ orderInfo, token }) => {
    try {
      const response = await fetch(`${BACKEND.API_ADDRESS}/order/${orderInfo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(orderInfo),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("error in reducer:", error);
      throw error.message;
    }
  }
);

// Thunk to delete an order
export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async ({ orderId, token }) => {
    try {
      const response = await fetch(`${BACKEND.API_ADDRESS}/order/${orderId}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("error in reducer:", error);
      throw error.message;
    }
  }
);

// Initial state
const initialState = {
  entities: [],
  message: null,
  status: "idle",
};

// Main slice
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.fulfilled, (state, action) => {
        if (action.payload.type !== fetchStates.error) {
          state.entities = state.entities.concat(action.payload.order);
          state.message = action.payload.message;
        } else {
          state.message = action.payload.message;
        }
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.message = action.payload;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        if (action.payload.type !== fetchStates.error) {
          state.entities = action.payload.orders;
        } else {
          state.message = action.payload.message;
        }
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.message = action.payload;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        if (action.payload.type === fetchStates.error) {
          state.message = action.payload.message;
        } else {
          const { orderId, newStatus, message } = action.payload;
          state.entities.forEach((order) => {
            if (order.id === orderId) {
              order.status = newStatus;
            }
          });
          state.message = message;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.message = action.payload;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        if (action.payload.type !== fetchStates.error) {
          const { id } = action.payload;
          state.entities = state.entities.filter((order) => order.id !== id);
        } else {
          state.message = action.payload.message;
        }
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.message = action.payload;
      });
  },
});

export default orderSlice.reducer;

/**
 * Reusable Selector Functions
 */
export const selectAllOrders = (state) => state.order.entities;

export const selectOrdersByUser = (state, userId) =>
  state.order.entities.filter((order) => order.customer === userId);

export const selectOrderById = (state, orderId) =>
  state.order.entities.find((order) => order.id === orderId);
