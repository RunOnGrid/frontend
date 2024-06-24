import SidebarMobile from '@/components/SidebarMobile';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const SideNavbar = ({ abierto, setAbierto }) => {
  const [menu, setMenu] = useState(false);
  const router = useRouter();
  const currentPath = router.pathname;

  const isActive = (path) => (currentPath === path ? 'active' : '');

  return (
    <>
      <nav className="sideNavbar">
        <ul className="sideNavbar-ul">
          <Link href="/profile">
            <img className="icono-sideBar-grid" src="/logo7.svg" />
          </Link>
          <Link href="/profile">
            <li className={`sideNavbar-li ${isActive('/profile')}`}>
              Dashboard
            </li>
          </Link>
          <Link href="/profile/hosting">
            <li className={`sideNavbar-li ${isActive('/profile/hosting')}`}>
              Applications
            </li>
          </Link>

          <Link href="/profile/sharedAccount">
            <li
              className={`sideNavbar-li ${isActive('/profile/sharedAccount')}`}>
              Settings
            </li>
          </Link>
          <Link href="/profile/integration">
            <li className={`sideNavbar-li ${isActive('/profile/integration')}`}>
              Integrations
            </li>
          </Link>
          <Link href={'/'}>
            <button style={{ marginTop: '7vh' }} className="logout-sidebar">
              <Image
                className="button-logout"
                alt=""
                src="/logoutButton.png"
                height={16}
                width={16}
              />
              Log Out
            </button>
          </Link>
          <div className="footer-sidebar">
            <span onClick={() => setAbierto(!abierto)}>Contact Support</span>
          </div>
        </ul>
        <img alt="" src="/gridCloud2.svg" className="sidebar-grid" />

        {menu === false ? (
          <img
            onClick={() => setMenu(true)}
            className="sidebar-menu-mobile"
            src={'/menu.png'}
          />
        ) : (
          <img
            onClick={() => setMenu(false)}
            className="sidebar-menu-mobile"
            src={'/menuCerrado.png'}
          />
        )}
      </nav>
      {menu ? <SidebarMobile /> : ''}
    </>
  );
};

export default SideNavbar;
