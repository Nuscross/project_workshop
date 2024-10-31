
/// Redux Toolkit ///

// Install

npm install @reduxjs/toolkit react-redux

// Setup Provider

import { store } from './store';
import { Provider } from 'react-redux';

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);

/* --------------------------------- */

// Setup Store

import { configureStore } from "@reduxjs/toolkit";

import cartSlice from "../src/features/cart/cartSlice";
import modalSlice from "../src/features/modal/modalSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    modal: modalSlice,
  },
})

/* --------------------------------- */

// Setup Slice and Reducer

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => { 
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item)=>item.id !== itemId);
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload);
      cartItem.amount = cartItem.amount + 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload);
      cartItem.amount = cartItem.amount - 1;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
})

export const { clearCart, removeItem, increase, decrease, calculateTotals } = cartSlice.actions;

export default cartSlice.reducer;

/* --------------------------------- */

// Access store value by useSelector

import { useSelector } from 'react-redux';

const Navbar = () => {

  const { amount } = useSelector((state) => state.cart);

  return (
    <nav>
      <div className='nav-center'>
        <h3>redux toolkit</h3>
        <div className='nav-container'>
          <div className='amount-container'>
            <p className='total-amount'>{amount}</p>
          </div>
        </div>
      </div>
    </nav>
  );

};

/* --------------------------------- */

// Action and useDispatch

import { useDispatch } from 'react-redux';

const CartContainer = () => {

  const dispatch = useDispatch();

  return (
    <>
      <button
        className='btn clear-btn'
        onClick={() => { dispatch(clearCart())}}
      >
        clear cart
      </button>
      <button 
        className='remove-btn' 
        onClick={() => dispatch(removeItem(id))}
      >
        remove
      </button>
    </>
  );

};