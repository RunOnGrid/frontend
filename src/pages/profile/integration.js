import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import Paginacion from '@/commons/Paginacion';
import IntegrationBox from '@/components/IntegrationBox';

import back from '../../../axios';

const DynamicNavbar = dynamic(() => import('../../commons/SideNavbar'), {
  ssr: false,
  loading: () => <p> Im f</p>,
});

export default function Integration({ storedToken }) {
  const [visible, setVisible] = useState(true);
  const [githubIntegrationState, setGithubIntegrationState] = useState(''); 

  useEffect(() => {
    const checkInstallationOwner = async () => {
      try {
        const userGrid = localStorage.getItem('userGrid');
        if (!userGrid) {
          
          setGithubIntegrationState('Not logged');
          return;
        }

        const response = await back.get(`/api/checkOwner/${userGrid}`);
        if (response.data.exists) {
          setGithubIntegrationState('Connected');
          localStorage.setItem('installationId', response.data.id);
        } else {
          setGithubIntegrationState('Install app');
        }
      } catch (error) {
        console.error('Error:', error);
        setGithubIntegrationState('Install app'); 
      }
    };

    checkInstallationOwner();
  }, []);

  const toggleSideBar = () => {
    return setVisible(!visible);
  };


  return (
    <div className="logged-home-component">
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <DynamicNavbar />
        <div
          style={{ width: '100%', marginLeft: '100px', marginRight: 'auto' }}>
          <div style={{ opacity: '0' }}>.</div>
          <Paginacion
            anterior="Settings"
            links="/profile"
            titulo="Integrations"
          />
          <div style={{ display: 'flex', width: '90%', marginTop: '100px' }}>

           
            <IntegrationBox
              state="Connect"
              title="Docker"
              image="/docker4.png"
            />
            <IntegrationBox
              state="Connect"
              title="Slack"
              image="/slackButton.png"
            />
            <IntegrationBox
              state={githubIntegrationState}
              title="Github"
              image="/gitButton.png"
            />
          </div>

        </div>
      </div>
    </div>
  );
}

