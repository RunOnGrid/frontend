import React, { useEffect, useState } from "react";
import TrianglesLeft from "../landing-AsicHosting/TrianglesLeft";
import Link from "next/link";
import { useRouter } from "next/router";
import { TokenService } from "../../../tokenHandler";
import Image from "next/image";
import ForgotPassword from "./ForgotForm";
import ZelcoreLogin from "./ZelcoreLogin";

const GOOGLE_SSO = process.env.NEXT_PUBLIC_GOOGLE_SSO;
const GITHUB_SSO = process.env.NEXT_PUBLIC_GITHUB_SSO;

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [error2, setError2] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [failed, setFailed] = useState("");

  const [keplrWallet, setKeplrWallet] = useState(null);
  const [userAddress, setUserAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const chainId = "akashnet-2";

  const router = useRouter();

  const decodeJWT = (token) => {
    try {
      const base64Payload = token.split(".")[1];
      const payload = JSON.parse(
        atob(base64Payload.replace(/-/g, "+").replace(/_/g, "/"))
      );
      return payload;
    } catch (error) {
      console.error("Error decodificando JWT:", error);
      return null;
    }
  };

  useEffect(() => {
    const { token, userId } = router.query;

    if (token && userId) {
      const decodedToken = decodeJWT(token);

      const userEmail = decodedToken?.email;

      const oneHourInMilliseconds = 3600000;
      TokenService.setTokens({
        accessToken: token,
        expiresAt: Date.now() + oneHourInMilliseconds,
        gridId: userId,
      });

      if (userEmail) {
        localStorage.setItem("grid_email", userEmail);
      }

      router.push("/profile");
    }
  }, [router.query, router]);

  useEffect(() => {
    const checkKeplrInstalled = async () => {
      if (window.keplr) {
        setKeplrWallet(window.keplr);
      }
    };

    checkKeplrInstalled();
  }, []);

  const handleForgot = async () => {
    setLoading(true);
    setSuccess("");
    setFailed("");
    try {
      const response = await fetch("/api/forgot-proxy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: forgotEmail,
        }),
      });

      if (!response.ok) {
        setFailed("Wrong email");
        setLoading(false);
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setLoading(false);
      setSuccess(data.message);
    } catch (err) {
      setError2(err.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/login-proxy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const oneHourInMilliseconds = 3600000;
        TokenService.setTokens({
          accessToken: data.token,
          expiresAt: Date.now() + oneHourInMilliseconds,
          gridId: data.userId,
        });
        localStorage.setItem("grid_email", email);

        router.push("/profile");
      } else {
        const errorData = await response.json();
        setError("Invalid Credentials!");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  const connectKeplrWallet = async () => {
    setError("");
    setIsLoading(true);

    try {
      if (!keplrWallet) {
        setError("Please install Keplr wallet extension");
        return;
      }

      await keplrWallet.enable(chainId);

      // Obtener la clave y dirección
      const key = await keplrWallet.getKey(chainId);
      const address = key.bech32Address;
      const pubkeyBase64 = btoa(String.fromCharCode(...key.pubKey));

      // Crear el mensaje para firmar
      const timestamp = Date.now();
      const message = `Login to Grid at ${timestamp}`;

      // Firmar el mensaje
      const signature = await keplrWallet.signArbitrary(
        chainId,
        address,
        message
      );

      // Crear el payload
      const payload = {
        address: address,
        signature: signature.signature,
        message: message,
        timestamp: timestamp,
        publicKeyBase64: pubkeyBase64,
      };

      setUserAddress(address);

      const response = await fetch("/api/keplr-proxy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        const oneHourInMilliseconds = 3600000;
        TokenService.setTokens({
          accessToken: data.authResponse.token,
          expiresAt: Date.now() + oneHourInMilliseconds,
          gridId: data.authResponse.userId,
        });
        localStorage.setItem("grid_email", data.authResponse.userId);
        router.push("/profile");
      } else {
        setError("Failed to verify wallet signature");
      }
    } catch (error) {
      console.error("Error connecting with Keplr:", error);
      setError("Error connecting with Keplr wallet");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {showForgot ? (
        <ForgotPassword
          setForgotEmail={setForgotEmail}
          setShowForgot={setShowForgot}
          handleForgot={handleForgot}
          loading={loading}
          success={success}
          setSuccess={setSuccess}
          failed={failed}
          setFailed={setFailed}
        />
      ) : (
        ""
      )}

      <div className={`banner-container2 ${showForgot ? "blureado" : ""}`}>
        <TrianglesLeft />
        <div className="new-login">
          <Link className="logo-link" href="/">
            <Image
              width={180}
              height={100}
              src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/d4e80dd3-61e5-4b44-2495-c2594875dc00/public"
              alt="Logo"
            />
          </Link>
          <h2>Welcome back!</h2>
          <span>Please Sign in with your personal info</span>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
          >
            <Link href={GOOGLE_SSO}>
              <button className="google-signIn">
                <Image
                  alt="Sign in with Google"
                  src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/12ca8d8f-272b-4c06-e090-6ff39da4e800/public"
                  width={25}
                  height={25}
                />
              </button>
            </Link>
            <Link href={GITHUB_SSO}>
              <button className="google-signIn">
                <img
                  alt="Sign in with GitHub"
                  src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/ce196ae6-b580-40c8-f971-634b6a3a2300/public"
                />
              </button>
            </Link>
            <button
              className="keplr-signIn"
              onClick={connectKeplrWallet}
              disabled={isLoading || !keplrWallet}
              title={
                !keplrWallet
                  ? "Please install Keplr wallet extension"
                  : "Sign in with Keplr wallet"
              }
            >
              <Image
                alt="Sign in with Keplr"
                src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/90d9f0ff-2610-4688-af9f-3a9fd4bbaa00/public"
                width={25}
                height={25}
              />
            </button>
            <ZelcoreLogin isLoading={isLoading} setIsLoading={setIsLoading} />
          </div>

          {error ? <h4 className="error-message-login"> {error}</h4> : null}
          {isConnected && userAddress ? (
            <div className="wallet-connected">
              <p>
                Connected wallet: {userAddress.substring(0, 8)}...
                {userAddress.substring(userAddress.length - 6)}
              </p>
            </div>
          ) : null}

          <form onSubmit={handleLogin} className="inputs-login">
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Sign In"}
            </button>
          </form>

          <p>
            New user?{" "}
            <Link href="/register">
              <strong>Sign Up</strong>
            </Link>
          </p>
          <p onClick={() => setShowForgot(true)}>
            <strong>Forgot Password?</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;

{
  /* <p className="forgot-pass">Forgot password?</p> */
}
{
  /* <div className="botonera-login">
  <button className="google-signIn">

    Sign In with Google
  </button>
  <button className="google-signIn">
    
    Sign In with Github
  </button>
</div> */
}
