import React from 'react'

const ItemMigration2 = ({number,title,subtitle}) => {
  return (
    <div className='itemMigration dos'>
        <span>{number} </span>
        <div>{title}</div>
        <p>{subtitle}</p>
    </div>
  )
}

export default ItemMigration2