import DeployAppScreen from "@/components/deploy/application/DeployAppScreen";
import useAuthCheck from "@/useRefresh";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";
import { TokenService } from "../../../tokenHandler";
const DynamicNavbar = dynamic(() => import("../../commons/SideNavbar"), {
  ssr: false,
  loading: () => <p> Im f</p>,
});

export default function DeployApp() {
  useAuthCheck();
  const [visible, setVisible] = useState(true);
  const [gridUserId, setGridUserId] = useState(null);
  const [installationId, setInstallationId] = useState(null);

  const toggleSideBar = () => {
    return setVisible(!visible);
  };
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/linkUser-proxy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ installationId, gridUserId }),
      });
      console.log("entro el try");
      if (response.ok) {
        console.log("User linked successfully");
      } else {
        console.error("An error occurred", error);
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  useEffect(() => {
    const response = TokenService.getTokens();
    if (response.tokens) {
      setGridUserId(response.tokens.gridId);
    }
  }, []);

  useEffect(() => {
    if (!router.isReady) return; // Asegura que los query params están disponibles

    const { installation_id } = router.query;

    if (installation_id && gridUserId !== null) {
      setInstallationId(installation_id);
    }
  }, [router.isReady, router.query, gridUserId]);

  useEffect(() => {
    if (installationId && gridUserId) {
      handleSubmit();
    }
  }, [installationId]);

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
