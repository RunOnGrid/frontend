import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer = ({ scrollToContactForm }) => {
  const openIntercom = () => {
    window.Intercom('show');
  };
  return (
    <div className="fondo-footer">
      <section className="container-footer">
        <div className="columnas">
          <div className="columna-principal">
            <div className="footer-titulo-principal">GRID CLOUD</div>
            <div className="footer-parrafo">
              Grid Cloud is a decentralized Web3 cloud infrastructure comprised
              of user-operated, scalable and globally distributed computational
              nodes.
            </div>
          </div>

          <div className="segunda-columna">
            <Image
              alt=""
              src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/ca632650-5de1-46bd-88f4-03c847c04200/public"
              height={100}
              width={180}
            />
            <div className="redes-footer">
              <a href="https://www.linkedin.com/company/ongridrun">
                <img
                  className="icon-redes"
                  src={
                    "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/2e798f2d-355d-49e1-0d6b-0b41e0e33300/public"
                  }
                />
              </a>

              <a href="https://discord.gg/yjkPTHjKeZ">
                <img
                  className="icon-redes"
                  src={
                    "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/c96aafa3-ab90-4620-b01d-3ca123d26500/public"
                  }
                />
              </a>

              <a href="https://x.com/OnGridRun">
                <img
                  className="icon-redes"
                  src={
                    "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/5e077990-681e-4183-916c-64a5313a1900/public"
                  }
                />
              </a>
            </div>
          </div>
        </div>
        <div className="licencias-footer">
          <span>
            {" "}
            <a href="#"> © 2025 Grid </a>{" "}
          </span>
        </div>
      </section>
    </div>
  );
};

export default Footer;
