import dynamic from 'next/dynamic';

import { useState } from 'react';
import Paginacion from '@/commons/Paginacion';
import Image from 'next/image';
import { parse } from 'cookie';
const DynamicNavbar = dynamic(() => import('../../commons/SideNavbar'), {
  ssr: false,
  loading: () => <p> Im f</p>,
});


export default function Integration({ storedToken }) {
  const [visible, setVisible] = useState(true);
  const toggleSideBar = () => {
    return setVisible(!visible);
  };
  
  const [github,setGithub] = useState('')
 

  const handleLoginClick = () => {
    const CLIENT_ID = 'Iv1.4c4e4dcaca465cb4';
    const REDIRECT_URI = 'http://localhost:3000/profile/repositories';
    const AUTH_URL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=repos`;

    // Redirigir al usuario a la página de autorización de GitHub
    window.location.href = AUTH_URL;
  };



  return (
    <div
      className= 'logged-home-component'>
      
        
      
      <div style={{display:'flex',flexDirection:'row'}}>
          <DynamicNavbar />
      <div style={{width: '100%',
                marginLeft: '100px',
                marginRight: 'auto'}}>

      <div style={{ opacity: '0' }}>.</div>
      <Paginacion anterior="Settings" links="/profile" titulo="Integrations" />

      <div className="integration-container">
        <Image alt="" src="/dockerf.png" width={100} height={40} />
        {/* <div className="verified-integration">
          <span>
            Verified <Image alt="" src="/verify.png" width={25} height={25} />{' '}
          </span>
        </div> */}
        <button> Install app </button>
      </div>

      <div className="integration-container">
        <Image alt="" src="/slack.png" width={100} height={40} />
        {/* <div className="verified-integration">
          <span>
            Verified <Image alt="" src="/verify.png" width={25} height={25} />{' '}
          </span>
        </div> */}
          <button> Install app </button>
      </div>

      <div  className="integration-container">
        <Image alt="" src="/githubL.png" width={100} height={50} />

        {storedToken ? (

<div className="verified-integration">
<span>
  Verified <Image alt="" src="/verify.png" width={25} height={25} />{' '}
</span>
</div>

        ) : ( <button onClick={handleLoginClick}> Install app </button>)}

            
    
       
      </div>
      </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  // Fetch data, including cookies, from the server
  const storedToken = parse(context.req.headers.cookie || '').githubAccessToken;
  if (storedToken) {
    // Si hay un accessToken en las cookies, usa ese para obtener la lista de repositorios
    try {
      

      

      return {
        props: { storedToken },
      };
    } catch (error) {
      console.error('Error al obtener la lista de repositorios', error);
      return {
        props: {},
      };
    }
  };
  return {
    props: {},
  }
};
