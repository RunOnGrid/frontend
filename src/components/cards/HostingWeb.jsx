import React, { useState } from 'react';
import NuevasCardsHosting from './NuevasCardsHosting';
import ContactForm from '../index/ContactForm';

const HostingWeb = () => {
  const [selected, setSelected] = useState(0);
  const [selected1, setSelected1] = useState(null);

  const toggle1 = (i) => {
    if (selected1 === i) {
      return setSelected1(null);
    }
    setSelected1(i);
  };

  const toggle = (i) => {
    return setSelected(i);
  };
  return (
    <>
      <div>s</div>

      <div className="probando-index">
        <div style={{ opacity: '0' }}>.</div>
        <div
          style={{ marginLeft: '-100px' }}
          className="tituloPrincipal-hosting">
          {' '}
          Choose your deploy service{' '}
        </div>

        <div className="mydict"></div>

        <NuevasCardsHosting />

        <ContactForm />
        {/* <div className='aboutUs-final2'>

    <h1> Enterprise</h1>
    <span> Get volume discount along with enterprise-grade support and features</span>
    <h3> Volume Discount Available</h3>
    
    <div className='contenedor-flex2'> 

    <button className='botones-aboutUs' > Contact Us </button>
    <button className='botones-aboutUs2'> Book a Demo </button>
    </div>
    
</div> */}

        <div style={{ opacity: '0' }}>.</div>
      </div>
      <div style={{ opacity: '0' }}>.</div>
    </>
  );
};

export default HostingWeb;
