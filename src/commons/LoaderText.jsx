import React from "react";
import Spinner from "./Spinner";

const LoadingText = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const loadingMessages = [
    "Initializing deployment...",
    "Preparing deployment...",
    "Fetching dependencies...",
    "Validating configurations...",
    "Optimizing assets...",
    "Provisioning resources...",
    "Setting up environment variables...",
    "Compiling source code...",
    "Running security checks...",
    "Deploying application...",
    "Verifying deployment integrity...",
    "Applying final optimizations...",
    "Finalizing deployment...",
    "Cleaning up temporary files...",
    "Almost there!",
    "Deployment successful!",
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
