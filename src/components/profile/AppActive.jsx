import Image from "next/image";
import React from "react";

const AppActive = ({ title, type, state, date, mode }) => {
  const getStateClass = (state) => {
    switch (state.toLowerCase()) {
      case "active":
        return "active";
      case "inactive":
        return "inactive";
      case "renew":
        return "renew";
      default:
        return "";
    }
  };
  return (
    <div className={`appActive-container ${mode ? "dark" : "light"}`}>
      <div className="app-titles">
        <h3>{title}</h3>
        <div className="appActive-state">
          <div className="circle3"></div>
          <span>ACTIVE</span>
        </div>
        {/* <button className={getStateClass(state)}>{state}</button> */}
      </div>
      <span>{type}</span>
      <div className="team-date">
        <div className="app-members">
          <div className="member-image-back">
            <Image
              className="member-image"
              alt=""
              src="/memberDark.svg"
              width={40}
              height={40}
            />
          </div>
          <div className="member-image-back">
            <Image
              className="member-image"
              alt=""
              src="/memberDark.svg"
              width={40}
              height={40}
            />
          </div>
          <div className="member-image-back">
            <Image
              className="member-image"
              alt=""
              src="/memberDark.svg"
              width={40}
              height={40}
            />
          </div>
        </div>
        <div className="calendar-app">
          <Image alt="" src="/calendar.png" height={15} width={15} />
          <div className="app-date">
            <p>RENEWAL DATE</p>
            <p>{date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppActive;
