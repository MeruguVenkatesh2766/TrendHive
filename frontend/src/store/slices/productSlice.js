import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BACKEND } from "../../utils/config";
import fetchStates from "../../utils/fetchStates";

// Thunk to fetch all products
export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async () => {
    try {
      const response = await fetch(`${BACKEND.API_ADDRESS}/product`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("error in reducer:", error);
      throw error.message;
    }
  }
);

// Thunk to fetch a product by its ID
export const getProductById = createAsyncThunk(
  "product/getProductById",
  async (productId) => {
    try {
      const response = await fetch(`${BACKEND.API_ADDRESS}/product/${productId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("error in reducer:", error);
      throw error.message;
    }
  }
);

// Thunk to add a new product
export const addNewProduct = createAsyncThunk(
  "product/addNewProduct",
  async ({ productInfo, token }) => {
    try {
      const response = await fetch(`${BACKEND.API_ADDRESS}/product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(productInfo),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("error in reducer:", error);
      throw error.message;
    }
  }
);

// Thunk to update a product
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ productInfo, token }) => {
    try {
      const response = await fetch(`${BACKEND.API_ADDRESS}/product/${productInfo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(productInfo),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("error in reducer:", error);
      throw error.message;
    }
  }
);

// Thunk to delete a product
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async ({ productId, token }) => {
    try {
      const response = await fetch(`${BACKEND.API_ADDRESS}/product/${productId}`, {
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
  status: "idle",
  entities: [],
  currentProduct: {},
  message: null,
  filterCategory: null,
  filterBrand: null,
};

// Main slice
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state, action) => {
        state.status = fetchStates.fetching;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        if (action.payload.type !== "error") {
          state.entities = action.payload.products;
          state.status = fetchStates.success;
        } else {
          state.message = action.payload.message;
          state.status = fetchStates.error;
        }
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.message = action.payload;
        state.status = fetchStates.error;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        if (action.payload.type !== "error") {
          state.currentProduct = action.payload.product;
        } else {
          state.message = action.payload.message;
        }
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.message = action.payload;
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        if (action.payload.type === "error") {
          state.message = action.payload.message;
        } else {
          state.entities = state.entities.concat(action.payload.product);
          state.message = action.payload.message;
        }
      })
      .addCase(addNewProduct.rejected, (state, action) => {
        state.message = action.payload;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        if (action.payload.type === "error") {
          state.message = action.payload.message;
        } else {
          const { product, message } = action.payload;
          state.entities.forEach((entity) => {
            if (entity.id === product.id) {
              entity.title = product.title;
              entity.price = product.price;
              entity.brand = product.brand;
              entity.category = product.category;
              entity.description = product.description;
              entity.countInStock = product.countInStock;
              entity.images = product.images;
            }
          });
          state.message = message;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.message = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        if (action.payload.type === fetchStates.error) {
          state.message = action.payload.message;
        } else {
          const { productId, message } = action.payload;
          state.entities = state.entities.filter((entity) => entity.id !== productId);
          state.message = message;
        }
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.message = action.payload;
      });
  },
});

export default productSlice.reducer;

/**
 * ===== Reusable Selector Functions =====
 */
export const selectAllProducts = (state) => state.product.entities;

export const selectProductById = (state, productId) =>
  state.product.entities.find((product) => product.id === productId);

export const selectProductsByCategory = (state, categoryId) =>
  state.product.entities.filter((product) => product.category === categoryId);

export const selectProductsByBrand = (state, brand) =>
  state.product.entities.filter((product) => product.brand === brand);
