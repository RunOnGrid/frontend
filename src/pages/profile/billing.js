import dynamic from "next/dynamic";

import IntegrationScreen from "@/components/profile/Integration";
import BillingScreen from "@/components/billing/BillingScreen";
import useAuthCheck from "@/useRefresh";

const DynamicNavbar = dynamic(() => import("../../commons/SideNavbar"), {
  ssr: false,
  loading: () => <p> Im f</p>,
});

export default function Billing() {
  // useAuthCheck();
  return (
    <div className="logged-home-component2">
      <div style={{ display: "flex", flexDirection: "row" }}>
        <DynamicNavbar />
        <BillingScreen />
      </div>
    </div>
  );
}
