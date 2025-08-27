import AppsTable from "@/components/applications2/AppsTable";
import useAuthCheck from "@/useRefresh";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const DynamicNavbar = dynamic(() => import("../../commons/SideNavbar"), {
  ssr: false,
  loading: () => <p> Im f</p>,
});
export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/profile", // Puedes redirigir a una página de "Próximamente" o similar
      permanent: false,
    },
  };
}
export default function LoggedHosting() {

  useAuthCheck();
 
  return (
    <div className="logged-home-component2">
      <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
        <DynamicNavbar />
        <AppsTable />
      </div>
    </div>
  );
}
