import Image from "next/image";
import React, { forwardRef, useEffect, useState } from "react";
import Buildpack from "../Buildpack";
import BuildSettings from "../BuildSettings";
import Select from "@/commons/Select";
import JsonEditor from "@/components/flux/JsonEditor";
import Link from "next/link";
import { useRouter } from "next/router";
const gitUrl = process.env.NEXT_PUBLIC_GIT_URL;
const MethodSelectFlux = forwardRef(
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
    const router = useRouter();

    const { installation_id } = router.query;
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
      setBuild(false);
      setBuild2(false);
      onDocker();
    };
    const handleSelect = (option) => {
      setImage(option);
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
      <div ref={ref} className="databaseSelect">
        <div style={{ display: "flex" }}>
          <h3>2.</h3>
          <div className="databaseSelect-title">
            <span>Select a deployment method</span>
            <p>Deploy from a Git repository or a Docker registry</p>
          </div>
        </div>
        <div className="deployMethodBox-container">
          <div
            onClick={handleGit}
            className={`deployMethodBox ${darkMode ? "dark" : "light"} ${
              selectedMethod === "git" ? "selected" : ""
            } ${selectedMethod === "docker" ? "disabled" : ""}`}
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
            <h4>Docker repository</h4>
            <p>Specify your image URL : Ex: gridcloud/hello-app:1.0</p>
          </div>
        </div>

        {grid ? (
          <>
            {" "}
            <span> Github App</span>
            {build ? (
              ""
            ) : (
              <p className="span-deploy">Install our github app.</p>
            )}
            {build || appInstalled ? (
              <div className="install-github2">
                {console.log(build, appInstalled, "esto es el log")}
                <Image alt="" src="/github3.png" height={15} width={15} />
                <span>Installed</span>
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
      </div>
    );
  }
);
MethodSelectFlux.displayName = "MethodSelectFlux";
export default MethodSelectFlux;

{
  /* <div className="input-with-image4">
  <input
    onChange={(e) => setImage(e.target.value)}
    placeholder="Default: gridcloud/aptos-app:v.1"
  />
  <Image alt="" src="/searchLigth.png" height={20} width={20} />
</div> */
}

{
  /* {build ? (
  <>
    {" "}
    <BuildSettings
      onClick={() => setBuild2(true)}
      value={build2}
      darkMode={darkMode}
    />{" "}
  </>
) : (
  ""
)}

{build2 ? (
  <>
    {" "}
    <Buildpack onClick={onNext} darkMode={darkMode} />{" "}
  </>
) : (
  ""
)} */
}
{
  /* {docker ? (
          <>
            <span> Image settings</span>
            <p className="span-deploy">Select our whitelisted images URL.</p>
            <Select
              darkMode={darkMode}
              options={["gridcloud/aptos-app:v.1", "gridcloud/hello-app:2.0"]}
              onSelect={handleSelect}
            />
            <button
              onClick={() => {
                onDocker();
              }}
              className="add-button2"
            >
              Continue
            </button>
          </>
        ) : (
          ""
        )} */
}