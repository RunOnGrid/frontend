import Link from 'next/link';
import React from 'react';

const MenuMobile = () => {
  return (
    <div className="menuMobileContainer">
      <span className="titulo-mobile"> PRODUCTS </span>
      <div className="categorias-mobile">
        <div className="item-mobile">
          <div className="circulo">
            {' '}
            <img className="icono-mobile" alt="" src="/webMobile.png" />{' '}
          </div>
          <div className="subtitulo-mobile">
            {' '}
            <Link href="/web_hosting"> Web Hosting </Link>{' '}
          </div>
        </div>
        <div className="item-mobile">
          <div className="circulo">
            {' '}
            <img className="icono-mobile" alt="" src="/gameMobile2.png" />{' '}
          </div>
          <div className="subtitulo-mobile">
            {' '}
            <Link href="asic_mining"> Game Servers</Link>{' '}
          </div>
        </div>
      </div>
      <span style={{ marginTop: '20px' }} className="titulo-mobile">
        {' '}
        WHY CHOOSE US?{' '}
      </span>
      <div className="categorias-mobile">
        <div className="item-mobile">
          <div className="circulo">
            {' '}
            <img
              className="icono-mobile"
              alt=""
              src="/solutionsMobile.png"
            />{' '}
          </div>
          <div className="subtitulo-mobile"> Solutions</div>
        </div>
        <div className="item-mobile">
          <div className="circulo">
            {' '}
            <img
              className="icono-mobile"
              alt=""
              src="/aboutUsMobile.png"
            />{' '}
          </div>
          <div className="subtitulo-mobile">
            <Link href="/aboutUs"> About us </Link>{' '}
          </div>
        </div>
        <div style={{ marginTop: '10px' }} className="item-mobile">
          <div className="circulo">
            {' '}
            <img className="icono-mobile" alt="" src="/blogMobile2.png" />{' '}
          </div>
          <div className="subtitulo-mobile"> Blog </div>
        </div>
      </div>
      <span style={{ marginTop: '20px' }} className="titulo-mobile">
        {' '}
        CONTACT{' '}
      </span>
      <div style={{ marginBottom: '50px' }} className="categorias-mobile">
        <div className="item-mobile">
          <div className="circulo">
            {' '}
            <img className="icono-mobile" alt="" src="/emailMobile.png" />{' '}
          </div>
          <div className="subtitulo-mobile"> Send an email </div>
        </div>
        <div className="item-mobile">
          <div className="circulo">
            {' '}
            <img className="icono-mobile" alt="" src="/demoMobile.png" />{' '}
          </div>
          <div className="subtitulo-mobile"> Book a demo </div>
        </div>
        <div style={{ marginTop: '10px' }} className="item-mobile">
          <div className="circulo">
            {' '}
            <img
              className="icono-mobile"
              alt=""
              src="/discordMobile.png"
            />{' '}
          </div>
          <div className="subtitulo-mobile"> Join our discord </div>
        </div>
      </div>

      <div className="only-flex">
        <button>
          {' '}
          <Link href="/login"> Login </Link>{' '}
        </button>
        <button>
          {' '}
          <Link href="/register"> Register </Link>{' '}
        </button>
      </div>
    </div>
  );
};

export default MenuMobile;
