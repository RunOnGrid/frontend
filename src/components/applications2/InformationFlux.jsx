import React, { useState } from "react";
import General from "./General";
import { useTheme } from "@/ThemeContext";
import ProfileLoading from "@/commons/ProfileLoading";
import Spinner from "@/commons/Spinner";
import { TokenService } from "../../../tokenHandler";
import DeleteModal from "../DeleteModal";
import { useRouter } from "next/router";

const InformationFlux = ({ isLoading, app }) => {
  const { darkMode } = useTheme();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteName, setDeleteName] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [blureado, setBlureado] = useState(false);
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
      router.push('/profile')
      
    } catch (err) {
      console.error("Error loading existing app names:", err);
    }
  };

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
            <h1>General</h1>
          </div>
          <div className="content">
            <div
              style={{ display: "flex", flexDirection: "column", width: "80%" }}
            >
              <General app={app} darkMode={darkMode} />
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
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default InformationFlux;