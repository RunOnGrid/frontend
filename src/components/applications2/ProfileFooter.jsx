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

 const handleLogout = async () => {
   TokenService.clearTokens();
   router.push("/login");
 };

  useEffect(() => {
    const emailGrid = localStorage.getItem("grid_email");
    setEmail(emailGrid);
  }, [email]);

  return (
    <footer
      className={`${styles.mobileFooterBar} ${darkMode ? styles.darkMode : ""}`}
    >
      <div className={styles.footerContainer}>
        <Link href="/profile" className={styles.footerItem}>
          <Image src="/home.png" alt="Home" width={24} height={24} />
          <span className={`${styles.footerItemLabel} ${isActive("/profile")}`}>
            Apps
          </span>
        </Link>

        <Link
          href="/profile/deployApp"
          className={`${styles.footerItem} ${styles.logoutItem}`}
        >
          <div className={styles.deployButton}>
            <span>+</span>
          </div>
          <span className={styles.footerItemLabel}>Deploy</span>
        </Link>

        <div
          onClick={() => handleLogout()}
          className={`${styles.footerItem} ${styles.logoutItem}`}
        >
          <Image src="/logoutButton.png" alt="Logout" width={24} height={24} />
          <span className={styles.footerItemLabel}>Logout</span>
        </div>

        {/* <ThemeToggle /> */}
      </div>
    </footer>
  );
};

export default MobileFooterBar;
