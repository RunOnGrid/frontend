import React, { useState, useEffect } from "react";
import TrianglesLeft from "../landing-AsicHosting/TrianglesLeft";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

const VerifyScreen = () => {
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
      const { success: urlToken } = router.query;
      if (urlToken == "true") {
        setSuccessMessage("Your acount was verified");
      } else {
        setError("Failed to verify your account");
      }
    }
  }, [router.isReady, router.query]);

  return (
    <div>
      <div className={`banner-container2 ${showForgot ? "blureado" : ""}`}>
        <TrianglesLeft />
        <div className="verify-container">
          <Link className="logo-link" href="/">
            <Image
              height={90}
              width={160}
              src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/d4e80dd3-61e5-4b44-2495-c2594875dc00/public"
              alt="Logo"
            />
          </Link>
          {successMessage && <h2>{successMessage}</h2>}

          {error && <h4 className="error-message-login">{error}</h4>}
          <Link href="/login">
            <button className="verify-btn">Sign In</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyScreen;