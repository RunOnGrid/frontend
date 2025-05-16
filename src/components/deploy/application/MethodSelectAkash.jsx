import BuildAkash from "@/components/akash/BuildAkash";
import Image from "next/image";
import Link from "next/link";
import React, { forwardRef, useEffect, useState } from "react";
import GithubAkash from "./GithubAkash";
const gitUrl = process.env.NEXT_PUBLIC_GIT_URL;
const MethodSelectAkash = forwardRef(
  (
    {
      onDocker,
      onGit,
      darkMode,
      onClick,
      value,
      setImage,
      methodReset,
      installed,
      appInstalled,
      disableSelect,
      image,
      databaseName,
      setInstalled,
      setDisableSelect,
      selectedCloud,
      deployOption,
    },
    ref
  ) => {
    const [build, setBuild] = useState(false);
    const [build2, setBuild2] = useState(false);
    const [grid, setGrid] = useState(false);
    const [docker, setDocker] = useState(false);
    const [git, setGit] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
    const [email, setEmail] = useState("");

    const handleGit = () => {
      setSelectedMethod("git");
      setImage(false);
      setGrid(!grid);
      setDocker(false);
      methodReset();
    };

    const handleDocker = () => {
      setSelectedMethod("docker");
      setGrid(false);
      setDocker(true);
      onDocker();
    };

    useEffect(() => {
      const emailGrid = localStorage.getItem("grid_email");
      setEmail(emailGrid);
    }, [email]);
    useEffect(() => {
      const installed = localStorage.getItem("gridInstalled");
      if (installed && grid) {
        setBuild(true);
        onGit();
      }
    }, [grid]);
    useEffect(() => {
      if (appInstalled && grid) {
        setBuild(true);
        onGit();
      }
    }, [grid]);

    return (
      <div ref={ref} className={`databaseSelect `}>
        <div style={{ display: "flex" }}>
          <h3>2.</h3>
          <div className="databaseSelect-title">
            <span>Component</span>
          </div>
        </div>
        <div className="component-container">
          <div
            className={`deployMethodBox-container ${
              disableSelect ? "disabled" : ""
            }`}
          >
            <div
              onClick={handleGit}
              className={`deployMethodBox ${darkMode ? "dark" : "light"}`}
            >
              <Image alt="" src="/iconGit.png" height={50} width={50} />
              <h4>Git repository</h4>
              <p>Deploy from a git repository</p>
            </div>
            <div
              onClick={handleDocker}
              className={`deployMethodBox ${darkMode ? "dark" : "light"} ${
                selectedMethod === "docker" ? "selected" : ""
              } ${selectedMethod === "git" ? "disabled" : ""}`}
            >
              <Image alt="" src="/dockerIcon.png" height={50} width={50} />
              <h4>Container registry</h4>
              <p>Specify your image URL : Ex: gridcloud/hello-app:1.0</p>
              <p className="deploy-sub-p">
                :latest tag is not recommended on akash deploys
              </p>
            </div>
          </div>
          {grid ? (
            <>
              {" "}
              {build ? (
                ""
              ) : (
                <p className="span-deploy">Install our github app.</p>
              )}
              {build || appInstalled ? (
                <div className="install-container">
                  <div className="install-github2">
                    <Image alt="" src="/github3.png" height={15} width={15} />
                    <span>Installed</span>
                  </div>
                  <Link href={gitUrl} target="_blank">
                    <Image
                      alt=""
                      src="/settingsLigth.png"
                      width={22}
                      height={22}
                    />
                  </Link>
                </div>
              ) : (
                <Link href={gitUrl}>
                  <div className="install-github">
                    <Image alt="" src="/github3.png" height={15} width={15} />
                    <span>Install the Grid GitHub app</span>
                  </div>
                </Link>
              )}
            </>
          ) : (
            ""
          )}
          {selectedCloud === "akash" && deployOption === "dockerAkash" && (
            <BuildAkash selectedCloud={selectedCloud} darkMode={darkMode} />
          )}

          {selectedCloud === "akash" && deployOption === "githubAkash" && (
            <>
              <GithubAkash
                image={image}
                databaseName={databaseName}
                setInstalled={setInstalled}
                setDisableSelect={setDisableSelect}
                selectedCloud={selectedCloud}
              />
            </>
          )}
        </div>
      </div>
    );
  }
);

MethodSelectAkash.displayName = "MethodSelectAkash";
export default MethodSelectAkash;
