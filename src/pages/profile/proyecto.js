

import Proyecto from '@/components/logged/Proyecto'
import dynamic from 'next/dynamic'

import React, { useState } from 'react'
const DynamicNavbar = dynamic(()=>import("../../commons/SideNavbar"),
  {
    ssr:false,
    loading: () => <p> Im f</p>
  }
)

export default function Proyecto2 ()  {

  const[visible, setVisible] = useState(true)
  const toggleSideBar = () => {
    return setVisible(!visible)
 }

  return (
    <>
   <div className="container-Security" >
      <div className="container-sideNavbar-infoSecurity">
         <DynamicNavbar/>
     
      <Proyecto/>
 
         </div>
      </div>
    </>
  )
}

