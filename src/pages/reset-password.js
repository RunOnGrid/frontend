import { useState, useEffect } from "react";
import useCheckAuth from "@/checkAuth";
import LoadingOverlay from "@/commons/LoadingOverlay";
import LoginScreen from "@/components/login/LoginScreen";
import ResetScreen from "@/components/login/ResetScreen";

export default function Reset() {
  




  return (
    <div className="login-page-container">
     

      <div
        className={`container-homePrincipal2 `}
      >
        <ResetScreen/>
      </div>
    </div>
  );
}
