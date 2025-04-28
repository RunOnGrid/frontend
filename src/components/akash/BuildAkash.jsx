import React, { memo, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import EnvModal from "../EnvModal";
import CommModal from "../CommModal";
import PortModal from "../PortFlux";
import PricingPlanAkash from "../deploy/PricingPlanAkash";
import Botonera2 from "@/commons/Botonera2";
import SummaryAkash from "../deploy/SummaryAkash";
import LoadingText from "@/commons/LoaderText";
import Image from "next/image";
import { TokenService } from "../../../tokenHandler";
import PricingPlanFlux from "../deploy/application/PricingPlanFlux";
import DockerSettings from "../flux/DockerSettings";
import AddComponent from "../deploy/AddComponent";
import EnvFlux from "../flux/EnvFlux";
import NetAkash from "./NetAkash";
import Spinner from "@/commons/Spinner";

export default function BuildAkash({ darkMode, selectedCloud }) {
  const [activeStep, setActiveStep] = useState(3);
  const [currentDate, setCurrentDate] = useState("");
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
  const [errorMessage3, setErrorMessage3] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [pat, setPat] = useState("");
  const servicesRef = useRef(null);
  const deployRef = useRef(null);
  const [port, setPort] = useState(8080);
  const [envs, setEnvs] = useState([]);
  const [domain, setDomain] = useState("domain.com");
  const [host, setHost] = useState("ghcr.io");
  const [as, setAs] = useState(80);
  const [priv, setPriv] = useState(false);
  const [balance, setBalance] = useState(0);
  const [insufficient, setInsufficient] = useState(false);
  const [fundsError, setFundsError] = useState(true);
  const [compPrice, setCompPrice] = useState(0);
  const [instances, setInstances] = useState(1);
  const [priceLoader, setPriceLoader] = useState(false);
  const router = useRouter();

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
    setCompPrice(data.price.toFixed(2));
    if (data.price > balance) {
      setInsufficient(true);
    }

    return true;
  };

  const handleSummary = async () => {
    // Modificamos imageValidator para devolver el resultado en lugar de sólo establecer el estado

    if (!name.trim()) {
      setErrorMessage2("This field is required.");

      return;
    }
    if (priv) {
      if (!pat.trim()) {
        setErrorMessage("This field is required.");

        return;
      }
    }

    const price = await checkPrice();

    if (price) {
      setPriceLoader(false);
      setErrorMessage("");
      setErrorMessage2("");
      setSummary(true);
      setActiveStep(4);
    }
  };

  // };

  const handlePaymentSuccess = async () => {
    setIsLoading(true);
    if (insufficient) {
      setFundsError("Insufficient funds");
      setIsLoading(false);
      return;
    }
    try {
      let response;

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
          count: instances,
        }),
      });

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
    const tokens = TokenService.getTokens();
    setAccessToken(tokens.tokens.accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (activeStep === 3) {
      servicesRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (activeStep === 4) {
      deployRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (activeStep === 5) {
      envRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeStep]);

  return (
    <div className="databaseSelect">
      <div className="components-display">
        <DockerSettings
          repoTag={repoTag}
          setRepoTag={setRepoTag}
          name={name}
          setName={setName}
          darkMode={darkMode}
          owner={owner}
          setOwner={setOwner}
          setPat={setPat}
          pat={pat}
          priv={priv}
          setPriv={setPriv}
          errorMessage2={errorMessage2}
          errorMessage={errorMessage}
          errorMessage3={errorMessage3}
          setHost={setHost}
        />
        <AddComponent
          darkMode={darkMode}
          cpu={cpu}
          setCpu={setCpu}
          ram={memory}
          setRam={setMemory}
          hdd={ephemeralStorage}
          setHdd={setEphemeralStorage}
          setInstances={setInstances}
        />
      </div>

      <>
        <h3> Settings</h3>
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
      {/* <ComponentsTable /> */}
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
            price={compPrice}
            setActiveStep={setActiveStep}
            summaryStep={3}
          />
          <div className="termService">
            <Botonera2 setAgree={setAgree} agree={agree} />
            <h4>I agree with Terms of Service</h4>
          </div>
          {fundsError !== "" ? (
            <h3 className="error-message-login">{fundsError}</h3>
          ) : (
            ""
          )}
          <div
            className={
              agree ? "deploy-button-wrapper" : "deploy-button-wrapper-disabled"
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
  );
}
// {showModal && (
//   <>
//     <PayModal
//       darkMode={darkMode}
//       onClick={() => {
//         setShowModal(false);
//       }}
//       pay={() => {
//         handleContinue();
//       }}
//     />
//   </>
// )}
{
  // {
  //   showPayment && clientSecret && (
  //     <Elements options={{ clientSecret }} stripe={stripePromise}>
  //       <CheckoutForm
  //         onClick={setShowPayment}
  //         onPaymentSuccess={handlePaymentSuccess}
  //       />
  //     </Elements>
  //   );
  // }
}
{
  /* <div className="akash-persistent">
              <h3>Persistent Storage</h3>
              <div className={`slider-group ${darkMode ? "dark" : "light"}`}>
                <input
                  type="range"
                  min="1"
                  max="1024"
                  value={persistentStorage}
                  onChange={(e) =>
                    setPersistentStorage(parseInt(e.target.value))
                  }
                />
                <span>{persistentStorage} </span>
                <Select2
                  options={UnitOptions}
                  onSelect={handlePersistUnit}
                  initialValue={persistUnit}
                />
              </div>
              <div className="checkbox-group">
                <label htmlFor="readonly">Read only</label>
                <input
                  type="checkbox"
                  id="readonly"
                  checked={readOnly}
                  onChange={(e) => setReadOnly(e.target.checked)}
                />
              </div>

              <div className="buildpack-single">
                <h3> Persistent Name</h3>
                <div
                  className={`input-container5 ${darkMode ? "dark" : "light"}`}
                >
                  <input
                    type="text"
                    className={`custom-input ${darkMode ? "dark" : "light"}`}
                    value={persistentName}
                    onChange={(e) => setPersistentName(e.target.value)}
                    required
                    placeholder=""
                  />
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <div className="buildpack-single">
                  <h3> Type</h3>
                  <Select2
                    options={MemoryUnits}
                    onSelect={handleTypeUnit}
                    initialValue={typeUnit}
                  />
                </div>

                <div className="buildpack-single">
                  <h3> Mount</h3>
                  <div
                    className={`input-container5 ${
                      darkMode ? "dark" : "light"
                    }`}
                  >
                    <input
                      type="text"
                      className={`custom-input ${darkMode ? "dark" : "light"}`}
                      value={mount}
                      onChange={(e) => setMount(e.target.value)}
                      required
                      placeholder="Example: /mnt/data"
                    />
                  </div>
                </div>
              </div>
            </div> */
}
{
  /* <YamlEditor yaml={yaml} onChange={handleYamlChange} /> */
}
// const updateYamlFromBuilder = () => {
//   const exposeSection = ports
//     ? `
//   expose:
//     - port: ${ports.port}
//       as: ${ports.as}${
//         ports.accept.length > 0
//           ? `
//       accept:
//         - ${ports.accept.join("\n          - ")}`
//           : ""
//       }${
//         ports.protocol !== "http"
//           ? `
//       proto: ${ports.protocol}`
//           : ""
//       }
//       to:
//         - global: true`
//     : "";

//   const commandSection =
//     commands.length > 1
//       ? `
//   command:
//     - ${commands.join("\n      - ")}`
//       : "";

//   const argsSection =
//     args.length > 0
//       ? `
//   args:
//     - ${args.join("\n      - ")}`
//       : "";

//   const envSection =
//     Object.keys(env).length > 0
//       ? `
//   env:
//     - ${Object.entries(env)
//       .map(([key, value]) => `${key}=${value}`)
//       .join("\n      - ")}`
//       : "";

//   const newYaml = `---
// version: "2.0"
// services:
// ${serviceName}:
//   image: ${image}${exposeSection}${commandSection}${argsSection}${envSection}
// profiles:
// compute:
//   ${serviceName}:
//     resources:
//       cpu:
//         units:
//           - ${cpu}
//       memory:
//         size: ${memory}${memoryUnit}
//       storage:
//         - size: ${ephemeralStorage}${storageUnit}
// placement:
//   dcloud:
//     pricing:
//       ${serviceName}:
//         denom: uakt
//         amount: 10000
// deployment:
// ${serviceName}:
//   dcloud:
//     profile: ${serviceName}
//     count: ${serviceCount}`;

//   setYaml(newYaml.trim());
// };
//   useEffect(() => {
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
{
  /* <div
className={`buildpack-single ${darkMode ? "dark" : "light"}`}
>
<h3> Instances</h3>
<div
  className={`input-container5 ${
    darkMode ? "dark" : "light"
  }`}
>
  <input
    type="text"
    className={`custom-input ${darkMode ? "dark" : "light"}`}
    value={serviceCount}
    onChange={(e) => {
      const value = e.target.value;
      if (/^\d*\.?\d*$/.test(value)) {
        setServiceCount(value);
      }
    }}
    onBlur={() => {
      if (parseFloat(serviceCount) < 3) {
        setServiceCount("3");
      }
    }}
    required
  />
</div>
</div> */
}

{
  /* <div className="sliders-akash">
                <h3>CPU</h3>
                <div className={`slider-group ${darkMode ? "dark" : "light"}`}>
                  <input
                    type="range"
                    min="0.1"
                    max="384"
                    step="1"
                    value={cpu}
                    onChange={(e) => setCpu(parseFloat(e.target.value))}
                  />
                  <span>{cpu}</span>
                  <HoverInfo text={cpuText} />
                </div>

                <h3>Memory</h3>
                <div className={`slider-group ${darkMode ? "dark" : "light"}`}>
                  <input
                    type="range"
                    min="1"
                    max="5120"
                    step="1"
                    value={memory}
                    onChange={(e) => setMemory(parseInt(e.target.value))}
                  />
                  <span>{memory} </span>
                  <Select2
                    darkMode={darkMode}
                    options={UnitOptions}
                    onSelect={handleMemoryUnit}
                    initialValue={memoryUnit}
                  />
                  <HoverInfo text={memoryText} />
                </div>

                <h3>Ephemeral Storage</h3>
                <div className={`slider-group ${darkMode ? "dark" : "light"}`}>
                  <input
                    type="range"
                    min="1"
                    max="5120"
                    step="1"
                    value={ephemeralStorage}
                    onChange={(e) =>
                      setEphemeralStorage(parseInt(e.target.value))
                    }
                  />
                  <span>{ephemeralStorage} </span>
                  <Select3
                    darkMode={darkMode}
                    options={UnitOptions}
                    onSelect={handleStorageUnit}
                    initialValue={storageUnit}
                  />
                  <HoverInfo text={ephemeralText} />
                </div>
              </div> */
}

// const cpuText = [
//   "The amount of vCPU's required for this workload.",
//   "The maximum for a single instance is 384 vCPU's.",
//   "The maximum total multiplied by the count of instances is 512 vCPU's.",
// ];
// const memoryText = [
//   "The amount of memory required for this workload.",
//   "The maximum for a single instance is 512 Gi.",
//   "The maximum total multiplied by the count of instances is 1024 Gi.",
// ];
// const ephemeralText = [
//   "The amount of ephemeral disk storage required for this workload.",
//   "This disk storage is ephemeral, meaning it will be wiped out on every deployment update or provider reboot.",
//   "The maximum for a single instance is 32 Ti.",
//   "The maximum total multiplied by the count of instances is also 32 Ti",
// ];
