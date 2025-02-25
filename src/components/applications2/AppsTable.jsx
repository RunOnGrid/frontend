import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "@/ThemeContext";
import { TokenService } from "../../../tokenHandler";
import AppsTableRow from "./AppsTableRow";
import AppsTableHeader from "./AppsTableHeader";
import { useRouter } from "next/router";
import MobileFooterBar from "./ProfileFooter";

const AppsTable = () => {
  const { darkMode } = useTheme();
  const [accessToken2, setAccessToken2] = useState(null);
  const [email, setEmail] = useState("");
  const [apps, setApps] = useState([]); // Estado para almacenar las aplicaciones.
  const router = useRouter();

  useEffect(() => {
    const tokens = TokenService.getTokens();

    if (tokens.tokens.accessToken) {
      setAccessToken2(tokens.tokens.accessToken);
    }
    const userMail = localStorage.getItem("grid_email");
    setEmail(userMail);
  }, []);

  useEffect(() => {
    if (accessToken2) {
      console.log("entra al if");
      const fetchRepos = async () => {
        try {
          const response = await fetch(`/api/deployments-proxy`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken2}`,
            },
          });

          if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
          }

          const data = await response.json();
          console.log("Existing apps:", data);
          setApps(data); // Actualiza el estado con el array de objetos.
        } catch (err) {
          console.error("Error loading existing app names:", err);
        }
      };

      fetchRepos();
    }
  }, [accessToken2]);

  return (
    <div className={`dashboard-container ${darkMode ? "dark" : "light"}`}>
      <div className="dashboard-header">
        <h2>My applications</h2>
      </div>
      <div className="table-container">
        {apps.length === 0 ? (
          <div
            className={`applications-section ${darkMode ? "dark" : "light"}`}
          >
            <div className="section-header"></div>
            <p>
              It looks like you don&apos;t have any applications running yet
            </p>
            <Link href="/profile/deployApp">
              <button className="section-button">Deploy</button>
            </Link>
          </div>
        ) : (
          <>
            <AppsTableHeader />
            {apps.map((app, index) => (
              <AppsTableRow
                key={index}
                status={app.status} // Cambia `status` según los datos de tu objeto
                // Cambia `status` según los datos de tu objeto.
                mode={darkMode}
                name={app.id}
              />
            ))}
          </>
        )}
      </div>
      <MobileFooterBar />
    </div>
  );
};

export default AppsTable;

// const [showNotifications, setShowNotifications] = useState(false);
// const [showRecents, setShowRecents] = useState(false);
// const [showFilters, setShowFilters] = useState(false);

// const toggleNotifications = () => {
//   setShowNotifications(!showNotifications);
// };

// const toggleRecents = () => {
//   setShowRecents(!showRecents);
// };

// const toggleFilters = () => {
//   setShowFilters(!showFilters);
// };

// useEffect(()=>{

// },[])

{
  /* <div  
  className={`notification-icon ${darkMode ? "dark" : "light"}`}
  onClick={toggleNotifications}
>
  <img
    src={`${darkMode ? "/notification2.png" : "/notification.png"}`}
    alt="Notifications"
  />
</div>
{showNotifications && <Notis darkMode={darkMode} />} */
}

{
  /* <AppsFilter
  showFilters={showFilters}
  showRecents={showRecents}
  onClick={toggleRecents}
  onClick2={toggleFilters}
  darkMode={darkMode}
/> */
}
