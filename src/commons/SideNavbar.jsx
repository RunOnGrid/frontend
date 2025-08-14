import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/ThemeContext";
import { TokenService } from "../../tokenHandler";


const SideNavbar = ({ abierto, setAbierto }) => {
  const [menu, setMenu] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();
  const router = useRouter();

  const currentPath = router.pathname;
  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  const isActive = (path) => (currentPath === path ? "active" : "");

  return (
    <>
      <nav className="sideNavbar">
        <ul className="sideNavbar-ul">
          <Link href="/profile">
            <img
              className="icono-sideBar-grid"
              src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/ca632650-5de1-46bd-88f4-03c847c04200/public"
            />
          </Link>
          <div className="user-profile">
            <div className="profile-pic">
              <Image
                src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/ecc05e76-2a6e-48d4-69b1-cc5b00192800/public"
                alt="User Icon"
                width={30}
                height={30}
              />
              <span className="status-indicator"></span>
            </div>
            <div className="profile-info">
            </div>
          </div>
          <Link href="/profile">
            <span className={`sideNavbar-span ${darkMode ? "dark" : "light"} `}>
              Balance:
            </span>
          </Link>
          <Link href="/profile">
            <span className={`sideNavbar-p ${darkMode ? "dark" : "light"} `}>
              USD $10
            </span>
          </Link>

          <Link href="/profile/deployApp">
            <li onClick={toggleLinks} className="sideNavbar-li deploy-item">
              <span>Deploy</span>
              <span className="deploy-plus">+</span>
            </li>
          </Link>

          <Link href="/profile">
            <li
              className={`sideNavbar-li ${darkMode ? "dark" : "light"
                } ${isActive("/profile")}`}
            >
              Applications
            </li>
          </Link>

          <Link href="/profile/billing">
            <li
              className={`sideNavbar-li ${darkMode ? "dark" : "light"
                } ${isActive("/profile/billing")}`}
            >
              Billing
            </li>
          </Link>

          <a
            href="https://ongrid.run"
            className="logout-sidebar"
            rel="noopener noreferrer"
          >
            Log Out
            <Image
              className="button-logout"
              alt=""
              src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/04de75c5-d239-4614-d717-07a19013fd00/public"
              height={16}
              width={16}
            />
          </a>

          <div className="footer-sidebar">
            <div className="contact-links">
              <div className="social-icons">
                <Link href="https://github.com/RunOnGrid" passHref>
                  <img
                    src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/4636be10-ed1b-4f82-8a65-cd3a1e027300/public"
                    alt="GitHub"
                    width={30}
                    height={30}
                  />
                </Link>
                <Link href="https://x.com/OnGridRun" passHref>
                  <img
                    src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/bb2d3659-e251-4151-2308-fbc1ba546600/public"
                    alt="Twitter"
                    width={30}
                    height={30}
                  />
                </Link>
                <Link href="https://discord.gg/yjkPTHjKeZ" passHref>
                  <img
                    src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/bda43c28-1a8a-422e-4e4c-233fbba53600/public"
                    alt="Discord"
                    width={30}
                    height={30}
                  />
                </Link>
              </div>
              <div className="contact-options">
                <Link href="https://documentation.ongrid.run/">
                  <div className="contact-item">
                    <img
                      src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/56ce0730-367d-40f2-cbc9-334ff69e1400/public"
                      alt="Support"
                      width={18}
                      height={18}
                    />
                    <span>Docs</span>
                  </div>
                </Link>
              </div>
              <div className="contact-options">
                <Link href="https://discord.com/channels/1281650505462054952/1281652398930002010">
                  <div className="contact-item">
                    <img
                      src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/afa67ae6-0dca-4ad9-48f5-37e0bd842b00/public"
                      alt="Support"
                      width={20}
                      height={20}
                    />
                    <span>Support</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <ThemeToggle />
        </ul>
      </nav>
    </>
  );
};

export default SideNavbar;
