import React from 'react'

const ItemMigration = ({number,title,subtitle}) => {
  return (
    <div className='itemMigration uno'>
        <span>{number} </span>
        <div>{title}</div>
        <p>{subtitle}</p>
    </div>
  )
}

export default ItemMigration