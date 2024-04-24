import DeployedNavbar from '@/commons/DeployedNavbar';
import ProjectInfo from '@/commons/ProjectInfo';
import BuildSettScreen from '@/components/projectsx/BuildSettScreen';
import dynamic from 'next/dynamic';

import { useState } from 'react';
const DynamicNavbar = dynamic(() => import('../../../commons/SideNavbar'), {
  ssr: false,
  loading: () => <p> Im f</p>,
});

export default function Build() {
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

          <BuildSettScreen />
        </div>
      </div>
    </div>
  );
}
