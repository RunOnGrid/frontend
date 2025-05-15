"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { TokenService } from "../../../tokenHandler";
import { useRouter } from "next/router";
import Image from "next/image";


export default function ZelcoreLogin({ apiUrl = "https://api.runonflux.io", isLoading, setIsLoading }) {
  const [message, setMessage] = useState("");
  const [fetching, setFetching] = useState(false)
  const [error, setError] = useState("");
  const router = useRouter();
  useEffect(() => {
    fetchMessage();
  }, []);

  const fetchMessage = async () => {
    setFetching(true);
    setError("");
    try {
      const result = await axios.get(`${apiUrl}/id/loginphrase`);

      setMessage(result.data.data);
    } catch (err) {
      console.error("Error fetching message:", err);
      setError("Error al obtener frase de inicio de sesión");
    } finally {
      setFetching(false);
    }
  };

  const handleZelcoreLogin = async () => {
    if (!message) {
      setError("No hay mensaje disponible");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // URL para WebSocket de Zelcore
      const socketURL = `wss://${apiUrl.replace(
        "https://",
        ""
      )}/ws/id/${message}`;
    

      // URL para abrir Zelcore
      const zelcoreUrl = `zel:?action=sign&message=${message}&icon=https%3A%2F%2Fraw.githubusercontent.com%2Frunonflux%2Fflux%2Fmaster%2FzelID.svg&callback=${apiUrl}/id/verifylogin`;

      // Abrir Zelcore
      const open = window.open(zelcoreUrl, "_blank");
      if (!open) {
        throw new Error(
          "No se pudo abrir Zelcore. Asegúrate de que esté instalado o intenta copiar este enlace: " +
            zelcoreUrl
        );
      }

      // Conectar al WebSocket
      const zelcoreWebSocket = new WebSocket(socketURL);



      zelcoreWebSocket.onmessage = async (event) => {
      

        // Convertir el mensaje en un objeto de parámetros
        const params = new URLSearchParams(event.data);

        // Obtener el status
        const status = params.get("status") || "";
      

        // Extraer los datos anidados
        const data = {};
        for (const [key, value] of params.entries()) {
          if (key.startsWith("data[")) {
            const cleanKey = key.replace(/^data\[(.*?)\]$/, "$1");
            data[cleanKey] = decodeURIComponent(value);
          }
        }
       

        // Verificar si el status es "success" y si hay datos
        if (status === "success" && Object.keys(data).length > 0) {
          const extractedData = {
            zelid: data.zelid || "",
            signature: data.signature || "",
            loginPhrase: data.loginPhrase || "",
          };

          try {
            
            const response = await fetch("/api/zelcore-proxy", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(extractedData),
            });

            if (response.ok) {
              const data = await response.json();
            
              const oneHourInMilliseconds = 3600000;
              TokenService.setTokens({
                accessToken: data.authResponse.token,
                expiresAt: Date.now() + oneHourInMilliseconds,
                gridId: data.authResponse.userId,
              });
              localStorage.setItem("grid_email", data.authResponse.userId);
              router.push("/profile");
            }
          } catch (verifyErr) {
            console.error("Error al verificar login:", verifyErr);
            setError("Error al verificar las credenciales");
          }
        }
      };

      zelcoreWebSocket.onerror = (error) => {
        console.error("Error de WebSocket:", error);
        setError("Error en la conexión WebSocket");
      };

 
    } catch (err) {
      console.error("Error:", err);
      setError(
        err instanceof Error ? err.message : "Ha ocurrido un error desconocido"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        className="keplr-signIn"
        onClick={handleZelcoreLogin}
        disabled={isLoading}
      >
        <Image
          alt="Sign in with Zelcore"
          src="/zelID.svg"
          width={25}
          height={25}
        />
      </button>
    </>
  );
}
