import React, { useState } from "react";
import TrianglesLeft from "../landing-AsicHosting/TrianglesLeft";
import Link from "next/link";
import { useRouter } from "next/router";
import { TokenService } from "../../../tokenHandler";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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

  return (
    <div className="banner-container2">
      <TrianglesLeft />
      <div className="new-login">
        <Link className="logo-link" href="/">
          <img src="/LogoAlpha.svg" alt="Logo" />
        </Link>

        <h2>Welcome back!</h2>
        <span>Please Sign in with your personal info</span>
        {error ? <h4 className="error-message-login"> {error}</h4> : null}
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
    <Image alt="" src="/googleLogo.png" width={20} height={20} />
    Sign In with Google
  </button>
  <button className="google-signIn">
    <Image alt="" src="/githubLogo.svg" width={20} height={20} />
    Sign In with Github
  </button>
</div> */
}