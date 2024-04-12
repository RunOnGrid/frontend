import React, { useState } from 'react';

const ButtonsLanding = () => {
  const [selected, setSelected] = useState(0);

  return (
    <div className="contenedor-mobile-button">
      <div className="titulo-asic"> Best features</div>
      <div className="contenedor-flex-only3">
        <div className="button-landing">
          <div className="contenedor-features">
            <span
              onClick={() => setSelected(0)}
              className={
                selected === 0 ? 'span-landing-selected' : 'span-landing'
              }>
              {' '}
              No experience{' '}
            </span>
            <div className={selected === 0 ? 'linea-selected' : 'linea'}> </div>
          </div>

          <div className="contenedor-features">
            <span
              onClick={() => setSelected(1)}
              className={
                selected === 1 ? 'span-landing-selected' : 'span-landing'
              }>
              {' '}
              Organize and Upscale{' '}
            </span>
            <div className={selected === 1 ? 'linea-selected' : 'linea'}> </div>
          </div>

          <div className="contenedor-features">
            <span
              onClick={() => setSelected(2)}
              className={
                selected === 2 ? 'span-landing-selected' : 'span-landing'
              }>
              {' '}
              Decentralization{' '}
            </span>
            <div className={selected === 2 ? 'linea-selected' : 'linea'}> </div>
          </div>
        </div>
        {selected === 0 ? (
          <div className="parrafo-features-landing2">
          Discover the freedom of managing a cloud without the need of expertise or DevOps. Even if you&apos;re unfamiliar with new decentralized technologies, we make hosting stress-free and accessible for everyone, offering a straightforward and dependable experience in the realm of decentralization.
          </div>
        ) : (
          ''
        )}
        {selected === 1 ? (
          <div className="parrafo-features-landing2">
            Empower your Docker container with Grid flexible capabilities.
            Easily allocate resources, set environment variables, and fine-tune
            your networking preferences. Beneath the surface, it&apos;s your
            very own Docker Container, fully customizable to meet your unique
            requirements. Grid keeps a vigilant eye on your container, ensuring
            seamless scalability as your needs evolve
          </div>
        ) : (
          ''
        )}
        {selected === 2 ? (
          <div className="parrafo-features-landing2">
            Thanks to Flux&apos;s distributed infrastructure, we can provide
            access to cost-effective computing power with an average reduction
            of 96.28% compared to a centralized infrastructure.
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default ButtonsLanding;
