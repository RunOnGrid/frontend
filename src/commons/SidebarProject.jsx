import SidebarMobile from '@/components/SidebarMobile';
import Link from 'next/link';
import React, { useState } from 'react';

const SidebarProject = ({ abierto, setAbierto }) => {
  const [visible, setVisible] = useState(true);
  const [selected, setSelected] = useState(false);
  const [menu, setMenu] = useState(false);

  const toggleSideBar = () => {
    return setVisible(!visible);
  };

  const toggle = () => {
    if (selected === false) {
      return setSelected(true);
    }
    setSelected(false);
  };
  return (
    <>
      <nav className="sideNavbar">
        <ul className="sideNavbar-ul">
          <Link href="/">
            <img className="icono-sideBar-grid" src="/gridCloud2.svg" />
          </Link>
          <Link href="/profile/project/events">
            <li className="sideNavbar-li"> Events</li>
          </Link>

          <Link href="/profile/project/environment">
            <li className="sideNavbar-li"> Environment</li>
          </Link>

          <Link href="/profile/project/redirects">
            <li className="sideNavbar-li"> Redirects/Rewrites</li>
          </Link>

          <Link href="/profile/project/headers">
            <li className="sideNavbar-li"> Headers</li>
          </Link>
          <Link href="/profile/project/preview">
            <li className="sideNavbar-li"> Preview</li>
          </Link>
          <Link href="/profile/project/metric">
            <li className="sideNavbar-li"> Metrics</li>
          </Link>
          <Link href="/profile/sharedAccount">
            <li className="sideNavbar-li"> Settings</li>
          </Link>

          <button className="logout-sidebar"> Logout </button>
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

export default SidebarProject;
