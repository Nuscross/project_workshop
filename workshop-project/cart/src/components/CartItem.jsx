import plusIcon from "../assets/image/plus.svg"
import minusIcon from "../assets/image/minus.svg"
import deleteIcon from "../assets/image/delete-icn.svg"
import { useGlobalContext } from "../management/context"

const CartItem = ({id,name,image_url,price,quantity}) => {

  const { removeItem, toggleQuantity, formatNumber } = useGlobalContext();

  return (
    <div className="item">
      <div className="product-image">
        <img alt="" src={image_url} />
      </div>
      <div className="description">
        <span>{name}</span>
        <span>Price {formatNumber(price)} Baht</span>
      </div>
      <div className="quantity">
        <button className="plus-btn" onClick={()=>toggleQuantity(id,"increment")}>
          <img alt="" src={plusIcon} />
        </button>
        <input type="text" value={quantity} disabled />
        <button className="minus-btn" onClick={()=>toggleQuantity(id,"decrement")}>
          <img alt="" src={minusIcon} />
        </button>
      </div>
      <div className="total-price">
        { formatNumber(quantity * price) }
      </div>
      <div className="remove-btn" onClick={()=>removeItem(id)}>
        <img alt="" src={deleteIcon} />
      </div>
    </div>
  )

}

export default CartItem
