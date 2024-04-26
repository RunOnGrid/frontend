import React from 'react';

const ItemMigration3 = ({ number, title, subtitle }) => {
  return (
    <div className="itemMigration tres">
      <span>{number} </span>
      <div>{title}</div>
      <p>{subtitle}</p>
    </div>
  );
};

export default ItemMigration3;
