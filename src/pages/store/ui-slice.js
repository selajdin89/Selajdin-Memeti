import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    cartIsVisible: false,
    cartCurrency: false,
  },
  reducers: {
    toggleCart(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },

    toggleCartCurrency(state) {
      state.cartCurrency = !state.cartCurrency;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
