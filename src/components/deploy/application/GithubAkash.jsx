import React, { useEffect, useRef, useState } from "react";
import BuildSettings from "../BuildSettings";
import { useRouter } from "next/router";
import { useTheme } from "@/ThemeContext";
import Botonera2 from "@/commons/Botonera2";
import SummaryAkash from "../SummaryAkash";
import PricingPlanFlux from "./PricingPlanFlux";
import PortFlux from "@/components/PortFlux";
import EnvModal from "@/components/EnvModal";
import CommModal from "@/components/CommModal";
import Link from "next/link";
import LoadingText from "@/commons/LoaderText";
import { TokenService } from "../../../../tokenHandler";
import EnvFlux from "@/components/flux/EnvFlux";
import NetFlux from "@/components/flux/NetFlux";
import FluxInputs from "@/components/flux/FluxInputs";
import NetAkash from "@/components/akash/NetAkash";

const GithubAkash = ({
  image,
  databaseName,
  setInstalled,
  setDisableSelect,
}) => {
  const { darkMode } = useTheme();
  const router = useRouter();

  const [activeStep, setActiveStep] = useState(3);
  const [cpu, setCpu] = useState(0.5);
  const [memory, setMemory] = useState(1000);
  const [memoryUnit, setMemoryUnit] = useState("Mi");
  const [storageUnit, setStorageUnit] = useState("Gi");
  const [ephemeralStorage, setEphemeralStorage] = useState(40);
  const [serviceCount, setServiceCount] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [activeTab, setActiveTab] = useState("builder");
  const [commands, setCommands] = useState([]);
  const [env, setEnv] = useState({});
  const [protocol, setProtocol] = useState("http");
  const [ports, setPorts] = useState({
    port: 80,
    as: 8080,
    accept: [],
    protocol: "http",
  });
  const [accept, setAccept] = useState("");
  const [summary, setSummary] = useState(false);
  const [agree, setAgree] = useState(false);
  const [repositories, setRepositories] = useState([0, 1]);
  const [repoTag, setRepoTag] = useState("");
  const [owner, setOwner] = useState("");
  const [showConfig, setShowConfig] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessage2, setErrorMessage2] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [pat, setPat] = useState("");
  const servicesRef = useRef(null);
  const deployRef = useRef(null);
  const [port, setPort] = useState(8080);
  const [envs, setEnvs] = useState([]);
  const [domain, setDomain] = useState("domain.com");
  const [host, setHost] = useState("ghcr.io");
  const [as, setAs] = useState(80);
  const handleNameChange = (event) => {
    const newName = event.target.value;
    setName(newName);
  };

  const handlePat = (e) => {
    setPat(e.target.value);
  };

  const handleSummary = () => {
    setSummary(true);
    setActiveStep(4);
  };

  const handleShowConfig = () => {
    setActiveStep(2);
    setShowConfig(true);
  };

  const handleDelete = (keyToDelete) => {
    setEnv((prevEnv) => {
      const updatedEnv = { ...prevEnv };
      delete updatedEnv[keyToDelete];
      return updatedEnv;
    });
  };

  const handlePaymentSuccess = async () => {
    setIsLoading(true);

    try {
      let response;
      if (activeTab === "builder") {
        response = await fetch("/api/akash-deploy", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            serviceName: name,
            cpu,
            memory,
            ephemeralStorage,
            serviceCount,
            image: repoTag,
            ports,
            commands,
            envs,
            accept,
            pat,
            owner,
            memoryUnit,
            storageUnit,
            host,
            protocol,
            port,
            as,
          }),
        });
      }

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      await response.json();
      router.push("/profile");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const tokens = TokenService.getTokens();
    if (tokens && tokens.tokens && tokens.tokens.accessToken) {
      setAccessToken(tokens.tokens.accessToken);
    }
  }, []);

  useEffect(() => {
    if (activeStep === 2) {
      servicesRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (activeStep === 3) {
      deployRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeStep]);

  return (
    <div>
      <BuildSettings
        repositories={repositories}
        darkMode={darkMode}
        ref={servicesRef}
        setRepoTag={setRepoTag}
        summary={summary}
        setOwner={setOwner}
        owner={owner.toLowerCase()}
        onNext={() => handleShowConfig()}
        setDisableSelect={setDisableSelect}
        existingNames={{}}
        image={image}
        setPat={setPat}
        cpu={cpu}
        setCpu={setCpu}
        ram={memory}
        setRam={setMemory}
        hdd={ephemeralStorage}
        setHdd={setEphemeralStorage}
      />
      {showConfig && (
        <div className="databaseSelect">
          <div ref={servicesRef} className={` ${summary ? "disabled" : ""}`}>
            {/* <h2>Deployment configurations</h2>

            <p>Configure your deployment settings.</p> */}

            {activeTab === "builder" ? (
              <>
                <FluxInputs
                  name={name}
                  handleNameChange={handleNameChange}
                  darkMode={darkMode}
                  errorMessage2={errorMessage2}
                  errorMessage={errorMessage}
                  pat={pat}
                  handlePat={handlePat}
                />
                <div style={{ display: "flex" }}>
                  <EnvFlux darkMode={darkMode} envs={envs} setEnvs={setEnvs} />
                  <NetAkash
                    setPort={setPort}
                    port={port}
                    domain={domain}
                    setDomain={setDomain}
                    as={as}
                    setAs={setAs}
                    darkMode={darkMode}
                    setProtocol={setProtocol}
                  />
                </div>
              </>
            ) : (
              ""
            )}

            {error && <p style={{ color: "red" }}>Error: {error}</p>}

            <button
              className="add-button4"
              onClick={() => {
                handleSummary(true);
              }}
            >
              Continue
            </button>
          </div>

          {summary && (
            <div ref={deployRef}>
              <SummaryAkash
                cpu={cpu}
                ram={memory}
                hdd={ephemeralStorage}
                mode={darkMode}
                name={name}
                setSummary={setSummary}
                setAgree={setAgree}
              />
              <div className="termService">
                <Botonera2 setAgree={setAgree} agree={agree} />
                <h4>I agree with Terms of Service</h4>
              </div>
              <div
                className={
                  agree
                    ? "deploy-button-wrapper"
                    : "deploy-button-wrapper-disabled"
                }
              >
                <div className="line-background"></div>
                {isLoading ? (
                  <div className="loading-container">
                    <LoadingText />
                  </div>
                ) : (
                  <>
                    <button
                      className="deploy-button"
                      onClick={() => {
                        handlePaymentSuccess();
                      }}
                      disabled={isLoading}
                    >
                      Deploy
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GithubAkash;

{
  /* {showPayment && clientSecret && (
          <Elements options={{ clientSecret }} stripe={stripePromise}>
            <CheckoutForm
              onClick={setShowPayment}
              onPaymentSuccess={handlePaymentSuccess}
            />
          </Elements>
        )} */
}

{
  /* {showModal && (
          <>
            <PayModal
              darkMode={darkMode}
              onClick={() => {
                setShowModal(false);
              }}
              pay={() => {
                handleContinue();
              }}
            />
          </>
        )} */
}

{
  /* {isLoading ? (
                <div className="loading-container">
                  <LoadingText />
                </div>
              ) : (
                <>
                  <Link href="/profile/stripe_checkout">
                    <button
                      className="deploy-button"
                      // onClick={() => {
                      //   handleContinue();
                      // }}
                      disabled={isLoading || paymentCompleted}
                    >
                      {paymentCompleted
                        ? "Deployment in progress"
                        : "Continue to payment"}
                    </button>
                  </Link>
                </>
              )} */
}
{
  /* <AppGeoSelect
              allowedLocations={allowedLocations}
              setAllowedLocations={setAllowedLocations}
              forbiddenLocations={forbiddenLocations}
              setForbiddenLocations={setForbiddenLocations}
              darkMode={darkMode}
            /> */
}
//   const updateYamlFromBuilder = () => {
//     const exposeSection = ports
//       ? `
//     expose:
//       - port: ${ports.port}
//         as: ${ports.as}${
//           ports.accept.length > 0
//             ? `
//         accept:
//           - ${ports.accept.join("\n          - ")}`
//             : ""
//         }${
//           ports.protocol !== "http"
//             ? `
//         proto: ${ports.protocol}`
//             : ""
//         }
//         to:
//           - global: true`
//       : "";

//     const commandSection =
//       commands.length > 1
//         ? `
//     command:
//       - ${commands.join("\n      - ")}`
//         : "";

//     const argsSection =
//       args.length > 0
//         ? `
//     args:
//       - ${args.join("\n      - ")}`
//         : "";

//     const envSection =
//       Object.keys(env).length > 0
//         ? `
//     env:
//       - ${Object.entries(env)
//         .map(([key, value]) => `${key}=${value}`)
//         .join("\n      - ")}`
//         : "";

//     const newYaml = `---
// version: "2.0"
// services:
//   ${serviceName}:
//     image: ${image}${exposeSection}${commandSection}${argsSection}${envSection}
// profiles:
//   compute:
//     ${serviceName}:
//       resources:
//         cpu:
//           units:
//             - ${cpu}
//         memory:
//           size: ${memory}${memoryUnit}
//         storage:
//           - size: ${ephemeralStorage}${storageUnit}
//   placement:
//     dcloud:
//       pricing:
//         ${serviceName}:
//           denom: uakt
//           amount: 10000
// deployment:
//   ${serviceName}:
//     dcloud:
//       profile: ${serviceName}
//       count: ${serviceCount}`;

//     setYaml(newYaml.trim());
//   };

  // useEffect(() => {
  //   const formatDate = (date) => {
  //     const options = {
  //       weekday: "short",
  //       year: "numeric",
  //       month: "short",
  //       day: "numeric",
  //     };
  //     return date.toLocaleDateString("en-US", options);
  //   };
  //   setCurrentDate(formatDate(new Date()));
  // }, []);
  // useEffect(() => {
  //   updateYamlFromBuilder();
  // }, [
  //   serviceName,
  //   cpu,
  //   memory,
  //   ephemeralStorage,
  //   serviceCount,
  //   image,
  //   ports,
  //   commands,
  //   args,
  //   env,
  //   memoryUnit,
  //   storageUnit,
  // ]);