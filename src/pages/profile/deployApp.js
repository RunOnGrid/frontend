import DeployAppScreen from "@/components/deploy/application/DeployAppScreen";
import dynamic from "next/dynamic";

import React, { useState } from "react";
const DynamicNavbar = dynamic(() => import("../../commons/SideNavbar"), {
  ssr: false,
  loading: () => <p> Im f</p>,
});

export default function DeployApp() {
  const [visible, setVisible] = useState(true);
  const toggleSideBar = () => {
    return setVisible(!visible);
  };

  return (
    <>
      <div className="logged-home-component2">
        <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
          <DynamicNavbar />
          <DeployAppScreen />
        </div>
      </div>
    </>
  );
}
