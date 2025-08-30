"use client"
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  generateMnemonicFromGoogle,
  generateMnemonic
}
  from "@/lib/wallet"
import { decrypt as passworderDecrypt } from "@metamask/browser-passworder"
import {
  getFingerprint
} from "@/lib/sspFingerPrint"

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

  const router = useRouter();


  useEffect(() => {
    const accPresent = secureLocalStorage.getItem("walletSeed");

    if (!accPresent) {
      router.push("/create");
      return;
    }
  }, []);

  useEffect(() => {
    setBrowser(window.chrome || window.browser);
  }, []);

  useEffect(() => {
    if (passwordRef.current) {
      passwordRef.current.focus();
    }
  }, []);

  const handleSubmit = () => {

    const randomParams = secureLocalStorage.getItem('randomParams');

    if (randomParams &&
      typeof randomParams === 'string' &&
      randomParams.lenght
    ) {
      const randomParamsFingerPrint = getFingerprint(randomParams);
      passworderDecrypt(randomParamsFingerPrint, password)
        .then((decryptedParams) => {
          setPassword(password + decryptedParams)
        })
        .catch((error) => {
          setError("Login error");
        })
    }
  }

  const decryptWallet = () => {
    const xpubEncrypted = secureLocalStorage.getItem('xpub');

    if(!xpubEncrypted){
      setError("Login error: Missing required data");
      return;
    }

    if(typeof xpub === 'string'){
      passworderDecrypt(password, xpubEncrypted)
      .then(async (xpub) =>{
        const fingerprint = getFingerprint();
        const pwBlob = await passworderEncrypt(fingerprint, password);

        if(browser?.storage?.session){
          await browser.storage.session.set({
            pwBlob: pwBlob,
          }) 
        }
        dispatch(setPasswordBlob(pwBlob))
        router.push("/profile");
        return;
        })
      .catch((error) => {
        setError("Login error");
      })
    }
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

