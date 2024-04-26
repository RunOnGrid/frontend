import SidebarMobile from '@/components/SidebarMobile';
import Link from 'next/link';
import React, { useState } from 'react';

const SideNavbar = ({ abierto, setAbierto }) => {
  const [selected, setSelected] = useState(false);
  const [menu, setMenu] = useState(false);

  return (
    <>
      <nav className="sideNavbar">
        <ul className="sideNavbar-ul">
          <Link href="/profile">
            <img className="icono-sideBar-grid" src="/probando.svg" />
          </Link>
          <Link href="/profile">
            <li style={{ marginBottom: '3vh' }} className="sideNavbar-li">
              <img className="icon-sideNavbar2" src="/homeDark.png" /> Home{' '}
            </li>
          </Link>
          <li className="titulo-servicios-sidenavbar"> SERVICES </li>
          <Link href="/profile/hosting">
            <li className="sideNavbar-li">
              <img className="icon-sideNavbar" src="/iconDeploy.png" /> Deploy
            </li>
          </Link>

          <Link href="/profile/billing">
            <li style={{ marginBottom: '3vh' }} className="sideNavbar-li">
              <img className="icon-sideNavbar" src="/iconBill.png" /> Billing
            </li>
          </Link>
          <li className="titulo-servicios-sidenavbar"> SETTINGS </li>

          <Link href="/profile/ssl">
            <li className="sideNavbar-li">
              <img className="icon-sideNavbar2" src="/userDark.png" /> Account
              settings
            </li>
          </Link>
          <Link href="/profile/security">
            <li className="sideNavbar-li">
              {' '}
              <img className="icon-sideNavbar2" src="/padlock2.png" /> Security
            </li>
          </Link>
          <Link href="/profile/sharedAccount">
            <li className="sideNavbar-li">
              {' '}
              <img className="icon-sideNavbar2" src="/groupDark.png" /> Shared
              Account
            </li>
          </Link>
          <Link href="/profile/integration">
            <li className="sideNavbar-li">
              {' '}
              <img className="icon-sideNavbar2" src="/name.png" /> Integrations
            </li>
          </Link>
          <Link href={'/'}>
            <button style={{ marginTop: '7vh' }} className="logout-sidebar">
              {' '}
              Logout{' '}
            </button>
          </Link>
          <div className="footer-sidebar">
            <span onClick={() => setAbierto(!abierto)}> Contact Support</span>
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
