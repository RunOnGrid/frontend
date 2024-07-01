import React, { useState } from 'react';

const plans = [
  {
    title: 'STANDARD',
    subtitle: 'Starter',
    price: '$7 / month',
    specs: ['256 MB (RAM)', '0.1 CPU', '1 GB (STORAGE)', '3 INSTANCES (NODES)'],
  },
  {
    title: 'TEST',
    subtitle: 'Standard',
    price: '$20 / month',
    specs: ['1 GB (RAM)', '1 CPU', '16 GB (STORAGE)', '6 INSTANCES (NODES)'],
  },
  {
    title: 'PRODUCTION',
    subtitle: 'Pro',
    price: '$95 / month',
    specs: ['4 GB (RAM)', '2 CPU', '96 GB (STORAGE)', '12 INSTANCES (NODES)'],
  },
  {
    title: 'PRODUCTION PLUS',
    subtitle: 'Pro Plus',
    price: '$185 / month',
    specs: ['8 GB (RAM)', '4 CPU', '256 GB (STORAGE)', '24 INSTANCES (NODES)'],
  },
];

const PricingPlanSelector = ({ setInstanceType, setPrice, mode }) => {
  const [selectedPlan, setSelectedPlan] = useState('STANDARD');

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan.title);
    setInstanceType({
      type: plan.title,
      subtype: plan.subtitle,
      specs: plan.specs,
    });
    setPrice(plan.price);
  };

  return (
    <div className={`plans-container ${mode ? 'dark' : 'light'}`}>
      {plans.map((plan) => (
        <div
          key={plan.title}
          className={`plan-card ${mode ? 'dark' : 'light'} ${
            selectedPlan === plan.title ? 'active' : ''
          }`}
          onClick={() => handleSelectPlan(plan)}>
          <div>
            <h3>{plan.title}</h3>
            <h4>{plan.subtitle}</h4>
            <p className="price">{plan.price}</p>
          </div>
          <div>
            <ul className="specs">
              {plan.specs.map((spec, index) => (
                <li key={index}>{spec}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PricingPlanSelector;
