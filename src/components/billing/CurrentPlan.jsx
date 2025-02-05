import Link from "next/link";
import React from "react";

const CurrentPlan = ({ darkMode }) => {
  return (
    <div className={`billing-section ${darkMode ? "dark" : "light"}`}>
      <div className="section-header2">
        <h1>CREDITS</h1>
      </div>
      <div className="billing-info">
        <h3>$00.00 </h3>
      </div>
      <button className="billing3">
        {" "}
        <Link href="/profile/stripe_checkout">Add funds</Link>
      </button>
    </div>
  );
};

export default CurrentPlan;
