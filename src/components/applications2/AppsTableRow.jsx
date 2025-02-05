import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function AppsTableRow({ type, status, creationDate, mode, name }) {
  const [deploymentName, setDeploymentName] = useState("");
  const [deploymentUri, setDeploymentUri] = useState("");
  const [deploymentDate, setDeploymentDate] = useState("");

  return (
    <>
      <div className={`table-row ${mode ? "dark" : "light"}`}>
        <h3>{name || "---"}</h3>
        <h4>{type}</h4> {deploymentUri ? deploymentUri : "---"}{" "}
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
        {/* <Image alt="" src="/edit.png" height={20} width={20} /> */}
      </div>
    </>
  );
}

export default AppsTableRow;
