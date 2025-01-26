import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  subtotal: 0,
  shippingFee: 5,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    initCart: (state, action) => {
      state.products = [...action.payload];
      state.subtotal = state.products.reduce(
        (total, item) => total + item.price * item.qty,
        0
      );
      state.total = state.subtotal + state.shippingFee;
    },
    addToCart: (state, action) => {
      const { product, qty } = action.payload;
      const existingProduct = state.products.find((item) => item.id === product.id);

      if (existingProduct) {
        existingProduct.qty += qty;
      } else {
        state.products.push({ ...product, qty });
      }

      state.subtotal = state.products.reduce(
        (total, item) => total + item.price * item.qty,
        0
      );
      state.total = state.subtotal + state.shippingFee;
      localStorage.setItem("digiCart", JSON.stringify(state.products));
    },
    updateQty: (state, action) => {
      const { productId, newQty } = action.payload;
      const productToUpdate = state.products.find((product) => product.id === productId);

      if (productToUpdate) {
        const diffQty = newQty - productToUpdate.qty;
        productToUpdate.qty = newQty;
        state.subtotal += productToUpdate.price * diffQty;
        state.total += productToUpdate.price * diffQty;
      }

      localStorage.setItem("digiCart", JSON.stringify(state.products));
    },
    removeFromCart: (state, action) => {
      const { id, price, qty } = action.payload;
      state.products = state.products.filter((product) => product.id !== id);
      state.subtotal -= price * qty;
      state.total -= price * qty;
      localStorage.setItem("digiCart", JSON.stringify(state.products));
    },
    clearCart: (state) => {
      state.products = [];
      state.subtotal = 0;
      state.total = 0;
      localStorage.removeItem("digiCart");
    },
  },
});

export const {
  initCart,
  addToCart,
  updateQty,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
