import React, { useState } from "react";

const planAkash = [
  {
    title: "BETA",
    subtitle: "Starter",
    specs: [
      "1000 MB (RAM)",
      "0.5 CPU",
      "20 GB (STORAGE)",
      "1 INSTANCE (NODES)",
    ],
    price: "---",
    values: [1000, "Mb", 0.5, 20, "Gi", 1, 80],
    plan: "beta",
  },
  {
    title: "TEST",
    subtitle: "Standard",
    specs: ["4000 MB (RAM)", "2 CPU", "20 GB (STORAGE)", "1 INSTANCE (NODES)"],
    price: "---",
    values: [4000, "Mb", 2, 20, "Gi", 1, 550],
    plan: "test",
  },
];
const planFlux = [
  {
    title: "BETA",
    subtitle: "Starter",
    specs: [
      "1000 MB (RAM)",
      "0.5 CPU",
      "20 GB (STORAGE)",
      "3 INSTANCES (NODES)",
    ],
    price: "---",
    values: [1000, "Mb", 0.5, 20, "Gi", 1, 80],
    plan: "beta",
  },
  {
    title: "TEST",
    subtitle: "Standard",
    specs: ["4000 MB (RAM)", "2 CPU", "20 GB (STORAGE)", "3 INSTANCES (NODES)"],
    price: "---",
    values: [4000, "Mb", 2, 20, "Gi", 1, 550],
    plan: "test",
  },
];

const PricingPlanAkash = ({ handleBeta, handleTest, mode, plan }) => {
  const [selectedPlan, setSelectedPlan] = useState("TEST");

  const plans = plan === "flux" ? planFlux : planAkash;

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan.title);
    if (plan.plan === "test") {
      handleTest();
    } else if (plan.plan === "beta") {
      handleBeta();
    }
  };

  return (
    <div>
      <div className={`plans-container2 ${mode ? "dark" : "light"}`}>
        {console.log(plan)}
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
              {plan.soon ? <h4>Soon..</h4> : ""}
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
export default PricingPlanAkash;