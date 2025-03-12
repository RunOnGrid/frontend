import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "@/ThemeContext";
import { TokenService } from "../../../tokenHandler";
import AppsTableRow from "./AppsTableRow";
import AppsTableHeader from "./AppsTableHeader";
import { useRouter } from "next/router";
import MobileFooterBar from "./ProfileFooter";
import Image from "next/image";
import DeleteModal from "../DeleteModal";
import Spinner from "@/commons/Spinner";
import ProfileLoading from "@/commons/ProfileLoading";

const AppsTable = () => {
  const { darkMode } = useTheme();
  const [accessToken2, setAccessToken2] = useState(null);
  const [email, setEmail] = useState("");
  const [apps, setApps] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteName, setDeleteName] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchRepos = async () => {
    const startTime = Date.now();

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
      setApps(data);
    } catch (err) {
      console.error("Error loading existing app names:", err);
    } finally {
      // Ensure loader displays for at least 700ms to avoid flash
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 700 - elapsedTime);

      setTimeout(() => {
        setIsLoading(false);
      }, remainingTime);
    }
  };

  useEffect(() => {
    const tokens = TokenService.getTokens();
    if (tokens && tokens.tokens && tokens.tokens.accessToken) {
      setAccessToken2(tokens.tokens.accessToken);
    }
    const userMail = localStorage.getItem("grid_email");
    setEmail(userMail);
  }, []);

  useEffect(() => {
    if (accessToken2) {
      fetchRepos();
    }
  }, [accessToken2]);

  const deleteRow = async (id) => {
    try {
      const response = await fetch(`/api/delete-row-proxy?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken2}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const data = await response.json();
      setShowModal(false);
      fetchRepos();
    } catch (err) {
      console.error("Error loading existing app names:", err);
    }
  };
  const sortedApps = apps.sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();

    return dateB - dateA;
  });

  const handleModal = (value, id) => {
    setShowModal(true);
    setDeleteName(value);
    setDeleteId(id);
  };

  return (
    <div className={`dashboard-container ${darkMode ? "dark" : "light"}`}>
      <div className="dashboard-header">
        <h2>My applications</h2>
      </div>
      {showModal && (
        <>
          <DeleteModal
            darkMode={darkMode}
            onClick={() => {
              setShowModal(false);
            }}
            name={deleteName}
            onYes={deleteRow}
            id={deleteId}
          />
        </>
      )}
      <div className="table-container">
        {isLoading ? (
          <ProfileLoading isVisible={isLoading} />
        ) : apps.length === 0 ? (
          <div
            className={`applications-section ${darkMode ? "dark" : "light"}`}
          >
            <p>It seems that you don&apos;t have any applications yet</p>
            <span> Start building your application now.</span>
            <Link href="/profile/deployApp">
              <button
                className={`section-button ${darkMode ? "dark" : "light"}`}
              >
                Deploy
              </button>
            </Link>
          </div>
        ) : (
          <>
            <AppsTableHeader />
            {sortedApps.map((app, index) => (
              <div className="dashboard-row" key={index}>
                <AppsTableRow
                  key={`row-${index}`}
                  status={app.status}
                  mode={darkMode}
                  name={app.serviceName}
                  type={app.cloudProvider}
                  uri={app.uri}
                  creationDate={app.createdAt}
                />
                <Image
                  onClick={() => handleModal(app.serviceName, app.id)}
                  alt=""
                  src={darkMode ? "/delete2.png" : "/deleteL.png"}
                  height={22}
                  width={22}
                />
              </div>
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
