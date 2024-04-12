import React from 'react'
import Image from 'next/image';

const Step2Docker = () => {
  return (
    <div>
         <span >Specify your image tag</span>
        <div className="input-with-image3">
              <input placeholder="Search tags " />
              <Image alt="" src="/searc.png" height={15} width={15} />
            </div>
            <div className='no-docker'>
            <div style={{opacity:'0'}}>.</div>
              <p style={{marginTop:'30px',marginBottom:'30px'}}>Please specify a tag.</p>
              <div style={{opacity:'0'}}>.</div>
            </div>
            <div className="repo-git2">
            <Image alt="" src="/plus2.png" height={10} width={10} />
            <span> Use tag: &apos;prueba&apos;</span>
          </div>
            <div className="repo-selected">
          <div className="circle1"> </div>
          <h5> Image tag:</h5>
          <span> prueba</span>
          <p> Change </p>
        </div>
    </div>
  )
}

export default Step2Docker