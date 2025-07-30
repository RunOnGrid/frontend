import React, { useEffect, useState } from "react";
import General from "./General";
import { useTheme } from "@/ThemeContext";
import ProfileLoading from "@/commons/ProfileLoading";
import Spinner from "@/commons/Spinner";
import { TokenService } from "../../../tokenHandler";
import DeleteModal from "../DeleteModal";
import { useRouter } from "next/router";
import GeneralFlux from "./GeneralFlux";
import Select3 from "@/commons/Select3";
import Select from "@/commons/Select";
import Select4 from "@/commons/Select4";
import Select5 from "@/commons/Select5";

const InformationFlux = ({ isLoading, app }) => {
  const { darkMode } = useTheme();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteName, setDeleteName] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [blureado, setBlureado] = useState(false);
  const [ips, setIps] = useState([]);
  const [ipSelected, setIpSelected] = useState("");
  const router = useRouter();

  const tokens = TokenService.getTokens();
  const accessToken = tokens.tokens.accessToken;
  const handleModal = () => {
    setShowModal(true);
    setDeleteName(app.serviceName);
    setDeleteId(app.id);
  };
  const closeModal = () => {
    setBlureado(false);
    setShowModal(false);
  };

  const handleIps = async () => {
    try {
      const response = await fetch(
        `/api/ips-proxy?appName=${app.configurationDetails.name}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error fetching branches: ${response.statusText}`);
      }

      const data = await response.json();
      const originalIps = data.ips.map((item) => item.originalIp);

      setIps(originalIps);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };
  const deleteRow = async (id) => {
    try {
      const response = await fetch(`/api/delete-row-proxy?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const data = await response.json();
      setShowModal(false);
      router.push("/profile");
    } catch (err) {
      console.error("Error loading existing app names:", err);
    }
  };
  useEffect(() => {
    handleIps();
  }, [app]);
  return (
    <>
      {showModal && (
        <>
          <DeleteModal
            darkMode={darkMode}
            onClick={() => {
              closeModal();
            }}
            name={deleteName}
            onYes={deleteRow}
            id={deleteId}
          />
        </>
      )}
      <div className={`dashboard-container ${darkMode ? "dark" : "light"}`}>
        {isLoading ? (
          <ProfileLoading isVisible={isLoading} />
        ) : (
          <div className={`application-details ${darkMode ? "dark" : "light"}`}>
            <div className="header">
              <h1>{app.configurationDetails.name}</h1>
            </div>
            {ips.length > 0 ? (
              <div className="second-header">
                <Select5 onSelect={setIpSelected} options={ips} />
                <div class="status-card">
                  <img src="/signal.png" alt="Icon" class="status-icon" />
                  <div class="status-content">
                    <p class="status-name">pag6cboy22s</p>
                    <p class="status-indicator">Running</p>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            <div className="content">
              <GeneralFlux app={app} darkMode={darkMode} />
            </div>

            {app.cloudProvider === "FLUX" && loading ? (
              <Spinner />
            ) : (
              <div className="noti-buttons2">
                <button className="noti-button3" onClick={handleModal}>
                  {" "}
                  Delete App
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default InformationFlux;
