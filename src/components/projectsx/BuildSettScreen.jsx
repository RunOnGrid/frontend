import Image from 'next/image';
import React from 'react';

const BuildSettScreen = () => {
  return (
    <div>
      <div className="notification-screen">
        <h3>Build Settings</h3>

        <div className="input-builds">
          <label> Github Repository</label>
          <input placeholder="Bautistagl/nippon" />
        </div>

        <div className="input-builds">
          <label> Github Branch</label>
          <input placeholder="main" />
        </div>

        <div className="input-builds">
          <label> Application root path:</label>
          <input placeholder="./" />
        </div>

        <button className="buildButton">Configure buildpack settings</button>
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

export default BuildSettScreen;
