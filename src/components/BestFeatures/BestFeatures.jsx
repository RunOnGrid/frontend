import React from 'react';
import Features from './Features';

const BestFeatures = () => {
  return (
    <div className="best-features">
      <h3>ABOUT US</h3>
      <h1>Best features</h1>
      <div style={{ display: 'flex' }}>
        <Features
          image="/exp.svg"
          title="NO EXPERIENCE NEEDED"
          subtitle="Discover the freedom of managing a cloud without
      the need of expertise or DevOps. Even if youre
      unfamiliar with new decentralized technologies, we
      make hosting stress-free and accessible for everyone,
      offering a straightforward and dependable
      experience in the realm of decentralization."
        />
        <Features
          image=""
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
          image="/des.svg"
          title="DESCENTRALIZATION"
          subtitle="Thanks to distributed infrastructures, we can provide
          access to cost-effective computing power with an
          average reduction of 96.28% compared to a
          centralized infrastructure."
        />
      </div>
      <button className="button-landing-3">DEPLOY NOW</button>
    </div>
  );
};

export default BestFeatures;
