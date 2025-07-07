import Botonera2 from "@/commons/Botonera2";
import LoadingText from "@/commons/LoaderText";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { TokenService } from "../../../tokenHandler";

const ComponentSummary = ({
  components,
  allSelectedLocations,
  setWorkflowFinished,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    const tokens = TokenService.getTokens();
    setAccessToken(tokens.tokens.accessToken);
  }, [accessToken]);
  const totalPrice = components
    .reduce((acc, comp) => acc + (comp.price || 0), 0)
    .toFixed(2);

  const handleMultipleDeployments = async (components) => {
    setIsLoading(true);

    try {
      const payload = {
        name: components[0]?.name,
        description: "Application deployed by Grid",
        compose: components.map((component) => ({
          ...component.compose[0],
        })),
        instances: components[0]?.instances || 3,
        contacts: [],
        geolocation: allSelectedLocations,
        expire: components[0]?.expire || 22000,
        nodes: [],
        staticip: false,
      };

      const response = await fetch("/api/flux-deploy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await response.json();
      router.push("/profile");
    } catch (error) {
      console.error("Deployment error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="components-container">
        <h2>Summary</h2>

        <div className="table-container">
          <table className="components-table">
            <thead>
              <tr>
                <th>Source</th>
                <th>Components</th>
                <th>CPU</th>
                <th>RAM</th>
                <th>SSD</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {components.map((component, index) => (
                <>
                  <tr key={index}>
                    <td>
                      <Image
                        src={
                          component.provider === "github"
                            ? "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/d472f998-71f5-4f4a-b9c4-63cd2708f400/public"
                            : "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/369e3a29-c8f7-481e-6234-1e5e1c26e500/public"
                        }
                        width={18}
                        height={18}
                        alt=""
                      />
                    </td>
                    <td>{component.name}</td>
                    {/* <td>{component.instances}</td> */}
                    <td>{component.compose[0].cpu || "---"}</td>
                    <td>{component.compose[0].ram || "---"}</td>
                    <td>
                      {component.compose[0].ssd ||
                        component.compose[0].hdd ||
                        "---"}
                    </td>
                    <td>${component.price.toFixed(2)}</td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
          <h3 className="span-total-summary">Total: ${totalPrice}</h3>
        </div>
      </div>
      {/* <div className="termService">
        <Botonera2 setAgree={setAgree} agree={agree} />
        <h4>I agree with Terms of Service</h4>
      </div> */}
      <button
        onClick={() => {
          setWorkflowFinished(false);
        }}
        className="add-button5"
      >
        Edit components
      </button>
      <div className="deploy-button-wrapper">
        <div className="line-background"></div>
        {isLoading ? (
          <div className="loading-container">
            <LoadingText />
          </div>
        ) : (
          <>
            <button
              className="deploy-button"
              onClick={() => {
                handleMultipleDeployments(components);
              }}
              disabled={isLoading}
            >
              Deploy
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ComponentSummary;
