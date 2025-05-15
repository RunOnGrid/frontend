import Image from "next/image";
import React, { forwardRef, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import SliderComp from "@/components/slider/SliderComp";
import GithubFlux from "./GithubFlux";
import BuildFlux from "@/components/flux/BuildFlux";
import FluxSlider from "@/components/slider/FluxSlider";
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
    const [compDuration, setCompDuration] = useState(20160);
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
      <div ref={ref} className={`databaseSelect `}>
        <div style={{ display: "flex" }}>
          <h3>2.</h3>
          <div className="databaseSelect-title">
            <span>Component</span>
          </div>
        </div>
        <div className="component-container">
          <h3>Establish a global duration for all components </h3>
          <FluxSlider
            disableSelect={disableSelect}
            setCompDuration={setCompDuration}
          />
          <div
            className={`deployMethodBox-container ${
              disableSelect ? "disabled" : ""
            }`}
          >
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
              <h4>Container registry </h4>
              <p>Deploy a container from an image registry</p>
            </div>
          </div>

          {grid ? (
            <div className="git-install-cont">
              {" "}
              {build ? "" : <p> Install the Github App to continue </p>}
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
                <div className="install-github">
                  <Link href={gitUrl}>
                    <Image alt="" src="/github3.png" height={15} width={15} />
                    <span>Install </span>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            ""
          )}
          {selectedCloud === "flux" && deployOption === "githubFlux" && (
            <>
              <GithubFlux
                image={image}
                databaseName={databaseName}
                setInstalled={setInstalled}
                setDisableSelect={setDisableSelect}
                selectedCloud={selectedCloud}
                compDuration={compDuration}
              />
            </>
          )}
          {selectedCloud === "flux" && deployOption === "dockerFlux" && (
            <>
              <BuildFlux
                compDuration={compDuration}
                selectedCloud={selectedCloud}
              />
            </>
          )}
        </div>
      </div>
    );
  }
);
MethodSelectFlux.displayName = "MethodSelectFlux";
export default MethodSelectFlux;
