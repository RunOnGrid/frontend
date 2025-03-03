import React, { useEffect, useState } from "react";
import TrianglesLeft from "../landing-AsicHosting/TrianglesLeft";
import Link from "next/link";
import { useRouter } from "next/router";
import { TokenService } from "../../../tokenHandler";
import Image from "next/image";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const decodeJWT = (token) => {
    try {
      // El token tiene 3 partes: header.payload.signature
      // Nos interesa el payload que está en la posición 1
      const base64Payload = token.split(".")[1];
      // Decodificar Base64Url a texto
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
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link href={"https://backend-dev.ongrid.run/oauth/google"}>
            <button className="google-signIn">
              {" "}
              <Image alt="" src="/googleLogo.png" width={25} height={25} />
            </button>
          </Link>
          {/* <Link href={"https://backend-dev.ongrid.run/oauth/github"}>
            <button className="google-signIn">
              {" "}
              <Image alt="" src="/githubLogo.svg" width={25} height={25} />
            </button>
          </Link> */}
        </div>
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
