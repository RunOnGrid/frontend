import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "@/ThemeContext";
import AppsTableRow from "./AppsTableRow";
import AppsTableHeader from "./AppsTableHeader";
import MobileFooterBar from "./ProfileFooter";

const AppsTable = () => {
  const { darkMode } = useTheme();

  // Para que “It seems…” salga directo:
  const [apps] = useState([]);   // vacío
  const isLoading = false;       // sin loader

  return (
    <>
      <div className={`dashboard-container ${darkMode ? "dark" : "light"}`}>
        <div className="dashboard-header">
          <h1>My applications</h1>
        </div>

        <div className="table-container">
          {isLoading ? (
            <div className="loading">Loading…</div>
          ) : apps.length === 0 ? (
            <div className="applications-section">
              <p>It seems that you don&apos;t have any applications yet</p>
              <span>Start building your application now.</span>

              {/* Link directo (no dentro de <button>) */}
              <button className={"section-button"}> {" "} <Link href="/profile/deployApp">Deploy </Link> </button>
            </div>
          ) : (
            <>
              <AppsTableHeader />
              {apps.map((app, index) => (
                <div className="dashboard-row" key={app.id ?? index}>
                  <AppsTableRow
                    status={app.status}
                    mode={darkMode}
                    name={app.serviceName}
                    type={app.cloudProvider}
                    uri={app.uri}
                    creationDate={app.createdAt}
                    darkMode={darkMode}
                    app={app}
                  />
                </div>
              ))}
            </>
          )}
        </div>

        <MobileFooterBar />
      </div>
    </>
  );
};

export default AppsTable;
