import dynamic from "next/dynamic";

import IntegrationScreen from "@/components/profile/Integration";
import BillingScreen from "@/components/billing/BillingScreen";

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
export default function Billing() {
  return (
    <div className="logged-home-component2">
      <div style={{ display: "flex", flexDirection: "row" }}>
        <DynamicNavbar />
        <BillingScreen />
      </div>
    </div>
  );
}
