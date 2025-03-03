import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.cartItems.push({ ...item, quantity: item.quantity });
      }

      state.totalQuantity += item.quantity;
      state.totalPrice += item.price * item.quantity;
    },

    removeFromCart: (state, action) => {
      const itemId = action.payload;
      const item = state.cartItems.find((i) => i.id === itemId);

      if (item) {
        state.totalQuantity -= item.quantity;
        state.totalPrice -= item.price * item.quantity;
        state.cartItems = state.cartItems.filter((i) => i.id !== itemId);
      }
    },

    increaseQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.cartItems.find((i) => i.id === itemId);

      if (item) {
        item.quantity += 1;
        state.totalQuantity += 1;
        state.totalPrice += item.price;
      }
    },

    decreaseQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.cartItems.find((i) => i.id === itemId);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.totalQuantity -= 1;
        state.totalPrice -= item.price;
      } else if (item && item.quantity === 1) {
        state.totalQuantity -= 1;
        state.totalPrice -= item.price;
        state.cartItems = state.cartItems.filter((i) => i.id !== itemId);
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
