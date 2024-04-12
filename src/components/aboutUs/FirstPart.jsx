import Image from 'next/image';
import React from 'react'


const FirstPart = () => {
  return (
    <div className='fondo-aboutUs'> 

    <div className="container-aboutUs">
      <h1> About Grid Mine + Grid Cloud </h1>
      <div>
        {' '}
        Founded in 2020, Grid Cloud is a company committed to the vision of
        shifting the economy to a protocol governed by mathematics rather than
        politics. In a world where trust in traditional institutions has been
        eroded, we firmly believe in the transformative power of blockchain
        technology, particularly Bitcoin. We strive to be industry leaders while
        advocating for a fairer, more transparent, and decentralized economy.
      </div>

      
      <h2> Grid Cloud</h2>
      <div className='contenedor-parrafos-about'>
        <div className='parrafos-about'>

      <div>
        {' '}
        At [Grid Cloud], we simplify the complexities of the web 3.0 and cloud
        services. We understand the challenges developers and businesses face
        when building, securing, and delivering modern applications at a global
        scale.
      </div>

      <div>
        {' '}
        Our goal is to provide an exciting choice for those seeking cloud
        computing services. We combine the best of both worlds: the scalability
        and comprehensive services of a hyperscale provider, with the simplicity
        and affordability of an alternative cloud provider.
      </div>

      <div>
        {' '}
        We offer innovative solutions tailored to the specific needs of our
        clients. We provide a reliable and secure platform for efficient
        application development, protection, and delivery.
      </div>

      <div>
        {' '}
        We value simplicity and strive to make web 3.0 and cloud services more
        accessible and understandable for everyone. With our unique features and
        commitment to simplifying complexity, we offer a seamless experience and
        a cost-effective approach to harnessing the power of cloud technology.
      </div>
        </div>
    

      </div>
     
        
      
    <h2> Grid Mine</h2>
        <div className='contenedor-flex'> 
    <div className='parrafos-about'>

      <div>
        {' '}
        At [Grid Mine], we specialize in simplifying the complexities of Bitcoin mining. We understand the challenges that miners and businesses face in this competitive industry.
      </div>

      <div>
        {' '}
        Our goal is to provide an exciting choice for those seeking efficient and profitable Bitcoin mining solutions. We combine cutting-edge technology with expert knowledge to optimize the mining process.
      </div>

      <div>
        {' '}
        We offer innovative solutions tailored to the specific needs of our clients. Our reliable and secure platform ensures high-performance mining operations, maximizing the potential for generating Bitcoin.
      </div>

      <div>
        {' '}
        We value simplicity and strive to make Bitcoin mining more accessible and understandable for everyone. With our unique features and commitment to simplifying complexity, we offer a seamless experience and a cost-effective approach to harnessing the power of Bitcoin mining.
      </div>

      <div style={{marginBottom:'50px'}}>
        {' '}
        At [Grid Mine], we are passionate about supporting the decentralized nature of cryptocurrencies and empowering individuals and businesses to participate in the Bitcoin network with ease and confidence.
      </div>
    </div>
    <Image style={{marginTop:'auto',marginBottom:'auto'}} width={300} height={400} alt='' src='/serverSVG.svg'/>
        </div>
    </div>
<div className='aboutUs-final'>

    <h1> Ready to get started or have questions?</h1>
    <h3> Set up your free account today or contact a sales consultant to learn more.</h3>
    
    <div className='contenedor-flex2'> 

    <button className='botones-aboutUs' > Create Account </button>
    <button className='botones-aboutUs2'> Book a Demo </button>
    </div>
    
</div>

    </div>
  );
}

export default FirstPart