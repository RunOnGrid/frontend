import React, { useState } from "react";

const plans = [
  {
    title: "STANDARD",
    subtitle: "Starter",

    specs: ["3 INSTANCES (NODES)", "256 MB (RAM)", "0.1 CPU", "1 GB (HDD)"],
    values: [3, 256, 0.1, 1],
  },
  {
    title: "TEST",
    subtitle: "Standard",

    specs: ["6 INSTANCES (NODES)", "1 GB (RAM)", "1 CPU", "16 GB (HDD)"],
    values: [6, 1024, 1, 16],
  },
  {
    title: "PRODUCTION",
    subtitle: "Pro",

    specs: ["", "4 GB (RAM)", "2 CPU", "32 GB (HDD)"],
    values: [12, 4096, 2, 32],
  },
  {
    title: "PRODUCTION2",
    subtitle: "Pro Plus",

    specs: ["", "8 GB (RAM)", "4 CPU", "64 GB (HDD)"],
    values: [24, 8192, 4, 64],
  },
];

const PricingPlanSelector = ({
  setInstances,
  setCpu,
  setRam,
  setHdd,
  mode,
}) => {
  const [selectedPlan, setSelectedPlan] = useState("");

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan.title);
    setInstances(plan.values[0]);
    setRam(plan.values[1]);
    setCpu(plan.values[2]);
    setHdd(plan.values[3]);
  };

  return (
    <div>
      <h5 className="pricing-title2">Use recommended configuration</h5>
      <div className={`plans-container2 ${mode ? "dark" : "light"}`}>
        {plans.map((plan) => (
          <div
            key={plan.title}
            className={`plan-card ${mode ? "dark" : "light"} ${
              selectedPlan === plan.title ? "active" : ""
            }`}
            onClick={() => handleSelectPlan(plan)}
          >
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
    </div>
  );
};

export default PricingPlanSelector;
