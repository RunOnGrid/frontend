import dynamic from 'next/dynamic';
import NewApplicationj from '@/components/NewApplication';
import { useState } from 'react';
const DynamicNavbar = dynamic(() => import('../../commons/SideNavbar'), {
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
export default function NewApplication() {
  const [visible, setVisible] = useState(true);
  const toggleSideBar = () => {
    return setVisible(!visible);
  };

  return (
    <div className="logged-home-component">
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <DynamicNavbar />

        {/* <div style={{opacity:'0'}}>.</div>
        <Paginacion anterior="Services" links="/profile" titulo="Deploy new app" /> */}
        <NewApplicationj />
      </div>
    </div>
  );
}
