const reducer = (state,action) => {

  if (action.type === "REMOVE_ITEM") {
    let newCart = state.cart.filter((item) => item.id !== action.payload.id);
    return { ...state, cart: newCart }
  }
  if (action.type === "TOGGLE_QUANTITY") {
    let newCart = state.cart.map((item) => {
      if (item.id === action.payload.id) {
        if (action.payload.type === "increment") {
          return {
            ...item,
            quantity: item.quantity < 5 ? item.quantity + 1 : item.quantity
          }
        }
        else {
          return {
            ...item,
            quantity: item.quantity - 1
          }
        }
      }
      return item;
    })
    .filter((item) => item.quantity > 0);
    return { ...state, cart: newCart }
  }
  if (action.type === "CALCULATE_TOTAL") {
    const result = state.cart.reduce((cartTotal,item) => {
      const { price, quantity } = item;
      const itemTotal = price * quantity;
      cartTotal.total += itemTotal;
      cartTotal.amount += quantity;
      return cartTotal
    },
    {
        total: 0,
        amount: 0
    })
    return{
        ...state, total: result.total, amount: result.amount
    }
  }

}

export default reducer;