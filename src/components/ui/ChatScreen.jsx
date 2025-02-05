import Image from "next/image";
import React, { useState, useEffect } from "react";

import useToast from "./UseToast";
import { useTheme } from "@/ThemeContext";
import Spinner from "@/commons/Spinner";
import { useRouter } from "next/router";

export default function Component() {
  const { darkMode } = useTheme();
  const [isDeploying, setIsDeploying] = useState(false);
  const router = useRouter();
  const { toast, toasts } = useToast();
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const [deploymentMessage, setDeploymentMessage] = useState("Deploy");
  const handleDeploy = async () => {
    setIsDeploying(true);
    setDeploymentMessage(""); // Vaciar el mensaje para mostrar el Spinner
    // Simula un despliegue real
    setTimeout(() => {
      setIsDeploying(false);
      setDeploymentMessage("Deploy Successful"); // Cambiar el texto del botón
      setTimeout(() => {
        router.push("/profile/project/activity"); // Redirigir a la página deseada
      }, 1000); // Esperar 1 segundo antes de redirigir
    }, 3000); // Esperar 3 segundos para simular el despliegue
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };
  const handleSendMessage = () => {
    if (userInput.trim() !== "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "user", text: userInput },
      ]);
      setUserInput("");

      // Check if the user input contains "postgresql"
      if (userInput.toLowerCase().includes("postgresql")) {
        // Esperar 2 segundos antes de enviar el mensaje con las especificaciones
        setTimeout(() => {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              type: "ai",
              text: `Processor: A high-power processor (8-16 vCPUs) should be sufficient to handle the workload of 4 concurrent users and a large database.\n
                     Memory RAM: 32-64 GB of RAM may be sufficient to store and process a large database and to handle the workload of 4 concurrent users.\n
                     Storage: 100-200 GB of storage may be sufficient to store a large database with 10000 columns and 10000 rows.\n
                     Geolocation: North America\n
                     Cloud: Flux`,
            },
          ]);

          // Mostrar el Summary después de 1 segundo de enviar el mensaje
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
                      <li style={{ color: "black" }}>
                        Deploy PostgreSQL Database
                      </li>
                      <li style={{ color: "black" }}>
                        Geolocation: North America
                      </li>
                      <li style={{ color: "black" }}>Price: 7 $USD/month</li>
                    </ul>

                    <button
                      className="deploy-button"
                      style={{ marginTop: "16px", width: "100%" }}
                    >
                      Deploy
                    </button>
                  </div>
                ),
              },
            ]);
          }, 1000); // Muestra el Summary después de 1 segundo del mensaje de especificaciones
        }, 2000); // Envía el primer mensaje después de 2 segundos
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
                        padding: "16px",
                        borderRadius: "8px",
                        width: "40%",
                      }}
                      className={`msj-gridops ${darkMode ? "dark" : "light"}`}
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
                  onKeyDown={handleKeyDown}
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
