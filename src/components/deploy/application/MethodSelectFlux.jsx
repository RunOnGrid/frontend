import Image from "next/image";
import React, { forwardRef, use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import SliderComp from "@/components/slider/SliderComp";
import GithubFlux from "./GithubFlux";
import BuildFlux from "@/components/flux/BuildFlux";
import FluxSlider from "@/components/slider/FluxSlider";
import { useComponentFormState } from "@/hooks/useComponentFormState";
import { useFluxConfig } from "@/hooks/useFluxConfig";
const gitUrl = process.env.NEXT_PUBLIC_GIT_URL;
const MethodSelectFlux = forwardRef(
  (
    {
      setDeployOption,
      darkMode,
      appInstalled,
      disableSelect,
      setInstalled,
      setDisableSelect,
      selectedCloud,
      deployOption,
      setComponents,
      components,
      resetFlow,
    },
    ref
  ) => {
    const [email, setEmail] = useState("");
    const [showConfig, setShowConfig] = useState(false);
    const [workflowFinished, setWorkflowFinished] = useState(false);
    const [workflowLoading, setWorkflowLoading] = useState(false);
    const [allowedLocations, setAllowedLocations] = useState([]);
    const [forbiddenLocations, setForbiddenLocations] = useState([]);
    const [allSelectedLocations, setAllSelectedLocations] = useState([]);

    const { config, setters } = useFluxConfig(email);
    const { loadComponent, resetComponent } = useComponentFormState(setters);

    const handleGit = () => {
      setters.setSelectedMethod("git");
      setters.setGrid(true);
      setters.setDocker(false);
      setters.setName("");
      setters.setRepoTag("");
      setters.setSummary(false);
      setDeployOption("githubFlux");
    };
    const handleDocker = () => {
      setters.setSelectedMethod("docker");
      setters.setGrid(false);
      setters.setDocker(true);
      setters.setBuild(false);
      setters.setName("");
      setters.setRepoTag("");
      setters.setSummary(false);
      setDeployOption("dockerFlux");
    };
    const handleLoadComp = (component) => {
      if (component.option === "git") {
        setters.setSelectedMethod("git");
        setters.setGrid(true);
        setters.setDocker(false);
        setters.setBuild(true);
        setters.setSummary(false);
        setShowConfig(true);
        setDeployOption("githubFlux");
      } else if (component.option === "docker") {
        setters.setSelectedMethod("docker");
        setters.setGrid(false);
        setters.setDocker(true);
        setters.setBuild(false);
        setters.setSummary(false);
        setDeployOption("dockerFlux");
      }
    };
    useEffect(() => {
      const emailGrid = localStorage.getItem("grid_email");
      setEmail(emailGrid);
    }, [email]);
    useEffect(() => {
      const installed = localStorage.getItem("gridInstalled");
      if (installed && config.grid) {
        setters.setBuild(true);
        setDeployOption("githubFlux");
      }
    }, [config.grid]);

    return (
      <div ref={ref} className={`databaseSelect `}>
        <button
          onClick={() => {
            console.log(allSelectedLocations);
          }}
        >
          ver locations
        </button>
        <div style={{ display: "flex" }}>
          <h3>2.</h3>
          <div className="databaseSelect-title">
            <span>Component</span>
          </div>
        </div>
        <div className="component-container">
          <div className={`${workflowFinished ? "disabled2" : ""}`}>
            <h3>
              Establish a global duration and instances for all components{" "}
            </h3>
            <div
              className={`${
                components.length > 0 && config.summary ? "disabled2" : ""
              }`}
            >
              <FluxSlider
                disableSelect={disableSelect}
                setCompDuration={setters.setCompDuration}
                instances={config.instances}
                setInstances={setters.setInstances}
                allowedLocations={allowedLocations}
                setAllowedLocations={setAllowedLocations}
                forbiddenLocations={forbiddenLocations}
                setForbiddenLocations={setForbiddenLocations}
                darkMode={darkMode}
                allSelectedLocations={allSelectedLocations}
                setAllSelectedLocations={setAllSelectedLocations}
              />
            </div>

            <div className={`component-list`}>
              <h4>Current Components</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {components.map((comp, index) => (
                  <div key={index}>
                    <button
                      className="neutro-btn"
                      onClick={() => {
                        loadComponent(components[index]);
                        handleLoadComp(comp);
                      }}
                    >
                      {comp.name}
                    </button>
                    <button
                      className="no-btn2"
                      onClick={() => {
                        setComponents((prev) =>
                          prev.filter((_, i) => i !== index)
                        );
                      }}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {components.length === 10 ? (
              ""
            ) : (
              <button
                className="add-button"
                onClick={() => {
                  resetComponent();
                  setters.setGrid(false);
                  setters.setDocker(false);
                  setters.setSelectedMethod("");
                  resetFlow();
                }}
              >
                Add new comp +
              </button>
            )}
          </div>

          <div
            className={`deployMethodBox-container ${
              components.length > 0 && config.summary ? "disabled" : ""
            }`}
          >
            <div
              onClick={handleGit}
              className={`deployMethodBox ${darkMode ? "dark" : "light"} ${
                config.selectedMethod === "git" ? "selected" : ""
              } ${config.selectedMethod === "docker" ? "disabled" : ""} `}
            >
              <Image
                alt=""
                src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/d1ebaebc-ed30-4982-8371-b0b6e290c500/public"
                height={50}
                width={50}
              />
              <h4>Git repository</h4>
              <p>Deploy from a git repository</p>
            </div>
            <div
              onClick={handleDocker}
              className={`deployMethodBox ${darkMode ? "dark" : "light"} ${
                config.selectedMethod === "docker" ? "selected" : ""
              } ${config.selectedMethod === "git" ? "disabled" : ""}`}
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
              <h4>Container registry </h4>
              <p>Deploy a container from an image registry</p>
            </div>
          </div>

          {config.grid ? (
            <div
              className={`git-install-cont ${config.summary ? "disabled" : ""}`}
            >
              {" "}
              {config.build ? "" : <p> Install the Github App to continue </p>}
              {config.build || appInstalled ? (
                <div className="install-container">
                  <div className="install-github2">
                    <Image
                      alt=""
                      src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/eacc86c6-9be8-42e5-ed65-197583304200/public"
                      height={15}
                      width={15}
                    />

                    <span>Installed</span>
                  </div>
                  <Link href={gitUrl} target="_blank">
                    <Image
                      alt=""
                      src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/69bb67f5-0980-44b3-ae86-c9b7813e4d00/public"
                      width={22}
                      height={22}
                    />
                  </Link>
                </div>
              ) : (
                <div className="install-github">
                  <Link href={gitUrl}>
                    <Image
                      alt=""
                      src="https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/cc2bcad2-ca88-47ef-799c-bed2b0dbb100/public"
                      height={15}
                      width={15}
                    />
                    <span>Install </span>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            ""
          )}
          {selectedCloud === "flux" &&
            deployOption === "githubFlux" &&
            config.build === true && (
              <>
                <GithubFlux
                  setInstalled={setInstalled}
                  setDisableSelect={setDisableSelect}
                  selectedCloud={selectedCloud}
                  loadComponent={loadComponent}
                  resetComponent={resetComponent}
                  setComponents={setComponents}
                  components={components}
                  showConfig={showConfig}
                  setShowConfig={setShowConfig}
                  workflowFinished={workflowFinished}
                  setWorkflowFinished={setWorkflowFinished}
                  workflowLoading={workflowLoading}
                  setWorkflowLoading={setWorkflowLoading}
                  setDeployOption={setDeployOption}
                  config={config}
                  setters={setters}
                />
              </>
            )}
          {selectedCloud === "flux" && deployOption === "dockerFlux" && (
            <>
              <BuildFlux
                setInstalled={setInstalled}
                setDisableSelect={setDisableSelect}
                selectedCloud={selectedCloud}
                loadComponent={loadComponent}
                resetComponent={resetComponent}
                setComponents={setComponents}
                components={components}
                workflowFinished={workflowFinished}
                setWorkflowFinished={setWorkflowFinished}
                workflowLoading={workflowLoading}
                setWorkflowLoading={setWorkflowLoading}
                setDeployOption={setDeployOption}
                config={config}
                setters={setters}
                allSelectedLocations={allSelectedLocations}
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
