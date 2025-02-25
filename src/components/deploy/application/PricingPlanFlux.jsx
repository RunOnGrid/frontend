import React, { useState } from "react";

const plans = [
  {
    title: "TEST",
    subtitle: "Starter",
    specs: ["256 MB (RAM)", "0.1 CPU", "1 GB (STORAGE)", "3 INSTANCES (NODES)"],
    price: "$0,60",
    values: [100, "Mi", 0.1, 1, "Gi", 3, 60],
    soon: false,
  },
  {
    title: "STANDARD",
    subtitle: "Standard",
    specs: ["1 GB (RAM)", "1 CPU", "5 GB (STORAGE)", "3 INSTANCES (NODES)"],
    price: "$4,00",
    values: [1, "Gi", 1, 5, "Gi", 3, 400],
    soon: false,
  },
  {
    title: "PRODUCTION",
    subtitle: "Pro",
    specs: ["4 GB (RAM)", "2 CPU", "32 GB (STORAGE)", "12 INSTANCES (NODES)"],
    price: "---",
    values: [4, "Gi", 2, 32, "Gi", 12, 0],
    soon: true,
  },
  {
    title: "PRODUCTION2",
    subtitle: "Pro Plus",
    specs: ["8 GB (RAM)", "4 CPU", "64 GB (STORAGE)", "24 INSTANCES (NODES)"],
    price: "---",
    values: [8, "Gi", 4, 64, "Gi", 24, 0],
    soon: true,
  },
];

const PricingPlanFlux = ({
  setMemory,
  setCpu,
  setEphemeralStorage,
  setServiceCount,
  mode,
  setPrice,
}) => {
  const [selectedPlan, setSelectedPlan] = useState("TEST");

  const handleSelectPlan = (plan) => {
    if (plan.soon) {
      return;
    }
    setSelectedPlan(plan.title);
    setMemory(plan.values[0]);
    setCpu(plan.values[2]);
    setEphemeralStorage(plan.values[3]);
    setServiceCount(plan.values[5]);
    setPrice(plan.values[6]);
  };

  return (
    <div>
      <h3 className="pricing-title">Use recommended configuration</h3>
      <div className={`plans-container2 ${mode ? "dark" : "light"}`}>
        {plans.map((plan) => (
          <div
            key={plan.title}
            className={`plan-card ${mode ? "dark" : "light"} ${
              selectedPlan === plan.title ? "active" : ""
            } ${plan.soon ? "disabled" : ""}`}
            onClick={() => handleSelectPlan(plan)}
          >
            <div>
              <h3>{plan.title}</h3>
              <h4>{plan.subtitle}</h4>
              <h2>{plan.price}</h2>
            </div>
            <div>
              <ul className="specs">
                {plan.specs.map((spec, index) => (
                  <li
                    className={`${plan.soon ? "li-disabled" : ""}`}
                    key={index}
                  >
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPlanFlux;
