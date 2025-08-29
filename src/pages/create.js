import { useState, useEffect, useRef } from "react";
import createScreen from "@/components/login/CreateScreen";
import secureLocalStorage from 'react-secure-storage';
import { useRouter } from "next/router";

export default function Login() {

  const alreadyMounted = useRef(false);
  const [loginVisible, setLoginVisible] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (alreadyMounted.current) return;
    alreadyMounted.current = true;
    // if user exists, navigate to login
    const accPresent = secureLocalStorage.getItem('walletSeed');
    if (accPresent) {
      router.push('/login');
      return;
    }
    setIsLoading(false);
  });
  return (
    <div className="login-page-container">
      <div
        className={`container-homePrincipal2 fade-element ${
          loginVisible ? "visible" : ""
        }`}
      >
        <createScreen />
      </div>
    </div>
  );
}
