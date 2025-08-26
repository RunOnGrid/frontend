import Image from "next/image";
import React, { useEffect, useState } from "react";
import ComponentSummary from "./ComponentSummary";
import Spinner from "@/commons/Spinner";
import { TokenService } from "../../../tokenHandler";

import { useComponentFormState } from "@/hooks/useComponentFormState";

const ComponentsTable = ({
  components,
  setComponents,
  workflowFinished, // We might deprecate this if workflowOverallStatus handles all cases
  setWorkflowFinished, // We might deprecate this
  workflowLoading,
  setWorkflowLoading,
  setDeployOption,
  setSummary, // This prop might be redundant now, as we use local state
  config,
  setters,
  setShowConfig,
  allSelectedLocations,
  resetFlow,
}) => {
  const [accessToken, setAccessToken] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);
  const [workflowOverallStatus, setWorkflowOverallStatus] = useState("pending");
  const [showSummary, setShowSummary] = useState(false); // New state for summary visibility

  const { loadComponent, resetComponent } = useComponentFormState(setters);


  // Update workflowOverallStatus based on individual component states
  useEffect(() => {
    const hasPendingOrBuilding = components.some(
      (component) =>
        component.state === "building" || component.state === "pending"
    );
    const hasFailed = components.some(
      (component) => component.state === "failed"
    );
    const allSuccess = components.every(
      (component) => component.state === "success"
    );

    if (hasFailed) {
      setWorkflowOverallStatus("failed");
      setShowSummary(false); // Hide summary if a build failed
    } else if (hasPendingOrBuilding) {
      setWorkflowOverallStatus("building");
      setShowSummary(false); // Hide summary if still building/pending
    } else if (allSuccess && components.length > 0) {
      setWorkflowOverallStatus("success");
      // Don't set setShowSummary(true) here, it's user-triggered
    } else {
      setWorkflowOverallStatus("pending"); // Default or initial state
      setShowSummary(false); // Hide summary if no components or initial state
    }
  }, [components]);

  const handleRunWorkflows = async () => {
    setWorkflowLoading(true);
    setWorkflowOverallStatus("building"); // Set overall status to building when workflows start
    setShowSummary(false); // Ensure summary is hidden when a new build starts

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
        let newUrl = component.url;
        if (component.state !== "success") {
          try {
            const response = await handleWorkflow(component);
            newState = response.ok ? "success" : "failed";
            newUrl = response.url;
          } catch (err) {
            newState = "failed";
          }
        }

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

        return { ...component, state: newState, price, url: newUrl };
      })
    );

    setWorkflowLoading(false);
    setComponents(updatedComponents);
    // workflowOverallStatus will be updated by the useEffect based on updatedComponents
  };

  const handleLoadComp = (component) => {
    // // Hide summary when loading a component to edit/add
    // setShowSummary(false);

    if (component.option === "git") {
      setters.setSelectedMethod("git");
      setters.setGrid(true);
      setters.setDocker(false);
      setters.setBuild(true);
      setters.setSummary(false);
      setters.setColapse(false);
      setShowConfig(true);
      setDeployOption("githubFlux");
    } else if (component.option === "docker") {
      setters.setSelectedMethod("docker");
      setters.setGrid(false);
      setters.setDocker(true);
      setters.setBuild(false);
      setters.setColapse(false);
      setSummary(false);
      setDeployOption("dockerFlux");
    }
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
      const data = await response.json();

      const htmlUrl = data.workflow_run ? data.workflow_run.html_url : null;
      if (response.status === 200) {
        // Extract html_url from the response body

        return { status: "success", url: htmlUrl }; // Return url along with status
      }

      if (response.status === 500) {
        return { status: "failed", url: htmlUrl };
      }

      return { status: "pending", url: htmlUrl };
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
              resolve({ ok: true, url: result.url });
            } else if (result.status === "failed") {
              clearInterval(statusInterval);
              resolve({ ok: false, url: result.url });
            } else if (attempts >= maxAttempts) {
              clearInterval(statusInterval);
              resolve({ ok: false, url: result.url });
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

  const handleActionButtonClick = () => {
    if (workflowOverallStatus === "success") {
      setShowSummary(true); // User clicks "Checkout", so show the summary
    } else {
      handleRunWorkflows(); // User clicks "Build All"
    }
  };
  const toggleRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index); // Si ya está expandida, la cierra; si no, la abre
  };
  return (
    <div>
      <div className={`components-container ${showSummary ? "disabled" : ""}`}>
        <h3>Components</h3>
        <button
          className="add-button6"
          onClick={() => {
            resetComponent();
            setters.setGrid(false);
            setters.setDocker(false);
            setters.setSelectedMethod("");
            resetFlow();
            setShowConfig(false);
            setShowSummary(false); // Hide summary when adding a new component
          }}
        >
          Add component +
        </button>
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {components.map((component, index) => (
                <React.Fragment key={index}>
                  <tr
                    className="row-components"
                    onClick={() => toggleRow(index)}
                  >
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
                        onClick={() => {
                          setComponents((prev) =>
                            prev.filter((_, i) => i !== index)
                          );
                          setShowSummary(false); // Hide summary if a component is removed
                        }}
                        className="edit-comp"
                        src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/46d8f987-0d7b-4e53-775d-8191152ad700/public"
                        width={18}
                        height={18}
                        alt=""
                      />
                      <Image
                        onClick={() => {
                          loadComponent(components[index]);
                          handleLoadComp(component);
                        }}
                        className="edit-comp"
                        src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/9de9cc42-a765-42b3-df0e-b8747163e900/public"
                        width={18}
                        height={18}
                        alt=""
                      />
                    </td>
                  </tr>
                  {expandedRow === index && (
                    <tr className="expanded-row">
                      <td colSpan="7">
                        <div className="expanded-content">
                          <h3>
                            The workflow URL will be shown here once it finish.
                          </h3>
                          <p
                            className={
                              component.state === "success" ? (
                                "success-work"
                              ) : component.state === "building" ? (
                                "build-work"
                              ) : component.state === "failed" ? (
                                "failed-work"
                              ) : (
                                <span>Ready</span>
                              )
                            }
                          >
                            {component.url ? (
                              <a
                                href={component.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {component.url}
                              </a>
                            ) : (
                              "N/A"
                            )}
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>

          {/* Conditional rendering for buttons/messages */}
          {workflowOverallStatus === "failed" && !workflowLoading ? (
            <p className="error-text2">
              There was an error building one or more components. Please check
              the component states.
            </p>
          ) : workflowLoading ? (
            <div className="spinner-container">
              <Spinner />
            </div>
          ) : (
            <button
              className="add-button4"
              onClick={handleActionButtonClick}
              disabled={components.length === 0} // Disable if no components
            >
              {workflowOverallStatus === "success" ? "Checkout" : "Build All"}
            </button>
          )}
        </div>
      </div>
      {/* Show ComponentSummary only if showSummary is true */}
      {showSummary ? (
        <ComponentSummary
          allSelectedLocations={allSelectedLocations}
          components={components}
          setWorkflowFinished={setShowSummary}
        />
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