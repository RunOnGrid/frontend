import Select from "@/commons/Select";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { forwardRef, useState, useEffect, use } from "react";
import { TokenService } from "../../../tokenHandler";
import Link from "next/link";
import Select4 from "@/commons/Select4";

const BuildSettings = forwardRef(
  (
    {
      onNext,
      darkMode,
      setImage,
      repositories,
      setRepoTag,
      summary,
      owner,
      setOwner,
    },
    ref
  ) => {
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

    const router = useRouter();

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

    const handleWorkflow = async () => {
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
        setWorkflow(true);
        setShowNext(true);
      } catch (error) {
        setNotWorkflow(true);
        console.error("Error fetching branches:", error);
      }
    };

    const handleCommit = async () => {
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
            branch: branch,
          }),
        });

        if (!response.ok) {
          throw new Error(`Error fetching branches: ${response.statusText}`);
        }

        const data = await response.json();
        setNotWorkflow(false);
        setWorkflowInstalled(true);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    return (
      <div className={`databaseSelect ${summary ? "disabled" : ""}`} ref={ref}>
        <div className={`add-buildpack ${darkMode ? "dark" : "light"}`}>
          <div className="databaseSelect-title">
            <h2>Repository Settings</h2>
            <p>Specify your GitHub repository.</p>
          </div>
          <div className="buildpack-selects">
            <div className="buildpack-single">
              <h3> User</h3>
              <span className="buildpack-item">
                <div>
                  <Image alt="" src="/githubLogin.png" height={15} width={15} />
                  {owner ? owner : ""}
                </div>
              </span>
            </div>
            <div className={`buildpack-single ${darkMode ? "dark" : "light"}`}>
              <h3> GitHub repository</h3>
              <Select options={repos} onSelect={setGitRepo} />
            </div>
            <div className={`buildpack-single ${darkMode ? "dark" : "light"}`}>
              <h3> Branches</h3>
              <Select4 options={branches} onSelect={setBranch} />
            </div>
          </div>
          {notWorkflow && (
            <div>
              <span>
                You don't have the workflow committed into your repo, commit it
                with this button:
              </span>
              <button onClick={() => handleCommit()} className="add-button">
                {" "}
                Commit grid-ci workflow
              </button>
            </div>
          )}
          {workflowInstalled && (
            <>
              <span>Workflow committed correctly</span>
            </>
          )}
          <button
            onClick={() => {
              handleWorkflow();
            }}
            className="add-button"
          >
            {" "}
            Run Workflow
          </button>

          {workflow && (
            <div className="workflow-text">
              <span className="workflow-text">
                {" "}
                Check the progress of the workflow on this url:
                <Link href={workflowUrl} target="_blank">
                  <h2>{workflowUrl} </h2>
                </Link>
              </span>
              <p>When the job is done press continue</p>
            </div>
          )}

          {/* <div className="buildpack-selects">
            <div className={`buildpack-single3 ${darkMode ? "dark" : "light"}`}>
              <h3> GitHub branch</h3>
              <Select
                darkMode={darkMode}
                options={branches} // Usamos las ramas obtenidas
                onSelect={setGitBranch}
              />
            </div>
          </div> */}
          {showNext && (
            <button onClick={onNext} className="add-button4">
              Continue
            </button>
          )}
        </div>
      </div>
    );
  }
);
BuildSettings.displayName = "BuildSettings";
export default BuildSettings;
