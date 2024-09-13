import BestFeaturesBeta from "@/components/BestFeatures/BestFeaturesBeta";
import DeployChoiceBeta from "@/components/deployChoice/DeployChoiceBeta";
import InfoLanding from "@/components/Graphs/InfoLanding";
import Footer2 from "@/components/index/Footer2";

import Banner2 from "@/components/landing-AsicHosting/Banner2";
import dynamic from "next/dynamic";

export default function Beta() {
  const DynamicNavbar = dynamic(() => import("../components/index/Navbar2"), {
    ssr: false,
    loading: () => <p> Im f</p>,
  });

  return (
    <div className="container-homePrincipal">
      {" "}
      <DynamicNavbar />
      <Banner2
        title="Just focus on building."
        subtitle="Grid simplifies the deployment of your applications to a decentralized cloud, allowing you to get started with just a few clicks."
        subtitle2="Build, conect, deploy."
      />
      <BestFeaturesBeta />
      <DeployChoiceBeta />
      <InfoLanding />
      <Footer2 />
    </div>
  );
}
