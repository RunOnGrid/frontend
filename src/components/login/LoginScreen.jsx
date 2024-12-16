import React, { useState } from "react";
import TrianglesLeft from "../landing-AsicHosting/TrianglesLeft";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { TokenService } from "../../../tokenHandler";
import SharedPopUp from "../SharedPopUp";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login-proxy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        // Store encrypted tokens
        TokenService.setTokens({
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
          expiresAt: Date.now() + data.expires_in * 1000,
          refreshExpiresAt: Date.now() + data.refresh_expires_in * 1000,
          usernameGrid: email,
        });
        localStorage.setItem("grid_email", email);

        router.push("/profile");
      } else {
        // Handle login error
        const errorData = await response.json();
        setError("Invalid Credentials!");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login");
    }
  };

  return (
    <div className="banner-container2">
      <TrianglesLeft />
      <div className="new-login">
        <Link className="logo-link" href="/">
          <img src="/LogoAlpha.svg" alt="Logo" />
        </Link>

        <h2>Welcome back!</h2>
        <span>Please Sign in with your personal info</span>
        {/* <div className="botonera-login">
          <button className="google-signIn">
            <Image alt="" src="/googleLogo.png" width={20} height={20} />
            Sign In with Google
          </button>
          <button className="google-signIn">
            <Image alt="" src="/githubLogo.svg" width={20} height={20} />
            Sign In with Github
          </button>
        </div> */}
        {error ? <h4 className="error-message-login"> {error}</h4> : ""}
        <form onSubmit={handleLogin} className="inputs-login">
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </form>
        {/* <p className="forgot-pass">Forgot password?</p> */}

        <button onClick={handleLogin}>Sign In</button>
        <p>
          New user?{" "}
          <Link href="/register">
            <strong> Sign Up</strong>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
