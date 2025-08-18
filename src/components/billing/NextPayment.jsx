import React, { useEffect, useState } from "react";
import { TokenService } from "../../../tokenHandler";
import { Copy } from "lucide-react";

import { useFluxPrice, useAkashPrice } from '../../hooks/useCryptoPrice';



const NextPayment = ({ darkMode }) => {
  const [balanceFlux, setBalanceFlux] = useState(0);
  const [fluxAddress, setFluxAddress] = useState("");
  const [akashAddress, setAkashAddress] = useState("");
  const [balanceAkash, setBalanceAkash] = useState(0);
  const [copied, setCopied] = useState(false);

  const { data: fluxData } = useFluxPrice();
  const { data: akashData} = useAkashPrice();


  useEffect(() => {
    try {
      const account = JSON.parse(localStorage.getItem("account"));
      if (account) {
        setFluxAddress(account.fluxAddress || "");
        setAkashAddress(account.akashAddress || "");
      }
    } catch (error) {
      console.error('Error reading account from localStorage:', error);
    }
  }, []);

  const getFluxBalance = async () => {
    try {
      const response = await fetch(`/api/flux/balance-flux?address=${fluxAddress}`);
      const data = await response.json();
      setBalanceFlux(data.balance || 0);
    } catch (error) {
      console.error('Error fetching FLUX balance:', error);
    }
  };

  useEffect(() => {
    getFluxBalance();
  }, []);

  const getAkashBalance = async () => {
    try {
      const response = await fetch(`/api/akash/balance-akash?address=${akashAddress}`);
      const data = await response.json();
      setBalanceAkash(data.balance || 0);
    } catch (error) {
      console.error('Error fetching FLUX balance:', error);
    }
  };

  useEffect(() => {
    getAkashBalance();
  }, []);

  const handleCopy = async (address) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  // Calcular precios en USD
  const getFluxPriceUSD = () => {
    if (fluxData?.data?.price) {
      return (balanceFlux * fluxData.data.price).toFixed(3);
    }
    return "0.00";
  };

  const getAkashPriceUSD = () => {
    if (akashData?.data?.price) {
      return (balanceAkash * akashData.data.price).toFixed(2);
    }
    return "0.00";
  };

  return (
    <div className="billing-boxes-container">
      <div className="billing-card3">
        <div className="billing-card3-address">
          <img src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/c61ff49d-574b-4546-bd53-fadb83f03e00/public" alt="Flux Icon" />
          <div className="address-card">
            <span>{fluxAddress ? `${fluxAddress.slice(0,6)}...${fluxAddress.slice(-4)}` : "Loading..."}</span>
            <Copy className="copy-icon" onClick={() => handleCopy(fluxAddress)} />
          </div>
        </div>
        <div className="card-account-balance">
          <span className="font-weight-500 font-size-15px">FLUX</span>
          <div className="card-balance">
            <span className="font-weight-700">${(parseFloat(getFluxPriceUSD()) + balanceFlux).toFixed(1)}</span>
            <span className="font-size-5px">({(balanceFlux).toFixed(1)} FLUX)</span>
          </div>
        </div>
      </div>

      <div className="billing-card3">
        <div className="billing-card3-address">
          <img src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/a1957f28-d510-41b8-254a-2188ea92de00/public" alt="Akash Icon" />
          <div className="address-card">
            <span>{akashAddress ? `${akashAddress.slice(0,6)}...${akashAddress.slice(-4)}` : "Loading..."}</span>
            <Copy className="copy-icon" onClick={() => handleCopy(akashAddress)} />
          </div>
        </div>
        <div className="card-account-balance">
          <span className="font-weight-500 font-size-15px">AKASH</span>
          <div className="card-balance">
            <span className="font-weight-700">${(parseFloat(getAkashPriceUSD()) + balanceAkash).toFixed(1)}</span>
            <span className="font-size-5px">({(balanceAkash).toFixed(1)} AKASH)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NextPayment;
