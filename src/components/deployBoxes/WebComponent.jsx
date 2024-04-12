import Image from 'next/image';
import React, { useState } from 'react';

export const WebComponent = () => {
  const [selected, setSelected] = useState(0);
  const toggle = (i) => {
    return setSelected(i);
  };

  return (
    <>
      <div>
        <div className="card-newApp2">
          <div style={{ display: 'flex', padding: '10px' }}>
            <h3 style={{ fontFamily: 'rouben', margin: '5px' }}> Web: </h3>
            <h3 style={{ fontFamily: 'rouben ligth', margin: '5px' }}>Name</h3>
          </div>

          <div className="contenedor-titulos-hosting-click-shared2">
            <span
              style={{ marginLeft: '42px' }}
              className={`spanHosting-clickeable-shared${
                selected === 0 ? 'focus' : ''
              }`}
              onClick={() => toggle(0)}>
              General
            </span>
            <span
              className={`spanHosting-clickeable-shared${
                selected === 1 ? 'focus' : ''
              }`}
              onClick={() => toggle(1)}>
              {' '}
              Resources
            </span>
            <span
              className={`spanHosting-clickeable-shared${
                selected === 2 ? 'focus' : ''
              }`}
              onClick={() => toggle(2)}>
              {' '}
              Advanced
            </span>
          </div>
          {selected === 0 ? (
            <>
              <div className="icono-titulo"></div>
              <label> Start command </label>
              <input placeholder="npm start" />

              <label> Container port</label>
              <input placeholder="3000" />
              <button> Save changes </button>
            </>
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  );
};
