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
          <div className="user-profile">
            <div className="profile-pic">
              <Image
                src="/userDark.png"
                alt="User Icon"
                width={30}
                height={30}
              />
              <span className="status-indicator"></span>
            </div>
            <div className="profile-info">
              <p className="profile-name">Name</p>
              <p className="profile-username">@username</p>
            </div>
          </div>
          <Link href="/profile/deploy">
            <li className="sideNavbar-li deploy-item">
              <span>Deploy</span>
              <span className="deploy-plus">+</span>
            </li>
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
            <span className="logout-sidebar">
              Log Out
              <Image
                className="button-logout"
                alt=""
                src="/logoutButton.png"
                height={16}
                width={16}
              />
            </span>
          </Link>

          <div className="footer-sidebar">
            <div className="contact-links">
              <div className="social-icons">
                <Link href="https://github.com" passHref>
                  <Image
                    src="/githubLogoDark.svg"
                    alt="GitHub"
                    width={30}
                    height={30}
                  />
                </Link>
                <Link href="https://twitter.com" passHref>
                  <Image
                    src="/xLogo.svg"
                    alt="Twitter"
                    width={30}
                    height={30}
                  />
                </Link>
                <Link href="https://discord.com" passHref>
                  <Image
                    src="/discordLogo.svg"
                    alt="Discord"
                    width={30}
                    height={30}
                  />
                </Link>
              </div>
              <div className="contact-options">
                <div className="contact-item">
                  <Image
                    src="/contactLogo.svg"
                    alt="Contact Us"
                    width={24}
                    height={24}
                  />
                  <span>Contact us</span>
                </div>
                <div className="contact-item">
                  <Image
                    src="/suppLogo.svg"
                    alt="Support"
                    width={24}
                    height={24}
                  />
                  <span>Support</span>
                </div>
              </div>
            </div>
            {/* <span onClick={() => setAbierto(!abierto)}>Contact Support</span> */}
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
