import { useTheme } from "@/ThemeContext";
import { useState, useEffect } from "react";
import { Copy, LockKeyhole, Eye, EyeOff } from "lucide-react";
import {
  decrypt as passworderDecrypt,
  encrypt as passworderEncrypt,
} from '@metamask/browser-passworder';
import secureLocalStorage from "react-secure-storage";

export const AccountScreen = () => {

  const { darkMode } = useTheme();
  const [seedPhrase, setSeedPhrase] = useState(new Uint8Array());
  const [akashAddress, setAkashAddress] = useState(null);
  const [fluxAddress, setFluxAddress] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');


  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(seedPhrase);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  const decryptSeedPhrase = async (password) => {
    try {
      const walletSeedBlob = secureLocalStorage.getItem('walletSeed');
      console.log('1. Blob from storage:', walletSeedBlob);
      
      let walletSeed = await passworderDecrypt(password, walletSeedBlob);
      
      setSeedPhrase(walletSeed);
      
      // reassign walletSeed to null as it is no longer needed
      walletSeed = null;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`dashboard-container ${darkMode ? "dark" : "light"}`}>
      <div className="dashboard-header">
        <h1>Account</h1>
      </div>

      <div className="account-container">
        <div className="account-container-keys">
          <div className="account-container-key">
          {seedPhrase.length > 0 ? (
              <>
                <LockKeyhole className="account-container-key-icon" />
                <h4 className="account-container-key-content-h4">Your seed phrase</h4>
                <p className="account-container-key-content-p">Your seed phrase is used to recover your account, keep it safe.</p>
                <div className="password-input-container">
                  <div className="seed-phrase-container">
                    <p className="seed-phrase-decrypted">{seedPhrase}</p>
                    <button type="button" className="copy-button" onClick={handleCopy}>
                      {copied ? "Copied!" : "Copy to clipboard"}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <LockKeyhole className="account-container-key-icon" />
                <h4 className="account-container-key-content-h4">Verify your identity</h4>
                <p className="account-container-key-content-p">Enter your password to decrypt your seed phrase</p>
                <div className="password-input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="showSeed-input"
                  />
                  
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="eye-button"
                  >
                    {showPassword ? <Eye /> : <EyeOff />}
                  </button>
                </div>
                <button className="account-container-key-button" onClick={() => decryptSeedPhrase(password)}>Confirm</button>
              </>
            )}
            </div>
           
          </div>
        </div>
      </div>

  );
}

export default AccountScreen;