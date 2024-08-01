import AppsTable from "@/components/applications2/AppsTable";
import dynamic from "next/dynamic";
import { useState } from "react";

const DynamicNavbar = dynamic(() => import("../../commons/SideNavbar"), {
  ssr: false,
  loading: () => <p> Im f</p>,
});

export default function LoggedHosting() {
  return (
    <div className="logged-home-component2">
      <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
        <DynamicNavbar />
        <AppsTable />
      </div>
    </div>
  );
}
