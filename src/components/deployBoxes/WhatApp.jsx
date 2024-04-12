import Image from 'next/image'
import React from 'react'

const WhatApp = ({onNextStep}) => {
  return (
    <>
    <div className='whatApp-container'>
      <div style={{opacity:'0'}}>.</div>
        <h2> What are you looking to deploy? </h2>
        <div style={{margin:'20px auto'}}>
            <button onClick={()=>{onNextStep()}}>Application</button>
            <button onClick={()=>{onNextStep()}}>Database</button>
        </div>
    </div>
    <Image style={{display:'flex',justifyContent:'center',margin:'auto'}} alt='' width={25} height={25} src='/dot.png'/>
    </>
  )
}

export default WhatApp