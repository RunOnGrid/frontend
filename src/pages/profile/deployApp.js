import DeployAppScreen from "@/components/deploy/application/DeployAppScreen";
import useAuthCheck from "@/useRefresh";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";
import { TokenService } from "../../../tokenHandler";
import authWrapper from "../../../authWrapper";
import Spinner from "@/commons/Spinner";
const DynamicNavbar = dynamic(() => import("../../commons/SideNavbar"), {
  ssr: false,
  loading: () => <p> Im f</p>,
});

export default function DeployApp() {
  useAuthCheck();
  const [visible, setVisible] = useState(true);
  const [gridUserId, setGridUserId] = useState(null);
  const [installationId, setInstallationId] = useState(null);
  const [appInstalled, setAppInstalled] = useState(false);
  const { isAuthenticated, isLoading } = authWrapper();

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
      if (response.ok) {
        console.log("corre el post y response ok");
        setAppInstalled(true);
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
    if (!router.isReady) return;

    const { installation_id } = router.query;

    if (installation_id && gridUserId !== null) {
      setInstallationId(installation_id);
    }
  }, [router.isReady, router.query, gridUserId]);

  useEffect(() => {
    if (installationId && gridUserId) {
      handleSubmit();
    }
  }, [installationId, router.query]);

  if (isLoading) {
    return <Spinner />; // Or a loading indicator
  }

  if (!isAuthenticated) {
    return null;
  }
  return (
    <>
      <div className="logged-home-component2">
        <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
          <div className="dskt-sidebar-container">
            <DynamicNavbar />
          </div>
          <DeployAppScreen appInstalled={appInstalled} />
        </div>
      </div>
    </>
  );
}
