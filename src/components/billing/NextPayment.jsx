import React, { useEffect, useState } from "react";
import { TokenService } from "../../../tokenHandler";
import { Copy } from "lucide-react";
import { useFluxPrice, useAkashPrice } from "../../hooks/useCryptoPrice";
import { useFluxBalance, useAkashBalance } from "../../hooks/useCryptoBalance";

const NextPayment = ({ darkMode }) => {
  const [balanceFlux, setBalanceFlux] = useState(0);
  const [fluxAddress, setFluxAddress] = useState("");
  const [akashAddress, setAkashAddress] = useState("");
  const [balanceAkash, setBalanceAkash] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const fluxAddress = localStorage.getItem("fluxAddress");
      const akashAddress = localStorage.getItem("akashAddress");
      if (fluxAddress) {
        setFluxAddress(fluxAddress || "");
        setAkashAddress(akashAddress || ""); 
      }
    } catch (error) {
      console.error('Error reading account from localStorage:', error);
    }
  }, []);


  // Hooks para obtener precios en tiempo real
  const { data: fluxData, loading: fluxLoading, error: fluxError } = useFluxPrice();
  const { data: akashData, loading: akashLoading, error: akashError } = useAkashPrice();
  const { balance: fluxBalance, loading: fluxBalanceLoading, error: fluxBalanceError } = useFluxBalance(fluxAddress);
  const { balance: akashBalance, loading: akashBalanceLoading, error: akashBalanceError } = useAkashBalance(akashAddress);

  


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
      return (fluxBalance * fluxData).toFixed(3);
    }
    return "0.00";
  };

  const getAkashPriceUSD = () => {
    if (akashData?.data?.price) {
      return (balanceAkash * akashData).toFixed(2);
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
        {fluxLoading && <small style={{color: '#00b174'}}>Updating price...</small>}
        {fluxError && <small style={{color: '#ff6b6b'}}>Price update failed</small>}
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
        {akashLoading && <small style={{color: '#00b174'}}>Updating price...</small>}
        {akashError && <small style={{color: '#ff6b6b'}}>Price update failed</small>}
      </div>
    </div>
  );
};

export default NextPayment;
