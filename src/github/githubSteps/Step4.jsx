import React, { forwardRef, useState } from 'react'
import Image from 'next/image';
import BuildpackModal from './BuildpackModal';

const Step4 = forwardRef(({ onNextStep }, ref) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddBuildpackClick = () => {
    setModalVisible(true);
  };
  return (
    <div>

    <div ref={ref} className="buildpack-window">
    <label>Build Method:</label>
    <select>
      <option>heroku/builder-classic:22</option>
      <option>heroku/builder:22</option>
      <option>heroku/buildpacks:20</option>
    </select>
    <label>Builder:</label>
    <select>
      <option>Ruby</option>
      <option>Python</option>
      <option>Go</option>
      <option>Java</option>
    </select>

    <div> Buildpacks:</div>
    <span>
      {' '}
      The following buildpacks were detected at your applications root
      path. You can also manually add, remove, or re-order buildpacks here
    </span>
    <div className="repo-build">
      <Image alt="" src="/github.png" height={20} width={20} />
      <span> NodeJS</span>
      <Image
        style={{ marginLeft: 'auto' }}
        alt=""
        src="/delete3.png"
        height={14}
        width={14}
      />
    </div>
    <button onClick={handleAddBuildpackClick}> +Add buildpacks</button>
    {/* <button className='boton-continue' onClick={()=>onNextStep()}>Continue</button> */}
  </div>
  {modalVisible && <BuildpackModal visible={() => setModalVisible(false)}/>}
    </div>
  )
})
Step4.displayName = 'Step4'
export default Step4