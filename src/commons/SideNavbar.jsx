import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/ThemeContext";
import { TokenService } from "../../tokenHandler";
import { useFluxPrice, useAkashPrice } from "../hooks/useCryptoPrice";
import { useFluxBalance, useAkashBalance } from "../hooks/useCryptoBalance";

import {User} from "lucide-react"

const SideNavbar = ({ abierto, setAbierto }) => {
  const [showLinks, setShowLinks] = useState(false);
  const { darkMode } = useTheme();
  const [walletName, setWalletName] = useState("");
  const [fluxAddress, setFluxAddress] = useState("");
  const [akashAddress, setAkashAddress] = useState("");
  const [balance, setBalance] = useState(0);
  const router = useRouter();

  const currentPath = router.pathname;
  const toggleLinks = () => setShowLinks(!showLinks);

  const isActive = (path) => (currentPath === path ? "active" : "");

  useEffect(() => {
    try {
      const account = JSON.parse(localStorage.getItem("account"));
      if (account) {
        setFluxAddress(account.fluxAddress || "");
        setAkashAddress(account.akashAddress || "");
      }
    } catch (error) {
      console.error('Error reading account from localStorage:', error);
    }
  }, []);

  const { data: fluxPriceData, loading: fluxPriceLoading, error: fluxPriceError } = useFluxPrice();
  const { data: akashPriceData, loading: akashPriceLoading, error: akashPriceError } = useAkashPrice();
  const { balance: fluxBalance, loading: fluxBalanceLoading, error: fluxBalanceError } = useFluxBalance(fluxAddress);
  const { balance: akashBalance, loading: akashBalanceLoading, error: akashBalanceError } = useAkashBalance(akashAddress);


  
  useEffect(() => {
    if (fluxBalance !== undefined && akashBalance !== undefined) {
      const totalBalance = (fluxBalance * fluxPriceData) + (akashBalance * akashPriceData);
      setBalance(totalBalance);
    }
  }, [fluxBalance, akashBalance]);

  useEffect(() =>{
    const account = JSON.parse(localStorage.getItem("wallet"));
    if (account) {
      setWalletName(account.name);
    }
  })

  return (
    <nav className="sideNavbar">
      {/* Logo */}
      <Link href="/profile">
        <img
          className="icono-sideBar-grid"
          src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/ca632650-5de1-46bd-88f4-03c847c04200/public"
          alt="Grid Logo"
        />
      </Link>

      {/* User profile */}
      <div className="user-profile">
        <div className="profile-pic">
          <User 
            alt="wallet Icon"
            width={25}
            height={25}
            strokeWidth={1.5}
          />
        </div>
          <span className="status-indicator">{walletName}</span>
      </div>

      {/* Balance */}
      <div className="balance-box">
        <div className="balance-line"></div>
        <div className="balance-content">
          <span className="sideNavbar-span">Balance:</span>
          <span className="sideNavbar-span font-weight-700">USD {balance}</span>
        </div>
      </div>

      {/* Navigation */}
      <ul className="sideNavbar-ul">
        <Link href="/profile/deployApp">
          <li onClick={toggleLinks} className="sideNavbar-li deploy-item">
            <span>Deploy</span>
            <span className="deploy-plus">+</span>
          </li>
        </Link>

        <Link href="/profile/account">
          <li
            className={`sideNavbar-li ${darkMode ? "dark" : "light"} ${isActive("/profile/account")}`}
          >
            Account
          </li>
        </Link>

        <Link href="/profile">
          <li
            className={`sideNavbar-li ${darkMode ? "dark" : "light"} ${isActive("/profile")}`}
          >
            Applications
          </li>
        </Link>

        <Link href="/profile/billing">
          <li
            className={`sideNavbar-li ${darkMode ? "dark" : "light"} ${isActive("/profile/billing")}`}
          >
            Billing
          </li>
        </Link>
      </ul>

      {/* Delete Wallet */}

      <a
        href="https://ongrid.run"
        className="delete-wallet"
        rel="noopener noreferrer"
        onClick={TokenService.clearTokens}
      >
        Delete Wallet
        <Image
          alt="delete"
          src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/04de75c5-d239-4614-d717-07a19013fd00/public"
          height={16}
          width={16}
        />
      </a>

      {/* Footer */}
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
                  alt="Docs"
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

      {/* Theme toggle */}
      <ThemeToggle />
    </nav>
  );
};

export default SideNavbar;
