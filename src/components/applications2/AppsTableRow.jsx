import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function AppsTableRow({ type, status, creationDate, mode }) {
  const [deploymentName, setDeploymentName] = useState("");
  const [deploymentUri, setDeploymentUri] = useState("");
  useEffect(() => {
    const name = localStorage.getItem("DeploymentName");
    const uri = localStorage.getItem("DeploymentUri");
    if (name) {
      setDeploymentName(name);
    }
    if (uri) {
      setDeploymentUri(uri);
    }
  }, []);
  return (
    <>
      <div className={`table-row ${mode ? "dark" : "light"}`}>
        <h3>{deploymentName ? deploymentName : "---"}</h3>
        <h4>{type}</h4>

        <Link
          rel="noopener noreferrer"
          target="_blank"
          href={deploymentUri ? `http://${deploymentUri}` : "/applications"}
        >
          {" "}
          {deploymentUri ? deploymentUri : "---"}{" "}
        </Link>

        <div className="status">
          {" "}
          <div className="circle3"></div>
          {status}
        </div>

        <h5>
          {" "}
          <Image alt="" src="/calendar.png" height={15} width={15} />
          {creationDate}
        </h5>

        <Image alt="" src="/edit.png" height={20} width={20} />
      </div>
    </>
  );
}

export default AppsTableRow;
