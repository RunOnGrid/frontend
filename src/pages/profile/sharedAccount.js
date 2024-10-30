import SharedInfo from "@/components/logged/sharedAccount/SharedInfo";
import { useState } from "react";
import dynamic from "next/dynamic";
const DynamicNavbar = dynamic(() => import("../../commons/SideNavbar"), {
  ssr: false,
  loading: () => <p> Im f</p>,
});
export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
}
export default function SharedAccount() {
  const [visible, setVisible] = useState(true);
  const toggleSideBar = () => {
    return setVisible(!visible);
  };
  return (
    <div className="logged-home-component2">
      <div style={{ display: "flex", flexDirection: "row" }}>
        <DynamicNavbar />

        <div style={{ opacity: "0" }}>.</div>
        <SharedInfo />
      </div>
    </div>
  );
}
