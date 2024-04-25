import DeployedNavbar from '@/commons/DeployedNavbar';
import ProjectInfo from '@/commons/ProjectInfo';

import NotificationScreen from '@/components/projectsx/NotificationScreen';
import dynamic from 'next/dynamic';

import { useState } from 'react';
const DynamicNavbar = dynamic(() => import('../../../commons/SideNavbar'), {
  ssr: false,
  loading: () => <p> Im f</p>,
});

export default function Notifications() {
  const [visible, setVisible] = useState(true);
  const toggleSideBar = () => {
    return setVisible(!visible);
  };

  return (
    <div className="logged-home-component">
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <DynamicNavbar />
        <div style={{ width: '100%' }}>
          <ProjectInfo />
          <DeployedNavbar />

          <NotificationScreen />
        </div>
      </div>
    </div>
  );
}
