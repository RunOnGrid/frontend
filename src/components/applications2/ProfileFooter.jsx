import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useTheme } from "@/ThemeContext";
import { TokenService } from "../../../tokenHandler";
import ThemeToggle from "@/components/ThemeToggle";
import styles from "./MobileFooterBar.module.css";

const MobileFooterBar = () => {
  const [email, setEmail] = useState("");
  const { darkMode } = useTheme();
  const router = useRouter();

  const currentPath = router.pathname;
  const isActive = (path) => (currentPath === path ? styles.active : "");

  return (
    <footer
      className={`${styles.mobileFooterBar} ${darkMode ? styles.darkMode : ""}`}
    >
      <div className={styles.footerContainer}>
        <Link href="/profile" className={styles.footerItem}>
          <Image
            src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/ac855700-229e-4962-415e-e54cd8f3ff00/public"
            alt="Home"
            width={24}
            height={24}
          />
          <span className={`${styles.footerItemLabel} ${isActive("/profile")}`}>
            Apps
          </span>
        </Link>

        <Link
          href="/profile/deployApp"
          className={`${styles.footerItem} ${styles.logoutItem}`}
        >
          <Image src="/add.png" alt="Home" width={24} height={24} />
          <span className={styles.footerItemLabel}>Deploy</span>
        </Link>
        <Link href="/profile/billing" className={styles.footerItem}>
          <Image src="/invoice.png" alt="Home" width={24} height={24} />
          <span
            className={`${styles.footerItemLabel} ${isActive(
              "/profile/billing"
            )}`}
          >
            Billing
          </span>
        </Link>
        <div
          onClick={() => handleLogout()}
          className={`${styles.footerItem} ${styles.logoutItem}`}
        >
          <Image
            src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/04de75c5-d239-4614-d717-07a19013fd00/public"
            alt="Logout"
            width={24}
            height={24}
          />
          <span className={styles.footerItemLabel}>Logout</span>
        </div>

        {/* <ThemeToggle /> */}
      </div>
    </footer>
  );
};

export default MobileFooterBar;
