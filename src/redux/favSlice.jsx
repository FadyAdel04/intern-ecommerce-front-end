import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favItems: [],
};

const favSlice = createSlice({
  name: "fav",
  initialState,
  reducers: {
    addToFav: (state, action) => {
      if (!state.favItems) {
        state.favItems = [];
      }
      const existingItem = state.favItems.find(
        (item) => item.id === action.payload.id
      );
      if (!existingItem) {
        state.favItems.push(action.payload);
      }
    },
    removeFromFav: (state, action) => {
      state.favItems = state.favItems.filter(
        (item) => item.id !== action.payload
      );
    },
    clearItems: (state) => {
      state.favItems = [];
    },
  },
});

export const { addToFav, removeFromFav, clearItems } = favSlice.actions;
export default favSlice.reducer;
