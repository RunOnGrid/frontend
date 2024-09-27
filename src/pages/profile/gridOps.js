import Component from "@/components/ui/ChatScreen";
import dynamic from "next/dynamic";

const DynamicNavbar = dynamic(() => import("../../commons/SideNavbar"), {
  ssr: false,
  loading: () => <p> Im f</p>,
});
export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/", // Puedes redirigir a una página de "Próximamente" o similar
      permanent: false,
    },
  };
}
export default function GridOps() {
  return (
    <div className="logged-home-component2">
      <div style={{ display: "flex", flexDirection: "row" }}>
        <DynamicNavbar />
        <Component />
      </div>
    </div>
  );
}
