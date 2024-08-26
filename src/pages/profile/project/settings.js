import DeployedNavbar from '@/commons/DeployedNavbar';

import SettingsScreen from '@/components/projectsx/SettingsScreen';
import dynamic from 'next/dynamic';

import { useState } from 'react';
const DynamicNavbar = dynamic(() => import('../../../commons/SideNavbar'), {
  ssr: false,
  loading: () => <p> Im f</p>,
});

export default function Sett() {
  const [visible, setVisible] = useState(true);
  const toggleSideBar = () => {
    return setVisible(!visible);
  };

  return (
    <div className="logged-home-component">
      <div style={{ display: "flex", flexDirection: "row" }}>
        <DynamicNavbar />
        <div style={{ width: "100%" }}>
          <DeployedNavbar />

          <SettingsScreen />
        </div>
      </div>
    </div>
  );
}
