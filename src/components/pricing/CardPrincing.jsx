import React from 'react';

const CardPricing = ({ planType, price, description, features, className }) => {
  return (
    <div className={`pricing-card ${planType} ${className}`}>
      <h2>{planType.charAt(0).toUpperCase() + planType.slice(1)}</h2>
      <h1>
        ${price}
        <span>/ per month</span>
      </h1>
      <h3>{description}</h3>
      {features.map((feature, index) => (
        <p key={index}>{feature}</p>
      ))}
      <button
        className={`button-pricing ${
          planType === 'team' ? 'button-pricing2' : ''
        }`}>
        SELECT
      </button>
    </div>
  );
};

export default CardPricing;
