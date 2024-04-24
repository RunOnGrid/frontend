import dynamic from 'next/dynamic';
import Footer from '@/components/index/Footer';
import { useInView } from 'react-intersection-observer';
import Article from '@/components/blog/Article';
import React, { useRef } from 'react';
import ContactForm from '@/components/index/ContactForm';

const DynamicNavbar = dynamic(() => import('../components/index/Navbar'), {
  ssr: false,
  loading: () => <p> Im f</p>,
});

export default function Blog() {
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
        <div className="banner-container3">
          <div style={{ marginTop: '150px' }} className="titulo-asic2">
            {' '}
            Grid Cloud Blog
          </div>
        </div>
        <div className="grid-articles">
          <Article
            title="Why pay for Heroku/Render/Fly.io when you have AWS credits?"
            foto="/netero.jpg"
            author="SpectroGL"
            date="January 04,2024"
            time="5 min read"
          />
          <Article
            title="Why pay for Heroku/Render/Fly.io when you have AWS credits?"
            foto="/netero.jpg"
            author="SpectroGL"
            date="January 04,2024"
            time="5 min read"
          />
          <Article
            title="Why pay for Heroku/Render/Fly.io when you have AWS credits?"
            foto="/netero.jpg"
            author="SpectroGL"
            date="January 04,2024"
            time="5 min read"
          />
          <Article
            title="Why pay for Heroku/Render/Fly.io when you have AWS credits?"
            foto="/netero.jpg"
            author="SpectroGL"
            date="January 04,2024"
            time="5 min read"
          />
        </div>
        <ContactForm1 ref={contactFormRef} />
        <Footer scrollToContactForm={scrollToContactForm} />
      </div>
    </>
  );
}
