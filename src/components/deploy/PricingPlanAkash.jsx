import React, { useState } from "react";

const plans = [
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
    values: [1, "Mb", 1, 5, "Gi", 1, 550],
    plan: "test",
  },
];

const PricingPlanAkash = ({ handleBeta, handleTest, mode, setPrice }) => {
  const [selectedPlan, setSelectedPlan] = useState("TEST");

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan.title);
    if (plan.plan === "test") {
      handleTest();
      return;
    } else if (plan.plan === "beta") {
      handleBeta();
      return;
    }
  };

  return (
    <div>
      {/* <h3 className="pricing-title">Use recommended configuration</h3> */}
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
