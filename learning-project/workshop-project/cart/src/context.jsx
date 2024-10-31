import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "./reducer";
import { CLEAR_CART, REMOVE, INCREASE, DECREASE, LOADING, DISPLAY_ITEMS } from './actions';
import cartItems from './data';
import { getTotals } from "./utils";

const AppContext = createContext();

const initialState = {
  loading: false,
  cart: new Map(),
}

const url = 'https://www.course-api.com/react-useReducer-cart-project';

export const AppProvider = ({children}) => {

  const [state,dispatch] = useReducer(reducer,initialState);

  const { totalAmount, totalCost } = getTotals(state.cart);

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  }

  const removeItem = (id) => {
    dispatch({ type: REMOVE, payload: { id } });
  }

  const increaseItem = (id) => {
    dispatch({ type: INCREASE, payload: { id } });
  }

  const decreaseItem = (id) => {
    dispatch({ type: DECREASE, payload: { id } });
  }

  const fetchData = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(url);
    const cart = await response.json();
    dispatch({ type: DISPLAY_ITEMS, payload: { cart } });
  }

  useEffect(()=>{
    fetchData();
  },[])

  return (
    <AppContext.Provider value={{ ...state, clearCart, removeItem, increaseItem, decreaseItem, totalAmount, totalCost }}>
      {children}
    </AppContext.Provider>
  )

}

export const useGlobalContext = () => {
  return useContext(AppContext);
}