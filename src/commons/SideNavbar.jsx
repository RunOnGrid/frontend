import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/ThemeContext";
import CryptoJS from "crypto-js";
import { TokenService } from "../../tokenHandler";

const SECRET_KEY =
  process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "fallback-secret-key";

const SideNavbar = ({ abierto, setAbierto }) => {
  const [menu, setMenu] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const [email, setEmail] = useState("");
  const [accessToken, setAccessToken] = useState(null);
  const [balance, setBalance] = useState(0);
  const { darkMode, toggleDarkMode } = useTheme();
  const router = useRouter();

  const currentPath = router.pathname;
  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  const isActive = (path) => (currentPath === path ? "active" : "");
  const handleLogout = async () => {
    TokenService.clearTokens();
    router.push("/login");
  };
 
  const getBalance = async () => {
    try {
      const response = await fetch(`/api/balance-proxy`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const data = await response.json();

      setBalance(data.toFixed(2));
    } catch (err) {
      console.error("Error loading existing app names:", err);
    }
  };
  useEffect(() => {
    if (accessToken) {
      getBalance();
    }
  }, [accessToken]);

  useEffect(() => {
    const tokens = TokenService.getTokens();
    if (tokens && tokens.tokens && tokens.tokens.accessToken) {
      setAccessToken(tokens.tokens.accessToken);
    }
  }, []);

  useEffect(() => {
    const emailGrid = localStorage.getItem("grid_email");
    setEmail(emailGrid);
  }, [email]);

  useEffect(() => {
    const expired = TokenService.isExpired();
    if (expired) {
      handleLogout();
    }
  }, []);

  return (
    <>
      <nav className="sideNavbar">
        <ul className="sideNavbar-ul">
          <Link href="/profile">
            <img className="icono-sideBar-grid" src="/LogoAlpha.svg" />
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
              <p className="profile-username">{email}</p>
            </div>
          </div>
          <Link href="/profile">
            <span className={`sideNavbar-span ${darkMode ? "dark" : "light"} `}>
              Balance:
            </span>
          </Link>
          <Link href="/profile">
            <span className={`sideNavbar-p ${darkMode ? "dark" : "light"} `}>
              USD ${balance}
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
              className={`sideNavbar-li ${
                darkMode ? "dark" : "light"
              } ${isActive("/profile")}`}
            >
              Applications
            </li>
          </Link>

          <Link href="/profile/billing">
            <li
              className={`sideNavbar-li ${
                darkMode ? "dark" : "light"
              } ${isActive("/profile/billing")}`}
            >
              Billing
            </li>
          </Link>

          <Link href={"/"}>
            <span onClick={() => handleLogout()} className="logout-sidebar">
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

          <ThemeToggle />
          <div className="footer-sidebar">
            <div className="contact-links">
              <div className="social-icons">
                <Link href="https://github.com/RunOnGrid" passHref>
                  <Image
                    src="/githubLogoDark.svg"
                    alt="GitHub"
                    width={30}
                    height={30}
                  />
                </Link>
                <Link href="https://x.com/OnGridRun" passHref>
                  <Image
                    src="/xLogo.svg"
                    alt="Twitter"
                    width={30}
                    height={30}
                  />
                </Link>
                <Link href="https://discord.gg/yjkPTHjKeZ" passHref>
                  <Image
                    src="/discordLogo.svg"
                    alt="Discord"
                    width={30}
                    height={30}
                  />
                </Link>
              </div>
              <div className="contact-options">
                <Link href="https://discord.com/channels/1281650505462054952/1281652398930002010">
                  <div className="contact-item">
                    <Image
                      src="/suppLogo.svg"
                      alt="Support"
                      width={24}
                      height={24}
                    />
                    <span>Support</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </ul>
      </nav>
    </>
  );
};

export default SideNavbar;
