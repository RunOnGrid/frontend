import React, { useEffect } from "react";
import Features from "./Features";

const BestFeaturesBeta = () => {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".scroll-in");
      const triggerBottom = (window.innerHeight / 5) * 4;

      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < triggerBottom) {
          element.classList.add("visible");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Ejecutar una vez para verificar la posición inicial

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="best-features">
      <h3 className="section-title scroll-in">ABOUT US</h3>
      <h1 className="section-title scroll-in">Best features</h1>
      <div className="features-container">
        <Features
          className="scroll-in feature-item"
          image="/experience.svg"
          title="NO EXPERIENCE NEEDED"
          subtitle="Discover the freedom of managing a cloud without stress or DevOps expertise. Our Automatic Builds system lets you focus on your project, while we take care of implementation and deployment in a fast and secure way."
        />
        <Features
          className="scroll-in feature-item"
          image="/organize.svg"
          title="ORGANIZE AND UPSCALE"
          subtitle="Manage your project efficiently with our platform. Group services, configure environments, and receive real-time notifications via Slack. Assign roles and permissions to ensure security and control."
        />
        <Features
          className="scroll-in feature-item"
          image="/descentralization.svg"
          title="DESCENTRALIZATION"
          subtitle="Access to low cost computing power and democratized deployment of secure, censorship-resistant apps, available to all developers."
        />
      </div>
    </div>
  );
};

export default BestFeaturesBeta;
