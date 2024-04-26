import Image from 'next/image';
import React, { useState } from 'react';

const NuevoFaqs = () => {
  const [selected, setSelected] = useState(0);

  return (
    <div className="contenedor-mobile-button">
      <div className="titulo-asic"> FAQS</div>
      <div style={{ marginTop: '10px' }} className="contenedor-flex-only3">
        <div className="button-landing2">
          <div className="contenedor-features2">
            <span
              onClick={() => setSelected(1)}
              className={
                selected === 1 ? 'span-landing-selected2' : 'span-landing2'
              }>
              {' '}
              What is decentralized cloud?{' '}
            </span>
            <div className={selected === 1 ? 'linea-selected' : 'linea'}> </div>
          </div>

          <div className="contenedor-features2">
            <span
              onClick={() => setSelected(2)}
              className={
                selected === 2 ? 'span-landing-selected2' : 'span-landing2'
              }>
              {' '}
              In what region can I host my application on a decentralized cloud?{' '}
            </span>
            <div className={selected === 2 ? 'linea-selected' : 'linea'}> </div>
          </div>

          <div className="contenedor-features2">
            <span
              onClick={() => setSelected(3)}
              className={
                selected === 3 ? 'span-landing-selected2' : 'span-landing2'
              }>
              {' '}
              What security measures do I have when hosting on a decentralized
              cloud?{' '}
            </span>
            <div className={selected === 3 ? 'linea-selected' : 'linea'}> </div>
          </div>

          <div className="contenedor-features2">
            <span
              onClick={() => setSelected(4)}
              className={
                selected === 4 ? 'span-landing-selected2' : 'span-landing2'
              }>
              {' '}
              Why choose our service over traditional cloud hosting?{' '}
            </span>
            <div className={selected === 4 ? 'linea-selected' : 'linea'}> </div>
          </div>
        </div>

        {selected === 0 ? (
          <div className="parrafo-features-landing2">
            <Image alt="" src="/iluFaqs.svg" height={300} width={300} />
          </div>
        ) : (
          ''
        )}

        {selected === 1 ? (
          <div className="parrafo-features-landing">
            A decentralized cloud is a cloud computing model that distributes
            data processing across multiple nodes worldwide, instead of relying
            on a centralized data center. This model provides better
            availability and redundancy, ensuring applications and data remain
            functional even if a node fails. Additionally, the decentralized
            cloud offers greater privacy and data security, as users can retain
            control of their own data.
            <Image alt="" src="/iluDes.svg" height={300} width={300} />
          </div>
        ) : (
          ''
        )}
        {selected === 2 ? (
          <div className="parrafo-features-landing">
            Flux Geolocation allows you to choose the specific region where you
            want to host your application or server, ensuring the best possible
            performance for your users. By utilizing the power of decentralized
            computing, we offer greater scalability and flexibility than
            traditional cloud hosting services. You can select a hosting region
            close to your users to minimize latency and improve loading speeds.
            With Flux Geolocation, you can quickly adjust your server resources
            according to user demand.
            <Image alt="" src="/iluGeo.svg" height={300} width={300} />
          </div>
        ) : (
          ''
        )}
        {selected === 3 ? (
          <div className="parrafo-features-landing">
            In a decentralized cloud, we use advanced security measures such as
            firewalls, data encryption, and applications. By distributing your
            data across multiple nodes, it is harder for attackers to access and
            compromise the entire system. Additionally, in the event of an
            attack, we can isolate and address the problem in a specific node
            rather than affecting the entire system, increasing the security of
            the service.
            <Image alt="" src="/iluWhy.svg" height={300} width={300} />
          </div>
        ) : (
          ''
        )}

        {selected === 4 ? (
          <div className="parrafo-features-landing">
            Our decentralized cloud hosting service based on runonflux offers
            significant advantages compared to traditional cloud hosting
            services. We use decentralized computing power to increase
            availability and redundancy, meaning that your website or
            application will continue to function even if a node fails.
            Additionally, we offer greater scalability and flexibility than
            traditional cloud hosting services, and our prices are more
            competitive and transparent. In summary, our decentralized cloud
            hosting service offers a more secure, scalable, cost-effective, and
            transparent solution than traditional cloud hosting services.
            <Image alt="" src="/iluSec.svg" height={300} width={300} />
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default NuevoFaqs;
