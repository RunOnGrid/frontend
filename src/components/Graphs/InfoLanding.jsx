import Image from 'next/image';
import React, { useEffect } from 'react';

const InfoLanding = () => {
  useEffect(() => {
    const handleScroll = () => {
      const leftCard = document.querySelector(".scroll2-in-left");
      const rightCard = document.querySelector(".scroll2-in-right");
      const triggerBottom = (window.innerHeight / 5) * 4;

      if (leftCard && leftCard.getBoundingClientRect().top < triggerBottom) {
        leftCard.classList.add("visible");
      }

      if (rightCard && rightCard.getBoundingClientRect().top < triggerBottom) {
        rightCard.classList.add("visible");
      }
    };

    window.addEventListener("scroll", handleScroll);
  
    // Cleanup event listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div className="graphs-landing">
      <div className="scroll2-in-left" style={{ display: "flex" }}>
        <div>
          <h1>Seamlessly transition from any cloud provider</h1>
        </div>
        <span>
          Decentralized infrastructures use containers, allowing for seamless
          transitions from any cloud provider.
        </span>
      </div>
      <div className="scroll2-in-right" style={{ display: "flex" }}>
        <span>
          Connect your GitHub repository to Grid and use our Buildpacks solution
          to deploy your applications with ease. Our automated process takes
          care of the build, deployment, and scaling, so you can focus
          on writing code.
        </span>
        <div>
          <h2>From code to deployment in minutes</h2>
        </div>
      </div>
      <div className="logos-landing">
        <Image
          alt=""
          src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/4b703d3a-9c54-4639-dd70-b46c544e7f00/public"
          height={70}
          width={170}
        />
        <Image
          alt=""
          src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/e929561a-7618-4e11-9b34-4662c399de00/public"
          height={70}
          width={80}
        />
        <Image
          alt=""
          src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/3c3700bf-6c3e-4b90-9029-a5dff93fff00/public"
          height={70}
          width={150}
        />
        <Image
          alt=""
          src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/e1fd7391-46c2-429a-1e39-fecd94eb7e00/public"
          height={70}
          width={180}
        />
        <Image
          alt=""
          src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/21cd7431-b97f-4b26-6752-cd62a2c63800/public"
          height={70}
          width={160}
        />
      </div>
    </div>
  );
};

export default InfoLanding;
