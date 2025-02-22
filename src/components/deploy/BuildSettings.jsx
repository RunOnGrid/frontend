import Select from "@/commons/Select";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { forwardRef, useState, useEffect } from "react";

const BuildSettings = forwardRef(
  ({ onNext, darkMode, setImage, repositories }, ref) => {
    const [gitRepo, setGitRepo] = useState("");
    const [gitBranch, setGitBranch] = useState("");
    const [branches, setBranches] = useState([]);
    const [gridName, setGridName] = useState("");
    const [repos, setRepos] = useState([]);
    const router = useRouter();
    const { installationId } = router.query;

    useEffect(() => {
      if (installationId) {
        handleRepos();
      }
    }, [installationId]);

    const handleRepos = async () => {
      try {
        const response = await fetch(
          `/api/repositories-proxy?installationId=${installationId}`,
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
    useEffect(() => {
      setGridName(repositories[0].owner);
    }, [repositories]);

    // const handleGitRepo = async (selectedOption) => {
    //   setGitRepo(selectedOption);

    //   const selectedRepo = repositories.find(
    //     (repo) => repo.fullname === selectedOption
    //   );

    //   if (selectedRepo) {
    //     try {
    //       const response = await fetch(
    //         `/api/branches-proxy?id=${selectedRepo.id}`
    //       );
    //       if (!response.ok) {
    //         throw new Error(`Error fetching branches: ${response.statusText}`);
    //       }
    //       const data = await response.json();
    //       setBranches(data.map((branch) => branch.name)); // Ajusta según el formato de datos del backend
    //     } catch (error) {
    //       console.error("Error fetching branches:", error);
    //       setBranches([]);
    //     }
    //   }
    // };

    // const handleGitBranch = (selectedOption) => {
    //   setGitBranch(selectedOption);
    // };

    // Transform repositories to match Select options

    return (
      <div ref={ref}>
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
                  {gridName}
                </div>
              </span>
            </div>
            <div className={`buildpack-single ${darkMode ? "dark" : "light"}`}>
              <h3> GitHub repository</h3>
              <Select options={repos} onSelect={setGitRepo} />
            </div>
          </div>
          <div className="buildpack-selects">
            <div className={`buildpack-single3 ${darkMode ? "dark" : "light"}`}>
              <h3> GitHub branch</h3>
              <Select
                darkMode={darkMode}
                options={branches} // Usamos las ramas obtenidas
                onSelect={setGitBranch}
              />
            </div>
          </div>
          <button onClick={onNext} className="add-button4">
            Continue
          </button>
        </div>
      </div>
    );
  }
);
BuildSettings.displayName = "BuildSettings";
export default BuildSettings;
