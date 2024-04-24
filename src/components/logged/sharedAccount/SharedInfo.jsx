import Paginacion from '@/commons/Paginacion';
import React, { useState } from 'react';

const SharedInfo = () => {
  const [selected, setSelected] = useState(1);
  const toggle = (i) => {
    return setSelected(i);
  };
  return (
    <div className="contenedor-completo-shared">
      <div> s</div>
      <Paginacion anterior="Settings" links="/profile" titulo="Billing" />

      <div style={{ marginTop: '50px' }} className="infoShared-titulo">
        {' '}
        Shared Account
      </div>
      <div className="contenedor-titulos-hosting-click-shared">
        <span
          className={`spanHosting-clickeable-shared${
            selected === 1 ? 'focus' : ''
          }`}
          onClick={() => toggle(1)}>
          {' '}
          Application
        </span>
      </div>

      <div className="contenedor-nuevo-shared">
        <div> Share Project</div>
        <span> Generate a project invite for another user </span>
        <input className="input-shared2" placeholder="ex: hello@ongrid.run" />
        <span> Specify a role for this user</span>
        <div className="botones-shared">
          <button> Admin </button>
          <button> Developer </button>
          <button> Viewer </button>
        </div>
        {/* <div className="contenedor-agree">
          <input className="check-asicHosting" type="checkbox" />
          <div> Admin </div>
        </div>

        <div className="contenedor-agree">
          <input className="check-asicHosting" type="checkbox" />
          <div> Developer </div>
        </div>
        <div className="contenedor-agree">
          <input className="check-asicHosting" type="checkbox" />
          <div> Viewer </div>
        </div> */}
        <button> Create invite </button>
        <div> Invites & collaborators</div>
        <span> Manage pending invites and view collaborators. </span>
        <section>
          {' '}
          <h4> This project currently has no invites or collaborators </h4>{' '}
        </section>
      </div>
    </div>
  );
};

export default SharedInfo;
