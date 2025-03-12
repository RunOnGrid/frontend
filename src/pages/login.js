import { useState, useEffect } from "react";
import useCheckAuth from "@/checkAuth";
import LoadingOverlay from "@/commons/LoadingOverlay";
import LoginScreen from "@/components/login/LoginScreen";

export default function Login() {
  const isLoading = useCheckAuth();
  const [loginVisible, setLoginVisible] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        setLoginVisible(true);
      }, 50);
    }
  }, [isLoading]);

  return (
    <div className="login-page-container">
      <LoadingOverlay isVisible={isLoading} />

      <div
        className={`container-homePrincipal2 fade-element ${
          loginVisible ? "visible" : ""
        }`}
      >
        <LoginScreen />
      </div>
    </div>
  );
}
