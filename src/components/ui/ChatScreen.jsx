import Image from "next/image";
import React, { useState, useEffect } from "react";

import useToast from "./UseToast";
import { useTheme } from "@/ThemeContext";

export default function Component() {
  const { darkMode } = useTheme();
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployProgress, setDeployProgress] = useState(0);
  const { toast, toasts } = useToast();
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const handleDeploy = () => {
    setIsDeploying(true);
    setDeployProgress(0);

    const interval = setInterval(() => {
      setDeployProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setIsDeploying(false);
          toast({
            title: "Deployment Successful",
            description: "Your PostgreSQL database has been deployed.",
          });
          return 0;
        }
        return prevProgress + 10;
      });
    }, 500);
  };

  const handleSendMessage = () => {
    if (userInput.trim() !== "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "user", text: userInput },
      ]);
      setUserInput("");

      // Check if the user input is "gridOps"
      if (userInput.toLowerCase() === "gridops") {
        setTimeout(() => {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              type: "ai",
              text: (
                <div
                  style={{
                    backgroundColor: "#f0f0f0",
                    padding: "16px",
                    borderRadius: "8px",
                  }}
                >
                  <h3 style={{ fontWeight: 600 }}>Summary</h3>
                  <ul
                    style={{
                      marginTop: "8px",
                      paddingLeft: "20px",
                    }}
                  >
                    <li style={{ color: "black" }}>Deploy PostgreSQL</li>
                    <li style={{ color: "black" }}>
                      1000 rows and 1000 columns capacity
                    </li>
                    <li style={{ color: "black" }}>
                      Geolocation: North America
                    </li>
                  </ul>
                  <div style={{ marginTop: "16px" }}>
                    <div style={{ fontSize: "14px", fontWeight: 600 }}>
                      {isDeploying
                        ? `Deploying: ${deployProgress}%`
                        : "Estimated time: 5m 30s"}
                    </div>
                    <div
                      style={{
                        marginTop: "8px",
                        height: "8px",
                        width: "100%",
                        backgroundColor: "#e0e0e0",
                        borderRadius: "4px",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: isDeploying ? `${deployProgress}%` : "33%",
                          backgroundColor: "#00b174",
                          borderRadius: "4px",
                          transition: "width 0.5s ease-in-out",
                        }}
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleDeploy}
                    disabled={isDeploying}
                    style={{ marginTop: "16px", width: "100%" }}
                  >
                    {isDeploying ? "Deploying..." : "Deploy"}
                  </button>
                </div>
              ),
            },
          ]);
        }, 500);
      } else {
        setTimeout(() => {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              type: "ai",
              text: "Hello, I'm the GridOps Bot. How can I assist you today?",
            },
          ]);
        }, 500);
      }
    }
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };
  return (
    <div className={`dashboard-container ${darkMode ? "dark" : "light"}`}>
      <div
        style={{
          display: "grid",
          height: "30vh",
          width: "70%",
          margin: "0px auto",
        }}
      >
        <div className="chat-container">
          <div className="img-gridOps">
            <Image alt="" src="/gridOps2.svg" height={130} width={350} />
          </div>

          <main
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div style={{ overflowY: "auto", height: "calc(95vh - 180px)" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {messages.map((message, index) => (
                  <div
                    key={`message-${index}-${Date.now()}`}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "16px",
                      flexDirection:
                        message.type === "user" ? "row-reverse" : "row",
                    }}
                  >
                    <Image
                      alt=""
                      height={50}
                      width={50}
                      src={
                        message.type === "user"
                          ? "/memberDark.svg"
                          : "/logoGridVacio.svg"
                      }
                    />
                    <div
                      style={{
                        backgroundColor:
                          message.type === "user" ? "#f0f0f0" : "#f0f0f0",
                        padding: "16px",
                        borderRadius: "8px",
                      }}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex" }}>
              <div
                className={`input-container4 ${darkMode ? "dark" : "light"}`}
              >
                <input
                  placeholder="Type your message..."
                  style={{ flex: 1 }}
                  value={userInput}
                  onChange={handleInputChange}
                />
              </div>
              <button className="button-gridOps" onClick={handleSendMessage}>
                <Image alt="" src="/upArrow1.png" height={15} width={15} />
              </button>
            </div>
          </main>
        </div>
        {toasts.map((toast) => (
          <div
            key={toast.id}
            style={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              backgroundColor: "white",
              padding: "16px",
              borderRadius: "4px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h4>{toast.title}</h4>
            <p>{toast.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
