import '@/styles/globals.css';                        
import '../styles/index/Index.css';                   
import '../styles/login/Login.css';                             
import "../styles/logged-home/LoggedHome.css";        
import "../styles/logged-personal/SideNavbar.css";    
import "../components/BestFeatures/bestFeatures.css"; 
import "../components/deployChoice/deployChoice.css";        
import "../components/profile/dashboard.css";       
import "../components/deploy/deployScreen.css";      
import "../components/applications2/applications.css"; 
import "../components/applications2/environment.css";   
import "../components/billing/billing.css";            
import "../components/akash/akash.css";         
import "../commons/commons.css";    
import { ThemeProvider } from "@/ThemeContext";
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
