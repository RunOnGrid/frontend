import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import dynamic from 'next/dynamic';
import Segundo from '@/components/index/Segundo';
import Powered from '@/components/index/Powered';
import ContactForm from '@/components/index/ContactForm';
import Footer from '@/components/index/Footer';
import Banner from '@/components/landing-AsicHosting/Banner';
import { useInView } from 'react-intersection-observer';
import ButtonsLanding from '@/components/ButtonsLanding';
import React, { useEffect, useRef, useState } from 'react';
import NuevoFaqs from '@/components/NuevoFaqs';
import Guarantee from '@/commons/Guarantee';
import BestFeatures from '@/components/BestFeatures/BestFeatures';
import DeployChoice from '@/components/deployChoice/DeployChoice';
import CardPrincing from '@/components/pricing/CardPrincing';
import CardPrincing2 from '@/components/pricing/Card2Pricing';
import Card3Princing from '@/components/pricing/Card3Pricing';
import GraphsLanding from '@/components/Graphs/GraphsLanding';
import InfoLanding from '@/components/Graphs/InfoLanding';
import CardPricing from '@/components/pricing/CardPrincing';
import Triangles from '@/components/landing-AsicHosting/Triangles';

const DynamicNavbar = dynamic(() => import('../components/index/Navbar'), {
  ssr: false,
  loading: () => <p> Im f</p>,
});

export default function Home() {
  const contactFormRef = useRef(null);

  const [ref, inView] = useInView({
    triggerOnce: true, // Animation triggers only once
    threshold: 0.7, // Percentage of element visibility to trigger the animation
  });
  const fadeInStylesLeft = {
    opacity: 1,
    transform: 'translateX(-50px)',
    transition: 'opacity 1s ease-in-out, transform 1s ease-in-out',
  };
  const scrollToContactForm = () => {
    if (contactFormRef.current) {
      contactFormRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  const ContactForm1 = React.forwardRef((props, ref) => (
    // Renderiza el componente ContactForm y asigna la referencia al elemento principal.
    <div ref={ref}>
      <ContactForm />
    </div>
  ));
  ContactForm1.displayName = 'ContactForm1';
  return (
    <>
      <div className="container-homePrincipal">
        <DynamicNavbar scrollToContactForm={scrollToContactForm} />

        <Banner
          scrollToContactForm={scrollToContactForm}
          title="Just focus on building."
          subtitle="Grid simplifies the deployment of your applications to a decentralized cloud, allowing you to get started with just a few clicks."
        />
        {/* <div>
          <button onClick={fetchFlux}>Fetch Data</button>
          {loading ? <p>Loading...</p> : <p>Data loaded</p>}
        </div> */}
        {/* <Triangles /> */}
        {/* <img
            ref={ref}
            style={inView ? fadeInStylesLeft : {}}
            src="/ilustracion-webHosting.svg"
            alt=""
            className="ilustracion-bannerGrande"
          /> */}

        <BestFeatures />
        <DeployChoice />
        <div>
          <h1 className="h1-landing">Plans</h1>
          <span className="span-landing4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          </span>
          <div style={{ display: 'flex', marginBottom: '100px' }}>
            <CardPricing
              className="scroll-in"
              planType="free"
              price="0"
              description="Everything a small team needs to run on production."
              features={[
                'Unlimited Resources',
                'Unlimited Applications',
                'Unlimited Applications',
                'Unlimited Addons',
                'Certificate Management',
              ]}
            />
            <CardPricing
              className="scroll-in"
              planType="team"
              price="150"
              description="For teams of more than 5 members."
              features={[
                'Unlimited Resources',
                'Unlimited Applications',
                'Unlimited Applications',
                'Unlimited Addons',
                'Certificate Management',
              ]}
            />
            <CardPricing
              className="scroll-in"
              planType="enterprise"
              price="0"
              description="For enterprises looking for custom solutions."
              features={[
                'Unlimited Resources',
                'Unlimited Applications',
                'Unlimited Applications',
                'Unlimited Addons',
                'Certificate Management',
              ]}
            />
          </div>
        </div>
        <Segundo />
        <GraphsLanding />
        <InfoLanding />
        <ContactForm1 ref={contactFormRef} />
        <Footer scrollToContactForm={scrollToContactForm} />
      </div>
    </>
  );
}

{
  /* <CardsHosting/> */
}
{
  /* <ButtonsLanding /> */
}
{
  /* <Guarantee /> */
}
{
  /* <Powered /> */
}
{
  /* <NuevoFaqs /> */
}
