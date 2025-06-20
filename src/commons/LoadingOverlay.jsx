import React, { useEffect, useState } from "react";
import Image from "next/image";
import Spinner from "./Spinner";
import BigSpinner from "./BigSpinner";

const LoadingOverlay = ({ isVisible }) => {
  const [shouldRender, setShouldRender] = useState(false);


  useEffect(() => {
   
    if (isVisible) {
      setShouldRender(true);
    } 
 
    else {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 500); 
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  // Don't render anything if not needed
  if (!shouldRender) return null;

  return (
    <div className={`loading-overlay ${isVisible ? "visible" : "hidden"}`}>
      <div className="loading-container2">
        <div className="logo-container">
          <img
            src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/42f2def7-af4f-451f-cf9e-4c19ba29fb00/public"
            alt="Logo"
            width={400}
            height={400}
            priority
          />
        </div>
        <div className="spinner-container">
          <BigSpinner />
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;