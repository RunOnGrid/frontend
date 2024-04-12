import Image from 'next/image'
import React, { forwardRef } from 'react'

const EnvVariables = forwardRef(({ onNextStep }, ref) => {
  return (
    <div ref={ref}>
        <Image style={{display:'flex',justifyContent:'center',margin:'auto'}} alt='' width={25} height={25} src='/dot.png'/>
    <div className='envVar-container'>
        <h3>Environment variables <p>(optional) </p></h3>
        <span>Deploy from a Git repository or a Docker registry.</span>
        <button className='button-newApp'> + Add row</button>
        <button  onClick={()=>onNextStep()}> Continue</button>
    </div>

    </div>
  )
})
EnvVariables.displayName = 'EnvVariables';
export default EnvVariables