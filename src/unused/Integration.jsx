// import React, { useEffect, useState } from 'react';
// import IntegrationBox from './IntegrationBox';
// import back from '../../axios';
// import { useTheme } from "@/ThemeContext";
// import ThemeToggle from "../components/ThemeToggle";
// import Notis from "../components/applications2/Notis";

// const IntegrationScreen = () => {
//   const { darkMode } = useTheme();
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [githubIntegrationState, setGithubIntegrationState] = useState("");

//   const toggleNotifications = () => {
//     setShowNotifications(!showNotifications);
//   };

//   useEffect(() => {
//     const checkInstallationOwner = async () => {
//       try {
//         const userGrid = localStorage.getItem("userGrid");
//         if (!userGrid) {
//           setGithubIntegrationState("Not logged");
//           return;
//         }

//         const response = await back.get(`/api/checkOwner/${userGrid}`);
//         if (response.data.exists) {
//           setGithubIntegrationState("Connected");
//           localStorage.setItem("installationId", response.data.id);
//         } else {
//           setGithubIntegrationState("Install app");
//         }
//       } catch (error) {
//         console.error("Error:", error);
//         setGithubIntegrationState("Install app");
//       }
//     };

//     checkInstallationOwner();
//   }, []);
//   return (
//     <div className={`dashboard-container ${darkMode ? "dark" : "light"}`}>
//       <div className="dashboard-header">
//         <h2>Integrations</h2>

//         <div
//           className={`notification-icon ${darkMode ? "dark" : "light"}`}
//           onClick={toggleNotifications}
//         >
//           <img
//             src={`${
//               darkMode
//                 ? "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/9c8e0b0b-66e0-4ff9-8035-36e4f8074600/public"
//                 : "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/7d027139-b7ab-4069-7577-8f546dd02f00/public"
//             }`}
//             alt="Notifications"
//           />
//         </div>
//         {showNotifications && <Notis darkMode={darkMode} />}
//       </div>
//       <div style={{ display: "flex", width: "90%", margin: "20px auto" }}>
//         <IntegrationBox
//           mode={darkMode}
//           state="Connect"
//           title="Docker"
//           image="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/497dd6b3-ab24-451b-0cea-cf55636b0400/public"
//         />
//         <IntegrationBox
//           mode={darkMode}
//           state={githubIntegrationState}
//           title="Github"
//           image="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/f535af11-081c-4df0-38ff-bddedd1c4800/public"
//         />
//       </div>
//     </div>
//   );
// };

// export default IntegrationScreen;
