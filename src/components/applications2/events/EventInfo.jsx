import Image from "next/image";
import React from "react";

const EventInfo = ({ darkMode, icon, title, info, date }) => {
  return (
    <div className="event-single">
      <Image alt="" src={icon} height={20} width={20} />
      <div className="event-texts">
        <h3>{title}</h3>
        <span style={{ marginBottom: "10px" }}>{info}</span>
        <span>{date}</span>
      </div>
    </div>
  );
};

export default EventInfo;
