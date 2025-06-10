import { useTheme } from "@/ThemeContext";
import Image from "next/image";
import Link from "next/link";

import WebToggle from "./WebToggle";
import { useState } from "react";
import ThemeToggle from "../ThemeToggle";
import { useRouter } from "next/router";
import authService from "../../../authService";

export default function LoginForm() {
  const [web3, setWeb3] = useState(false);
  const toggleWeb3 = () => {
    setWeb3(!web3);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const result = await authService.login(username, password);

    if (result.success) {
      router.push("/profile");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="login">
      <Link href="/">
        <Image
          alt=""
          src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/d110d6d5-ff8e-4cf9-a8ba-dc60d6d30400/public"
          height={100}
          width={100}
        />
      </Link>
      <div className="form-container">
        <div className="login-container">
          <div className="dashboard-header2">
            <h2>Login</h2>
            <WebToggle onChange={toggleWeb3} web3={web3} />
          </div>
          <div className="login-options">
            <button className="login-option">
              <Image
                alt=""
                src={
                  web3
                    ? "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/06fbe790-e881-4f9c-0567-cdf1a59a8d00/public"
                    : "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/d472f998-71f5-4f4a-b9c4-63cd2708f400/public"
                }
                height={20}
                width={20}
              />
              <span className="login-option-text">
                {" "}
                {web3 ? "Continue with Metamask" : "Continue with GitHub"}
              </span>
              <span className="login-option-arrow">→</span>
            </button>
            <button className="login-option">
              <Image
                alt=""
                src={
                  web3
                    ? "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/8d1c7f71-bf2e-4ebc-6750-c4c69fcbfa00/public"
                    : "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/30716878-0067-4bcd-2bf6-40a811b19400/public"
                }
                height={20}
                width={20}
              />
              <span className="login-option-text">
                {web3 ? "Continue with Phantom" : "Continue with GitLab"}
              </span>
              <span className="login-option-arrow">→</span>
            </button>
            <button className="login-option">
              <Image
                alt=""
                src={
                  web3
                    ? "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/89ed3f51-15e9-40e8-5388-0c9691c88b00/public"
                    : "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/12ca8d8f-272b-4c06-e090-6ff39da4e800/public"
                }
                height={20}
                width={20}
              />
              <span className="login-option-text">
                {web3 ? "Continue with Zelcore" : "Continue with Google"}
              </span>
              <span className="login-option-arrow">→</span>
            </button>
            {web3 ? (
              <button className="login-option">
                <Image
                  alt=""
                  src={
                    web3
                      ? "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/90d9f0ff-2610-4688-af9f-3a9fd4bbaa00/public"
                      : ""
                  }
                  height={20}
                  width={20}
                />
                <span className="login-option-text">Continue with Keplr</span>
                <span className="login-option-arrow">→</span>
              </button>
            ) : (
              ""
            )}
          </div>
          <div className="login-divider">
            <span className="login-divider-text">OR</span>
          </div>
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              className="login-input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="login-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="login-submit" type="submit">
              Sign In
            </button>
          </form>
        </div>
        <p className="login-signup">
          Don&apos;t have an account?{" "}
          <a className="login-signup-link" href="#">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
