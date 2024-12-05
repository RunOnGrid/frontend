import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "@/ThemeContext";
import AppCloudSelect from "./AppCloudSelect";
import { useRouter } from "next/router";
import MethodSelectAkash from "./MethodSelectAkash";
import MethodSelectFlux from "./MethodSelectFlux";
import { loadStripe } from "@stripe/stripe-js";
import BuildAkash from "@/components/akash/BuildAkash";
import DockerDeploy from "./DockerDeploy";
import GithubFlux from "./GithubFlux";
import GithubAkash from "./GithubAkash";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const DeployAppScreen = () => {
  const { darkMode } = useTheme();
  const router = useRouter();
  const [databaseName, setDatabaseName] = useState("");
  const [price, setPrice] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [activeStep, setActiveStep] = useState(null);
  const [selectedCloud, setSelectedCloud] = useState(null);
  const [componentData, setComponentData] = useState({});
  const [currentDate, setCurrentDate] = useState("");
  const [deployOption, setDeployOption] = useState("");
  const [agree, setAgree] = useState(false);
  const [image, setImage] = useState("gridcloud/aptos-app:v.1");
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
  useEffect(() => {
    const formatDate = (date) => {
      const options = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      return date.toLocaleDateString("en-US", options);
    };
    setCurrentDate(formatDate(new Date()));
  }, []);

  const handleCompleteStep = (step) => {
    setCompletedSteps((prevSteps) => [...prevSteps, step]);
    setActiveStep(step + 1);
  };
  const resetFlow = () => {
    setDatabaseName("");
    setPrice(0);
    setCompletedSteps([]);
    setActiveStep(null);

    setSelectedCloud(null);
    setComponentData({});
    setAgree(false);
    setImage("gridcloud/aptos-app:v.1");
  };

  const handleCloudSelect = (cloud) => {
    resetFlow();
    setSelectedCloud(cloud);
    handleCompleteStep(1);
  };

  return (
    <div className={`dashboard-container ${darkMode ? "dark" : "light"}`}>
      <div className="deploy-container2">
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
                onClick={setDatabaseName}
                value={databaseName}
                onDocker={() => setDeployOption("dockerFlux")}
                onGit={() => setDeployOption("githubFlux")}
                setImage={setImage}
                ref={detailsRef}
                methodReset={() => setDeployOption("")}
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
              />
            </>
          )}

          {selectedCloud === "flux" && deployOption === "dockerFlux" && (
            <>
              <DockerDeploy image={image} />
            </>
          )}

          {selectedCloud === "akash" && deployOption === "dockerAkash" && (
            <BuildAkash
              darkMode={darkMode}
              onSaveComponentData={handleSaveComponentData}
              image={image}
            />
          )}
          {selectedCloud === "flux" && deployOption === "githubFlux" && (
            <>
              <GithubFlux image={image} databaseName={databaseName} />
            </>
          )}
          {selectedCloud === "akash" && deployOption === "githubAkash" && (
            <>
              <GithubAkash image={image} databaseName={databaseName} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeployAppScreen;
