import InfoSecurity from '@/components/logged/securityy/InfoSecurity';
import React from 'react';
import { useState } from 'react';
import dynamic from 'next/dynamic';
const DynamicNavbar = dynamic(() => import('../../commons/SideNavbar'), {
  ssr: false,
  loading: () => <p> Im f</p>,
});

export default function Security() {
  const [visible, setVisible] = useState(true);
  const toggleSideBar = () => {
    return setVisible(!visible);
  };
  return (
    <>
      <div className="container-Security">
        <div className="logged-home-component">
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <DynamicNavbar />
            <div
              style={{
                width: '100%',
                marginLeft: '100px',
                marginRight: 'auto',
              }}>
              <div style={{ opacity: '0' }}>.</div>
              <InfoSecurity />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
