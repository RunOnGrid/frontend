import React, { forwardRef } from "react";
import { TokenService } from "../../../tokenHandler";
import RepositorySettings from "../RepoSettings";
import AddComponent from "./AddComponent";
import RepositorySettingsAkash from "../RepoSettingsAkash";

const BuildSettings = forwardRef(
  ({
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
    existingNames,
  }) => {
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
            />
          )}
          {/* <RepositorySettings
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
          /> */}
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
          />
        </div>
      </div>
    );
  }
);

BuildSettings.displayName = "BuildSettings";
export default BuildSettings;
