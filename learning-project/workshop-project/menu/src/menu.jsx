import React from 'react'
import MenuItem from './menuItem'

const Menu = ({items}) => {
  return (
    <div className='section-center'>
      {items.map((menuItem)=>{
        return <MenuItem key={menuItem.id} {...menuItem} />
      })}
    </div>
  )
}

export default Menu
