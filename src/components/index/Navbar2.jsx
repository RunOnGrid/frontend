import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import MenuMobile from "../MenuMobile";
function Navbar2({ scrollToContactForm }) {
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
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav className={`navbar2 ${isSticky ? "sticky" : ""}  `}>
        <div className="nav-items">
          <Link href="/">
            <img className="navbar-logo2" src="/logoLanding.svg" />
          </Link>
          <div onClick={() => toggleMenu()} className="hamburguer-navbar">
            {" "}
            {menu === false ? (
              <img className="hamburger-logo" src={"/menu.png"} />
            ) : (
              <img className="hamburger-logoCerrado" src={"/menuCerrado.png"} />
            )}{" "}
          </div>
        </div>
      </nav>
      {menu ? <MenuMobile /> : ""}

      <div
        className={`container-productos ${dropdown2 ? "show" : ""} ${
          isSticky ? "sticky" : ""
        }`}
        onMouseOver={() => {
          setDropdown2(true);
          setDropdown(false);
        }}
        onMouseLeave={() => setDropdown2(false)}
      >
        <div className="productos">
          <img alt="" className="logo-productos" src={"/solution.png"} />
          <div className="descripcion-productos">
            <Link href="/solutions">
              <span className="titulo-productos"> Solutions </span>
            </Link>
            <span className="subtitulo-productos">
              {" "}
              Una descripcion un poco mas larga paraq ver{" "}
            </span>
          </div>
        </div>

        <div className="productos">
          <img alt="" className="logo-productos" src={"/blog.png"} />
          <div className="descripcion-productos">
            <Link href="/aboutUs">
              <span className="titulo-productos">About us</span>
            </Link>
            <span className="subtitulo-productos">
              {" "}
              Una descripcion un poco mas larga paraq ver{" "}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar2;
