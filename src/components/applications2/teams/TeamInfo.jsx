import Image from "next/image";
import React from "react";

const TeamInfo = ({
  darkMode,
  icon,
  name,
  user,
  role,
  status,
  email,
  team,
  number,
}) => {
  return (
    <div className="team-info">
      <input type="checkbox" />
      <img alt="" src={icon} height={40} width={40} />
      <div className="userInfo-teams">
        <h3>{name}</h3>
        <span>{user}</span>
      </div>
      <span>{role}</span>
      <div className="status2">
        {" "}
        <div className={`circle${number}`}></div>
        <span>{status}</span>
      </div>
      <span>{email}</span>

      <button className={`noti-button1 ${darkMode ? "dark" : "light"}`}>
        {team}
      </button>

      <Image
        alt=""
        src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/9de9cc42-a765-42b3-df0e-b8747163e900/public"
        height={20}
        width={20}
      />
      <Image
        alt=""
        src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/f468371e-b528-4dc2-7671-10918f0df900/public"
        height={20}
        width={20}
      />
    </div>
  );
};

export default TeamInfo;
