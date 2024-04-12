import React, { forwardRef } from 'react'
import Image from 'next/image';

const Step2 = forwardRef(({ onNextStep }, ref) => {
  return (
    <div ref={ref} className="repos-github">
    <div className="titulos-repo">
      <div className="build-button2">
        <span>
          {' '}
          <Image alt="" src="/github.png" height={15} width={15} />{' '}
          GridClient
        </span>
      </div>
      <div className="input-with-image2">
        <input placeholder="Search " />
        <Image alt="" src="/searc.png" height={15} width={15} />
      </div>
    </div>
    <div onClick={()=>onNextStep(1)} className="repo-git">
      <Image alt="" src="/github.png" height={20} width={20} />
      <span> GridClient/repo-01</span>
    </div>
    <div onClick={()=>onNextStep(2)} className="repo-git">
      <Image alt="" src="/github.png" height={20} width={20} />
      <span> GridClient/repo-02</span>
    </div>
    <div onClick={()=>onNextStep(3)} className="repo-git">
      <Image alt="" src="/github.png" height={20} width={20} />
      <span> GridClient/repo-03</span>
    </div>
    <div onClick={()=>onNextStep(4)} className="repo-git">
      <Image alt="" src="/github.png" height={20} width={20} />
      <span> GridClient/repo-04</span>
    </div>
    {/* <button className='boton-continue' onClick={()=>onNextStep()}>Continue</button> */}
  </div>
  )
})
Step2.displayName = 'Step2'
export default Step2