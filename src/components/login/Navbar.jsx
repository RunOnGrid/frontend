import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbarLogin">
      <div>
        <Link href="/">
          <img
            className="logo-navbarLogin"
            src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/93b8cf2b-5974-4ee8-e29e-23187532cc00/public"
            alt="Logo"
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
