import { BiEdit, BiTrash } from "react-icons/bi";

const List = ({id,title,removeItem,editItem}) => {

  return (
    <div className="list-item">
      <p className="title">{title}</p>
      <div className="button-container">
        <BiEdit className="btn" onClick={()=>editItem(id)} />
        <BiTrash className="btn" onClick={()=>removeItem(id)} />
      </div>
    </div>
  )
}

export default List