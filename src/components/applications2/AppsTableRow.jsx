import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function AppsTableRow({ type, status, creationDate, mode, name, uri }) {
  const [deploymentName, setDeploymentName] = useState("");
  const [deploymentUri, setDeploymentUri] = useState("");
  const [deploymentDate, setDeploymentDate] = useState("");


  const formatDate = (dateString) => {
    if (!dateString) return "---";

    const date = new Date(dateString);

    if (isNaN(date.getTime())) return "---";

    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${month}/${day}/${year} ${hours}:${minutes}`;
  };

 
  const formattedCreationDate = formatDate(creationDate);
  const ensureProtocol = (url) => {
    return url.startsWith("http://") || url.startsWith("https://")
      ? url
      : `https://${url}`;
  };

  return (
    <>
      <div className={`table-row ${mode ? "dark" : "light"}`}>
        <h3>{name || "---"}</h3>
        <h3>{type || "---"}</h3>

        {uri ? (
          <Link target="_blank" href={ensureProtocol(uri)}>
            <span>{uri}</span>
          </Link>
        ) : (
          <span>---</span>
        )}
        <div className="status">
          {" "}
          <div className={status === "Deployed" ? "circle3" : "circle5"}></div>
          {status}
        </div>
        <h5>
          {" "}
          <Image alt="" src="/calendar.png" height={15} width={15} />
          {formattedCreationDate}
        </h5>
        {/* <Image alt="" src="/edit.png" height={20} width={20} /> */}
      </div>
    </>
  );
}

export default AppsTableRow;