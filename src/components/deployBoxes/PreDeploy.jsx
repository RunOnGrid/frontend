import Image from 'next/image';
import React, { forwardRef, useState } from 'react';
import PreDeployJob from '../PreDeployJob';

const PreDeploy = forwardRef(({ onNextStep }, ref) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <div ref={ref}>
      <Image
        style={{ display: 'flex', justifyContent: 'center', margin: 'auto' }}
        alt=""
        width={25}
        height={25}
        src="/dot.png"
      />
      <div className="envVar-container">
        <h3>
          Pre-Deploy job <p>(optional) </p>
        </h3>
        <span>
          If specified, this is a job that will be run before every deployment.
        </span>
        <button onClick={()=>setModalVisible(true)} className="button-newApp"> + Add a new Pre-Deploy job</button>
      {modalVisible && <PreDeployJob visible={(boolean) => setModalVisible(boolean)}/>}
        <button onClick={() => onNextStep()}> Continue</button>
      </div>
    </div>
  );
});
PreDeploy.displayName = 'PreDeploy';
export default PreDeploy;
