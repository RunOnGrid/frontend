import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@/ThemeContext";
import AppCloudSelect from "./AppCloudSelect";
import { useRouter } from "next/router";
import MethodSelectAkash from "./MethodSelectAkash";
import MethodSelectFlux from "./MethodSelectFlux";
import MobileFooterBar from "@/components/applications2/ProfileFooter";

const DeployAppScreen = ({ appInstalled }) => {
  const { darkMode } = useTheme();
  const router = useRouter();
  const [databaseName, setDatabaseName] = useState("");

  const [completedSteps, setCompletedSteps] = useState([]);
  const [activeStep, setActiveStep] = useState(null);
  const [selectedCloud, setSelectedCloud] = useState(null);
  const [componentData, setComponentData] = useState({});
  const [components, setComponents] = useState([]);
  const [deployOption, setDeployOption] = useState("");
  const [agree, setAgree] = useState(false);
  const [image, setImage] = useState("gridcloud/hello-app:2.0");
  const [installed, setInstalled] = useState(false);
  const [disableSelect, setDisableSelect] = useState(false);

  const nameRef = useRef(null);
  const detailsRef = useRef(null);
  const servicesRef = useRef(null);
  const deployRef = useRef(null);
  const envRef = useRef(null);

  const handleSaveComponentData = (data) => {
    setComponentData(data);
  };

  useEffect(() => {
    if (activeStep === 1) {
      nameRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (activeStep === 2) {
      detailsRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (activeStep === 3 && selectedCloud === "flux") {
      servicesRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (activeStep === 4 && selectedCloud === "flux") {
      deployRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (activeStep === 5 && selectedCloud === "flux") {
      envRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeStep, selectedCloud]);

  const handleCompleteStep = (step) => {
    setCompletedSteps((prevSteps) => [...prevSteps, step]);
    setActiveStep(step + 1);
  };
  const resetFlow = () => {
    setDatabaseName("");
    setCompletedSteps([]);
    setActiveStep(null);
    setSelectedCloud(null);
    setComponentData({});
    setAgree(false);
  };
  const newApp = () => {
    setDeployOption("");
    setAgree(false);
  };

  const handleCloudSelect = (cloud) => {
    resetFlow();
    setSelectedCloud(cloud);
    handleCompleteStep(1);
  };

  return (
    <div className={`dashboard-container ${darkMode ? "dark" : "light"}`}>
      <div className="deploy-container2">
        <div className="deploy-header">
          <h1>Deploy </h1>
        </div>
        <div>
          <AppCloudSelect
            onNext={handleCloudSelect}
            ref={nameRef}
            methodReset={() => setDeployOption("")}
          />

          {selectedCloud === "flux" && completedSteps.includes(1) && (
            <>
              <MethodSelectFlux
                darkMode={darkMode}
                setDeployOption={setDeployOption}
                ref={detailsRef}
                installed={installed}
                appInstalled={appInstalled}
                disableSelect={disableSelect}
                setInstalled={setInstalled}
                setDisableSelect={setDisableSelect}
                selectedCloud={selectedCloud}
                deployOption={deployOption}
                setComponents={setComponents}
                components={components}
                resetFlow={newApp}
              />
            </>
          )}
          {selectedCloud === "akash" && completedSteps.includes(1) && (
            <>
              <MethodSelectAkash
                darkMode={darkMode}
                onClick={setDatabaseName}
                value={databaseName}
                onDocker={() => setDeployOption("dockerAkash")}
                onGit={() => setDeployOption("githubAkash")}
                setImage={setImage}
                ref={detailsRef}
                methodReset={() => setDeployOption("")}
                installed={installed}
                appInstalled={appInstalled}
                disableSelect={disableSelect}
                image={image}
                databaseName={databaseName}
                setInstalled={setInstalled}
                setDisableSelect={setDisableSelect}
                selectedCloud={selectedCloud}
                deployOption={deployOption}
              />
            </>
          )}
        </div>
      </div>
      <MobileFooterBar />
    </div>
  );
};

export default DeployAppScreen;
