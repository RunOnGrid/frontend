import Component from "@/components/ui/ChatScreen";
import useAuthCheck from "@/useRefresh";
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
export default function GridOps() {
  useAuthCheck();
  return (
    <div className="logged-home-component2">
      <div style={{ display: "flex", flexDirection: "row" }}>
        <DynamicNavbar />
        <Component />
      </div>
    </div>
  );
}
