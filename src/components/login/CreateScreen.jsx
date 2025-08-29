"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { TokenService } from "../../../tokenHandler";
import Image from "next/image";
import {
  generateMnemonicFromGoogle,
  generateMnemonic
}
  from "@/lib/wallet"

import SetPassword from "./setPassword"
import VerifyWords from "./VerifyWords";
import BackupKey from "./BackUpKey";
import back from "axios";






const Create = () => {
  const [password, setPassword] = useState("");
  const [backupconfirmed, setBackupConfirmed] = useState(false);
  const [verificationconfirmed, setVerificationConfirmed] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [seedPhrase, setSeedPhrase] = useState(new Uint8Array());
  const [isDeterministic, setIsDeterministic] = useState(false)

  const router = useRouter();

  useEffect(() => {
    // Evitar múltiples ejecuciones
    let isInitialized = false;

    const loadGoogleScript = () => {
      // Verificar si ya se cargó el script
      if (document.querySelector('script[src*="accounts.google.com/gsi/client"]')) {
        return;
      }

      const script = document.createElement("script")
      script.src = "https://accounts.google.com/gsi/client"
      script.async = true
      script.defer = true
      script.onload = () => {
        if (!isInitialized) {
          initializeGoogleSignIn();
          isInitialized = true;
        }
      }
      script.onerror = () => setLoginError("No se pudo cargar el script de Google Sign-In.")
      document.head.appendChild(script)
    }

    window.handleSignInWithGoogle = async (response) => {
      setIsLoading(true)
      setLoginError(null)
      try {
        const idToken = response.credential
        const payload = JSON.parse(atob(idToken.split(".")[1]))

        const backendResponse = await fetch("/api/google/route", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken }),
        })

        console.log('Respuesta de la API:', backendResponse); // Debug

        const data = await backendResponse.json()
        if (!backendResponse.ok) throw new Error(data.error || "Verification Failed.")

        const seedPhrase = await generateMnemonicFromGoogle(
          payload.sub,
          payload.email,
        )
        setIsDeterministic(true)
        setSeedPhrase(seedPhrase)
      } catch (err) {
        console.error("Error durante el login:", err)
        setLoginError(err.message || "Error inesperado.")
      } finally {
        setIsLoading(false)
      }
    }

    // Solo inicializar una vez
    if (window.google && !isInitialized) {
      initializeGoogleSignIn();
      isInitialized = true;
    } else if (!isInitialized) {
      loadGoogleScript();
    }

    return () => {
      if (window.google) {
        window.google.accounts.id.cancel()
      }
      delete window.handleSignInWithGoogle
    }
  }, [])

  const initializeGoogleSignIn = () => {
    if (!window.google) return

    window.google.accounts.id.initialize({
      client_id: '903556090114-9n31t9go10a5ipodeh4jm7ac99fgiuvg.apps.googleusercontent.com',
      callback: window.handleSignInWithGoogle,
      auto_select: false,
      cancel_on_tap_outside: true,
    })
    const button = document.getElementById("google-signin-button")
    if (button) {
      window.google.accounts.id.renderButton(button, {
        theme: "outline",
        size: "medium",
        shape: "pill",
        text: "continue_with",
        logo_alignment: "left",
      })
    }
  }

  // const handleGenerateMnemonicFromGoogle = async () => {
  //   let generatedMnemonic = await generateMnemonicFromGoogle("google", "test@test.com");
  //   setSeedPhrase(generatedMnemonic);
  // }

  const handleGenerateMnemonic = async () => {
    let generatedMnemonic = await generateMnemonic(128);
    setSeedPhrase(new TextEncoder().encode(generatedMnemonic));
    generatedMnemonic = null;
  }

  if (seedPhrase.length > 0 && !backupconfirmed) {
    return (
      <BackupKey
        seedPhrase={seedPhrase}
        deterministic={isDeterministic}
        onConfirm={() => {
          setBackupConfirmed(true)
        }}
      />
    )
  }
  if (backupconfirmed) {
    return (
      <VerifyWords
        seedPhrase={seedPhrase}
      />
    )
  }




  return (
    <div className="page-container">
      <Link className="logo-link" href="/">
        <img
          width={180}
          height={100}
          src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/29b6ed79-88d5-4cee-73e8-f182a006e100/public"
          alt="Logo"
        />
      </Link>
      <h2>Your Depin gateway</h2>

      <div className="import-row">
        <div className="import-container">
          <div className="import-card import-card--left">
            <div className="import-card__header">
              <h3 className="import-card__title import-card__title--left">Use Google</h3>
            </div>

            <div className="import-card__content">
              <p className="import-card__subtitle font-size-08rem">
                Derive a trustless wallet from your Google account.
              </p>
              <div id="google-signin-button" className="margin-top-10">
                Connect with Google
              </div>
            </div>
          </div>
          <div className="import-card import-card--left">
            <div className="import-card__header">
              <h3 className="import-card__title import-card__title--left">Import wallet</h3>
            </div>

            <div className="import-card__content">
              <p className="import-card__subtitle font-size-08rem">
                Use an existing 12/24 word recovery phrase or private key.
              </p>

              <button className="btn-with-icon">
                <img src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/72c55010-dbec-465a-a353-a7f2c6f62f00/public" alt="" className="btn-icon" />
                Import from a Recovery Phrase
              </button>
            </div>
          </div>
          <div className="import-card import-card--right">
            <div className="import-card__content--right">
              <div className="import-card__header">
                <h3 className="import-card__title">Generate wallet</h3>
              </div>

              <div className="import-card__content ">
                <p className="import-card__subtitle">
                  This will generate a random wallet
                </p>
                <p className="import-card__subtitle"> with a seed phrase.</p>


                <button className="btn-with-icon" onClick={handleGenerateMnemonic}>
                  <img src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/1b6ebec5-4715-4fb5-8b1f-19a35f5f0100/public" alt="" className="btn-icon" />
                  Create a new wallet
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;

