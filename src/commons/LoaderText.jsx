import React from "react";
import Spinner from "./Spinner";

const LoadingText = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const loadingMessages = ["Getting Akash Bids..."];

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
