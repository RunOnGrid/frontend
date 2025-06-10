import React, { useState } from "react";
import SharedBox from "./SharedBox";
import Image from "next/image";
import SharedPopUp from "./SharedPopUp";
import { useTheme } from "@/ThemeContext";
import ThemeToggle from "@/components/ThemeToggle";
import Notis from "@/components/applications2/Notis";

const SharedInfo = () => {
  const [selected, setSelected] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const { darkMode } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggle = (i) => {
    return setSelected(i);
  };

  const handleImageClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className={`dashboard-container ${darkMode ? "dark" : "light"}`}>
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <ThemeToggle />
        <div
          className={`notification-icon ${darkMode ? "dark" : "light"}`}
          onClick={toggleNotifications}
        >
          <img
            src={`/${
              darkMode
                ? "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/9c8e0b0b-66e0-4ff9-8035-36e4f8074600/public"
                : "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/7d027139-b7ab-4069-7577-8f546dd02f00/public"
            }`}
            alt="Notifications"
          />
        </div>
        {showNotifications && <Notis darkMode={darkMode} />}
      </div>
      <div style={{ padding: "50px" }}>
        <div className={`infoShared-titulo ${darkMode ? "dark" : "light"}`}>
          Shared Account
        </div>
        <span className={`span-shared ${darkMode ? "dark" : "light"}`}>
          Generate a project invite for another user
        </span>
        <div
          className={`sharedInfo-span-container ${darkMode ? "dark" : "light"}`}
        >
          <span
            className={`sharedInfo-span ${darkMode ? "dark" : "light"}`}
            onClick={() => toggle(1)}
          >
            Application
          </span>
        </div>

        <div
          className={`contenedor-nuevo-shared ${darkMode ? "dark" : "light"}`}
        >
          <div> Share Project</div>

          <span>Select project</span>
          <div style={{ display: "flex" }}>
            <SharedBox mode={darkMode} />
            <SharedBox mode={darkMode} />
            <SharedBox mode={darkMode} />
          </div>

          <span> Specify a role for this user</span>
          <div className={`botones-shared ${darkMode ? "dark" : "light"}`}>
            <button> Owner</button>
            <button> Admin </button>
            <button> Developer </button>
            <button> Viewer </button>
          </div>
          <span>Users address</span>
          <input
            className={`shared-input ${darkMode ? "dark" : "light"}`}
            placeholder="ex:hello@ongrid.run"
          />
          <button>Generate Invite</button>
          <div
            className={`linea-separadora2 ${darkMode ? "dark" : "light"}`}
          ></div>
          <div> Invites & collaborators</div>
          <span style={{ marginBottom: "40px" }}>
            Manage pending invites and view collaborators.
          </span>
          <div className={`shared-columnas ${darkMode ? "dark" : "light"}`}>
            <span>Project</span>
            <span>User</span>
            <span>Role</span>
            <span>Status</span>
            <span>Invite Link</span>
          </div>
          <div className={`shared-columnas2 ${darkMode ? "dark" : "light"}`}>
            <span>Project Name</span>
            <span>email@google.com</span>
            <span>Viewer</span>
            <span>Pending</span>
            <span>
              Copy{" "}
              <Image
                alt=""
                src={`${
                  darkMode
                    ? "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/8167b686-f197-4352-505d-e2d422594d00/public"
                    : "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/27105ad1-2d98-472e-80ac-b16b151c5a00/public"
                }`}
                height={15}
                width={15}
              />
            </span>
            <div>
              <Image
                alt=""
                src={`${
                  darkMode
                    ? "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/329b241f-6d92-4777-58d4-6e2be83c8f00/public"
                    : "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/92a0559b-6816-4658-44e1-955f1b79ff00/public"
                }`}
                height={25}
                width={25}
                onClick={handleImageClick}
              />
            </div>
            <div>
              <Image
                alt=""
                src={`${
                  darkMode
                    ? "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/9e1c4c15-0514-4dda-1227-79a29b020300/public"
                    : "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/46d8f987-0d7b-4e53-775d-8191152ad700/public"
                }`}
                height={25}
                width={25}
              />
            </div>
          </div>
          <div className={`shared-columnas2 ${darkMode ? "dark" : "light"}`}>
            <span>Project Name</span>
            <span>email@google.com</span>
            <span>Viewer</span>
            <span>Pending</span>
            <span>
              Copy{" "}
              <Image
                alt=""
                src={`${
                  darkMode
                    ? "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/8167b686-f197-4352-505d-e2d422594d00/public"
                    : "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/27105ad1-2d98-472e-80ac-b16b151c5a00/public"
                }`}
                height={15}
                width={15}
              />
            </span>
            <div>
              <Image
                alt=""
                src={`${
                  darkMode
                    ? "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/329b241f-6d92-4777-58d4-6e2be83c8f00/public"
                    : "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/92a0559b-6816-4658-44e1-955f1b79ff00/public"
                }`}
                height={25}
                width={25}
                onClick={handleImageClick}
              />
            </div>
            <div>
              <Image
                alt=""
                src={`${
                  darkMode
                    ? "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/9e1c4c15-0514-4dda-1227-79a29b020300/public"
                    : "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/46d8f987-0d7b-4e53-775d-8191152ad700/public"
                }`}
                height={25}
                width={25}
              />
            </div>
          </div>
        </div>
      </div>
      {showPopup && (
        <div className="popup-overlay" onClick={handleClosePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <SharedPopUp handleClose={handleClosePopup} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SharedInfo;
