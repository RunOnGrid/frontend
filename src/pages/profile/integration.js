import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

import IntegrationBox from "@/components/IntegrationBox";

import back from "../../../axios";
import IntegrationScreen from "@/components/profile/Integration";

const DynamicNavbar = dynamic(() => import("../../commons/SideNavbar"), {
  ssr: false,
  loading: () => <p> Im f</p>,
});

export default function Integration({ storedToken }) {
  const [visible, setVisible] = useState(true);
  const [githubIntegrationState, setGithubIntegrationState] = useState("");

  const toggleSideBar = () => {
    return setVisible(!visible);
  };

  return (
    <div className="logged-home-component2">
      <div style={{ display: "flex", flexDirection: "row" }}>
        <DynamicNavbar />
        <IntegrationScreen />
      </div>
    </div>
  );
}
