import Paginacion from '@/commons/Paginacion';
import HostingWeb from '@/components/cards/HostingWeb';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const DynamicNavbar = dynamic(() => import('../../commons/SideNavbar'), {
  ssr: false,
  loading: () => <p> Im f</p>,
});

export default function LoggedHosting() {
  const [visible, setVisible] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleSideBar = () => {
    return setVisible(!visible);
  };
  return (
    <div className="logged-home-component2">
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <DynamicNavbar />
        <div
          style={{ width: '100%', marginLeft: '100px', marginRight: 'auto' }}>
          <div style={{ opacity: '0' }}>.</div>
          {/* 
          <Paginacion
            anterior="Services"
            links="/profile"
            titulo="Setup Application"
          /> */}
          <div
            className={`notification-icon ${darkMode ? 'dark' : 'light'}`}
            onClick={toggleNotifications}>
            <img
              src={`${darkMode ? '/notification2.png' : '/notification.png'}`}
              alt="Notifications"
            />
          </div>
          {showNotifications && (
            <div
              className={`notifications-popup ${darkMode ? 'dark' : 'light'}`}>
              <h2>Notifications</h2>
              <div
                className={`notification-item ${darkMode ? 'dark' : 'light'}`}>
                <span className="dot green"></span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </div>
              <div
                className={`notification-item ${darkMode ? 'dark' : 'light'}`}>
                <span className="dot orange"></span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </div>
              <div
                className={`notification-item ${darkMode ? 'dark' : 'light'}`}>
                <span className="dot green"></span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </div>
              <div
                className={`notification-item ${darkMode ? 'dark' : 'light'}`}>
                <span className="dot red"></span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </div>
            </div>
          )}
          {/* <HostingWeb /> */}
        </div>
      </div>
      {/* <HostingBought/> */}
    </div>
  );
}
