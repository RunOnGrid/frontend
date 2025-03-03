import React from "react";
import { useInView } from "react-intersection-observer";

const Segundo = () => {
  const [ref2, inView2] = useInView({
    triggerOnce: true, // Animation triggers only once
    threshold: 0.8, // Percentage of element visibility to trigger the animation
  });
  const fadeInStylesLeft = {
    opacity: 1,
    transform: "translateX(12.4%)",
    transition: "opacity 3s ease-in-out, transform 1s ease-in-out",
  };

  return (
    <section className="contenedorSegundo">
      <div
        ref={ref2}
        style={inView2 ? fadeInStylesLeft : {}}
        className="textos"
      >
        <div style={{ width: "50%" }}>
          <div className="tituloSegundo">Book a demo </div>
          <div className="subtituloSegundo">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
        </div>
        <button className="button-textos">BOOK A DEMO NOW</button>
      </div>
    </section>
  );
};

export default Segundo;
