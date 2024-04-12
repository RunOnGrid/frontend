import React, { useState } from 'react'
import ItemMigration from './ItemMigration'
import MigrationForm from './MigrationForm'
import ItemMigration2 from './ItemMigration2'
import ItemMigration3 from './ItemMigration3'

const Migration = () => {
    const [popUp,setPopUp] = useState(false)
  return (
    <div  >

    <div className='faded' style={{marginTop:'150px',marginBottom:'100px'}}>
         <div className="titulo-asic4"> White-glove migration offer</div>
      <div  className="subtituloBanner2">Pressed on bandwidth?We ll handle all the migration work for you.</div>
    

      <ItemMigration
        number={1}
        title={'Streamlined Migration Planning'}
        subtitle={'Expert guidance for a seamless cloud transition'}
      />
      <ItemMigration2
         number={2}
         title={'Effortless Grid Onboarding'}
         subtitle={'Get your infrastructure up and running with our expert assistance'}
      />
      <ItemMigration3
      number={3}
      title={'Confident Production Migration'}
      subtitle={'Redirect your production traffic to grid only after testing it out'}
      />
     
        <button onClick={()=>setPopUp(!popUp)} className='migration-button'> Start Migrating</button>
    </div>
    {popUp ? <MigrationForm/> : ''}
        
    </div>
  )
}

export default Migration