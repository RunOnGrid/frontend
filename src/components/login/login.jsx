"use client"
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { TokenService } from "../../../tokenHandler";
import Image from "next/image";
import {
  generateMnemonicFromGoogle,
  generateMnemonic
}
  from "@/lib/wallet"

import secureLocalStorage from "react-secure-storage";





const Login = () => {
  const passwordRef = useRef(null);

  const [error, setError] = useState("");
  const alreadyMounter = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [browser, setBrowser] = useState(null);
  const [password, setPassword] = useState("");

  useEffect(() => {
    setBrowser(window.chrome || window.browser);
  }, []);

  useEffect(() => {
    if(passwordRef.current) {
      passwordRef.current.focus();
    }
  }, []);




  const router = useRouter();

  const handleSubmit = () => {
    
  }





return (
  
  
  <div className="centered-container-login">
     <Link className="logo-link" href="/">
        <img
          width={180}
          height={100}
          src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/29b6ed79-88d5-4cee-73e8-f182a006e100/public"
          alt="Logo"
        />
      </Link>
      <h2>Welcome Back</h2>

      <div className="login-card" role="region" aria-labelledby="sp-title">
        <div className="sp-form">
          <input
            ref={passwordRef}
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="sp-input"
          />

          {error && (
            <p className="sp-error" role="alert" aria-live="polite">
              {error}
            </p>
          )}

          <button onClick={handleSubmit} className="sp-btn">
            Unlock
          </button>
        </div>
      </div>
    </div>

);
};

export default Login;

