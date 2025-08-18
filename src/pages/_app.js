import { useEffect } from 'react';

import '@/styles/globals.css';
import '../styles/index/Index.css';
import '../styles/login/Login.css';
import '../styles/register/Register.css';
import "../styles/logged-home/LoggedHome.css";
import "../styles/logged-security/LoggedSecurity.css";
import "../styles/logged-shared/LoggedShared.css";
import "../styles/login-methods/cards.css";
import "../styles/logged-hosting/LoggedHosting.css";
import "../styles/menuNavbarLogged.css";
import "../styles/Billing/Billing.css";
import "../styles/newApplication/newApplication.css";
import "../styles/deployBoxes/whatApp.css";
import "../styles/deployBoxes/nameBox.css";
import "../styles/deployBoxes/deployMethod.css";
import "../styles/deployBoxes/envVaribales.css";
import "../styles/deployBoxes/newServices.css";
import "../styles/deployBoxes/details.css";
import "../styles/deployBoxes/singleComponent.css";
import "../styles/projectsx/ProjectData.css";
import "../styles/pricing/pricing.css";
import "../styles/repositories/repositories.css";
import "../components/deployChoice/deployChoice.css";
import "../components/profile/dashboard.css";
import "../components/deploy/deployScreen.css";
import "../components/applications2/applications.css";
import "../components/applications2/environment.css";
import "../styles/logged-personal/SideNavBar.css";
import { ThemeProvider } from "@/ThemeContext";
import "../components/billing/billing.css";
import "../components/akash/akash.css";
import "../commons/commons.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Head>
        <link rel="icon" href="/favicon-new.ico" />
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}