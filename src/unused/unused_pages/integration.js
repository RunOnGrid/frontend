// import dynamic from "next/dynamic";

// import IntegrationScreen from "@/unused/Integration";
// import useAuthCheck from "@/useRefresh";

// const DynamicNavbar = dynamic(() => import("../../commons/SideNavbar"), {
//   ssr: false,
//   loading: () => <p> Im f</p>,
// });
// // export async function getServerSideProps() {
// //   return {
// //     redirect: {
// //       destination: "/",
// //       permanent: false,
// //     },
// //   };
// // }
// export default function Integration() {
//   useAuthCheck();
//   return (
//     <div className="logged-home-component2">
//       <div style={{ display: "flex", flexDirection: "row" }}>
//         <DynamicNavbar />
//         <IntegrationScreen />
//       </div>
//     </div>
//   );
// }
