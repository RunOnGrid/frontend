import React, { useState } from 'react';
import Guarantee from '../../commons/Guarantee';
import { useInView } from 'react-intersection-observer';

const Faqs = () => {
  const [ref5, inView5] = useInView({
    triggerOnce: true, // Animation triggers only once
    threshold: 0.5, // Percentage of element visibility to trigger the animation
  });
  const fadeInStylesLeft = {
    opacity: 1,
    transform: 'translateX(280px)',
    transition: 'opacity 2s ease-in-out, transform 2s ease-in-out',
  };
  const [ref, inView] = useInView({
    triggerOnce: true, // Animation triggers only once
    threshold: 0.8, // Percentage of element visibility to trigger the animation
  });
  const fadeInStylesRight = {
    opacity: 1,
    transform: 'translateX(-80px)',
    transition: 'opacity 2s ease-in-out, transform 2s ease-in-out',
  };

  const [selected, setSelected] = useState(null);

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };

  return (
    <>
      <div className="faqs-titulo"> FAQs</div>
      <div className="faqs-subtitulo"> Most frecuently asked questions</div>
      <section className="faqs-container">
        <div
          ref={ref5}
          style={inView5 ? fadeInStylesLeft : {}}
          className="accordion">
          {data.map((item, i) => (
            <div key={i} className={selected === i ? 'item show' : 'item'}>
              <div
                className={selected === i ? 'title show' : 'title'}
                onClick={() => toggle(i)}>
                <h2> {item.question}</h2>
                <span>{selected === i ? '▲' : '▼'}</span>
              </div>
              <div className={selected === i ? 'content show' : 'content'}>
                {item.answer}
              </div>
            </div>
          ))}
        </div>

        <div
          ref={ref}
          style={inView ? fadeInStylesRight : {}}
          className="guarantee">
          <Guarantee />
        </div>
      </section>
    </>
  );
};

const data = [
  {
    question: 'What is a decentralized cloud?',
    answer:
      'A decentralized cloud is a cloud computing model that distributes data processing across multiple nodes worldwide, instead of relying on a centralized data center. This model provides better availability and redundancy, ensuring applications and data remain functional even if a node fails. Additionally, the decentralized cloud offers greater privacy and data security, as users can retain control of their own data.    ',
  },
  {
    question:
      ' In what region can I host my application on a  decentralized cloud?',
    answer:
      'Flux Geolocation allows you to choose the specific region where you want to host your application or server, ensuring the best possible performance for your users. By utilizing the power of decentralized computing, we offer greater scalability and flexibility than traditional cloud hosting services. You can select a hosting region close to your users to minimize latency and improve loading speeds. With Flux Geolocation, you can quickly adjust your server resources according to user demand.',
  },
  {
    question:
      'What security measures do I have when hosting on a decentralized cloud? ',
    answer:
      'In a decentralized cloud, we use advanced security measures such as firewalls, data encryption, and applications. By distributing your data across multiple nodes, it is harder for attackers to access and compromise the entire system. Additionally, in the event of an attack, we can isolate and address the problem in a specific node rather than affecting the entire system, increasing the security of the service.',
  },
  {
    question: 'Why choose our service over traditional cloud hosting?',
    answer:
      ' Our decentralized cloud hosting service based on runonflux offers significant advantages compared to traditional cloud hosting services. We use decentralized computing power to increase availability and redundancy, meaning that your website or application will continue to function even if a node fails. Additionally, we offer greater scalability and flexibility than traditional cloud hosting services, and our prices are more competitive and transparent. In summary, our decentralized cloud hosting service offers a more secure, scalable, cost-effective, and transparent solution than traditional cloud hosting services.',
  },
];

export default Faqs;
