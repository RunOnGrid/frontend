import Paginacion from '@/commons/Paginacion';
import React, { useState } from 'react';
import SharedBox from './SharedBox';

const SharedInfo = () => {
  const [selected, setSelected] = useState(1);
  const toggle = (i) => {
    return setSelected(i);
  };
  return (
    <div className="contenedor-completo-shared">
      <div> s</div>
      <Paginacion anterior="Settings" links="/profile" titulo="Shared Account" />


      <div style={{marginTop:'50px'}} className="infoShared-titulo"> Shared Account</div>
      <span className='span-shared'>Generate a project invite for another user</span>
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
       
        {/* <input className="input-shared2" placeholder="ex: hello@ongrid.run" /> */}
        <span>Select project</span>
        <div style={{display:'flex'}}>
          <SharedBox/>
          <SharedBox/>
          <SharedBox/>
        </div>
       
        <span> Specify a role for this user</span>
        <div className='botones-shared'>
        <button> Owner</button>
        <button> Admin </button>
        <button> Developer </button>
        <button> Viewer </button>
        </div>
        <span>Users address</span>
        <input className='shared-input' placeholder='ex:hello@ongrid.run'/>
        <button>Generate Invite</button>
        <div className='linea-separadora2'></div>
        <div> Invites & collaborators</div>
        <span style={{marginBottom:'40px'}}> Manage pending invites and view collaborators. </span>
        <div className='shared-columnas'> 
          <span style={{marginLeft:'0px'}}> Project</span>
          <span> User</span>
          <span> Role</span>
          <span> Status</span>
          <span> Invite Link</span>
        </div>
     
      </div>
    </div>
  );
};

export default SharedInfo;
