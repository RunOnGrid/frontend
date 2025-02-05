import React from "react";
import Spinner from "./Spinner";

const LoadingText = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const loadingMessages = [
    "Preparing deployment...",
    "Validating configurations...",
    "Provisioning resources...",
    "Deploying application...",
    "Finalizing deployment...",
    "Almost there!",
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [loadingMessages.length]);

  return (
    <div className="loading-container">
      <Spinner />
      <p>{loadingMessages[currentIndex]}</p>
    </div>
  );
};

export default LoadingText;
