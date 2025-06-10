import React, { useEffect, useState } from "react";
import Image from "next/image";
import Spinner from "./Spinner";
import BigSpinner from "./BigSpinner";

const ProfileLoading = ({ isVisible }) => {
  const [shouldRender, setShouldRender] = useState(false);

  // Handle animation and rendering logic
  useEffect(() => {
    // If becoming visible, render immediately
    if (isVisible) {
      setShouldRender(true);
    } 
    // If hiding, delay unmounting until fade-out completes
    else {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 500); // Match this with CSS transition duration
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  // Don't render anything if not needed
  if (!shouldRender) return null;

  return (
    <div className={`loading-overlay2 ${isVisible ? "visible" : "hidden"}`}>
      <div className="loading-container2">
        <div className="logo-container3">
          <Image
            src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/3f5fc50f-5a8a-4138-6470-511dc711e500/public"
            alt="Logo"
            width={200}
            height={200}
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

export default ProfileLoading;