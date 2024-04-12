import dynamic from "next/dynamic";
import Footer from "@/components/index/Footer";
import { useInView } from "react-intersection-observer";
import CardPrincing from "@/components/pricing/CardPrincing";
import CardPrincing2 from "@/components/pricing/Card2Pricing";
import FaqsPricing from "@/components/pricing/FaqsPricing";



const DynamicNavbar = dynamic(()=>import("../components/index/Navbar"),
  {
    ssr:false,
    loading: () => <p> Im f</p>
  }
)


export default function Pricing() {

  const [ref, inView] = useInView({
    triggerOnce: true, // Animation triggers only once
    threshold: 0.7, // Percentage of element visibility to trigger the animation
  });
  const fadeInStylesLeft = {
    opacity: 1,
    transform: 'translateX(-50px)',
    transition: 'opacity 1s ease-in-out, transform 1s ease-in-out',
  };
  return (
    <>
    <div className="container-homePrincipal"> 

    <DynamicNavbar/>
    <div className="banner-container3">
    <div style={{marginTop:'150px'}} className="titulo-asic2"> Pricing</div>
      <div className="subtituloBanner3">Transparent pricing based on number of seats or resource usage.
Start on one tier and move freely between plans.</div>
<div style={{display:'flex'}}>

       <CardPrincing/>
       <CardPrincing2/>
</div>
      <FaqsPricing/>
       </div>
       
     
      
        
   
   <Footer/>
    </div>
 
      
    </>
  )
}
