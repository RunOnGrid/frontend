import BillingForms from '@/commons/BillingForms';
import Paginacion from '@/commons/Paginacion';
import React, { useState } from 'react';

const BillingInfo = () => {
  const [selected, setSelected] = useState(0);
  const toggle = (i) => {
    return setSelected(i);
  };
  return (
    <div style={{width:'100%'}}>
      <div>s</div>
      <Paginacion  anterior="Services" links="/profile" titulo="Billing" />

      <div className="tituloPrincipal-hosting">Billing</div>
      <div className="contenedor-titulos-hosting-click">
      
        <span
          className={`spanHosting-clickeable${selected === 1 ? 'focus' : ''}`}
          onClick={() => toggle(1)}>
          {' '}
          Payment History & Credits
        </span>
        
      </div>
      {/* <div className='billing-mobile'>
        <div className='billing-titulo-mobile'> Invoice Type</div>
        <div className='billing-buttons'>
          <button> All </button>
          <button> Web Hosting </button>
          <button> Email</button>
          <button> Hardware</button>
          <button> Asic Hosting</button>
        </div>

       
        <div className='billing-titulo-mobile'> Amount</div>
        <div className='billing-buttons'>
          <button> All </button>
          <button> Wallet</button>
          <button> None</button>
        </div>
      </div> */}
      <div className="container-general-billing">
        
        <BillingForms
          titulo='Invoice Type'
          op1="GridCloud service"
          op2="Component Costs"
        />
    
        <BillingForms
          titulo='Amount'
          op1="All"
          op2="Credits"
          op3="Wallet"
          op4="Both"
          op5="None"
        />
       
      </div>
      <div className='contenedor-invoices'> 
        <span> Looks like you dont have any outstanding invoices currently </span>
      
      </div>
    </div>
  );
};

export default BillingInfo;
