
import secureLocalStorage from "react-secure-storage";


export const TokenService = {
  
  getKeyValues() {
    const account = localStorage.getItem("account");
    const seed = secureLocalStorage.getItem("walletSeed");
    const FluxPriv = secureLocalStorage.getItem("FluxPrivKey");
    if(seed){
      return seed
    }
    return {redirectLogin: true}
  },
  clearTokens() {
    localStorage.removeItem("account");
    secureLocalStorage.removeItem("walletSeed");
    secureLocalStorage.removeItem("FluxPrivKey");
  },

  isAuthenticated() {
    const response = this.getKeyValues();
    return response;
  },

};
