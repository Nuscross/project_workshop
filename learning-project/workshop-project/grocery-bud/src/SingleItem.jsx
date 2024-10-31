import { useState } from "react";

const SingleItem = ({item,removeItem, editItems}) => {

  return (
    <div className="single-item">
      <input type="checkbox" checked={item.completed} onChange={()=>editItems(item.id)} />
      <p style={{
        textTransform: 'capitalize',
        textDecoration: item.completed && 'line-through'
      }}>{item.name}</p>
      <button type="button" className="btn remove-btn" onClick={()=>removeItem(item.id)}>
        delete
      </button>
    </div>
  )
}

export default SingleItem;
