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
            <Image alt="" src="/logo7.svg" height={180} width={180} />
            <div className="redes-footer">
              <a href="https://www.linkedin.com/company/ongridrun">
                <img className="icon-redes" src={"/linkedin.png"} />
              </a>

              <a href="https://discord.gg/yjkPTHjKeZ">
                <img className="icon-redes" src={"/discord (1).png"} />
              </a>

              <a href="https://x.com/OnGridRun">
                <img className="icon-redes" src={"/twitter.png"} />
              </a>
            </div>
          </div>
        </div>
        <div className="licencias-footer">
          <span>
            {" "}
            <a href="#"> © 2024 Grid Cloud </a>{" "}
          </span>
        </div>
      </section>
    </div>
  );
};

export default Footer;
