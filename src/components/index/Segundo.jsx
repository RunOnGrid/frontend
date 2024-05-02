import Lottie from 'lottie-web';
import React, { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

const Segundo = () => {
  const [ref2, inView2] = useInView({
    triggerOnce: true, // Animation triggers only once
    threshold: 0.8, // Percentage of element visibility to trigger the animation
  });
  const fadeInStylesLeft = {
    opacity: 1,
    transform: 'translateX(12.4%)',
    transition: 'opacity 3s ease-in-out, transform 1s ease-in-out',
  };

  const container = useRef(null);

  useEffect(() => {
    Lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('../../../public/animGlobe3.json'),
    });
  }, []);
  return (
    <section className="contenedorSegundo">
      <div
        ref={ref2}
        style={inView2 ? fadeInStylesLeft : {}}
        className="textos">
        <div className="tituloSegundo">
          <span className="primeraParte">
            {' '}
            Flux provides a global cloud network{' '}
          </span>
        </div>
        <div className="subtituloSegundo">
          Regions: North America, Europe, Asia, South America, Africa, Oceania
          77 geographic location
        </div>
      </div>

      <div className="textosMobile">
        <div className="tituloSegundo">
          <span className="primeraParte">
            {' '}
            Flux provides a global cloud network{' '}
          </span>
        </div>
        <div className="subtituloSegundo">
          Regions: North America, Europe, Asia, South America, Africa, Oceania
          77 geographic location
        </div>
      </div>
      <img className="fotoSegundo" src={'/mapa.png'} alt="" />
      {/* <div className='animacion-mundo' ref={container} > </div> */}
    </section>
  );
};

export default Segundo;
