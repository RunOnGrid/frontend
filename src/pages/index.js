import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


import dynamic from "next/dynamic";
import Segundo from "@/components/index/Segundo";
import Powered from "@/components/index/Powered";
import ContactForm from "@/components/index/ContactForm";
import Footer from "@/components/index/Footer";
import Banner from "@/components/landing-AsicHosting/Banner";
import { useInView } from "react-intersection-observer";
import ButtonsLanding from "@/components/ButtonsLanding";
import React, { useRef } from "react";
import NuevoFaqs from "@/components/NuevoFaqs";
import Guarantee from "@/commons/Guarantee";



const DynamicNavbar = dynamic(()=>import("../components/index/Navbar"),
  {
    ssr:false,
    loading: () => <p> Im </p>
  }
)


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
      <ContactForm/>
    </div>
  ));
  ContactForm1.displayName = 'ContactForm1';
  return (
    <>
    <div className="container-homePrincipal" > 

    <DynamicNavbar scrollToContactForm={scrollToContactForm}/>
    <div className="banner-container">
    <Banner
        scrollToContactForm={scrollToContactForm}
        title='Just focus on building.'
        subtitle='Grid simplifies the deployment of your applications to a decentralized cloud, allowing you to get started with just a few clicks. As your projects expand, grid gives you the freedom to adapt your infrastructure to your exact needs, ensuring a scalable and customizable environment.'
      />
       <img 
         ref={ref}
         style={inView ? fadeInStylesLeft : {}}
       src="/ilustracion-webHosting.svg" alt="" className="ilustracion-bannerGrande" />
       </div>
       {/* <CardsHosting/> */}
       <ButtonsLanding/>
  
   <Segundo/>
   <Guarantee/>
   <Powered/>
   <NuevoFaqs/>
   <ContactForm1 ref={contactFormRef}/>
   <Footer scrollToContactForm={scrollToContactForm}/>
    </div>
 
      
    </>
  )
}
