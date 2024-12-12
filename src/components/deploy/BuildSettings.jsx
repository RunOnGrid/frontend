import Select from "@/commons/Select";
import Select3 from "@/commons/Select3";
import Select2 from "@/commons/Select2";
import Image from "next/image";
import React, { forwardRef, useState } from "react";

const BuildSettings = forwardRef(({ onNext, darkMode, setImage }, ref) => {
  const [build, setBuild] = useState(false);
  const [gitRepo, setGitRepo] = useState("");
  const [gitBranch, setGitBranch] = useState("");

  const handleGitRepo = (selectedOption) => {
    setGitRepo(selectedOption);
  };
  const handleGitBranch = (selectedOption) => {
    setGitBranch(selectedOption);
  };
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
                Grid-Client
              </div>
            </span>
          </div>
          <div className={`buildpack-single ${darkMode ? "dark" : "light"}`}>
            <h3> GitHub repository</h3>
            <Select
              options={[
                "repository-01/Grid-Client",
                "repository-02/Grid-Client",
                "repository-03/Grid-Client",
              ]}
              onSelect={handleGitRepo}
            />
          </div>
        </div>
        <div className="buildpack-selects">
          <div className={`buildpack-single3 ${darkMode ? "dark" : "light"}`}>
            <h3> GitHub branch</h3>
            <Select
              darkMode={darkMode}
              options={["Main", "Develop", "Production"]}
              onSelect={handleGitBranch}
            />
          </div>
          {/* <div className={`buildpack-single ${darkMode ? "dark" : "light"}`}>
            <h3> Application root path</h3>

            <div className={`input-with-image5 ${darkMode ? "dark" : "light"}`}>
              <input
                onChange={(e) => setImage(e.target.value)}
                placeholder="./"
              />
              <Image alt="" src="/searchLigth.png" height={20} width={20} />
            </div>
          </div> */}
        </div>
        <button onClick={onNext} className="add-button4">
          Continue
        </button>
      </div>
    </div>
  );
});
BuildSettings.displayName = "BuildSettings";
export default BuildSettings;
