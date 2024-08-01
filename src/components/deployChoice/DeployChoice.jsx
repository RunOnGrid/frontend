import React, { useEffect, useState } from 'react';
import DeployOption from "./DeployOption";
import DeployOption2 from "./DeployOption2";

const DeployChoice = () => {
  const [fluxData, setFluxData] = useState(null);
  const [fluxNodes, setFluxNodes] = useState(null);
  const [akashData, setAkashData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlux = async () => {
      try {
        const response = await fetch(
          "https://stats.runonflux.io/fluxinfo?projection=benchmark"
        );
        const data = await response.json();
        let totalSsd = 0,
          totalRam = 0,
          totalStorage = 0;

        data.data.forEach((item) => {
          const bench = item.benchmark.bench;
          totalSsd += bench.ssd;
          totalRam += bench.ram;
          totalStorage += bench.cores;
        });

        // Convert MB to TB
        totalSsd = totalSsd / 1024;
        totalRam = totalRam / 1024;

        setFluxData({
          totalSsd,
          totalRam,
          totalStorage,
        });
      } catch (error) {
        console.error("Error fetching Flux data:", error);
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
        const response = await fetch(
          "https://api.cloudmos.io/v1/dashboard-data"
        );
        const data = await response.json();
        const akashInfo = data.now;

        const totalSsd = akashInfo.activeStorage / 1024 ** 4; // Convert bytes to TB
        const totalRam = akashInfo.activeMemory / 1024 ** 4; // Convert bytes to TB
        const totalStorage = akashInfo.activeCPU; // Assuming this is the total cores
        const totalNodes = akashInfo.activeGPU;

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

  if (loading || !fluxData || !fluxNodes || !akashData) {
    return <div>Loading...</div>; // Muestra un indicador de carga mientras se obtienen los datos
  }

  return (
    <div className="deploy-choice">
      <h1>Deploy on the cloud of your choice</h1>
      <span>Access computing with the best providers</span>
      <DeployOption
        image="/fluxLanding.svg"
        title="The largest decentralized computing network"
        text="Discover the freedom of managing a cloud without the need of expertise or DevOps. Even if you're unfamiliar with new decentralized technologies, we make hosting stress-free and accessible for everyone, offering a straightforward and dependable experience in the realm of decentralization."
        data={fluxData}
        nodes={fluxNodes}
      />
      <DeployOption2
        image="/akashLanding.svg" // Replace with actual image path
        title="Akash Network"
        text="Explore the power of Akash Network for your decentralized cloud needs. Akash offers a robust and flexible solution for all your hosting requirements, ensuring reliability and ease of use."
        data={akashData}
        nodes={akashData.totalNodes} // Assuming activeLeaseCount represents the number of active nodes
      />
      <button className="button-landing-4">DEPLOY NOW</button>
    </div>
  );
};

export default DeployChoice;
