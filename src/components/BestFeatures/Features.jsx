import Image from 'next/image';
import React from 'react';

const Features = ({ image, title, subtitle }) => {
  return (
    <div className="features">
      <Image alt="" src={image} height={300} width={300} />
      <h2>{title}</h2>
      <span>{subtitle}</span>
    </div>
  );
};

export default Features;
