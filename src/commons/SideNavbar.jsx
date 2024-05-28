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
              <img className="icon-sideNavbar2" src="/homeDark.png" /> Dashboard
            </li>
          </Link>
          <Link href="/profile/hosting">
            <li className={`sideNavbar-li ${isActive('/profile/hosting')}`}>
              <img className="icon-sideNavbar" src="/iconDeploy.png" />{' '}
              Applications
            </li>
          </Link>
          <Link href="/profile/billing">
            <li className={`sideNavbar-li ${isActive('/profile/billing')}`}>
              <img className="icon-sideNavbar" src="/iconBill.png" /> Add-Ons
            </li>
          </Link>
          <Link href="/profile/ssl">
            <li className={`sideNavbar-li ${isActive('/profile/ssl')}`}>
              <img className="icon-sideNavbar2" src="/userDark.png" /> Billing
            </li>
          </Link>
          <Link href="/profile/security">
            <li className={`sideNavbar-li ${isActive('/profile/security')}`}>
              <img className="icon-sideNavbar2" src="/padlock2.png" /> Teams
            </li>
          </Link>
          <Link href="/profile/sharedAccount">
            <li
              className={`sideNavbar-li ${isActive('/profile/sharedAccount')}`}>
              <img className="icon-sideNavbar2" src="/groupDark.png" /> Settings
            </li>
          </Link>
          <Link href="/profile/integration">
            <li className={`sideNavbar-li ${isActive('/profile/integration')}`}>
              <img className="icon-sideNavbar2" src="/name.png" /> Integrations
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
