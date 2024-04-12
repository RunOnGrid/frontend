import Link from 'next/link'
import React from 'react'

const MenuNavbar = () => {
  return (
    <div className='menuNavbarLogged'>
         <div className='titulos-menuNavbar'> 
            <div className='menuNavbar-titulo'> Bautista Gonzalez Lazo </div>   
            <div className='menuNavbar-subtitulo'> bautistagonzalezlazo@gmail.com </div>
         </div>
        <div>
             <ul> 
              <Link href="/profile/ssl"> 
                <li> <img className='icono-menuNavbar' src='/user (2).png' alt=''/> Account settings </li>
              </Link>
              <Link href="/profile/security">
                <li> <img className='icono-menuNavbar' src='/padlock.png' alt=''/> Security </li>
              </Link>
              <Link href="/profile/sharedAccount">
                <li> <img className='icono-menuNavbar' src='/group.png' alt=''/> Cuenta Compartida </li>
              </Link>
              <Link href=""></Link>
              <Link href=""></Link>
                <li> <img className='icono-menuNavbar' src='/money.png' alt=''/> Gana con nosotros</li>
                <li > <img className='icono-menuNavbar' src='/question.png' alt=''/> Obtener ayuda </li>
            </ul> 
        </div>
        <button className='button-menuNavbar'> Salir </button>

    </div>
  )
}

export default MenuNavbar