import { useState, useEffect } from "react";
import useCheckAuth from "@/checkAuth";
import LoginScreen from "@/components/login/LoginScreen";

export default function Login() {

  const [loginVisible, setLoginVisible] = useState(true);


  return (
    <div className="login-page-container">
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
