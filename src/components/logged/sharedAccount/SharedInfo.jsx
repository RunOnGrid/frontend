
import React, { useState } from 'react';
import SharedBox from './SharedBox';
import Image from 'next/image';
import SharedPopUp from './SharedPopUp';

const SharedInfo = () => {
  const [selected, setSelected] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
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
    <div className={`dashboard-container ${darkMode ? 'dark' : 'light'}`}>
 
    
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <div className="toggle-mode">
          <label className="switch">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={toggleDarkMode}
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div
          className={`notification-icon ${darkMode ? 'dark' : 'light'}`}
          onClick={toggleNotifications}>
          <img
            src={`/${darkMode ? 'notification2.png' : 'notification.png'}`}
            alt="Notifications"
          />
        </div>
        {showNotifications && (
          <div className={`notifications-popup ${darkMode ? 'dark' : 'light'}`}>
            <h2>Notifications</h2>
            <div className={`notification-item ${darkMode ? 'dark' : 'light'}`}>
              <span className="dot green"></span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
            <div className={`notification-item ${darkMode ? 'dark' : 'light'}`}>
              <span className="dot orange"></span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
            <div className={`notification-item ${darkMode ? 'dark' : 'light'}`}>
              <span className="dot green"></span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
            <div className={`notification-item ${darkMode ? 'dark' : 'light'}`}>
              <span className="dot red"></span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
          </div>
        )}
      </div>
      <div style={{ padding: '50px' }}>
        <div className={`infoShared-titulo ${darkMode ? 'dark' : 'light'}`}>
          Shared Account
        </div>
        <span className={`span-shared ${darkMode ? 'dark' : 'light'}`}>
          Generate a project invite for another user
        </span>
        <div
          className={`sharedInfo-span-container ${
            darkMode ? 'dark' : 'light'
          }`}>
          <span
            className={`sharedInfo-span ${darkMode ? 'dark' : 'light'}`}
            onClick={() => toggle(1)}>
            Application
          </span>
        </div>

        <div
          className={`contenedor-nuevo-shared ${darkMode ? 'dark' : 'light'}`}>
          <div> Share Project</div>

          <span>Select project</span>
          <div style={{ display: 'flex' }}>
            <SharedBox mode={darkMode} />
            <SharedBox mode={darkMode} />
            <SharedBox mode={darkMode} />
          </div>

          <span> Specify a role for this user</span>
          <div className={`botones-shared ${darkMode ? 'dark' : 'light'}`}>
            <button> Owner</button>
            <button> Admin </button>
            <button> Developer </button>
            <button> Viewer </button>
          </div>
          <span>Users address</span>
          <input
            className={`shared-input ${darkMode ? 'dark' : 'light'}`}
            placeholder="ex:hello@ongrid.run"
          />
          <button>Generate Invite</button>
          <div
            className={`linea-separadora2 ${
              darkMode ? 'dark' : 'light'
            }`}></div>
          <div> Invites & collaborators</div>
          <span style={{ marginBottom: '40px' }}>
            Manage pending invites and view collaborators.
          </span>
          <div className={`shared-columnas ${darkMode ? 'dark' : 'light'}`}>
            <span>Project</span>
            <span>User</span>
            <span>Role</span>
            <span>Status</span>
            <span>Invite Link</span>
            <div>
              <img />
            </div>
            <div>
              {' '}
              <img />
            </div>
          </div>
          <div className={`shared-columnas2 ${darkMode ? 'dark' : 'light'}`}>
            <span>Project Name</span>
            <span>email@google.com</span>
            <span>Viewer</span>
            <span>Pending</span>
            <span>
              Copy{' '}
              <Image
                alt=""
                src={`${darkMode ? '/copy.png' : '/copyL.png'}`}
                height={15}
                width={15}
              />
            </span>
            <div>
              <Image
                alt=""
                src={`${darkMode ? '/invitation.png' : '/invitationL.png'}`}
                height={25}
                width={25}
                onClick={handleImageClick}
              />
            </div>
            <div>
              <Image
                alt=""
                src={`${darkMode ? '/delete2.png' : '/deleteL.png'}`}
                height={25}
                width={25}
              />
            </div>
          </div>
          <div className={`shared-columnas2 ${darkMode ? 'dark' : 'light'}`}>
            <span>Project Name</span>
            <span>email@google.com</span>
            <span>Viewer</span>
            <span>Pending</span>
            <span>
              Copy{' '}
              <Image
                alt=""
                src={`${darkMode ? '/copy.png' : '/copyL.png'}`}
                height={15}
                width={15}
              />
            </span>
            <div>
              <Image
                alt=""
                src={`${darkMode ? '/invitation.png' : '/invitationL.png'}`}
                height={25}
                width={25}
                onClick={handleImageClick}
              />
            </div>
            <div>
              <Image
                alt=""
                src={`${darkMode ? '/delete2.png' : '/deleteL.png'}`}
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
