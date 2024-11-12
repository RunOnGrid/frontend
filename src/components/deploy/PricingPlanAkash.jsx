import React, { useState } from "react";

const plans = [
  {
    title: "STANDARD",
    subtitle: "Starter",
    specs: ["256 MB (RAM)", "0.1 CPU", "1 GB (STORAGE)", "3 INSTANCES (NODES)"],
    values: [256, "Mi", 0.1, 1, "Gi", 3],
  },
  {
    title: "TEST",
    subtitle: "Standard",
    specs: ["1 GB (RAM)", "1 CPU", "16 GB (STORAGE)", "6 INSTANCES (NODES)"],
    values: [1, "Gi", 1, 16, "Gi", 6],
  },
  {
    title: "PRODUCTION",
    subtitle: "Pro",
    specs: ["4 GB (RAM)", "2 CPU", "32 GB (STORAGE)", "12 INSTANCES (NODES)"],
    values: [4, "Gi", 2, 32, "Gi", 12],
  },
  {
    title: "PRODUCTION2",
    subtitle: "Pro Plus",
    specs: ["8 GB (RAM)", "4 CPU", "64 GB (STORAGE)", "24 INSTANCES (NODES)"],
    values: [8, "Gi", 4, 64, "Gi", 24],
  },
];

const PricingPlanAkash = ({
  setMemory,
  setMemoryUnit,
  setCpu,
  setEphemeralStorage,
  setStorageUnit,
  setServiceCount,
  mode,
}) => {
  const [selectedPlan, setSelectedPlan] = useState("");

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan.title);
    setMemory(plan.values[0]);
    setMemoryUnit(plan.values[1]);
    setCpu(plan.values[2]);
    setEphemeralStorage(plan.values[3]);
    setStorageUnit(plan.values[4]);
    setServiceCount(plan.values[5]);
  };

  return (
    <div>
      <h3 className="pricing-title">Use recommended configuration</h3>
      <div className={`plans-container ${mode ? "dark" : "light"}`}>
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

export default PricingPlanAkash;
