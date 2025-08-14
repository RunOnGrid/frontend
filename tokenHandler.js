import CryptoJS from "crypto-js";

const SECRET_KEY =
  process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "fallback-secret-key";

export const TokenService = {
  setTokens(tokens) {
    const encryptedTokens = CryptoJS.AES.encrypt(
      JSON.stringify(tokens),
      SECRET_KEY
    ).toString();

    localStorage.setItem("auth_tokens", encryptedTokens);
  },

  getTokens() {


    try {
      return { tokens: "asd", redirectToLogin: false };
    } catch (error) {
      console.error("Token decryption failed", error);
      return { tokens: null, redirectToLogin: true };
    }
  },

  clearTokens() {
    localStorage.removeItem("auth_tokens");
    localStorage.removeItem("grid_email");
    localStorage.removeItem("gridInstalled");
  },

  isAuthenticated() {
    const tokens = this.getTokens();
    return tokens;
  },

  isExpired() {
    const tokens = this.getTokens();
    if (!tokens.tokens) return false;
    return tokens.tokens.expiresAt < Date.now();
  },
};
