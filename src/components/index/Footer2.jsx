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
              className="icon-redes2"
              src={"/linkedin.png"}
            />
          </a>

          <a href="//www.discord.com">
            <img className="icon-redes2" src={"/discord (1).png"} />
          </a>

          <a href="https://x.com/OnGridRun">
            <img className="icon-redes2" src={"/twitter.png"} />
          </a>
        </div>
      </section>
    </div>
  );
};

export default Footer2;
