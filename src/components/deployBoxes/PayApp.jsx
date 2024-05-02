import Botonera from '@/commons/Botonera';
import Image from 'next/image';
import Link from 'next/link';
import React, { forwardRef } from 'react';

const PayApp = forwardRef(({ onNextStep }, ref) => {
  return (
    <div ref={ref}>
      <Image
        style={{ display: 'flex', justifyContent: 'center', margin: 'auto' }}
        alt=""
        width={25}
        height={25}
        src="/dot.png"
      />
      <div className="contact-container2">
        <div className="titulos-contact">
          <h1>Deploy</h1>
        </div>
        <div className="contact-form2">
          <div className="inputs-registerApp">
            <div className="item-registerApp">
              <label> Message</label>
              <input className="contact-input2" placeholder="Messagge" />
            </div>
            <div className="item-registerApp">
              <label>Address</label>
              <input
                className="contact-input2"
                placeholder="Insert ZellId or Bitcoin address"
              />
            </div>
          </div>

          <div className="inputs-registerApp">
            <div className="item-registerApp">
              <label>Signature</label>
              <input
                className="contact-input2"
                placeholder="Insert Signature"
              />
            </div>
            <div className="iconos-register">
              <Image alt="" src="/zelID.svg" width={40} height={40} />
              <Image alt="" src="/walletconnect.svg" width={40} height={40} />
              <Image alt="" src="/sspLogo.svg" width={40} height={40} />
              <Image alt="" src="/metamask.svg" width={40} height={40} />
            </div>
          </div>
          <Botonera titulo="I agree with Terms of Service" />
          <div className="contenedorFlex2">
            <button className="boton-contact-form"> Deploy</button>
          </div>
        </div>
      </div>

      <div style={{ opacity: '0' }}>.</div>
    </div>
  );
});
PayApp.displayName = 'PayApp';
export default PayApp;
