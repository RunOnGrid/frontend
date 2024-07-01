import Image from 'next/image';
import React from 'react';

const TeamActive = ({ name, quantity, mode }) => {
  return (
    <div className={`teamActive-container ${mode ? 'dark' : 'light'}`}>
      <h3>{name}</h3>
      <div className="team-members">
        <Image
          className="member-image"
          alt=""
          src="/userDark.png"
          width={25}
          height={25}
        />
        <Image
          className="member-image"
          alt=""
          src="/userDark.png"
          width={25}
          height={25}
        />
        <Image
          className="member-image"
          alt=""
          src="/userDark.png"
          width={25}
          height={25}
        />
      </div>
    </div>
  );
};

export default TeamActive;
