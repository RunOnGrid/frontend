import Image from 'next/image'
import React, { useState } from 'react'

export const DataComponent = () => {
    const [database,setDatabase] = useState('')
    const [selected, setSelected] = useState(0);
    const toggle = (i) => {
        return setSelected(i);
      };
      const [values, setValues] = useState({
        range1: 0.1,
        range2: 100,
        range3: 1,
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        const delay = 0;
        setTimeout(() => {
            setValues({
              ...values,
              [name]: parseFloat(value),
            });
          }, delay);
      };

  return (
    <>
    <div >
            <div  className="card-newApp2">
               
               <div style={{display:'flex',padding:'10px'}}>
                <h3 style={{fontFamily:'rouben',margin:'5px'}} > Database: </h3>
                <h3 style={{fontFamily:'rouben ligth',margin:'5px'}}>Name</h3>
               </div>

           
                
            <div   className="contenedor-titulos-hosting-click-shared2">
        <span
          style={{marginLeft:'42px'}}
          className={`spanHosting-clickeable-shared${selected === 0 ? 'focus' : ''}`}
          onClick={() => toggle(0)}>
            General
        </span>
        <span
          className={`spanHosting-clickeable-shared${selected === 1 ? 'focus' : ''}`}
          onClick={() => toggle(1)}>
          {' '}
          Resources
        </span>
        <span
          className={`spanHosting-clickeable-shared${selected === 2 ? 'focus' : ''}`}
          onClick={() => toggle(2)}>
          {' '}
          Advanced
        </span>
       
      </div>
           {selected === 0 ? <>

            <div className='icono-titulo'>

            </div>
            <div className='buttons-newComp'>
              <div className={database === 'sql' ? 'data-selected' : '' } onClick={()=>setDatabase('sql')}> SQL</div>
              <div  className={database === 'mongodb' ? 'data-selected' : '' } onClick={()=>setDatabase('mongodb')}> MongoDB</div>
              <div  className={database === 'mysql' ? 'data-selected' : '' }onClick={()=>setDatabase('mysql')}> MySQL</div>

              </div>
            
             
            <label> Container port</label>
            <input  placeholder='3000' />
            <button> Save changes </button>
           </> : ''}

           {selected === 1 ? (
        <>
          <div className='ranges' >
            <label>
              CPU: {values.range1}
            </label>
              <input
                type="range"
                name="range1"
                min="0.1"
                max="15"
                step="0.1"
                value={values.range1}
                onChange={handleChange}
              />
          </div>
          <div className='ranges'>
            <label>
              RAM: {values.range2}
            </label>
              <input
           
                type="range"
                name="range2"
                min="100"
                max="59000"
                step="100"
                value={values.range2}
                onChange={handleChange}
              />
          </div>
          <div className='ranges'>
            <label>
              SSD: {values.range3}
            </label>
              <input
                type="range"
                name="range3"
                min="1"
                max="820"
                step="1"
                value={values.range3}
                onChange={handleChange}
              />
          </div>
        </>
      ) : (
        ''
      )}
          </div>
          
    </div>
   
    </>
  )
}

