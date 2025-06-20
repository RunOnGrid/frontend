import Image from 'next/image';
import React from 'react';

const LogsScreen = () => {
  return (
    <div className="logs-screen">
      <div className="titulos-logs">
        <div style={{ marginRight: "auto" }}>
          <div className="input-with-image">
            <Image
              alt=""
              src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/eab8879c-92f3-4df6-a9b7-0235e4516e00/public"
              height={10}
              width={10}
            />
            <input placeholder="Search logs..." />
          </div>
        </div>
        <div>
          <button>
            <Image
              alt=""
              src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/38d4e65e-56a4-4c26-62c3-e550be274400/public"
              height={12}
              width={12}
            />{" "}
            Filter{" "}
          </button>
          <button>
            <Image
              alt=""
              src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/9e1c4c15-0514-4dda-1227-79a29b020300/public"
              height={12}
              width={12}
            />{" "}
            Scroll to bottom{" "}
          </button>
          <button>
            <Image
              alt=""
              src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/196fd422-82ee-43d6-11b7-b332190cd900/public"
              height={12}
              width={12}
            />{" "}
            Refresh{" "}
          </button>
        </div>
      </div>

      <div className="logs-container">
        <div className="single-log">
          <span className="log-date"> 02/21 16:35:15 </span>
          <span className="log-name"> nippon </span>
          <span className="log-version"> Version: 1 </span>
          <span className="log-text"> ------------------------- </span>
        </div>

        <div className="single-log">
          <span className="log-date"> 02/21 16:35:15 </span>
          <span className="log-name"> nippon </span>
          <span className="log-version"> Version: 1 </span>
          <span className="log-text"> Greetings from grid cloud </span>
        </div>

        <div className="single-log">
          <span className="log-date"> 02/21 16:35:15 </span>
          <span className="log-name"> nippon </span>
          <span className="log-version"> Version: 1 </span>
          <span className="log-text"> ------------------------- </span>
        </div>

        <div className="single-log">
          <span className="log-date"> 02/21 16:35:15 </span>
          <span className="log-name"> nippon </span>
          <span className="log-version"> Version: 1 </span>
          <span className="log-text"> ------------------------- </span>
        </div>

        <div className="single-log">
          <span className="log-date"> 02/21 16:35:15 </span>
          <span className="log-name"> nippon </span>
          <span className="log-version"> Version: 1 </span>
          <span className="log-text">
            {" "}
            Your application is currently being built and will be ready soon.{" "}
          </span>
        </div>

        <div className="single-log">
          <span className="log-date"> 02/21 16:35:15 </span>
          <span className="log-name"> nippon </span>
          <span className="log-version"> Version: 1 </span>
          <span className="log-text">
            {" "}
            This page will disappear once your application is live.{" "}
          </span>
        </div>

        <div className="single-log">
          <span className="log-date"> 02/21 16:35:15 </span>
          <span className="log-name"> nippon </span>
          <span className="log-version"> Version: 1 </span>
          <span className="log-text">
            {" "}
            To view build logs, navigate to your connected GitHub repo and selet
            the Actions tab.{" "}
          </span>
        </div>
        <div className="single-log">
          <span className="log-date"> 02/21 16:35:15 </span>
          <span className="log-name"> nippon </span>
          <span className="log-version"> Version: 1 </span>
          <span className="log-text"> ------------------------- </span>
        </div>
        <div className="single-log">
          <span className="log-date"> 02/21 16:35:15 </span>
          <span className="log-name"> nippon </span>
          <span className="log-version"> Version: 1 </span>
          <span className="log-text"> ------------------------- </span>
        </div>
      </div>
    </div>
  );
};

export default LogsScreen;
