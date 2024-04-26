import Paginacion from '@/commons/Paginacion';
import HostingWeb from '@/components/cards/HostingWeb';
import dynamic from 'next/dynamic';
import { useState } from 'react';
const DynamicNavbar = dynamic(() => import('../../commons/SideNavbar'), {
  ssr: false,
  loading: () => <p> Im f</p>,
});

export default function LoggedHosting() {
  const [visible, setVisible] = useState(true);
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
            anterior="Services"
            links="/profile"
            titulo="Setup Application"
          />
          <HostingWeb />
        </div>
      </div>
      {/* <HostingBought/> */}
    </div>
  );
}
