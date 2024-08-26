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
      <div style={{ display: "flex" }}>
        <Features
          className="scroll-in feature-item"
          image="/experience.svg"
          title="NO EXPERIENCE NEEDED"
          subtitle="Discover the freedom of managing a cloud without
      the need of expertise or DevOps. Even if you're
      unfamiliar with new decentralized technologies, we
      make hosting stress-free and accessible for everyone,
      offering a straightforward and dependable
      experience in the realm of decentralization."
        />
        <Features
          className="scroll-in feature-item"
          image="/organize.svg"
          title="ORGANIZE AND UPSCALE"
          subtitle="Empower your Docker container with Grid flexible
          capabilities. Easily allocate resources, set environment
          variables, and fine-tune your networking preferences.
          Beneath the surface, it's your very own Docker Container,
          fully customizable to meet your unique requirements.
          Grid keeps a vigilant eye on your container, ensuring
          seamless scalability as your needs evolve"
        />
        <Features
          className="scroll-in feature-item"
          image="/descentralization.svg"
          title="DESCENTRALIZATION"
          subtitle="Thanks to distributed infrastructures, we can provide
          access to cost-effective computing power with an
          average reduction of 96.28% compared to a
          centralized infrastructure."
        />
      </div>
      <button className="button-landing-3 scale-hover">DEPLOY NOW</button>
    </div>
  );
};

export default BestFeatures;
