import { useGlobalContext } from "../management/context"

const HeaderCart = () => {

  const { amount } = useGlobalContext();

  return (
    <button className="button">
      <span>Cart</span>
      <span className="badge">{amount}</span>
    </button>
  )

}

export default HeaderCart
