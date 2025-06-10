import Image from 'next/image';
import React from 'react';

const ActivityScreen = () => {
  return (
    <div className="activity-section">
      <div className="activity-ul">
        <div className="circle2"> </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span> Feb 21 </span>
          <span> 4:35 PM </span>
        </div>
      </div>

      <div className="activity-box">
        <div className="activity-titles">
          <Image
            alt=""
            src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/88246baf-a0c8-49f3-c204-ff60d31d4500/public"
            height={15}
            width={15}
          />
          <p> Application deploy </p>
          <span>
            {" "}
            <Image
              alt=""
              src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/17bd5334-354e-4558-5dbb-f684a95e9200/public"
              height={12}
              width={12}
            />{" "}
            11s{" "}
          </span>
        </div>

        <div className="activity-status">
          <Image
            alt=""
            src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/b9e27503-9c6f-457e-77df-734b14523300/public"
            height={12}
            width={12}
          />
          <span> Deployed version 1 to 1 service </span>
          <button>
            {" "}
            <Image
              style={{ marginRight: "5px" }}
              alt=""
              src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/871b59e9-0240-423e-22a5-a2d440597a00/public"
              height={12}
              width={12}
            />{" "}
            Revert to version 1{" "}
          </button>
        </div>

        <div className="activity-details">
          <Image
            alt=""
            src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/8b8237a7-b0c7-42e0-172a-81a97ca73100/public"
            height={15}
            width={15}
          />
          <span>nippon</span>
          <Image
            alt=""
            src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/a3da36fe-c125-4f1f-aeec-a5d4f294d400/public"
            height={12}
            width={12}
          />
          <p> DEPLOYED </p>
          <button>
            {" "}
            <Image
              alt=""
              src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/47e0dab8-f5d9-498f-9ff7-77ad79150f00/public"
              height={10}
              width={10}
            />{" "}
            Logs{" "}
          </button>
          <button>
            {" "}
            <Image
              alt=""
              src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/89f83de8-efc7-426f-1959-f2aaf2d8c100/public"
              height={10}
              width={10}
            />{" "}
            Metrics{" "}
          </button>
          <button>
            {" "}
            <Image
              alt=""
              src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/63ec0f5f-dd11-42da-fa34-cac5dd010d00/public"
              height={10}
              width={10}
            />{" "}
            External Link{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityScreen;
