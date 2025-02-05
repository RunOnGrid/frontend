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
        <Image alt="" src="/logoGridVacio.svg" height={100} width={100} />
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
                src={web3 ? "/metamask.svg" : "/githubLogin.png"}
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
                src={web3 ? "/phantomLogo.jpg" : "/gitlab.jpg"}
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
                src={web3 ? "/zelID.svg" : "/googleLogo.png"}
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
                  src={web3 ? "/keplr.png" : ""}
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
