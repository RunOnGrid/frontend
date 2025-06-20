import React, { useState, useEffect } from "react";
import TrianglesLeft from "../landing-AsicHosting/TrianglesLeft";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

const ResetScreen = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();

  // Extraer el token de la URL cuando el componente se monta
  useEffect(() => {
    // Verificar que router.query esté disponible
    if (router.isReady) {
      const { token: urlToken } = router.query;
      if (urlToken) {
        setToken(urlToken);
      } else {
        setError("Token not found on URL");
      }
    }
  }, [router.isReady, router.query]);

  const validatePasswords = () => {
    if (password !== passwordConfirm) {
      setPasswordMatchError("Passwords don't match");
      return false;
    }
    setPasswordMatchError("");
    return true;
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Verificar que las contraseñas coincidan
    if (!validatePasswords()) {
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/reset-proxy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          newPassword: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage("Password reset succesfull!");
        // Esperar 2 segundos antes de redirigir
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        const errorData = await response.json();
        setError("Expired or Invalid Token");
      }
    } catch (error) {
      console.error("Password Reset error:", error);
      setError("An error ocurred during password reset");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className={`banner-container2 ${showForgot ? "blureado" : ""}`}>
        <TrianglesLeft />
        <div className="new-login">
          <Link className="logo-link" href="/">
            <Image
              height={90}
              width={160}
              src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/d4e80dd3-61e5-4b44-2495-c2594875dc00/public"
              alt="Logo"
            />
          </Link>
          <h2 style={{ marginBottom: "50px" }}>Password Reset</h2>

          {error && <h4 className="error-message-login">{error}</h4>}
          {passwordMatchError && (
            <h4 className="error-message-login">{passwordMatchError}</h4>
          )}
          {successMessage && <h4 className="pw-success">{successMessage}</h4>}
          <form onSubmit={handleResetPassword} className="inputs-login">
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading || !token}>
              {isLoading ? "Loading..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetScreen;