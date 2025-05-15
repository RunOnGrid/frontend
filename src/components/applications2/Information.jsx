import React, { useState } from "react";
import General from "./General";
import { useTheme } from "@/ThemeContext";
import ProfileLoading from "@/commons/ProfileLoading";
import Spinner from "@/commons/Spinner";
import { TokenService } from "../../../tokenHandler";
import { useRouter } from "next/router";

const Information = ({ isLoading, app }) => {
  const { darkMode } = useTheme();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const tokens = TokenService.getTokens();
  const accessToken = tokens.tokens.accessToken;
  const handleRefund = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/refund-proxy`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          deployId: app.id,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error refunding app: ${response.statusText}`);
      }

      const data = await response.json();
      setLoading(false);
      router.push("/profile");
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };
  return (
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
              {app.cloudProvider === "AKASH" && loading ? (
                <Spinner />
              ) : (
                <div className="noti-buttons2">
                  <button className="noti-button3" onClick={handleRefund}>
                    {" "}
                    Refund App
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Information;
{
  /* <Domains darkMode={darkMode} /> */
}

{
  /* <a href="https://meet.google.com/jrb-zjea-msu" className="link">
          https://meet.google.com/jrb-zjea-msu
        </a> */
}
{
  /* <div className="deployment-info">
            <div className={`info-box ${darkMode ? "dark" : "light"}`}>
              <h4>Last deployed</h4>
              <span>------------</span>
            </div>
            <div className={`info-box ${darkMode ? "dark" : "light"}`}>
              <h4>Renewal date</h4>
              <span>-------</span>
            </div>
          </div> */
}