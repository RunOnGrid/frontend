import Paginacion from '@/commons/Paginacion';
import React, { useState } from 'react';
import SharedBox from './SharedBox';
import Image from 'next/image';
import SharedPopUp from './SharedPopUp';

const SharedInfo = () => {
  const [selected, setSelected] = useState(1);
  const [showPopup, setShowPopup] = useState(false);

  const toggle = (i) => {
    return setSelected(i);
  };

  const handleImageClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="contenedor-completo-shared">
      <div> s</div>
      <Paginacion
        anterior="Settings"
        links="/profile"
        titulo="Shared Account"
      />

      <div style={{ marginTop: '50px' }} className="infoShared-titulo">
        Shared Account
      </div>
      <span className="span-shared">
        Generate a project invite for another user
      </span>
      <div className="contenedor-titulos-hosting-click-shared">
        <span
          className={`spanHosting-clickeable-shared${
            selected === 1 ? 'focus' : ''
          }`}
          onClick={() => toggle(1)}>
          Application
        </span>
      </div>

      <div className="contenedor-nuevo-shared">
        <div> Share Project</div>

        <span>Select project</span>
        <div style={{ display: 'flex' }}>
          <SharedBox />
          <SharedBox />
          <SharedBox />
        </div>

        <span> Specify a role for this user</span>
        <div className="botones-shared">
          <button> Owner</button>
          <button> Admin </button>
          <button> Developer </button>
          <button> Viewer </button>
        </div>
        <span>Users address</span>
        <input className="shared-input" placeholder="ex:hello@ongrid.run" />
        <button>Generate Invite</button>
        <div className="linea-separadora2"></div>
        <div> Invites & collaborators</div>
        <span style={{ marginBottom: '40px' }}>
          Manage pending invites and view collaborators.
        </span>
        <div className="shared-columnas">
          <span>Project</span>
          <span>User</span>
          <span>Role</span>
          <span>Status</span>
          <span>Invite Link</span>
          <div>
            <img />
          </div>
          <div>
            {' '}
            <img />
          </div>
        </div>
        <div className="shared-columnas2">
          <span>Project Name</span>
          <span>email@google.com</span>
          <span>Viewer</span>
          <span>Pending</span>
          <span>
            Copy <Image alt="" src="/copy.png" height={15} width={15} />
          </span>
          <div>
            <Image
              alt=""
              src="/invitation.png"
              height={25}
              width={25}
              onClick={handleImageClick}
            />
          </div>
          <div>
            <Image alt="" src="/delete2.png" height={25} width={25} />
          </div>
        </div>
        <div className="shared-columnas2">
          <span>Project Name</span>
          <span>email@google.com</span>
          <span>Viewer</span>
          <span>Pending</span>
          <span>
            Copy <Image alt="" src="/copy.png" height={15} width={15} />
          </span>
          <div>
            <Image
              alt=""
              src="/invitation.png"
              height={25}
              width={25}
              onClick={handleImageClick}
            />
          </div>
          <div>
            <Image alt="" src="/delete2.png" height={25} width={25} />
          </div>
        </div>
      </div>
      {showPopup && (
        <div className="popup-overlay" onClick={handleClosePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <SharedPopUp handleClose={handleClosePopup} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SharedInfo;
