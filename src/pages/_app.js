import { useEffect } from 'react';

import '@/styles/globals.css';
import '../styles/index/Index.css';
import '../styles/login/Login.css';
import '../styles/register/Register.css';
import '../styles/logged-home/LoggedHome.css';
import '../styles/logged-personal/LoggedPersonal.css';
import '../styles/logged-security/LoggedSecurity.css';
import '../styles/logged-shared/LoggedShared.css';
import '../styles/logged-hosting/LoggedHosting.css';
import '../styles/landing-AsicHosting/bannerAsic.css';
import '../styles/landing-AsicHosting/cardsAsic.css';
import '../styles/menuNavbarLogged.css';
import '../styles/buyProduct.css';
import '../styles/Billing/Billing.css';
import '../styles/aboutUs/aboutUs.css';
import '../styles/newApplication/newApplication.css';
import '../styles/deployBoxes/whatApp.css';
import '../styles/deployBoxes/nameBox.css';
import '../styles/deployBoxes/deployMethod.css';
import '../styles/deployBoxes/envVaribales.css';
import '../styles/deployBoxes/newServices.css';
import '../styles/deployBoxes/details.css';
import '../styles/deployBoxes/singleComponent.css';
import '../styles/projectsx/ProjectData.css';
import '../styles/pricing/pricing.css';
import '../styles/blog/blog.css';
import '../styles/repositories/repositories.css';
import '../components/BestFeatures/bestFeatures.css';
import '../components/deployChoice/deployChoice.css';
import '../components/Graphs/graphs.css';
import '../components/profile/dashboard.css';
import '../components/deploy/deployScreen.css';
import "../components/applications2/applications.css";
import "../components/applications2/environment.css";
import { ThemeProvider } from "@/ThemeContext";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
