import Environments from "@/components/applications2/environment/Environments";
import dynamic from "next/dynamic";

import { useState } from "react";
const DynamicNavbar = dynamic(() => import("../../../commons/SideNavbar"), {
  ssr: false,
  loading: () => <p> Im f</p>,
});

export default function Activity() {
  const [visible, setVisible] = useState(true);
  const toggleSideBar = () => {
    return setVisible(!visible);
  };

  return (
    <div className="logged-home-component2">
      <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
        <DynamicNavbar />
        <Environments />
      </div>
    </div>
  );
}
