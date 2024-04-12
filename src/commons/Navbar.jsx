import Link from 'next/link';
import React, { useState } from 'react';
import MenuNavbar from './MenuNavbar';

const Navbar = () => {

  const [selected, setSelected] = useState(false);

const toggle = () => {
  if(selected === false) {
    
    return setSelected(true)
  }
  setSelected(false)
}

  return (
    <nav className='navbarLogged'>
      <div >
        <Link href="/">
        <img className="logo-navbarLogged" src="/gridCloudH.svg" alt="Logo" />
        </Link>
      </div>
      <ul className='ul-logged'>
        <Link href="/profile"> 
        <li className='li-logged'> Home </li>
        </Link>
        <Link href="/profile/hosting">
        <li className='li-logged'> Hosting </li>
        </Link>
        <Link href="/profile/email">
        <li className='li-logged'> Emails </li>
        </Link>
        <Link href="/profile/domains">
        <li className='li-logged'> Domains </li>
        </Link>
        <Link href="/profile/vpsServer">
        <li className='li-logged'> VPS Servers </li>
        </Link>
        <Link href="/profile/ssl">
        <li className='li-logged'> SSL </li>
        </Link>
        <Link href="/profile/facturacion">
        <li className='li-logged'> Facturacion </li>
        </Link>
      </ul>
      <div className='user-logged-navbar'>
       
        <img onClick={()=>toggle()} className='icono-user-logged' src='/user (1).png'/>
        {selected === true ? <MenuNavbar/> : ""}
        
      </div>
    </nav>
  );
};

export default Navbar;
