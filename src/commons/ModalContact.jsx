import Image from 'next/image';
import React from 'react';

const ModalContact = ({ abierto, setAbierto }) => {
  return (
    <div className="modal-contact">
      <div style={{ borderBottom: '1px solid grey' }}>
        <Image
          onClick={() => setAbierto(!abierto)}
          alt=""
          width={20}
          height={20}
          src="/menuCerrado.png"
        />
        <h1> Hi there</h1>
        <span> Were here to help. Ask us anything!</span>
      </div>
      <div className="contact-inputs">
        <span> In a few words, what can we help you with?</span>
        <input />
      </div>
      <div className="contact-inputs">
        <span>Describe the issue in more detail</span>
        <label>
          {' '}
          Please include all relevant logs, error messages, custom domains, and
          any other details so we can help you quicker.
        </label>
        <textarea />
        <div className="botones-contact">
          <button
            onClick={() => setAbierto(!abierto)}
            style={{ width: '15vw' }}>
            Cancel
          </button>
          <button style={{ width: '15vw', backgroundColor: '#36B079' }}>
            Send Message{' '}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalContact;
