import React, { useEffect, useState } from "react";

import TrianglesLeft from "../landing-AsicHosting/TrianglesLeft";
import Link from "next/link";
import Image from "next/image";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);
  const [successfull, setSuccessfull] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const togglePasswordVisibility2 = () => {
    setPasswordVisible2(!passwordVisible2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await fetch("/api/register-proxy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password }),
      });
      if (response.ok) {
        setSuccessfull(true);
      } else if (response.status === 409) {
        setError("Email already in use");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
    if (password && value && password !== value) {
      setError("Passwords do not match");
    } else {
      setError(""); // This will clear the error when passwords match
    }
  };

  useEffect(() => {
    if (error) {
      setError("");
    }
  }, [email]);

  return (
    <div className="banner-container2">
      <TrianglesLeft />
      <div className="new-login">
        <Link className="logo-link" href="/">
          <Image
            height={100}
            width={180}
            src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/ca632650-5de1-46bd-88f4-03c847c04200/public"
            alt="Logo"
          />
        </Link>

        <h2>Welcome!</h2>
        {successfull ? (
          <>
            <span> We sent you an email to verify your account.</span>
            <p>
              Already verified?{" "}
              <Link href="/login">
                <strong> Sign In</strong>
              </Link>
            </p>
          </>
        ) : (
          <>
            <span>Please Sign up with your personal info</span>
            <form className="inputs-login" onSubmit={handleSubmit}>
              <div className="input-container">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-container">
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="toggle-password"
                  onClick={togglePasswordVisibility}
                  role="button"
                  aria-label="Toggle password visibility"
                >
                  {passwordVisible ? (
                    <Image
                      alt=""
                      src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/2ff58a68-5bbb-4ba7-e05c-7bb534706f00/public"
                      height={22}
                      width={22}
                    />
                  ) : (
                    <Image
                      alt=""
                      src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/04434c02-6512-43fe-bcbe-fdfc75c6e700/public"
                      height={22}
                      width={22}
                    />
                  )}
                </span>
              </div>
              <div className="input-container">
                <input
                  type={passwordVisible2 ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                />
                <span
                  className="toggle-password"
                  onClick={togglePasswordVisibility2}
                  role="button"
                  aria-label="Toggle password visibility"
                >
                  {passwordVisible2 ? (
                    <Image
                      alt=""
                      src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/2ff58a68-5bbb-4ba7-e05c-7bb534706f00/public"
                      height={22}
                      width={22}
                    />
                  ) : (
                    <Image
                      alt=""
                      src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/04434c02-6512-43fe-bcbe-fdfc75c6e700/public"
                      height={22}
                      width={22}
                    />
                  )}
                </span>
              </div>
              {error && <p className="error-message">{error}</p>}
              <button type="submit" disabled={error}>
                Sign Up
              </button>
            </form>
            <p>
              Already have an account?{" "}
              <Link href="/login">
                <strong> Sign In</strong>
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default RegisterScreen;
