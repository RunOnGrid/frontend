
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
          <div className="logo-container2 stripe">
            <img
              src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/6fd2edb0-d547-44f2-ef81-cbf20b40ba00/public"
              alt="Stripe"
            />
          </div>
          <h3>Stripe</h3>
          <p>Stripe payment</p>
        </div>
        <div className="payment-option soon">
          <div className="logo-container2 flux">
            <img
              src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/e4e88f78-5122-4105-a70d-bf8f2cc9c000/public"
              alt="Flux"
            />
          </div>
          <h3>Flux</h3>
          <p>Soon</p>
        </div>

        <div className="payment-option soon">
          <div className="logo-container2 stablecoin">
            <img
              src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/d8b9dc13-5792-4d00-d9c2-d6459dc9a100/public"
              alt="USDT"
              className="stablecoin-logo"
            />
            <img
              src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/03a267e9-4788-41a0-5b95-b241e657a400/public"
              alt="USDC"
              className="stablecoin-logo"
            />
          </div>
          <h3>Stable Coin</h3>
          <p>Soon</p>
        </div>
      </div>
    </div>
  );
};

export default DepositFunds;