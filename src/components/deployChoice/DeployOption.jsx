import Image from 'next/image';
import React from 'react';
import CountUp from 'react-countup';

const DeployOption = ({ image, title, text, className, data, nodes }) => {
  return (
    <div className={`deploy-option ${className}`}>
      <div className="info-deploy-option">
        <Image alt="" src={image} width={220} height={150} />
        <h2>{title}</h2>
        <span>{text}</span>
      </div>
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="deploy-numbers">
            <div className="deploy-data">
              <h4>Total Nodes</h4>
              <p className="countup-large">
                <CountUp
                  start={0}
                  end={Math.floor(nodes.totalNodes)}
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
                  end={Math.floor(data.totalRam)}
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
                end={Math.floor(data.totalStorage / 1000)}
                duration={2.5}
                suffix=" K"
              />
            </p>
          </div>
          <div className="deploy-data">
            <h4>Total SSD</h4>
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
        <h5>Countries : 78</h5>
      </div>
    </div>
  );
};

export default DeployOption;
