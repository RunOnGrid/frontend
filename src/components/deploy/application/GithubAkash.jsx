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
import Spinner from "@/commons/Spinner";
import ComponentsTable from "@/components/flux/ComponentTable";
import BidsTable from "@/components/akash/BidsTable";

const GithubAkash = ({
  image,
  setDisableSelect,
  selectedCloud,
  disabled,
  setDisabled,
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
  const [deployError, setDeployError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDeploy, setIsLoadingDeploy] = useState(false);
  const [name, setName] = useState("");

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
  const [showConfig, setShowConfig] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessage2, setErrorMessage2] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [pat, setPat] = useState("");
  const servicesRef = useRef(null);
  const deployRef = useRef(null);
  const [port, setPort] = useState(8080);
  const [envs, setEnvs] = useState([]);
  const [domain, setDomain] = useState("");
  const [host, setHost] = useState("ghcr.io");
  const [as, setAs] = useState(80);
  const [balance, setBalance] = useState(0);
  const [insufficient, setInsufficient] = useState(false);
  const [fundsError, setFundsError] = useState(true);
  const [instances, setInstances] = useState(1);
  const [compPrice, setCompPrice] = useState(0);
  const [validatorMsg, setValidatorMsg] = useState("");
  const [imageError, setImageError] = useState(false);
  const [imagePath, setImagePath] = useState("");
  const [priceLoader, setPriceLoader] = useState(false);
  const [installationId, setInstallationId] = useState("");
  const [singleRepo, setSingleRepo] = useState("");
  const [branch, setBranch] = useState("");
  const [bidsData, setBidsData] = useState([]);
  const [dseq, setDseq] = useState("");
  const [providerOwner, setProviderOwner] = useState("");
  const [showBids, setShowBids] = useState(false);
  const [workflow, setWorkflow] = useState(false);
  const [workflowInstalled, setWorkflowInstalled] = useState(false);
  const handleSummary = async () => {
    // Modificamos imageValidator para devolver el resultado en lugar de sólo establecer el estado
    const isImageValid = await imageValidator();

    if (!isImageValid) {
      setValidatorMsg("Wrong credentials, please check PAT");
      return;
    }

    if (!name.trim()) {
      setErrorMessage2("This field is required.");
      return;
    }

    if (!pat.trim()) {
      setErrorMessage("This field is required.");
      return;
    }

    if (isImageValid) {
      const price = await checkPrice();
      if (price) {
        setPriceLoader(false);
        setErrorMessage("");
        setErrorMessage2("");
        setSummary(true);
        setActiveStep(3);
        setValidatorMsg("");
        setImageError(false);
        setDisabled(true);
      }
    }
  };

  const imageValidator = async () => {
    try {
      const response = await fetch("/api/image-validator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          username: owner,
          pat: pat,
          imagePath: imagePath.toLowerCase(),
        }),
      });
      if (!response.ok) {
        setImageError(true);
        setError(err.message);
        return false;
      }
      const data = await response.json();
      setValidatorMsg("");
      setImageError(false);

      return true;
    } catch (err) {
      setImageError(true);
      setError(err.message);

      return false;
    }
  };

  const getBalance = async () => {
    try {
      const response = await fetch(`/api/balance-proxy`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const data = await response.json();

      setBalance(data);
    } catch (err) {
      console.error("Error loading existing app names:", err);
    }
  };

  const checkPrice = async () => {
    getBalance();
    setPriceLoader(true);
    const response = await fetch(
      `/api/get-price?cloudProvider=${encodeURIComponent(
        selectedCloud.toUpperCase()
      )}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          configurationDetails: {
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
            count: instances,
          },
        }),
      }
    );
    const data = await response.json();
    setCompPrice(data.price);
    if (data.price > balance) {
      setInsufficient(true);
    }

    return true;
  };

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setName(newName);
  };

  const handlePat = (e) => {
    setPat(e.target.value);
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

  const handleBids = async () => {
    setIsLoading(true);
    if (insufficient) {
      setFundsError("Insufficient funds");
      setIsLoading(false);
      return;
    }
    try {
      let response;

      response = await fetch("/api/get-akash-bids", {
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
          count: instances,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (data && data.data.bid) {
        setDseq(data.data.dseq);
        setBidsData(data.data.bid);
        setShowBids(true);
      } else {
        console.warn("Response did not contain a 'bid' array.");
      }
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
    getBalance();
  }, [accessToken]);

  useEffect(() => {
    if (activeStep === 2) {
      servicesRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (activeStep === 3) {
      deployRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeStep]);
  const handleDeploy = async () => {
    setIsLoadingDeploy(true);

    try {
      let response;

      response = await fetch("/api/choose-provider", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          dseq: dseq.toString(),
          providerOwner: providerOwner,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      router.push("/profile");
    } catch (err) {
      setDeployError(err.message);
    } finally {
      setIsLoadingDeploy(false);
    }
  };

  return (
    <div>
      <div className={disabled ? "disable-container" : ""}>
        <FluxInputs
          name={name}
          handleNameChange={handleNameChange}
          darkMode={darkMode}
          errorMessage2={errorMessage2}
          errorMessage={errorMessage}
          pat={pat}
          handlePat={handlePat}
        />
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
          setInstances={setInstances}
          setImagePath={setImagePath}
          singleRepo={singleRepo}
          setSingleRepo={setSingleRepo}
          branch={branch}
          setBranch={setBranch}
          min={1}
          installationId={installationId}
          setInstallationId={setInstallationId}
          cloud={"akash"}
          workflow={workflow}
          setWorkflow={setWorkflow}
          workflowInstalled={workflowInstalled}
          setWorkflowInstalled={setWorkflowInstalled}
        />
        <div ref={servicesRef}>
          <div className="variables-section">
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

          {validatorMsg !== "" ? (
            <span className="error-message-login">{validatorMsg}</span>
          ) : (
            ""
          )}
        </div>
      </div>
      {showConfig && (
        <div className="databaseSelect">
          {priceLoader ? (
            <Spinner />
          ) : (
            <button
              className="add-button4"
              onClick={() => {
                handleSummary(true);
              }}
            >
              Continue
            </button>
          )}
          {summary && (
            <div ref={deployRef}>
              {/* <ComponentsTable components={components} /> */}
              <SummaryAkash
                cpu={cpu}
                ram={memory}
                hdd={ephemeralStorage}
                mode={darkMode}
                name={name}
                setSummary={setSummary}
                setAgree={setAgree}
                price={compPrice}
                setActiveStep={setActiveStep}
                summaryStep={2}
                setDisabled={setDisabled}
                setShowBids={setShowBids}
              />
              {/* <div className="termService">
                <Botonera2 setAgree={setAgree} agree={agree} />
                <h4>I agree with Terms of Service</h4>
              </div> */}
              {fundsError !== "" ? (
                <h3 className="error-message-login">{fundsError}</h3>
              ) : (
                ""
              )}
              <div className="deploy-button-wrapper">
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
                        handleBids();
                      }}
                    >
                      Get Akash Bids
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
          {bidsData.length > 0 && showBids && (
            <BidsTable
              cpu={cpu}
              ram={memory}
              ramUnit={memoryUnit}
              storage={ephemeralStorage}
              storageUnit={storageUnit}
              data={bidsData}
              dseq={dseq}
              setProviderOwner={setProviderOwner}
            />
          )}
          {providerOwner !== "" && showBids && (
            <button
              className="add-button4"
              onClick={() => {
                handleDeploy();
              }}
            >
              Deploy
            </button>
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
