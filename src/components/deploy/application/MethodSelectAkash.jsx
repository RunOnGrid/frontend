import Image from "next/image";
import React, { forwardRef, useState } from "react";

const MethodSelectAkash = forwardRef(
  (
    { onDocker, onGit, darkMode, onClick, value, setImage, methodReset },
    ref
  ) => {
    const [build, setBuild] = useState(false);
    const [grid, setGrid] = useState(false);
    const [docker, setDocker] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState("");


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
      onDocker();
    };

    // const handleContinue = () => {
    //   if (!imageURL.trim()) {
    //     setError("This field is required.");
    //     return;
    //   }
    //   setError("");
    //   setImage(imageURL);
    //   onDocker();
    // };

    return (
      <div ref={ref} className="databaseSelect">
        <div style={{ display: "flex" }}>
          <h3>2.</h3>
          <div className="databaseSelect-title">
            <span>Select a deployment method</span>
            <p>Deploy from a Git repository or a Docker registry</p>
          </div>
        </div>
        <div className="deployMethodBox-container">
          <div
            className={`deployMethodBox ${
              darkMode ? "dark" : "light"
            } disabled`}
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
            <h4>Docker repository</h4>
            <p>Specify your image URL : Ex: gridcloud/helloworld:2.0</p>
            <p className="deploy-sub-p">
              :latest tag is not recommended on akash deploys
            </p>
          </div>
        </div>
        {grid && (
          <>
            <span> Build settings</span>
            <p className="span-deploy">Specify your GitHub repository.</p>
            <div className="install-github">
              <Image alt="" src="/github3.png" height={15} width={15} />
              <span onClick={() => onGit()}>
                {build ? "Installed" : "Install the Grid GitHub app"}
              </span>
            </div>
          </>
        )}
      </div>
    );
  }
);

MethodSelectAkash.displayName = "MethodSelectAkash";
export default MethodSelectAkash;

{
  /* {build ? (
  <>
    {" "}
    <BuildSettings
      onClick={() => setBuild2(true)}
      value={build2}
      darkMode={darkMode}
    />{" "}
  </>
) : (
  ""
)}

{build2 ? (
  <>
    {" "}
    <Buildpack onClick={onNext} darkMode={darkMode} />{" "}
  </>
) : (
  ""
)} */
}
// {docker && (
//   <>
//     <span> Image settings</span>
//     <p className="span-deploy">Specify your image URL.</p>
//     {error && <span className="error-message">{error}</span>}{" "}
//     <div className={`input-with-image4 ${darkMode ? "dark" : "light"}`}>
//       <input
//         onChange={(e) => setImageURL(e.target.value)}
//         value={imageURL}
//         placeholder="ex: gridcloud/aptos-app:v.1"
//       />
//       <Image alt="" src="/searchLigth.png" height={20} width={20} />
//     </div>
//     {/* Mostrar mensaje de error */}
//     <button onClick={handleContinue} className="add-button2">
//       Continue
//     </button>
//   </>
// )}