import React, { forwardRef } from "react";
import { TokenService } from "../../../tokenHandler";
import RepositorySettings from "../RepoSettings";
import AddComponent from "./AddComponent";

const BuildSettings = forwardRef(
  ({
    onNext,
    darkMode,
    setImage,
    repositories,
    setRepoTag,
    summary,
    owner,
    setOwner,
    setDisableSelect,
    existingNames,
    image,
    setPat,
    ram,
    hdd,
    cpu,
    setCpu,
    setRam,
    setHdd,
    setImagePath,
    setInstances,
  }) => {
    return (
      <div className={`databaseSelect ${summary ? "disabled" : ""}`}>
        <div className="components-display">
          <RepositorySettings
            darkMode={darkMode}
            summary={summary}
            owner={owner}
            setOwner={setOwner}
            setRepoTag={setRepoTag}
            setImagePath={setImagePath}
            setDisableSelect={setDisableSelect}
            onNextStep={onNext}
          />
          <AddComponent
            darkMode={darkMode}
            onNext={onNext}
            onSaveComponentData={{}}
            image={image}
            cpu={cpu}
            setCpu={setCpu}
            ram={ram}
            setRam={setRam}
            hdd={hdd}
            setHdd={setHdd}
            setInstances={setInstances}
          />
        </div>
      </div>
    );
  }
);

BuildSettings.displayName = "BuildSettings";
export default BuildSettings;
