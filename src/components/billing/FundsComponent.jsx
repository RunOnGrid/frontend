
import React from 'react';




const DepositFunds = ({showPayment,handleAmount,handleIntent}) => {
  const handleShow = () => {
    showPayment(true);
    const amount = 5;
    handleAmount(amount);
    handleIntent(amount);
  };
  return (
    <div className="deposit-container">
      <div className="deposit-header">
        <h2>Deposit Funds</h2>
      </div>

      <div className="payment-options">
        <div onClick={() => handleShow()} className="payment-option">
          <div className="logo-container stripe">
            <img src="/logoStripe.webp" alt="Stripe" />
          </div>
          <h3>Stripe</h3>
          <p>Stripe payment</p>
        </div>
        <div className="payment-option soon">
          <div className="logo-container flux">
            <img src="/fluxLogo.svg" alt="Flux" />
          </div>
          <h3>Flux</h3>
          <p>Soon</p>
        </div>

        <div className="payment-option soon">
          <div className="logo-container stablecoin">
            <img src="/usdt.svg" alt="USDT" className="stablecoin-logo" />
            <img src="/usdc.png" alt="USDC" className="stablecoin-logo" />
          </div>
          <h3>Stable Coin</h3>
          <p>Soon</p>
        </div>
      </div>
    </div>
  );
};

export default DepositFunds;