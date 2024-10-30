import React from "react";
import TrianglesLeft from "../landing-AsicHosting/TrianglesLeft";
import Image from "next/image";
import Link from "next/link";

const RegisterScreen = () => {
  return (
    <div className="banner-container2">
      <TrianglesLeft />
      <div className="new-login">
        <Link className="logo-link" href="/">
          <img src="/logoLanding.svg" />
        </Link>

        <h2>Welcome!</h2>
        <span>Please Sign up with your personal info</span>
        <div className="botonera-login">
          <button className="google-signIn">
            {" "}
            <Image alt="" src="/googleLogo.png" width={20} height={20} />
            Sign Up with Google
          </button>
          <button className="google-signIn">
            {" "}
            <Image alt="" src="/githubLogo.svg" width={20} height={20} /> Sign
            Up with Github
          </button>
        </div>
        <div className="inputs-login">
          <input placeholder="Email" />
          <input type="password" placeholder="Password" />
        </div>

        <Link className="logo-link2" href="/profile">
          <button>Sign Up</button>
        </Link>
        <p>
          Already have an account?{" "}
          <Link href="/login">
            <strong> Sign In</strong>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterScreen;
