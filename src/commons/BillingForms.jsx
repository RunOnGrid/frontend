import React, { useState } from 'react';

const BillingForms = ({ titulo,op1, op2, op3, op4, op5 }) => {
    const [selected,setSelected] = useState(false)
    const [opcion,setOpcion] =useState("")


    const seleccionar = (titulo) => {
        setSelected(!selected)
        setOpcion(titulo)
    }

  return (
    <div className="container-opciones-billing">
        <span style={{margin:'auto',textAlign:'center',justifyContent:'center'}}> {titulo} </span>
      <div
        className="billing-options"
        onClick={()=>setSelected(!selected)}
        style={{
          borderStartStartRadius: '5px',
          borderStartEndRadius: '5px',
          borderRadius:'5px',
          justifyContent:'center',
          textAlign:'center'
          
        }}>
            {opcion === "" ? `${op1}` : `${opcion}` }
      </div>
      <div className={selected ? 'opciones-visibles' : 'opciones-no-visibles'}>
        <div onClick={()=>seleccionar(op2)} className="billing-options">{op2} </div>
        <div onClick={()=>seleccionar(op3)} className="billing-options"> {op3} </div>
        <div onClick={()=>seleccionar(op4)} className="billing-options"> {op4} </div>
        <div
            onClick={()=>seleccionar(op5)}
          className="billing-options"
          style={{ borderEndEndRadius: '5px', borderEndStartRadius: '5px' }}>
          {' '}
          {op5}{' '}
        </div>
      </div>
    </div>
  );
};

export default BillingForms;
