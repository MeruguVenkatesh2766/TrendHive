import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BACKEND } from "../../utils/config";
import fetchStates from "../../utils/fetchStates";

// Thunk to fetch all categories
export const getAllCategories = createAsyncThunk(
  "category/getAllCategories",
  async () => {
    try {
      const response = await fetch(`${BACKEND.API_ADDRESS}/category`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("error in reducer:", error);
      throw error;
    }
  }
);

// Thunk to fetch a single category by ID
export const getOneCategory = createAsyncThunk(
  "category/getOneCategory",
  async (categoryId) => {
    try {
      const response = await fetch(`${BACKEND.API_ADDRESS}/category/${categoryId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("error in reducer:", error);
      throw error.message;
    }
  }
);

// Thunk to add a new category
export const addNewCategory = createAsyncThunk(
  "category/addNewCategory",
  async ({ cateInfo, token }) => {
    try {
      const response = await fetch(`${BACKEND.API_ADDRESS}/category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(cateInfo),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("error in reducer:", error);
      throw error.message;
    }
  }
);

// Thunk to update a category
export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ cateInfo, token }) => {
    try {
      const response = await fetch(`${BACKEND.API_ADDRESS}/category/${cateInfo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(cateInfo),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("error in reducer:", error);
      throw error.message;
    }
  }
);

// Thunk to delete a category
export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async ({ categoryId, token }) => {
    try {
      const response = await fetch(`${BACKEND.API_ADDRESS}/category/${categoryId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
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
  status: fetchStates.idle,
  entities: [],
  message: null,
};

// Main slice
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    updateWithProductRemoved: (state, action) => {
      const { productId, categoryId } = action.payload;
      state.entities.forEach((entity) => {
        if (entity.id === categoryId) {
          entity.products = entity.products.filter(
            (product) => product !== productId
          );
        }
      });
    },
    updateWithProductAdded: (state, action) => {
      const { productId, categoryId } = action.payload;
      state.entities.forEach((entity) => {
        if (entity.id === categoryId) {
          entity.products = entity.products.concat(productId);
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, (state, action) => {
        state.status = fetchStates.fetching;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        if (action.payload.type !== fetchStates.error) {
          state.entities = action.payload.categories;
          state.status = fetchStates.success;
        } else {
          state.message = action.payload.message;
          state.status = fetchStates.error;
        }
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.status = fetchStates.error;
        state.message = action.payload;
      })
      .addCase(addNewCategory.fulfilled, (state, action) => {
        if (action.payload.type === fetchStates.error) {
          state.message = action.payload.message;
        } else {
          state.entities = state.entities.concat(action.payload.category);
          state.message = action.payload.message;
        }
      })
      .addCase(addNewCategory.rejected, (state, action) => {
        state.message = action.payload;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        if (action.payload.type === fetchStates.error) {
          state.message = action.payload.message;
        } else {
          const { category, message } = action.payload;
          state.entities.forEach((entity) => {
            if (entity.id === category.id) {
              entity.title = category.title;
            }
          });
          state.message = message;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.message = action.payload;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        if (action.payload.type === fetchStates.error) {
          state.message = action.payload.message;
        } else {
          const { categoryId } = action.payload;
          state.entities = state.entities.filter(
            (entity) => entity.id !== categoryId
          );
        }
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.message = action.payload;
      });
  },
});

export const {
  updateWithProductRemoved,
  updateWithProductAdded,
} = categorySlice.actions;

// Reusable Selector Functions
export const selectAllCategories = (state) => state.category.entities;

export const selectCategoryById = (state, categoryId) =>
  state.category.entities.find((category) => category.id === categoryId);

export default categorySlice.reducer;
