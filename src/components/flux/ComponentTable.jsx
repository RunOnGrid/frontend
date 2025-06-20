import Image from "next/image";
import React, { useEffect, useState } from "react";
import ComponentSummary from "./ComponentSummary";
import Spinner from "@/commons/Spinner";
import { TokenService } from "../../../tokenHandler";

const ComponentsTable = ({
  components,
  setComponents,
  workflowFinished,
  setWorkflowFinished,
  workflowLoading,
  setWorkflowLoading,
}) => {
  const [accessToken, setAccessToken] = useState("");

  const [expandedRow, setExpandedRow] = useState(null);

  const [allSuccess, setAllSuccess] = useState(false);
  useEffect(() => {
    const tokens = TokenService.getTokens();
    setAccessToken(tokens.tokens.accessToken);
  }, [accessToken]);
  useEffect(() => {
    const hasPendingOrBuilding = components.some(
      (component) =>
        component.state === "building" || component.state === "pending"
    );

    if (!hasPendingOrBuilding) {
      setAllSuccess(true);
    }
  }, [components]);
  const handleRunWorkflows = async () => {
    setWorkflowLoading(true);

    const buildingComponents = components.map((component) => {
      if (component.state !== "success") {
        return { ...component, state: "building" };
      }
      return component;
    });
    setComponents(buildingComponents);

    const updatedComponents = await Promise.all(
      buildingComponents.map(async (component) => {
        let newState = component.state;
        if (component.state !== "success") {
          try {
            const response = await handleWorkflow(component);
            newState = response.ok ? "success" : "failed";
          } catch (err) {
            newState = "failed";
          }
        }

        // Obtener el precio, sin importar el estado
        let price = 0;
        try {
          const payload = {
            compose: [component.compose[0]],
            instances: component.instances,
            expire: component.expire,
          };
          const response = await fetch(`/api/get-price?cloudProvider=FLUX`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(payload),
          });

          const data = await response.json();
          price = data.price || 0;
        } catch (err) {
          price = 0;
        }

        return { ...component, state: newState, price };
      })
    );

    setWorkflowLoading(false);
    setWorkflowFinished(true);
    setComponents(updatedComponents);
  };

  const checkWorkflowStatus = async (component, runId) => {
    try {
      const response = await fetch(
        `/api/work-status-proxy?installationId=${component.installationId}&owner=${component.owner}&repo=${component.repo}&runId=${runId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        return { status: "success" };
      }

      if (response.status === 500) {
        throw new Error("Failed to run workflow successfully");
      }

      return { status: "pending" };
    } catch (error) {
      throw error;
    }
  };
  const handleWorkflow = async (component) => {
    try {
      const response = await fetch(`/api/workflows-proxy`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          installationId: component.installationId,
          owner: component.owner,
          repo: component.repo,
          workflow: "grid-ci.yml",
          branch: component.branch,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error running workflow: ${response.statusText}`);
      }

      const data = await response.json();
      const runId = data.runId;

      return await new Promise((resolve, reject) => {
        const maxAttempts = 12; // 2 minutos si el intervalo es 10s
        let attempts = 0;

        const statusInterval = setInterval(async () => {
          attempts++;

          try {
            const result = await checkWorkflowStatus(component, runId);

            if (result.status === "success") {
              clearInterval(statusInterval);
              resolve({ ok: true });
            } else if (result.status === "failed") {
              clearInterval(statusInterval);
              resolve({ ok: false });
            } else if (attempts >= maxAttempts) {
              clearInterval(statusInterval);
              resolve({ ok: false }); // timeout
            }
          } catch (pollingError) {
            clearInterval(statusInterval);
            reject(pollingError);
          }
        }, 10000);
      });
    } catch (error) {
      console.error("Workflow execution error:", error);
      throw error;
    }
  };
  return (
    <div>
      <div
        className={`components-container ${workflowFinished ? "disabled" : ""}`}
      >
        <h3>Components</h3>

        <div className="table-container">
          <table className="components-table">
            <thead>
              <tr>
                <th>Source</th>
                <th>Name</th>
                <th>State</th>
                <th>User</th>
                <th>Image/repotag</th>
                <th>Branch</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {components.map((component, index) => (
                <>
                  <tr
                    key={index}
                    // onClick={() => handleRowClick(component.id)}
                    // className={expandedRow === index ? "row-active" : ""}
                  >
                    {console.log(component)}
                    <td>
                      <Image
                        src={
                          component.provider === "git"
                            ? "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/d1ebaebc-ed30-4982-8371-b0b6e290c500/public"
                            : component.compose[0].repotag.includes("ghcr")
                            ? "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/d472f998-71f5-4f4a-b9c4-63cd2708f400/public"
                            : "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/7dd0dd0c-99bd-4ac0-f4c6-f00622e19e00/public"
                        }
                        width={18}
                        height={18}
                        alt=""
                      />
                    </td>
                    <td>{component.name}</td>
                    <td>
                      {component.state === "pending" ? (
                        <span>Build</span>
                      ) : component.state === "building" ? (
                        <span>Building...</span>
                      ) : component.state === "failed" ? (
                        <span>Failed</span>
                      ) : (
                        <span>Ready</span>
                      )}
                    </td>
                    <td>
                      {component.owner !== ""
                        ? component.owner
                        : component.email}
                    </td>
                    <td>{component.compose[0].repotag}</td>
                    <td>{component.branch || "---"}</td>

                    <td>
                      <Image
                        onClick={(e) => e.stopPropagation()}
                        src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/46d8f987-0d7b-4e53-775d-8191152ad700/public"
                        width={18}
                        height={18}
                        alt=""
                      />
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
          {(workflowFinished && !workflowLoading) ||
          (!workflowFinished && workflowLoading) ? (
            ""
          ) : (
            <button
              className="add-button4"
              onClick={() => {
                handleRunWorkflows();
              }}
            >
              {" "}
              {allSuccess ? "Checkout" : "Build All"}
            </button>
          )}
        </div>
        {workflowLoading ? <Spinner /> : ""}
      </div>
      {workflowFinished ? (
        <ComponentSummary accessToken={accessToken} components={components} />
      ) : (
        ""
      )}
    </div>
  );
};

export default ComponentsTable;
{
  /* 
      <div className="action-buttons">
        <button className="build-all-button">Build All</button>
        <button className="continue-button">Continue</button>
      </div> */
}
{
  /* {expandedRow === component.id && (
                <tr className="expanded-row">
                  <td colSpan={8}>
                    <div className="pipeline-info-container">
                      <div className="pipeline-info">
                        <span className="success-icon">✓</span>
                        <span className="pipeline-text">The pipeline has finished successfully.</span>
                      </div>
                        <a href={component.pipelineUrl} className="pipeline-link">{component.pipelineUrl}</a>
                    </div>
                  </td>
                </tr>
              )} */
}
