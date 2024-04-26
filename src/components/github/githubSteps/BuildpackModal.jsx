import React from 'react';
import Image from 'next/image';

const BuildpackModal = ({ visible }) => {
  return (
    <div className="card">
      <h2> Buildpack Configuration</h2>
      <label> Selected buildpacks:</label>
      <div className="repo-build">
        <Image alt="" src="/node-js.png" height={20} width={20} />
        <span> NodeJS</span>
        <Image
          style={{ marginLeft: 'auto' }}
          alt=""
          src="/plus2.png"
          height={14}
          width={14}
        />
      </div>

      <label>Available buildpacks:</label>
      <div className="repo-build">
        <Image alt="" src="/node-js.png" height={20} width={20} />
        <span> NodeJS</span>
        <Image
          style={{ marginLeft: 'auto' }}
          alt=""
          src="/plus2.png"
          height={14}
          width={14}
        />
      </div>
      <div className="repo-build">
        <Image alt="" src="/node-js.png" height={20} width={20} />
        <span> NodeJS</span>
        <Image
          style={{ marginLeft: 'auto' }}
          alt=""
          src="/plus2.png"
          height={14}
          width={14}
        />
      </div>
      <div className="repo-build">
        <Image alt="" src="/node-js.png" height={20} width={20} />
        <span> NodeJS</span>
        <Image
          style={{ marginLeft: 'auto' }}
          alt=""
          src="/plus2.png"
          height={14}
          width={14}
        />
      </div>

      <label> Custom buildpacks</label>
      <span>
        {' '}
        You may also add buildpacks by directly providing their GitHub links or
        links to ZIP files that contain the buildpack source code.
      </span>
      <label> GitHub or ZIP URL : </label>
      <div>
        <input />
        <button className="boton-config"> + </button>
      </div>
      <button onClick={() => visible()}> Done</button>
    </div>
  );
};

export default BuildpackModal;
