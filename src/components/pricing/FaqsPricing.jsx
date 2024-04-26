import Image from 'next/image';
import React, { useState } from 'react';

const FaqsPricing = () => {
  const [selected, setSelected] = useState(0);

  return (
    <div className="contenedor-mobile-button">
      <div className="titulo-asic"> FAQS</div>
      <div style={{ marginTop: '10px' }} className="contenedor-flex-only3">
        <div className="button-landing">
          <div className="contenedor-features">
            <span
              onClick={() => setSelected(1)}
              className={
                selected === 1 ? 'span-landing-selected2' : 'span-landing2'
              }>
              {' '}
              Is the pricing inclusive of the underlying cloud provider
              expenses?{' '}
            </span>
            <div className={selected === 1 ? 'linea-selected' : 'linea'}> </div>
          </div>

          <div className="contenedor-features">
            <span
              onClick={() => setSelected(2)}
              className={
                selected === 2 ? 'span-landing-selected2' : 'span-landing2'
              }>
              {' '}
              If I stop paying for Grid, will my servers shut down?{' '}
            </span>
            <div className={selected === 2 ? 'linea-selected' : 'linea'}> </div>
          </div>
        </div>

        {selected === 0 ? (
          <div className="parrafo-features-landing2">
            <Image
              className="sinFondo"
              alt=""
              src="/iluFaqs.svg"
              height={500}
              width={500}
            />
          </div>
        ) : (
          ''
        )}

        {selected === 1 ? (
          <div className="parrafo-features-landing">
            The pricing mentioned does not cover the fees of the underlying
            cloud provider. To obtain a thorough estimate, calculate the
            equivalent resource expenses on Flux
            <Image alt="" src="/iluDes.svg" height={300} width={500} />
          </div>
        ) : (
          ''
        )}
        {selected === 2 ? (
          <div className="parrafo-features-landing">
            If you decide to discontinue your subscription for Grid, your
            servers will persist and function independently. Grid solely
            oversees your infrastructure, and stopping payment will not impact
            your server&apos;s operational status. Conversely, if you opt to
            cease your Grid subscription, Grid will no longer manage your
            container, relinquishing responsibility for its reliability.
            Although you will lose access to the abstraction layer facilitated
            by Grid, the underlying Docker container will remain intact. You
            will then assume manual control, managing it like any other
            standalone Docker container. It&apos;s important to note that Grid
            does not impose any restrictions or dependencies, providing
            flexibility in your operational choices. You can access your
            container on Fluxos((https://home.runonflux.io/) agregar un
            hipervinculo), with your GridCloud account. see the instructions
            (Hipervinculo a un blog)
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default FaqsPricing;
