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
              <Image
                alt=""
                src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/a026aa32-7d83-4ca8-242f-cd73c585e300/public"
                height={50}
                width={50}
              />
              <h4>Git repository</h4>
              <p>Deploy from a git repository</p>
            </div>
            <div
              onClick={handleDocker}
              className={`deployMethodBox ${darkMode ? "dark" : "light"} ${
                selectedMethod === "docker" ? "selected" : ""
              } ${selectedMethod === "git" ? "disabled" : ""}`}
            >
              <Image
                alt=""
                src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/7dd0dd0c-99bd-4ac0-f4c6-f00622e19e00/public"
                height={50}
                width={50}
              />
              <img
                alt=""
                src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/ce196ae6-b580-40c8-f971-634b6a3a2300/public"
                height={50}
                width={50}
                className="icon-container"
              />
              <h4>Container registry</h4>
              <p>Specify your image URL : Ex: gridcloud/hello-app:1.0</p>
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
                    <Image
                      alt=""
                      src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/cc2bcad2-ca88-47ef-799c-bed2b0dbb100/public"
                      height={15}
                      width={15}
                    />
                    <span>Installed</span>
                  </div>
                  <Link href={gitUrl} target="_blank">
                    <Image
                      alt=""
                      src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/6442612d-3e4b-42fc-09fe-0d68f44f5900/public"
                      width={22}
                      height={22}
                    />
                  </Link>
                </div>
              ) : (
                <Link href={gitUrl}>
                  <div className="install-github">
                    <Image
                      alt=""
                      src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/eacc86c6-9be8-42e5-ed65-197583304200/public"
                      height={15}
                      width={15}
                    />
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
