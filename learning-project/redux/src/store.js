import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../src/features/cart/cartSlice";
import modalSlice from "../src/features/modal/modalSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    modal: modalSlice,
  },
})