import Image from "next/image";
import React from "react";

const TeamActive = ({ name, quantity, mode }) => {
  return (
    <div className={`teamActive-container ${mode ? "dark" : "light"}`}>
      <h3>{name}</h3>
      <div className="team-members">
        <Image
          className="member-image"
          alt=""
          src="/memberDark.svg"
          width={40}
          height={40}
        />
        <Image
          className="member-image"
          alt=""
          src="/memberDark.svg"
          width={40}
          height={40}
        />
        <Image
          className="member-image"
          alt=""
          src="/memberDark.svg"
          width={40}
          height={40}
        />
      </div>
    </div>
  );
};

export default TeamActive;
