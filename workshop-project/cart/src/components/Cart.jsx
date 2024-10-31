import CartItem from "./CartItem"
import { useGlobalContext } from "../management/context"

const Cart = () => {

  const { cart, total, formatNumber } = useGlobalContext();

  if (cart.length === 0) {
    return (
      <div className="shopping-cart">
        <div className="empty">No Cart Item</div>
      </div>
    )
  }

  return (
    <div className="shopping-cart">
      <div className="title">Product in Cart</div>
      { cart.map((data)=>{
        return <CartItem key={data.id} {...data} />
      })}
      <div className="footer">Total Price {formatNumber(total)} Baht</div>
    </div>
  )

}

export default Cart