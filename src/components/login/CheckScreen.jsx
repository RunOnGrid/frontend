import React from "react";
import TrianglesLeft from "../landing-AsicHosting/TrianglesLeft";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

const CheckScreen = () => {


  const router = useRouter();



  return (
    <div>
      <div className={`banner-container2 ${showForgot ? "blureado" : ""}`}>
        <TrianglesLeft />
        <div className="verify-container">
          <Link className="logo-link" href="/">
            <Image height={90} width={160} src="/grid-beta.png" alt="Logo" />
          </Link>


            <h2> Please check your mail to verify your account</h2>
          <Link href="/login">
            <button className="verify-btn">Sign In</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckScreen;