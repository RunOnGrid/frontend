import Image from 'next/image';
import React from 'react';

const OverviewScreen = () => {
  return (
    <div>
      <div className="notification-screen">
        <h3>Pre-deploy job</h3>

        <button className="overview-button">
          {" "}
          + Add a new Pre-Deploy job{" "}
        </button>
        <div style={{ opacity: "0" }}>.</div>
      </div>

      <div className="overview-screen">
        <h3>Application services</h3>
        <div className="overview-subtitle">
          <Image
            alt=""
            src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/8b8237a7-b0c7-42e0-172a-81a97ca73100/public"
            height={20}
            width={20}
          />
          <span> nippon</span>
          <Image
            alt=""
            src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/9e1c4c15-0514-4dda-1227-79a29b020300/public"
            height={20}
            width={20}
          />
        </div>
        <button className="overview-button"> + Add a new service </button>
        <div style={{ opacity: "0" }}>.</div>
      </div>
      <div className="save-button">
        <button>
          {" "}
          <Image
            alt=""
            src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/7e424955-6396-4975-e4b1-054cf0f70d00/public"
            height={15}
            width={15}
          />{" "}
          Save
        </button>
      </div>
    </div>
  );
};

export default OverviewScreen;
