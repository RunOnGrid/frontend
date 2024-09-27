import dynamic from "next/dynamic";

import IntegrationScreen from "@/components/profile/Integration";

const DynamicNavbar = dynamic(() => import("../../commons/SideNavbar"), {
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
export default function Integration() {
  return (
    <div className="logged-home-component2">
      <div style={{ display: "flex", flexDirection: "row" }}>
        <DynamicNavbar />
        <IntegrationScreen />
      </div>
    </div>
  );
}
