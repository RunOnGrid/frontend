import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer2 = () => {
  return (
    <div className="fondo-footer">
      <section className="container-footer2">
        <Image alt="" src="/logoGridVacio.svg" height={80} width={180} />
        <h2>Ready to build?</h2>
        <span>Get notified of our launch</span>
        <input placeholder="Email:" />
        <button>Get early access</button>
        <div className="redes-footer2">
          <a href="//www.linkedin.com">
            <img
              style={{ marginLeft: "0px" }}
              className="icon-redes"
              src={"/linkedin.png"}
            />
          </a>

          <a href="//www.discord.com">
            <img className="icon-redes" src={"/discord (1).png"} />
          </a>

          <a href="//www.twitter.com">
            <img className="icon-redes" src={"/twitter-sign.png"} />
          </a>
          <a href="//www.instragram.com">
            <img className="icon-redes" src={"/instagram.png"} />
          </a>
        </div>
      </section>
    </div>
  );
};

export default Footer2;
