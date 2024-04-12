import Link from 'next/link'
import React from 'react'

const SidebarMobile = () => {
  return (
    <div>
        <div className='menuMobileContainer2'>
        <button> Contact </button>
        <div> bautistagonzalezlazo@gmail.com</div>
        <div> <Link href='/profile'> Home </Link></div>
        <div> <Link href='/profile/hosting'> Deploy </Link></div>
  
        <div> <Link href='/profile/billing'> Billing </Link></div>
        <span style={{marginTop:'20px'}} className='titulo-mobile'>Resources </span>
        <div> <Link href='/profile/ssl'> Account Settings </Link></div>
        <div><Link href='/profile/security'> Security </Link></div>
        <div> <Link href='/profile/sharedAccount'> Shared Account </Link></div>
        <div>Documentation</div>
        <button> <Link href='/'> Logout </Link> </button>
       
        
            

    </div>
    </div>
  )
}

export default SidebarMobile