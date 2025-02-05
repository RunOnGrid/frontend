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
    const encryptedTokens = localStorage.getItem("auth_tokens");
    if (!encryptedTokens) return { redirectToLogin: true };

    try {
      const bytes = CryptoJS.AES.decrypt(encryptedTokens, SECRET_KEY);
      const decryptedTokens = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      console.log(decryptedTokens);
      const isAccessTokenExpired = decryptedTokens.expiresAt < Date.now();
      const isRefreshTokenExpired =
        decryptedTokens.refreshExpiresAt < Date.now();

      if (isAccessTokenExpired) {
        return { tokens: null, redirectToLogin: true };
      }

      return { tokens: decryptedTokens, redirectToLogin: false };
    } catch (error) {
      console.error("Token decryption failed", error);
      return { tokens: null, redirectToLogin: true };
    }
  },

  clearTokens() {
    localStorage.removeItem("auth_tokens");
    localStorage.removeItem("grid_email");
  },

  isAuthenticated() {
    const tokens = this.getTokens();
    return !!tokens && tokens.expiresAt > Date.now();
  },

  async refreshTokens() {
    const tokens = this.getTokens();

    const refreshToken = tokens.refreshToken;
    try {
      const response = await fetch("/api/refresh-proxy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        this.clearTokens();
        return null;
      }

      const newTokens = await response.json();

      const tokenData = {
        accessToken: newTokens.access_token,
        refreshToken: newTokens.refresh_token,
        expiresAt: Date.now() + newTokens.expires_in * 1000,
        refreshExpiresAt: Date.now() + newTokens.refresh_expires_in * 1000,
      };

      this.setTokens(tokenData);
      return tokenData;
    } catch (error) {
      console.error("Token refresh failed", error);
      this.clearTokens();
      return null;
    }
  },
};
