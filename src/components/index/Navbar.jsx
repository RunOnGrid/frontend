import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import MenuMobile from '../MenuMobile';
function Navbar({ scrollToContactForm }) {
  const [dropdown, setDropdown] = useState(false);
  const [dropdown2, setDropdown2] = useState(false);
  const [menu, setMenu] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const [selected, setSelected] = useState(false);

  const toggle = () => {
    if (selected === true) {
      return setSelected(false);
    }
    setSelected(true);
  };

  const toggleMenu = () => {
    setMenu(!menu);
    setSelected(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 0 ? setIsSticky(true) : setIsSticky(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <nav className={`navbar ${isSticky ? 'sticky' : ''}  `}>
        <div className="nav-items">
          <Link href="/">
            <img className="navbar-logo" src="/probando.svg" />
          </Link>
          <div onClick={() => toggleMenu()} className="hamburguer-navbar">
            {' '}
            {menu === false ? (
              <img className="hamburger-logo" src={'/menu.png'} />
            ) : (
              <img className="hamburger-logoCerrado" src={'/menuCerrado.png'} />
            )}{' '}
          </div>
          <div className="un-contenedor">
            <div
              onClick={() => {
                setDropdown2(!dropdown2);
                setDropdown(false);
              }}
              className="nav-title">
              {' '}
              Why choose us?
              <img className="downNavbar" src="/downNavbar.png" alt="" />
            </div>
            <div className="nav-title">
              <Link href="/pricing"> Pricing </Link>{' '}
            </div>
           
            <div className="nav-title">
              <Link href="/blog"> Blog </Link>{' '}
            </div>

            <div className="nav-title">
              {' '}
              <Link href="https://cal.com/bautista-gonzalez-lazo-g8xn68">
                {' '}
                Book a demo{' '}
              </Link>{' '}
            </div>
            <div
              onClick={() => {
                scrollToContactForm();
              }}
              className="nav-title">
              {' '}
              Contact{' '}
            </div>
          </div>
          <div className="login-register">
            <Link href="/login">
              <button className="boton-landing1">Login</button>
            </Link>
            <Link href="register">
              <button className="boton-landing">Register</button>
            </Link>
          </div>
        </div>
      </nav>
      {menu ? <MenuMobile /> : ''}

     

      <div
        className={`container-productos ${dropdown2 ? 'show' : ''} ${
          isSticky ? 'sticky' : ''
        }`}
        onMouseOver={() => {
          setDropdown2(true);
          setDropdown(false);
        }}
        onMouseLeave={() => setDropdown2(false)}>
        <div className="productos">
          <img alt="" className="logo-productos" src={'/solution.png'} />
          <div className="descripcion-productos">
            <Link href="/solutions">
              <span className="titulo-productos"> Solutions </span>
            </Link>
            <span className="subtitulo-productos">
              {' '}
              Una descripcion un poco mas larga paraq ver{' '}
            </span>
          </div>
        </div>

    
        <div className="productos">
          <img alt="" className="logo-productos" src={'/blog.png'} />
          <div className="descripcion-productos">
            <Link href="/aboutUs">
              <span className="titulo-productos">About us</span>
            </Link>
            <span className="subtitulo-productos">
              {' '}
              Una descripcion un poco mas larga paraq ver{' '}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
