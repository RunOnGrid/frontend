


import BillingInfo from "@/components/billing/Billing";
import dynamic from "next/dynamic";
import { useState } from "react";
const DynamicNavbar = dynamic(()=>import("../../commons/SideNavbar"),
  {
    ssr:false,
    loading: () => <p> Im f</p>
  }
)

export default function Billing() {
  const[visible, setVisible] = useState(true)
  const toggleSideBar = () => {
    return setVisible(!visible)
 }
    return (
      <div className="logged-hosting-component">
       <div style={{display:'flex',flexDirection:'row'}}>

         <DynamicNavbar/>
        <BillingInfo/>
       </div>
      
      
      
      


      </div>
    )
  }