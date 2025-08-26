import dynamic from "next/dynamic";

import AccountScreen from "@/components/account/AccountScreen";
import useAuthCheck from "@/useRefresh";

const DynamicNavbar = dynamic(() => import("../../commons/SideNavbar"), {
  ssr: false,
  loading: () => <p> Im f</p>,
});

export default function Billing() {
  return (
    <div className="logged-home-component2">
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="dskt-sidebar-container">
          <DynamicNavbar />
        </div>
        <AccountScreen />
      </div>
    </div>
  );
}
