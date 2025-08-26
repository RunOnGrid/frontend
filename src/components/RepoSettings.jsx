import Select from "@/commons/Select";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Select4 from "@/commons/Select4";
import Spinner from "@/commons/Spinner";
import { TokenService } from "../../tokenHandler";

const RepositorySettings = ({
  darkMode,
  owner,
  setOwner,
  onNextStep,
  singleRepo,
  setSingleRepo,
  setBranch,
  installationId,
  setInstallationId,
  setNext,
}) => {
  const [gitRepo, setGitRepo] = useState("");
  const [branches, setBranches] = useState([]);
  const [gridId, setGridId] = useState("");
  const [repos, setRepos] = useState([]);
  const [workflowInstalled, setWorkflowInstalled] = useState(false);

  const [loadingWorkflow, setLoadingWorkflow] = useState(false);

  useEffect(() => {
    if (gridId) {
      handleRepos();
    }
  }, [gridId]);

  // useEffect(() => {
  //   const response = TokenService.getTokens();
  //   setGridId(response.tokens.gridId);
  // }, []);

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
        setNext(true);
        onNextStep();
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
        <div className="buildpack-double">
          <div className={`buildpack-single ${darkMode ? "dark" : "light"}`}>
            <h3>GitHub repository</h3>
            <Select options={repos} onSelect={setGitRepo} />
          </div>
          <div className={`buildpack-single ${darkMode ? "dark" : "light"}`}>
            <h3>Branches</h3>
            <Select4 options={branches} onSelect={handleBranch} />
          </div>
        </div>
      </div>
      {loadingWorkflow && <Spinner />}
    </div>
  );
};

export default RepositorySettings;

{
  /* {workflow && !showNext && (
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
      )} */
}

{
  /* {errorWorkflow && (
        <div className="text-container">
          <span className="texto-pipeline2">The pipeline has failed.</span>
          <Link href={workflowUrl} target="_blank">
            <span style={{ marginBottom: "-20px" }} className="texto-pipeline2">
              {workflowUrl}
            </span>
          </Link>
        </div>
      )} */
}
{
  /* {showNext && (
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
      )} */
}