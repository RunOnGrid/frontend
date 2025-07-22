import React, { forwardRef, useState } from "react";
import RepositorySettings from "../RepoSettings";
import AddComponent from "./AddComponent";
import RepositorySettingsAkash from "../RepoSettingsAkash";

const BuildSettings = forwardRef(
  (
    {
      onNext,
      darkMode,
      setRepoTag,
      summary,
      owner,
      setOwner,
      setDisableSelect,
      ram,
      hdd,
      cpu,
      setCpu,
      setRam,
      setHdd,
      setImagePath,
      setInstances,
      min,
      singleRepo,
      setSingleRepo,
      branch,
      setBranch,
      installationId,
      setInstallationId,
      instances,
      cloud,
      workflow,
      setWorkflow,
      workflowInstalled,
      setWorkflowInstalled,
    },
    ref
  ) => {
    const [next, setNext] = useState(false);
    return (
      <div className={`databaseSelect ${summary ? "disabled" : ""}`}>
        <div className="components-display">
          {cloud === "flux" ? (
            <RepositorySettings
              darkMode={darkMode}
              summary={summary}
              owner={owner}
              setOwner={setOwner}
              setRepoTag={setRepoTag}
              setImagePath={setImagePath}
              setDisableSelect={setDisableSelect}
              onNextStep={onNext}
              singleRepo={singleRepo}
              setSingleRepo={setSingleRepo}
              branch={branch}
              setBranch={setBranch}
              installationId={installationId}
              setInstallationId={setInstallationId}
              setNext={setNext}
            />
          ) : (
            <RepositorySettingsAkash
              darkMode={darkMode}
              summary={summary}
              owner={owner}
              setOwner={setOwner}
              setRepoTag={setRepoTag}
              setImagePath={setImagePath}
              setDisableSelect={setDisableSelect}
              onNextStep={onNext}
              setNext={setNext}
              workflow={workflow}
              setWorkflow={setWorkflow}
              workflowInstalled={workflowInstalled}
              setWorkflowInstalled={setWorkflowInstalled}
            />
          )}
        </div>
        {next && (
          <div ref={ref}>
            <AddComponent
              darkMode={darkMode}
              onNext={onNext}
              onSaveComponentData={{}}
              cpu={cpu}
              setCpu={setCpu}
              ram={ram}
              setRam={setRam}
              hdd={hdd}
              setHdd={setHdd}
              setInstances={setInstances}
              instances={instances}
              min={min}
              plan={"flux"}
              next={next}
              setNext={setNext}
            />
          </div>
        )}
      </div>
    );
  }
);

BuildSettings.displayName = "BuildSettings";
export default BuildSettings;

{
  /* <RepositorySettings
            darkMode={darkMode}
            summary={summary}
            owner={owner}
            setOwner={setOwner}
            setRepoTag={setRepoTag}
            setImagePath={setImagePath}
            setDisableSelect={setDisableSelect}
            onNextStep={onNext}
            singleRepo={singleRepo}
            setSingleRepo={setSingleRepo}
            branch={branch}
            setBranch={setBranch}
            installationId={installationId}
            setInstallationId={setInstallationId}
          /> */
}
