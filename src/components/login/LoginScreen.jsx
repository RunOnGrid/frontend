"use client"
import React, { useEffect, useState } from "react";
import TrianglesLeft from "../TrianglesLeft";
import Link from "next/link";
import { useRouter } from "next/router";
import { TokenService } from "../../../tokenHandler";
import Image from "next/image";
import { generateMnemonicFromGoogle, 
  generateMnemonic, 
  deriveAkash, 
  generatexPubxPriv, 
  generateFluxKeyPair } 
  from "@/lib/wallet"
import {generateExternalIdentityKeypair} from "@/lib/sspFunctions"
import SetPassword from "@/components/login/setPassword"
import BackupKey from "./BackUpKey";
import back from "axios";
import { encrypt as passworderEncrypt } from "@metamask/browser-passworder"
import secureLocalStorage from "react-secure-storage"

const LoginScreen = () => {
  const [password, setPassword] = useState("");
  const [backupconfirmed, setBackupConfirmed] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [akashAddress, setAkashAddress] = useState(null);
  const [fluxAddress, setFluxAddress] = useState(null)
  const [fluxId, setFluxId] = useState(null)
  const [FluxIdPrivKey, setFluxIdPrivKey] = useState(null)
  const [FluxWifPrivKey, setFluxPrivKeyWif] = useState(null)
  const [mnemonic, setMnemonic] = useState(null)
  const [isConnected, setIsConnected] = useState(false);
  const [isDeterministic, setIsDeterministic] = useState(false)

  const router = useRouter();



  const handleGenerateMnemonic = async () => {
    const mnemonic = await generateMnemonic()
    const akashData = await deriveAkash(mnemonic);
    const account = await akashData.getAccounts();
    const returnData = generatexPubxPriv(mnemonic, 44, 19167, 0, '0');
    const fluxAddress = generateFluxKeyPair(returnData.xpriv)
    // const fluxId = await generateExternalIdentityKeypair(returnData.xpriv)


    setFluxPrivKeyWif(fluxAddress.privKeyFlux)
    setAkashAddress(account[0].address)
    setFluxAddress(fluxAddress.address);
    setMnemonic(mnemonic);
    // setFluxId(fluxId.address);
    // setFluxIdPrivKey(fluxId.privKey);
  }

  if (mnemonic && !backupconfirmed) {
    return (
      <BackupKey
        seedPhrase={mnemonic}
        deterministic={isDeterministic}
        onConfirm={() => {
          setBackupConfirmed(true)
        }}
      />
    )
  }

  if (mnemonic && backupconfirmed) {
    return (
      <SetPassword
        onConfirm={(password) => {
          if (password) {
            console.log(password);
            const blob =  passworderEncrypt(password, mnemonic)
            // const blob1 =  passworderEncrypt(passwordToUse, FluxIdPrivKey)
            secureLocalStorage.setItem("walletSeed", blob)
            // secureLocalStorage.setItem("FluxId", blob1)
            secureLocalStorage.setItem("FluxPrivKey", FluxWifPrivKey)
          }
          localStorage.setItem("account", JSON.stringify({ "akashAddress": akashAddress, "fluxAddress": fluxAddress}))
        }}
      />
    )
  }


  return (
    <div className="page-container">
      <div className="new-login">

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
            <div className="import-card">
              <div className="import-card__header">
                <h3 className="import-card__title">Import wallet</h3>
              </div>

              <div className="import-card__content">
                <p className="import-card__subtitle">
                Use an existing 12/24 word recovery phrase or private key. You can also import wallets from other wallet providers.
                </p>

                <button className="btn-with-icon">
                  <img src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/72c55010-dbec-465a-a353-a7f2c6f62f00/public" alt="" class="btn-icon" />
                  Import from a Recovery Phrase
                </button>
              </div>
            </div>
            <div className="import-card">
              <div className="import-card__header">
                <h3 className="import-card__title">Generate wallet</h3>
              </div>

              <div className="import-card__content">
                <p className="import-card__subtitle">
                  This will generate a random wallet with a seed phrase. You can algo use this seed on other wallet providers.
                </p>

                <button className="btn-with-icon" onClick={handleGenerateMnemonic}>
                  <img src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/1b6ebec5-4715-4fb5-8b1f-19a35f5f0100/public" alt="" class="btn-icon" />
                  Generate a random wallet
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;

