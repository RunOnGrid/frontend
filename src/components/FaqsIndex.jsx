import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';

const FaqsIndex = () => {
  const [ref, inView] = useInView({
    triggerOnce: true, // Animation triggers only once
    threshold: 0.7, // Percentage of element visibility to trigger the animation
  });
  const fadeInStylesLeft = {
    opacity: 1,
    transform: 'translateX(12.5%)',
    transition: 'opacity 1s ease-in-out, transform 1s ease-in-out',
  };

  const [faq, setFaq] = useState(false);
  const [faq1, setFaq1] = useState(false);
  const [faq2, setFaq2] = useState(false);
  const [faq3, setFaq3] = useState(false);

  const handlerFaqs = () => {
    setFaq(!faq);
    setFaq1(false);
    setFaq2(false);
    setFaq3(false);
  };

  const handlerFaqs1 = () => {
    setFaq(false);
    setFaq1(!faq1);
    setFaq2(false);
    setFaq3(false);
  };

  const handlerFaqs2 = () => {
    setFaq(false);
    setFaq1(false);
    setFaq2(!faq2);
    setFaq3(false);
  };

  const handlerFaqs3 = () => {
    setFaq(false);
    setFaq1(false);
    setFaq2(false);
    setFaq3(!faq3);
  };

  return (
    <div className="flex">
      <div className="faqs-grid">
        <div className="contenedor-borde">
          <h1
            className={faq ? 'faqs-select' : 'faqs-normal'}
            onClick={handlerFaqs}>
            {' '}
            What is decentralized cloud?
          </h1>

          <div className={faq ? 'respuesta-shown' : 'respuesta'}>
            A decentralized cloud is a cloud computing model that distributes
            data processing across multiple nodes worldwide, instead of relying
            on a centralized data center. This model provides better
            availability and redundancy, ensuring applications and data remain
            functional even if a node fails. Additionally, the decentralized
            cloud offers greater privacy and data security, as users can retain
            control of their own data.
          </div>
        </div>
        <div className="contenedor-borde">
          <h1
            className={faq1 ? 'faqs-select' : 'faqs-normal'}
            onClick={handlerFaqs1}>
            {' '}
            In what region can I host my application on a decentralized cloud?
          </h1>

          <div className={faq1 ? 'respuesta-shown' : 'respuesta'}>
            Flux Geolocation allows you to choose the specific region where you
            want to host your application or server, ensuring the best possible
            performance for your users. By utilizing the power of decentralized
            computing, we offer greater scalability and flexibility than
            traditional cloud hosting services. You can select a hosting region
            close to your users to minimize latency and improve loading speeds.
            With Flux Geolocation, you can quickly adjust your server resources
            according to user demand.
          </div>
        </div>

        <div className="contenedor-borde">
          <h1
            className={faq2 ? 'faqs-select' : 'faqs-normal'}
            onClick={handlerFaqs2}>
            {' '}
            What security measures do I have when hosting on a decentralized
            cloud?
          </h1>

          <div className={faq2 ? 'respuesta-shown' : 'respuesta'}>
            In a decentralized cloud, we use advanced security measures such as
            firewalls, data encryption, and applications. By distributing your
            data across multiple nodes, it is harder for attackers to access and
            compromise the entire system. Additionally, in the event of an
            attack, we can isolate and address the problem in a specific node
            rather than affecting the entire system, increasing the security of
            the service.
          </div>
        </div>

        <div className="contenedor-borde">
          <h1
            className={faq3 ? 'faqs-select' : 'faqs-normal'}
            onClick={handlerFaqs3}>
            {' '}
            Why choose our service over traditional cloud hosting?
          </h1>

          <div
            style={{ marginBottom: '10px' }}
            className={faq3 ? 'respuesta-shown' : 'respuesta'}>
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
          </div>
        </div>
      </div>

      <img alt="" src="faqsIlu.svg" className="faqs-ilu" />
    </div>
  );
};

export default FaqsIndex;
