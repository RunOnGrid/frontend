import Information from "@/components/applications2/Information";
import useAuthCheck from "@/useRefresh";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import authWrapper from "../../../../authWrapper";
import { useRouter } from "next/router";
import { TokenService } from "../../../../tokenHandler";
import InformationFlux from "@/components/applications2/InformationFlux";


const DynamicNavbar = dynamic(() => import("../../../commons/SideNavbar"), {
  ssr: false,
  loading: () => <p> Im f</p>,
});

export default function ActivityFlux() {
  const [id, setId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [app, setApp] = useState({});
  const router = useRouter();
  useAuthCheck();
  const { isAuthenticated } = authWrapper();

  useEffect(() => {
    if (!router.isReady) return;

    const { id } = router.query;

    if (id) {
      setId(id);
    }
  }, [router.isReady, router.query]);

  useEffect(() => {
    if (id && isAuthenticated) {
      getData();
    }
  }, [id, isAuthenticated]);

  const getData = async () => {
    try {
      const tokens = TokenService.getTokens();
      const accessToken = tokens.tokens.accessToken;

      const response = await fetch(`/api/single-deploy-proxy?id=${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const data = await response.json();
      setApp(data);
      setIsLoading(false);
    } catch (err) {
      console.error("Error loading existing app names:", err);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="logged-home-component2">
      <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
        <DynamicNavbar />
        <InformationFlux app={app} isLoading={isLoading} />
      </div>
    </div>
  );
}