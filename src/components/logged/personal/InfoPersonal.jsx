import Paginacion from '@/commons/Paginacion';
import React, { useState } from 'react';

const InfoPersonal = () => {
  const [selected, setSelected] = useState(0);
  const toggle = (i) => {
    return setSelected(i);
  };
  return (
    <div style={{ width: '100%' }}>
      <div style={{ opacity: '0' }}>.</div>
      <Paginacion anterior="Settings" links="/profile" titulo="Billing" />
      <div className="probando-index">
        <div className="infoShared-titulo"> Account Information</div>

        <div className="contenedor-titulos-hosting-click-shared2">
          <span
            className={`spanHosting-clickeable-shared${
              selected === 0 ? 'focus' : ''
            }`}
            onClick={() => toggle(0)}>
            Personal Information
          </span>
          <span
            className={`spanHosting-clickeable-shared${
              selected === 1 ? 'focus' : ''
            }`}
            onClick={() => toggle(1)}>
            {' '}
            Account Settings
          </span>
        </div>

        {selected === 0 ? (
          <div className="infoPersonal-informacion">
            <div className="infoPersonal-titulo-container">
              {' '}
              <img
                className="infoPersonal-iconoPrincipal"
                src="/infoCard2.png"
              />{' '}
              Personal information{' '}
            </div>
            <div className="infoPersonal-subtitulo-container">
              {' '}
              La informacion provista a continuacion se reflejara en tu facturas{' '}
            </div>
            <div className="infoPersonal-renglones-container">
              <span> Name</span>{' '}
              <span style={{ color: '#0c1317' }}> Bautista Gonzalez Lazo</span>{' '}
              <span> </span>{' '}
            </div>
            <div className="infoPersonal-renglones-container">
              <span> Email </span>{' '}
              <span style={{ color: '#0c1317' }}>
                {' '}
                bautistagonzalezlazo@gmail.com
              </span>{' '}
              <span> </span>{' '}
            </div>

            <div className="infoPersonal-renglones-container">
              <span> Company name </span>{' '}
              <span style={{ color: '#0c1317' }}> -</span> <span> </span>{' '}
            </div>
            <div
              className="infoPersonal-renglones-container"
              style={{
                borderEndStartRadius: '5px',
                borderEndEndRadius: '5px',
              }}>
              <span> Detalles adicionales </span>{' '}
              <span style={{ color: '#0c1317' }}> -</span> <span> </span>{' '}
            </div>
            <div
              className="infoPersonal-renglones-container"
              style={{
                borderEndStartRadius: '5px',
                borderEndEndRadius: '5px',
                cursor: 'auto',
              }}>
              <span> Member since</span>{' '}
              <span style={{ color: '#0c1317' }}> 2023-04-04 13:32</span>{' '}
              <span> </span>{' '}
            </div>
          </div>
        ) : (
          ''
        )}

        {selected === 1 ? (
          <div className="infoPersonal-informacion">
            <div className="infoPersonal-titulo-container">
              {' '}
              <img
                className="infoPersonal-iconoPrincipal"
                src="/settings.png"
              />{' '}
              Account settings{' '}
            </div>

            <div className="infoPersonal-renglones-container">
              <span> Two factor authentication </span>{' '}
              <span style={{ color: '#0c1317' }}> Inhabilitado</span>{' '}
              <span> </span>{' '}
            </div>
          </div>
        ) : (
          ''
        )}

        <div style={{ opacity: '0' }}>.</div>
      </div>
    </div>
  );
};

export default InfoPersonal;
