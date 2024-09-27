import FirstPart from '@/components/aboutUs/FirstPart';
import Footer from '@/components/index/Footer';
import dynamic from 'next/dynamic';
import React, { useRef } from 'react';
import ContactForm from '@/components/index/ContactForm';

const DynamicNavbar = dynamic(() => import('../components/index/Navbar'), {
  ssr: false,
  loading: () => <p> Im f</p>,
});
export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/", // Puedes redirigir a una página de "Próximamente" o similar
      permanent: false,
    },
  };
}
export default function AsicMining() {
  const contactFormRef = useRef(null);

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
        <FirstPart />
        <ContactForm1 ref={contactFormRef} />
        <Footer scrollToContactForm={scrollToContactForm} />
      </div>
    </>
  );
}
