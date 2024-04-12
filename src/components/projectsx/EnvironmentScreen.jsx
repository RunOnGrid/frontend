import Image from 'next/image'
import React from 'react'

const EnvironmentScreen = () => {
  return (
    <div>
         <div className='notification-screen'>
            <h3>Environment variables</h3>
            
            <span >Shared among all services. All non-secret variables are also available at build time.</span>
            <div style={{margin:'15px'}}>
              <button> <Image alt='' src='/web.png' height={15} width={15}/>  Add row</button>
              <button> <Image alt='' src='/web.png' height={15} width={15}/> Copy from file</button>
            </div>
            <div style={{opacity:'0'}}>.</div>
        </div>
        <div className='save-button'>

<button >  <Image alt='' src='/save.png' height={15} width={15}/> Save</button>
</div>
    </div>
  )
}

export default EnvironmentScreen