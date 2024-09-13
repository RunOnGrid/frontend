import React, { useEffect, useState } from "react";
import DeployOption from "./DeployOption";
import DeployOption2 from "./DeployOption2";

const DeployChoiceBeta = () => {
  const [fluxData, setFluxData] = useState(null);
  const [fluxNodes, setFluxNodes] = useState(null);
  const [akashData, setAkashData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlux = async () => {
      try {
        const response = await fetch("/api/flux-proxy");
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            `API error: ${errorData.error}, Details: ${errorData.details}`
          );
        }
        const data = await response.json();
        setFluxData(data);
      } catch (error) {
        console.error("Error fetching Flux data:", error.message);
        setFluxData(null); // or some default/error state
      }
    };

    const fetchFluxNodes = async () => {
      try {
        const response = await fetch(
          "https://api.runonflux.io/daemon/getfluxnodecount"
        );
        const data = await response.json();
        setFluxNodes({
          totalNodes: data.data.total,
        });
      } catch (error) {
        console.error("Error fetching Flux nodes:", error);
      }
    };

    const fetchAkash = async () => {
      try {
        const response = await fetch("/api/akash-proxy");
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            `API error: ${errorData.error}, Details: ${errorData.details}`
          );
        }
        const data = await response.json();
        const akashInfo = data;

        const totalSsd = akashInfo.totalStorage / 1000000000000; // Convert bytes to TB
        const totalRam = akashInfo.totalMemory / 1000000000000; // Convert bytes to TB
        const totalStorage = akashInfo.totalGPU; // Assuming this is the total cores
        const totalNodes = akashInfo.activeProviderCount;

        setAkashData({
          totalSsd,
          totalRam,
          totalStorage,
          totalNodes,
        });
      } catch (error) {
        console.error("Error fetching Akash data:", error);
      }
    };

    const fetchAllData = async () => {
      setLoading(true);
      await Promise.all([fetchFlux(), fetchFluxNodes(), fetchAkash()]);
      setLoading(false);
    };

    fetchAllData();
  }, []);

  if (loading || !fluxData || !fluxNodes) {
    return <div>Loading...</div>;
  }

  return (
    <div className="deploy-choice">
      <h1>Deploy on the cloud of your choice</h1>

      <span>Access computing with the best providers</span>
      <div className="deploy-options">
        <DeployOption
          image="/fluxLanding.svg"
          title="The largest decentralized computing network"
          text="Connected Worldwide, Across All Continents, Flux is the largest decentralized network in the world, offering a secure, scalable, and cost-effective cloud for building decentralized applications."
          data={fluxData}
          nodes={fluxNodes}
        />
        <DeployOption2
          image="/akashLanding.svg" // Replace with actual image path
          title="Supercloud"
          text="Explore the power of Akash Network for your decentralized cloud needs. Akash offers a robust and flexible solution for all your hosting requirements, ensuring reliability and ease of use."
          data={akashData}
          nodes={akashData.totalNodes} // Assuming activeLeaseCount represents the number of active nodes
        />
      </div>
    </div>
  );
};

export default DeployChoiceBeta;
