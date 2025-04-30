import Spinner from '@/commons/Spinner';
import Image from 'next/image';
import React, { useState } from 'react';


const ForgotPassword = ({setShowForgot,handleSubmit, setForgotEmail, handleForgot,loading,success, setSuccess, failed, setFailed}) => {
  
  
 const handleClose = () => {
    setSuccess('')
    setFailed('')
    setShowForgot(false)
 }

  return (
    <div className="pw-reset__container">
      <div className="pw-reset__card">
        <div className="pw-reset__icon">
          <Image alt='' src='/logoGridVacio.svg' width={120} height={120}/>
        </div>
        <h1 className="pw-reset__title">Forgot Password?</h1>
        <p className="pw-reset__description">Please enter your email address below. We will send you an email with a link to reset your password.</p>
        <span className='disclaimer-span'>It may take a few minutes.</span>
        
        <form >
          <div className="pw-reset__form-group">
            <label className="pw-reset__label" htmlFor="email">Email</label>
            <input 
              className="pw-reset__input"
              type="email" 
              id="email" 
              placeholder="Email" 
              onChange={(e) => setForgotEmail(e.target.value)}
              required
            />
          </div>
          {success !== '' ? <span className='pw-success'>{success}</span> : ''}
          {failed !== '' ? <span className='pw-failed'>{failed}</span> : ''}
          <div className="pw-reset__button-group">
            {loading ? <Spinner/> : <> <button onClick={()=>handleForgot()} type='button' className="pw-reset__button ">Send</button>
            <button onClick={()=>handleClose()} type="button" className="pw-reset__button ">Back to Sign In</button> </>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword