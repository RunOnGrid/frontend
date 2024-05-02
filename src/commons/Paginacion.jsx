import Link from 'next/link';
import React from 'react';

const Paginacion = ({ titulo, links, anterior }) => {
  return (
    <div className="guia-paginacion">
      <Link style={{ display: 'flex' }} href={links}>
        <span className="titulo-guia-paginacion"> {anterior}</span>
      </Link>
      <img className="icono-guia-paginacion" src="/nextDark.png" alt="" />
      <span className="actual-guia=paginacion"> {titulo} </span>
    </div>
  );
};

export default Paginacion;
