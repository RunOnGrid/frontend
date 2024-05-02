import Paginacion from '@/commons/Paginacion';
import React, { useState } from 'react';

const Proyecto = () => {
  const [selected, setSelected] = useState(0);
  const toggle = (i) => {
    return setSelected(i);
  };
  return (
    <div>
      <div> s</div>
      <Paginacion anterior="Home" links="/profile" />
      <div className="contenedor-titulos-hosting-click-shared">
        <span
          className={`spanHosting-clickeable-shared${
            selected === 0 ? 'focus' : ''
          }`}
          onClick={() => toggle(0)}>
          Project
        </span>
        <span
          className={`spanHosting-clickeable-shared${
            selected === 1 ? 'focus' : ''
          }`}
          onClick={() => toggle(1)}>
          {' '}
          Deployments
        </span>
        <span
          className={`spanHosting-clickeable-shared${
            selected === 2 ? 'focus' : ''
          }`}
          onClick={() => toggle(2)}>
          {' '}
          Analytics
        </span>
        <span
          className={`spanHosting-clickeable-shared${
            selected === 3 ? 'focus' : ''
          }`}
          onClick={() => toggle(3)}>
          {' '}
          Logs
        </span>
        <span
          className={`spanHosting-clickeable-shared${
            selected === 4 ? 'focus' : ''
          }`}
          onClick={() => toggle(4)}>
          {' '}
          Storage
        </span>
        <span
          className={`spanHosting-clickeable-shared${
            selected === 5 ? 'focus' : ''
          }`}
          onClick={() => toggle(5)}>
          {' '}
          Settings
        </span>
      </div>
    </div>
  );
};

export default Proyecto;
