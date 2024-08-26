import BestFeatures from "@/components/BestFeatures/BestFeatures";
import DeployChoice from "@/components/deployChoice/DeployChoice";
import InfoLanding from "@/components/Graphs/InfoLanding";
import Footer2 from "@/components/index/Footer2";
import Banner from "@/components/landing-AsicHosting/Banner";
import dynamic from "next/dynamic";

export default function Beta() {
  const DynamicNavbar = dynamic(() => import("../components/index/Navbar"), {
    ssr: false,
    loading: () => <p> Im f</p>,
  });

  return (
    <div className="container-homePrincipal">
      {" "}
      <DynamicNavbar />
      <Banner
        title="Just focus on building."
        subtitle="Grid simplifies the deployment of your applications to a decentralized cloud, allowing you to get started with just a few clicks."
        subtitle2="Build, conect, deploy."
      />
      <BestFeatures />
      <DeployChoice />
      <InfoLanding />
      <Footer2 />
    </div>
  );
}
