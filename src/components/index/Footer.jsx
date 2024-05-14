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

            <button
              onClick={() => {
                scrollToContactForm();
              }}>
              Contact us
            </button>
            <button> Support Center</button>
          </div>

          <div className="columna">
            <ul>
              <Link href="/aboutUs">
                <li>About </li>
              </Link>
              <Link href="/pricing">
                <li>Pricing</li>
              </Link>
            </ul>
          </div>
          <div className="columna">
            <ul>
              <li>Github</li>
              <li> Docs</li>
              <Link href="/blog">
                <li> Blog</li>
              </Link>
            </ul>
          </div>
          <div className="columna">
            <ul>
              <li>Terms of service </li>
              <li> Privacy policy</li>
            </ul>
          </div>
          <div>
            <Image alt="" src="/logo7.svg" height={180} width={280} />
            <div className="redes-footer">
              <a href="//www.linkedin.com">
                <img
                  style={{ marginLeft: '0px' }}
                  className="icon-redes"
                  src={'/linkedin.png'}
                />
              </a>

              <a href="//www.discord.com">
                <img className="icon-redes" src={'/discord (1).png'} />
              </a>

              <a href="//www.twitter.com">
                <img className="icon-redes" src={'/twitter-sign.png'} />
              </a>
              <a href="//www.instragram.com">
                <img className="icon-redes" src={'/instagram.png'} />
              </a>
            </div>
          </div>
        </div>
        <div className="licencias-footer">
          <span>
            {' '}
            <a href="#"> © 2023 Grid Cloud </a>{' '}
          </span>
          <span>
            {' '}
            <a href="#"> Políticas de Privacidad </a>{' '}
          </span>
          <span>
            {' '}
            <a href="#"> Términos y condiciones </a>
          </span>
        </div>
      </section>
    </div>
  );
};

export default Footer;
