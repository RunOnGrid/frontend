import Image from "next/image";
import React from "react";
import CountUp from "react-countup";

const DeployOption2 = ({ image, title, text, className, data, nodes }) => {
  return (
    <div className={`deploy-option ${className}`}>
      <div className="info-deploy-option">
        <img alt="" src={image} width={220} height={150} />
        <h2>{title}</h2>
        <span>{text}</span>
      </div>
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="deploy-numbers">
            <div className="deploy-data">
              <h4>Total Providers</h4>
              <p className="countup-large">
                <CountUp
                  start={0}
                  end={Math.floor(nodes)}
                  duration={2.5}
                  style={{ fontSize: "20px" }}
                />
              </p>
            </div>

            <div className="deploy-data">
              <h4>Total RAM</h4>
              <p className="countup-large">
                <CountUp
                  style={{ fontSize: "20px" }}
                  start={0}
                  end={data.totalRam}
                  duration={2.5}
                  suffix=" TB"
                />
              </p>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="deploy-data">
            <h4>Total CPU</h4>
            <p className="countup-large">
              <CountUp
                style={{ fontSize: "20px" }}
                start={0}
                end={data.totalStorage}
                duration={2.5}
                suffix=" K"
              />
            </p>
          </div>
          <div className="deploy-data">
            <h4>Total Storage</h4>
            <p className="countup-large">
              <CountUp
                style={{ fontSize: "20px" }}
                start={0}
                end={Math.floor(data.totalSsd)}
                duration={2.5}
                suffix=" TB"
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeployOption2;