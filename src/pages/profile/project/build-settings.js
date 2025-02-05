import DeployedNavbar from '@/commons/DeployedNavbar';

import BuildSettScreen from '@/components/projectsx/BuildSettScreen';
import dynamic from 'next/dynamic';

import { useState } from 'react';
const DynamicNavbar = dynamic(() => import('../../../commons/SideNavbar'), {
  ssr: false,
  loading: () => <p> Im f</p>,
});
export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/", // Puedes redirigir a una página de "Próximamente" o similar
      permanent: false,
    },
  };
}
export default function Build() {
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

          <BuildSettScreen />
        </div>
      </div>
    </div>
  );
}
