import Select from "@/commons/Select";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Select4 from "@/commons/Select4";
import Spinner from "@/commons/Spinner";
import { TokenService } from "../../tokenHandler";

const RepositorySettingsAkash = ({
  darkMode,
  summary,
  owner,
  setOwner,
  setRepoTag,
  setDisableSelect,
  onNextStep,
  setImagePath,
}) => {
  const [gitRepo, setGitRepo] = useState("");
  const [branches, setBranches] = useState([]);
  const [workflow, setWorkflow] = useState(false);
  const [workflowUrl, setWorkflowUrl] = useState("");
  const [gridId, setGridId] = useState("");
  const [repos, setRepos] = useState([]);
  const [singleRepo, setSingleRepo] = useState("");
  const [installationId, setInstallationId] = useState("");
  const [notWorkflow, setNotWorkflow] = useState(false);
  const [workflowInstalled, setWorkflowInstalled] = useState(false);
  const [branch, setBranch] = useState("");
  const [showNext, setShowNext] = useState(false);
  const [loadingWorkflow, setLoadingWorkflow] = useState(false);
  const [workflowRun, setWorkflowRun] = useState(false);
  const [errorWorkflow, setErrorWorkflow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (gridId) {
      handleRepos();
    }
  }, [gridId]);

  useEffect(() => {
    const response = TokenService.getTokens();
    setGridId(response.tokens.gridId);
  }, []);

  useEffect(() => {
    if (repos && repos.length > 0) {
      const [owner, repo] = repos[0].fullName.split("/");
      setOwner(owner);
      setInstallationId(repos[0].installationId);
    }
  }, [repos]);

  useEffect(() => {
    if (gitRepo !== "") {
      const [owner, repo] = gitRepo.split("/");
      setSingleRepo(repo);
    }
  }, [gitRepo]);

  useEffect(() => {
    if (installationId && singleRepo) {
      handleBranches();
    }
  }, [singleRepo]);

  const handleRepos = async () => {
    try {
      const response = await fetch(
        `/api/repositories-proxy?installationId=${gridId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error fetching branches: ${response.statusText}`);
      }

      const data = await response.json();

      setRepos(data.message);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  const handleBranches = async () => {
    try {
      const response = await fetch(
        `/api/branches-proxy?installationId=${installationId}&repoFullName=${owner}/${singleRepo}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error fetching branches: ${response.statusText}`);
      }

      const data = await response.json();
      setBranches(data.branches);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  const checkWorkflowStatus = async (installationId, owner, repo, runId) => {
    try {
      const response = await fetch(
        `/api/work-status-proxy?installationId=${installationId}&owner=${owner}&repo=${repo}&runId=${runId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setDisableSelect(false);
        return { status: "success" };
      }

      if (response.status === 500) {
        setDisableSelect(false);
        throw new Error("Failed to run workflow successfully");
      }

      return { status: "pending" };
    } catch (error) {
      throw error;
    }
  };

  const handleWorkflow = async () => {
    setLoadingWorkflow(true);
    setDisableSelect(true);
    setWorkflowInstalled(false);

    try {
      const response = await fetch(`/api/workflows-proxy`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          installationId: installationId,
          owner: owner,
          repo: singleRepo,
          workflow: "grid-ci.yml",
          branch: branch,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error fetching branches: ${response.statusText}`);
      }

      const data = await response.json();
      setWorkflowUrl(data.workflow_url);
      setRepoTag(`ghcr.io/${owner}/${singleRepo}:latest`);
      setImagePath(`${owner}/${singleRepo}`);
      setWorkflowRun(true);
      setWorkflow(true);
      setLoadingWorkflow(false);

      // Start polling for workflow status
      const statusInterval = setInterval(async () => {
        try {
          const result = await checkWorkflowStatus(
            installationId,
            owner,
            singleRepo,
            data.runId
          );

          if (result.status === "success") {
            clearInterval(statusInterval);
            setShowNext(true);
            setDisableSelect(false);
          }
        } catch (pollingError) {
          // This will now catch the 500 status error
          clearInterval(statusInterval);
          setErrorWorkflow(true);
          setErrorMessage("Failed to run workflow successfully");
          setNotWorkflow(true);
          setWorkflow(false);
          setLoadingWorkflow(false);
          setDisableSelect(false);
          console.error("Workflow status error:", pollingError);
        }
      }, 10000);
    } catch (error) {
      setNotWorkflow(true);
      setWorkflow(false);
      setLoadingWorkflow(false);
      setDisableSelect(false);
      console.error("Error fetching branches:", error);
      alert(error.message);
    }
  };

  const handleCommit = async (option) => {
    setLoadingWorkflow(true);
    setWorkflowInstalled(false);
    try {
      const response = await fetch(`/api/commit-workflow-proxy`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          installationId: installationId,
          owner: owner,
          repo: singleRepo,
          workflow: "grid-ci.yml",
          branch: option,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error fetching branches: ${response.statusText}`);
      }
      if (response.ok) {
        const data = await response.json();
        setWorkflowInstalled(true);
        setLoadingWorkflow(false);
      }
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  const handleBranch = (option) => {
    handleCommit(option);
    setBranch(option);
  };

  return (
    <div className={`sub-component-container ${darkMode ? "dark" : "light"}`}>
      <div className="databaseSelect-title">
        <span>Repository Settings</span>
        <p>Specify your GitHub repository.</p>
      </div>
      <div className="buildpack-selects">
        <div className="buildpack-single">
          <h3>User</h3>
          <span className="buildpack-item">
            <div>
              <Image
                alt=""
                src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/d472f998-71f5-4f4a-b9c4-63cd2708f400/public"
                height={15}
                width={15}
              />
              {owner ? owner : ""}
            </div>
          </span>
        </div>
        <div className={`buildpack-single ${darkMode ? "dark" : "light"}`}>
          <h3>GitHub repository</h3>
          <Select options={repos} onSelect={setGitRepo} />
        </div>
        <div className={`buildpack-single ${darkMode ? "dark" : "light"}`}>
          <h3>Branches</h3>
          <Select4 options={branches} onSelect={handleBranch} />
        </div>
      </div>
      {loadingWorkflow && <Spinner />}
      {workflowInstalled ? (
        <div className="button-display">
          <button
            onClick={() => {
              handleWorkflow();
            }}
            className="add-button"
          >
            Run Workflow
          </button>
        </div>
      ) : (
        ""
      )}

      {workflow && !showNext && (
        <div className="workflow-text">
          <span className="workflow-text">
            Check the progress of the workflow on this url:
            <Link href={workflowUrl} target="_blank">
              <h2 className="buildpack-item2">
                {workflowUrl} <Spinner />{" "}
              </h2>
            </Link>
          </span>
        </div>
      )}

      {errorWorkflow && (
        <div className="text-container">
          <span className="texto-pipeline2">The pipeline has failed.</span>
          <Link href={workflowUrl} target="_blank">
            <span style={{ marginBottom: "-20px" }} className="texto-pipeline2">
              {workflowUrl}
            </span>
          </Link>
        </div>
      )}
      {showNext && (
        <div className="text-container">
          <span className="texto-pipeline">
            The pipeline has finished successfully.
          </span>
          <Link href={workflowUrl} target="_blank">
            <span style={{ marginBottom: "-20px" }} className="texto-pipeline">
              {workflowUrl}
            </span>
          </Link>
        </div>
      )}
      {showNext && (
        <button onClick={onNextStep} className="add-button4">
          Continue
        </button>
      )}
    </div>
  );
};

export default RepositorySettingsAkash;