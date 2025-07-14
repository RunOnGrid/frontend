import React, { useEffect } from 'react';
import Features from './Features';

const BestFeatures = () => {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.scroll-in');
      const triggerBottom = (window.innerHeight / 5) * 4;

      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < triggerBottom) {
          element.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Ejecutar una vez para verificar la posición inicial

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="best-features">
      <h3 className="section-title scroll-in">ABOUT US</h3>
      <h1 className="section-title scroll-in">Best features</h1>
      <div className="features-container">
        <Features
          className="scroll-in feature-item"
          image="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/fae77dbc-fe25-47e9-3653-f28ffce7aa00/public"
          title="NO EXPERIENCE NEEDED"
          subtitle="Discover the freedom of managing a cloud without stress or DevOps expertise. Our Automatic Builds system lets you focus on your project, while we take care of implementation and deployment in a fast and secure way."
        />
        <Features
          className="scroll-in feature-item"
          image="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/ac6dd116-8f8c-422d-1bf8-876b70036500/public"
          title="ORGANIZE AND UPSCALE"
          subtitle="Manage your project efficiently with our platform. Group services, configure environments, and receive real-time notifications via Slack. Assign roles and permissions to ensure security and control."
        />
        <Features
          className="scroll-in feature-item"
          image="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/7f7eda15-ce83-46b9-ca7f-5baf97c8cb00/public"
          title="DECENTRALIZATION"
          subtitle="Access to low cost computing power and democratized deployment of secure, censorship-resistant apps, available to all developers."
        />
      </div>
    </div>
  );
};

export default BestFeatures;
