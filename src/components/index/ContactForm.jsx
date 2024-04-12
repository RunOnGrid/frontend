import Link from 'next/link'
import React from 'react'


const ContactForm = () => {
  return (
    <>
    <>.</>

    <div className='contact-container2' >
     

        <div className='contact-titulo'> Contact </div>
        
       
     
        <div className='contact-form'>
            <input className='contact-input' placeholder='Name / Company'></input>
            <input className='contact-input' placeholder='Email'></input>
            <input className='contact-input' placeholder='What type of application want to host?'></input>
            <textarea className='contact-input-description' placeholder={`Write us your suggestions and ideas, let's talk`}/>
            <label >Topic</label>
            <select className='contact-select' >
                    <option value="Help Needed">Help Needed</option>
                    <option value="Feature Request">Feature Request</option>
                    <option value="Bug Report">Bug Report</option>
                    <option value="Enterprise Aplication">Enterprise Aplication</option>
                  </select>
            <div className='contenedorFlex2'>
            <button className='boton-contact-form'>  SEND</button>
            <button className='boton-contact-form'> <Link href='https://cal.com/bautista-gonzalez-lazo-g8xn68'> BOOK A DEMO </Link> </button>
            </div>
            
        </div>


    </div>
   
    <div style={{opacity:'0'}}>.</div>
    </>
  )
}

export default ContactForm